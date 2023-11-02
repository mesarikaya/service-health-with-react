
import { Box, Container, Paper, ThemeProvider } from "@mui/material";
import Typography from '@mui/material/Typography';
import { mainTheme } from './../../utils/theme';

export default function Footer() {
    return (
        <ThemeProvider theme={mainTheme()}>
            <Paper sx={{
                marginTop: 'calc(100% - 60px)',
                width: '100%',
                position: 'fixed',
                bgcolor: 'background.default',
                bottom: 0,
                color: 'text.primary',
                zIndex: 999999,
            }} component="footer" square variant="outlined">
                <Container maxWidth="lg" className="footer">
                    <Box
                        sx={{
                            flexGrow: 1,
                            justifyContent: "center",
                            display: "flex",
                        }}
                    >
                        <Typography variant="caption" >
                            Copyright ©2022. [] Limited
                        </Typography>
                    </Box>
                </Container>
            </Paper>
        </ThemeProvider>

    );
}