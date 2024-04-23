import { CircularProgress, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import fetch, { useCustomSWR, } from "core/api/fetch";
import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from 'react';
import { GroupManagementContext } from "./GroupManagement";
import { Auth0User } from "./types";


const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
};

const useSearch = (search: string) => {
    const debouncedSearch = useDebounce(search, 1000);
    const { data, isValidating } = useCustomSWR<any>(
        (debouncedSearch && debouncedSearch?.length > 0) ? `/users?search=${debouncedSearch}` : null,
        fetch,
    );

    return { data, isValidating };
};



export const MultiSelectAutoComplete: React.FC = observer(() => {
    const store = useContext(GroupManagementContext);
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const { data, isValidating } = useSearch(searchTerm);
    const users = ((data?.data?.users ?? []) as Auth0User[])
        .filter(u =>
            // Exclude users in the group
            !store.userIdsToExclude.includes(u.user_id) &&
            // Exclude users already selected
            !store.selectedUsers.map(su => su.user_id).includes(u.user_id)
        );
    return (
        <Autocomplete
            size="small"
            id="multi-select-autocomplete"
            multiple
            options={users}
            loading={isValidating}
            open={open}
            value={store.selectedUsers}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            onInputChange={(event, value, reason) => {
                if (reason === 'input') {
                    setSearchTerm(value);
                }
            }}
            noOptionsText={"No users"}
            onChange={(_event, value) => store.selectedUsers = value}
            getOptionLabel={(option: Auth0User) => option.name}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Search Users"
                    variant="outlined"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {(isValidating) ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
});
