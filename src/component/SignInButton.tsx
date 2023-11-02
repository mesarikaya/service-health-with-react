import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../config/authConfig";
import { Button } from '@mui/material';


/**
 * Renders a button which, when selected, will open a popup for login
 */
export const SignInButton = () => {
    const { instance } = useMsal();

    const handleLogin = (loginType: string) => {
        if (loginType === "popup") {
            instance.loginPopup(loginRequest).catch(e => {
                
            });
        }
    }
    return (
        <Button className="ml-auto" onClick={() => handleLogin("popup")}>Sign in </Button>
    );
}