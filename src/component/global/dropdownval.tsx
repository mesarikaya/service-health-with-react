import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { Select } from '@mui/material';
import { useForm, Controller } from "react-hook-form";

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
export default function Dropdownval(props) {
    const { handleSubmit, control } = useForm();
    
    return (
        <>
        <Controller
  name="firstName"
  control={control}
  defaultValue=""
  rules={{ required: 'First name required' }}
  render={({ field: { onChange, value } }) => (
                <Select
                    labelId="demo-simple-select-standard-label"
                    SelectDisplayProps={{ style: { padding: "2px 10px", fontSize:"13px" } }}
                    id="demo-simple-select-standard"
                    value={props?.value}
                    defaultValue={props?.value}
                    onChange={props?.handleChange}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 170, maxWidth:270, zIndex:999 } } }}
                >
                    {/* <MenuItem value="">
                            <ListItemText primary="None" />
                        </MenuItem> */}
                    {props?.name.map((name) => (
                        <MenuItem key={name} value={name}>
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
  )} />
        </>
    );
}
