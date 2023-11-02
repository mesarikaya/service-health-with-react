import { createTheme } from "@mui/material";
import { Constants } from "../constants/constants";

// export const mainTheme = (mode, type?) => createTheme({
//     palette: {
//         mode,
//     },
// })

// export const mainTheme = React.useMemo((mode, type?) => createTheme({
//     palette: {
//         mode,
//     },
// }), 
//     [mode]
// );
     
export const mainTheme = () => createTheme({
    typography: {
        fontFamily: 'Helvetica Neue',
      },
    components: {
        MuiTypography: {
            styleOverrides: {
            root: {
                // Some CSS
                // fontSize: '16px',
                "fontFamily": `"Helvetica Neue", "Helvetica", "Arial", sans-serif`,
              },
            },
            variants: [
                {
                    props: { variant: 'subtitle1' },
                    style: {
                        fontSize: '20px'
                    }
                },
                {
                    props: { variant: 'subtitle2' },
                    style: {
                        fontSize: '20px'
                    }
                }
            ],
        }
    },
    palette: {
        mode:"dark",
        background: {
            default:  Constants.DEFAULT_BLACK,
            paper: Constants.DEFAULT_BLACK
        },
        action: {
            active: "#fff",
            hoverOpacity: 0.7,
            focus: "#fff",
            focusOpacity: 1,
            selected: "#fff",
            selectedOpacity: 1,
          },
          
        // text: {
        //     primary: Constants.DEFAULT_WHITE,
        //   },
        // primary: {
        //     main: alpha(Constants.DEFAULT_BLACK, 1)
        // },
        // success: {
        //     main: alpha(Constants.CARGILL_GREEN_COLOR, 0.7)
        // },
        // warning: {
        //     main: alpha(Constants.CARGILL_YELLOW_COLOR, 0.7),
        // },
        // error: {
        //     main: alpha(Constants.CARGILL_RED_COLOR, 0.7),
        // }
    }
});