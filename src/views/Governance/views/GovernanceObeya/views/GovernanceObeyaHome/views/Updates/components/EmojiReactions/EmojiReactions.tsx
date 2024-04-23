import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import useAuthentication from "hooks/useAuthentication";
import InsertEmoticonOutlinedIcon from '@material-ui/icons/InsertEmoticonOutlined';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Box, Tooltip } from "@material-ui/core";
import { UpdateItem, editUpdateInCache, saveUpdate } from "../../hooks/useUpdates";
import { useSWRConfig } from "swr";

type CounterItem = {
    emoji: string;
    by: string;
};
type EmojiReactionsProps = {
    reactions: CounterItem[];
    update: UpdateItem;
};
const useOnClickOutside = (ref, handler) => {
    useEffect(() => {
        const listener = event => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }

            handler(event);
        };

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {
            document.removeEventListener('mousedown', listener);
            document.removeEventListener('touchstart', listener);
        };
    }, [ref, handler]);
};
const defaultReactions: CounterItem[] = [
    {
        emoji: '👍',
        by: '',
    },
    {
        emoji: '👏',
        by: '',
    },
    {
        emoji: '🎉',
        by: '',
    },
    {
        emoji: '❤️',
        by: '',
    },
    {
        emoji: '👀',
        by: '',
    }
];
const EmojiReactions = (props: EmojiReactionsProps) => {
    const ref = useRef<null | HTMLDivElement>(null);
    const [showSelector, setShowSelector] = useState<boolean>(false);
    useOnClickOutside(ref, () => setShowSelector(!showSelector));

    const handleAdd = () => {
        setShowSelector(!showSelector);
    };

    const { userInfo } = useAuthentication();
    const queryParams = new URLSearchParams(window.location.search);
    const activeObeyaRoomId = queryParams.get("roomId");
    const { mutate, cache } = useSWRConfig();

    const handleSelect = (emoji, useNative = true) => {
        console.log(emoji);
        if (useNative)
            emoji = emoji.native;
        const index = props.reactions.findIndex(x => x.emoji === emoji);
        let newReactions: CounterItem[] = [];
        if (index > -1) {
            //Reaction already exists
            if (props.reactions[index].by.includes(userInfo.name)) {
                //Reaction exists by this user
                if (props.reactions[index].by.split(',').length > 1) {
                    // This user is not the only one who reacted with this emoji , only remove this user name from list
                    const countersCopy = _.cloneDeep(props.reactions);
                    countersCopy[index].by = countersCopy[index].by.split(',').filter(x => x !== userInfo.name).join(',');
                    newReactions = countersCopy;
                } else {
                    // This user is the only one who reacted with this emoji , remove the reaction
                    newReactions = [...props.reactions.slice(0, index), ...props.reactions.slice(index + 1)];
                }
            } else {
                // Reaction doesn't exist by user , but reaction already exists , only add name to list of names
                const countersCopy = _.cloneDeep(props.reactions);
                const names = countersCopy[index].by.split(',').filter(val => val);
                names.push(userInfo.name);
                countersCopy[index].by = names.join(',');
                newReactions = countersCopy;
            }
        } else {
            //Reaction doesn't exist yet , add a new reaction with user list as current user
            newReactions = [...props.reactions, { emoji, by: userInfo.name }];
        }
        const relevantKeysWithData: string[] = [];
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`)) {
            console.log("All cache found");
            relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=all`);
        }
        if (cache.get(`updates?initiativeId=${activeObeyaRoomId}&updateType=${props.update.updateType}`)) {
            console.log(`${props.update.updateType} cache found`);
            relevantKeysWithData.push(`updates?initiativeId=${activeObeyaRoomId}&updateType=${props.update.updateType}`);
        }
        const updateItem = _.cloneDeep(props.update);
        updateItem.reactions = newReactions;
        relevantKeysWithData.forEach(key => {
            editUpdateInCache(
                updateItem,
                cache.get(key),
                mutate,
                key
            );
        });
        saveUpdate({ ...updateItem, reactions: JSON.stringify(newReactions), silent: true });
        setShowSelector(false);
    };


    return (
        <Box style={{ position: 'relative' }}>
            <Box
                style={{
                    minWidth: 12,
                    display: 'flex',
                }}>
                {(props.reactions.length > 0 ? props.reactions : defaultReactions).map((item, index) => {
                    return <Tooltip
                        key={index}
                        title={item.by}
                    >
                        <Box style={{
                            cursor: 'pointer', marginLeft: index > 0 ? 10 : 0,
                        }} onClick={() => handleSelect(item.emoji, false)}>
                            {item.emoji} {item.by.split(',').filter(val => val).length || ''}
                        </Box>
                    </Tooltip>;
                })
                }
                <Box style={{
                    cursor: 'pointer', marginLeft: 10,
                }} onClick={handleAdd}>
                    <InsertEmoticonOutlinedIcon />
                </Box>
            </Box>
            {
                showSelector
                    ? <Box style={{ position: 'absolute', top: '100%', zIndex: 1 }}>
                        <div ref={ref}>
                            <Picker data={data} onEmojiSelect={handleSelect} theme="light" />
                        </div>
                    </Box>
                    : ''
            }
        </Box>
    );
};

export default EmojiReactions;