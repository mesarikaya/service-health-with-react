
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { Checkbox } from '@mui/material';
import { ListItemIcon } from '@mui/material';
import { Select } from '@mui/material';
import * as React from 'react';

export default function Dropdowncheck(props) {

  const [selected, setSelected] = React.useState<string[]>([props.selected])
  const isAllSelected =
    props?.name?.length > 0 && props?.selected?.length === props?.name?.length;


  /*  const handleChange = (event) => {
      
      const value = event.target.value;
      if (value[value.length - 1] === "all") {
        setSelected(selected?.length === props?.name.length ? [] : props?.name);
        return;
      }
      setSelected(value);
      
    }; */

  const selectData = (selected) => {
    let selectedString = selected + `, `;
    const lastCommaRemoved = selectedString.endsWith(`, `)
      ? selectedString.slice(0, -2)
      : selectedString;
    return lastCommaRemoved;
  };

  return (
    <FormControl sx={{ m: 1, width: props?.width }}>
      <Select
        SelectDisplayProps={{ style: { padding: "2px 10px", fontSize: "13px" } }}
        labelId="mutiple-select-label"
        multiple
        variant="outlined"
        value={props?.selected || []}
        onChange={props.handleChange}
        renderValue={(selected) => selectData(selected)}
        onClose={props.handleClose}
        MenuProps={{ PaperProps: { sx: { maxHeight: 170, maxWidth: 270, zIndex: 999 } } }}
      >
        {props?.selectall &&
          <MenuItem
            value="all"

          >
            <ListItemIcon>
              <Checkbox
                checked={isAllSelected}
                indeterminate={
                  props?.selected?.length > 0 && props?.selected?.length < props?.name?.length
                }
              />
            </ListItemIcon>

            <ListItemText
              primary="Select All"
            />
          </MenuItem>
        }
        {props?.name?.length > 0 && props?.name?.map((option) => (
          <MenuItem key={option?.id} value={option}>
            <ListItemIcon>
              <Checkbox checked={props.selected?.includes(option)} />
            </ListItemIcon>
            <ListItemText primary={option?.title}>{option}</ListItemText>
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
