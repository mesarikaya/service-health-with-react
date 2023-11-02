import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { Select } from '@mui/material';

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
export default function DropdownNew(props) {
    const [value, setValue] = React.useState(props?.name[0]);
    
    return (
        <>
            <FormControl sx={{ m: 1, width: props?.width }}>
                {/* <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel> */}
                <Select
                    labelId="demo-simple-select-standard-label"
                    SelectDisplayProps={{ style: { padding: "2px 10px" } }}
                    id="demo-simple-select-standard"
                    value={props?.value}
                    defaultValue={props?.value}
                    onChange={(event, child)=>{props?.handleChange(event, child)}}
                >
                    <MenuItem value="">
                            <ListItemText primary="None" />
                        </MenuItem>
                    {props?.name.map((name) => (
                        <MenuItem key={name.id} id={name.id} value={name.description}>
                            <ListItemText primary={name.description} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}
