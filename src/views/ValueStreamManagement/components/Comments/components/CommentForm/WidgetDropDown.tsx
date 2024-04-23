import flattenDeep from 'lodash/flattenDeep';
import Select from '@material-ui/core/Select';
import { useStyles } from './CommentForm.styles';
import Input from '@material-ui/core/Input';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from "@material-ui/core/ListSubheader";
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';
import { widgetOptions } from './constants';

import { styled } from '@material-ui/styles';

export const flattendWidgetOptions = flattenDeep(widgetOptions);

export const Subheader = styled(ListSubheader)({
  fontWeight: 'bold',
  color: 'rgb(0, 120, 212)',
  fontFamily: 'Open Sans',
});

export const CustomMenuItem = styled(MenuItem)({
  fontFamily: 'Open Sans',
  '& .Mui-checked > span > svg > path': {
    fill: 'rgb(0, 120, 212)'
  },
});


export const WidgetDropdown = ({ selectedElement, optionSelected, widgetValue, handleChangeWidget }: any) => {
  const classes = useStyles();
  if (selectedElement !== '0') {
    return (
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={widgetValue}
        name="widget"
        onChange={handleChangeWidget}
        className={classes.selectElement}
        input={<Input id="select-multiple-chip" />}
        disabled={selectedElement === '-1'}
        renderValue={(selected: any) => {
          /*
          * access all selected ids on widget dropdown
          * use the id value to get the current option
          * (to display the LABEL value) instead of ID
          */
          const labelsById = optionSelected.reduce((acc, option: { value: string; label: string; info: any; }) => {
            if ((selected || [])?.includes(option.value)) {
              acc[option.value] = option.label;
            }
            return acc;
          }, {});
          return (
            <Box className={classes.multiSelectTags}>
              {(selected || [])?.map((value) => {
                  return (
                    <Chip key={value} label={labelsById[value]} />
                  )
                }
              )}
            </Box>
          );
        }}
        >
        {(optionSelected || []).map((option:{ value: string, label: string }) => {
          const checked = (widgetValue === option.value) || (widgetValue && widgetValue?.length && widgetValue?.includes(option?.value));
          return (
            <CustomMenuItem key={option.value} value={option.value}>
              <Checkbox
                checked={checked} 
              />
              <ListItemText primary={option.label} />
            </CustomMenuItem>
          );
        })}
      </Select>
    );
  } else {
    return (
      <Select
        labelId="demo-mutiple-chip-label"
        id="demo-mutiple-chip"
        multiple
        value={widgetValue}
        name="widget"
        onChange={handleChangeWidget}
        className={classes.selectElement}
        input={<Input id="select-multiple-chip" />}
        disabled={selectedElement === '-1'}
        renderValue={(selected: any) => {
          /*
          * access all selected ids on widget dropdown
          * use the id value to get the current option
          * (to display the LABEL value) instead of ID
          */
          const labelsById = flattendWidgetOptions.reduce((acc, option: any) => {
            if ((selected || [])?.includes(option?.value)) {
              acc[option.value] = option.label;
            }
            return acc;
          }, {});
          return (
            <Box className={classes.multiSelectTags}>
              {(selected || [])?.reduce((acc, value) => {
                  if (value) {
                    acc.push((
                      <Chip key={value} label={labelsById[value]} />
                    ))
                  }
                  return acc;
                }, [])
              }
            </Box>
          );
        }}
        >
        {/* When first dropdown is a widget show these options */}
        <Subheader key={0}>Fitness Criteria</Subheader>
        {
          widgetOptions[0].map((group, index) => {
            const checked = (widgetValue === group.id) 
              || (widgetValue && widgetValue?.length && widgetValue?.includes(group.id));
            return (
              <CustomMenuItem key={index} value={group.id}>
                <Checkbox checked={checked} />
                <ListItemText primary={group.name} />
              </CustomMenuItem>
            );
          })
        }
        <Subheader key={1}>Flow Lens - Completed Work | Work in Progress | Upcoming Work</Subheader>
        {
          widgetOptions[1].map((group, index) => {
            const checked = (widgetValue === group.id) 
              || (widgetValue && widgetValue?.length && widgetValue?.includes(group.id));
            return (
              <CustomMenuItem key={index} value={group.id}>
                <Checkbox checked={checked} />
                <ListItemText primary={group.name} />
              </CustomMenuItem>
            );
          })
        }
        <Subheader key={2}>Run chart - Throughput | WIP Age | Inventory Age</Subheader>
        {
          widgetOptions[2].map((group, index) => {
            const checked = (widgetValue === group.id) 
              || (widgetValue && widgetValue?.length && widgetValue?.includes(group.id));
            return (
              <CustomMenuItem key={index} value={group.id}>
                <Checkbox checked={checked} />
                <ListItemText primary={group.name} />
              </CustomMenuItem>
            );
          })
        }
        <Subheader key={3}>Lead | WIP | Inventory Time Distribution</Subheader>
        {
          widgetOptions[3].map((group, index) => {
            const checked = (widgetValue === group.id) 
              || (widgetValue && widgetValue?.length && widgetValue?.includes(group.id));
            return (
              <CustomMenuItem key={index} value={group.id}>
                <Checkbox checked={checked} />
                <ListItemText primary={group.name} />
              </CustomMenuItem>
            );
          })
        }
        <Subheader key={4}>Profile of Work</Subheader>
        {
          widgetOptions[4].map((group, index) => {
            const checked = (widgetValue === group.id) 
              || (widgetValue && widgetValue?.length && widgetValue?.includes(group.id));
            return (
              <CustomMenuItem key={index} value={group.id}>
                <Checkbox checked={checked} />
                <ListItemText primary={group.name} />
              </CustomMenuItem>
            );
          })
        }
        <Subheader key={5}>Flow of Demands</Subheader>
        {
          widgetOptions[5].map((group, index) => {
            const checked = (widgetValue === group.id) 
              || (widgetValue && widgetValue?.length && widgetValue?.includes(group.id));
            return (
              <CustomMenuItem key={index} value={group.id}>
                <Checkbox checked={checked} />
                <ListItemText primary={group.name} />
              </CustomMenuItem>
            );
          })
        }
        <Subheader key={6}>Efficiency Analytics</Subheader>
        {
          widgetOptions[6].map((group, index) => {
            const checked = (widgetValue === group.id) 
              || (widgetValue && widgetValue?.length && widgetValue?.includes(group.id));
            return (
              <CustomMenuItem key={index} value={group.id}>
                <Checkbox checked={checked} />
                <ListItemText primary={group.name} />
              </CustomMenuItem>
            );
          })
        }
        <Subheader key={7}>CFD</Subheader>
        {
          widgetOptions[7].map((group, index) => {
            const checked = (widgetValue === group.id) 
              || (widgetValue && widgetValue?.length && widgetValue?.includes(group.id));
            return (
              <CustomMenuItem key={index} value={group.id}>
                <Checkbox checked={checked} />
                <ListItemText primary={group.name} />
              </CustomMenuItem>
            );
          })
        }
      </Select>
    );
  }
};
