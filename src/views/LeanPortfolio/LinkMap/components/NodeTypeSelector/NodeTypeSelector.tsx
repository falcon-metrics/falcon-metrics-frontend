import { Box, Typography } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect } from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 250,
            maxWidth: 250,
        },
        chips: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        chip: {
            margin: 2,
        },
        noLabel: {
            marginTop: theme.spacing(3),
        },
    }),
);

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const options = [
    ['metric', 'Metric'],
    ['strategyKeyResult', 'Key Result'],
    ['vision', 'Vision'],
    ['mission', 'Mission'],
    ['obeyaRoom', 'Initiative'],
    ['strategicObjective', 'Objective'],
    ['strategicDriver', 'Strategic Driver'],
    ['strategy', 'Strategy']
];

const NodeTypeSelector = ({ onChange, value }: { onChange: any; value: any; }) => {
    const classes = useStyles();
    const [selectedOptions, setSelectedOptions] = React.useState<string[]>([]);

    const handleChange = (event: React.ChangeEvent<{ value: unknown; }>) => {
        setSelectedOptions(event.target.value as string[]);
        onChange(event.target.value);
    };

    useEffect(() => {
        if (value === undefined) setSelectedOptions([]);
        if (value) setSelectedOptions(value);
    }, [value]);


    return (
        <Box width={'200px'}>
            <Typography >Filter nodes by type</Typography>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-mutiple-checkbox-label">Node Type</InputLabel>
                <Select
                    labelId="demo-mutiple-checkbox-label"
                    id="demo-mutiple-checkbox"
                    multiple
                    value={selectedOptions}
                    onChange={handleChange}
                    input={<Input />}
                    renderValue={
                        (selected: any) => options
                            .filter(([value]) => selected.includes(value))
                            .map(([_value, name]) => name)
                            .join(', ')
                    }
                    MenuProps={MenuProps}
                >
                    {options.map(([value, name]) => (
                        <MenuItem key={value} value={value}>
                            <Checkbox color='primary' checked={selectedOptions.indexOf(value) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default NodeTypeSelector;
