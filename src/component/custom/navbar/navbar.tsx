import { AppBar, Toolbar, Grid, useTheme, ThemeProvider, Select, NativeSelect } from '@mui/material';
import LogoImgDark from '../../../assets/images/Cargill_white.png';
import { mainTheme } from '../../utils/theme';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import Dropdown from './../../global/dropdown';
import { Language } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { MenuItem } from '@mui/material';
import * as React from 'react';

const useStyles = makeStyles({
    style: {
        boxShadow: 'none',
        "& .MuiSelect-outlined": {
            padding: "0px"
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline, .MuiOutlinedInput-notchedOutline': { border: 0 }
    }
})
export default function Navbar() {

    const classes = useStyles();

    const names = [
        'English',
        'Hindi',
    ];

    const [language, setLanguage] = React.useState('');

    const handleChange = (event) => {
        setLanguage(event.target.value as string);
    };

    return (
        <ThemeProvider theme={mainTheme()}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Grid container spacing={10}>
                    <Grid item margin={0} xs>
                        <Toolbar>
                            <Grid item xs margin={0}>
                                <img src={LogoImgDark} alt="Cargill" style={{ cursor: 'pointer', width: '100px', height: '55px' }} />
                            </Grid>
                        </Toolbar>
                    </Grid>
                    <Grid item alignSelf='center' style={{ paddingTop: "70px", paddingRight: "10px" }}>
                        <Language style={{verticalAlign:"text-top" }} />
                        {/* <Dropdown width={150} style={classes.style} value={names[0]} name={names} /> */}
                        <Select className='language'
                            defaultValue={names[0]}
                        >
                            {names.map((name) => (
                                <MenuItem className='lang' value={name}>{name}</MenuItem>
                            ))}
                        </Select>
                    </Grid>
                </Grid>
            </AppBar>
        </ThemeProvider>
    )
}
