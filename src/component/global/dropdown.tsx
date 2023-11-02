import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { OutlinedInput, Select } from '@mui/material';
import { fontSizes, weight } from '../utils/sizes';
import { colors } from '../utils/colors';
import { classes } from 'istanbul-lib-coverage';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
            maxWidth: 270,
            zIndex: 999,
        },
    },
};
export default function Dropdown(props) {
    const classes = useStyle();
    const [value, setValue] = React.useState(props?.name[0]);
    return (
        <>
            <FormControl sx={{ width: props?.width }}>
                <Select
                    labelId="demo-simple-select-standard-label"
                    SelectDisplayProps={{ style: { padding: "2px 10px", fontSize: "13px" } }}
                    id="demo-simple-select-standard"
                    value={props?.value}
                    defaultValue={props?.value}
                    onChange={props?.handleChange}
                    MenuProps={MenuProps}
                >
                    {props?.name.map((name) => (
                        <MenuItem className={"menuItem"} key={name} value={name}>
                            <ListItemText primaryTypographyProps={{ fontWeight: weight.xl, fontSize: fontSizes.xs, color: colors.darkBlack, }} primary={name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    );
}


const useStyle = makeStyles({
    menuItem: {
        "&:hover": {
            backgroundColor: colors.lightGray,
        },
        '&.Mui-selected': {
            backgroundColor: colors.red,
        },
    },
});