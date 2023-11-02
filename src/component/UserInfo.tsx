import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from '@mui/material';


const url="http://localhost:8000/";
const axiosInstance = axios.create({
    withCredentials: true
});

/**
 * Renders information about the user obtained from Microsoft Graph
 */
export const UserInfo = (props:any) => {

    const [apiResponse, setApiResponse] = useState<String|null>(null);

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchData = async () => {
        const bearer = `Bearer ${props.userDetails.accessToken}`;
        await axiosInstance.get(`${url}test-authentication/`, {
            headers: {
                Accept: 'application/json',
                Authorization: bearer,
                'Content-Type': 'application/json'
            }
        }).then(async (res: { data: { message: any; }; }) => {
            const response= res.data.message
            setApiResponse(response);
        });
    }

    useEffect(() => {
        fetchData()
    }, [apiResponse, fetchData])

    
    if (props.userDetails===null){
        
        return (
            <div id="profile-div">
                
            </div>
        );
    }else{
        return (
            <div id="profile-div">
                <p><strong>AccessToken: </strong> {props.userDetails.accessToken}</p>
                <p><strong>Roles: </strong> {props.userDetails.roles.join(",")}</p>
                <h4>Make backend test:</h4>
                <Button onClick={fetchData}>Make Backend Request</Button>
                <h4>{apiResponse}</h4>
            </div>
        );
    }
};