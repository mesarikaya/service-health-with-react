import React from "react";
import { useMsal } from "@azure/msal-react";
import { Button } from '@mui/material';

/**
 * Renders a button which, when selected, will open a popup for logout
 */
export const SignOutButton = () => {
    const { instance } = useMsal();

    const handleLogout = (logoutType:String) => {
        if (logoutType === "popup") {
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/" // redirects the top level app after logout
            });
            sessionStorage.clear()
        }
    }

    return (
        <Button className="ml-auto" onClick={() => handleLogout("popup")}>Sign out</Button>
    );
}