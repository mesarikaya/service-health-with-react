import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { domainApi } from "../../api";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store/store";
import { getDomain } from "../../redux/store/domain/Domain.actions";
import { showSnackBar } from "./../utils/utils";
import { setErrorStatus } from './../utils/setErrorMessage';
import { Error } from './../../redux/types/data/error';

export default function CreateDomain(props) {
    const [domain, setDomain] = React.useState<string>("");
    const dispatch = useDispatch<AppDispatch>();
    const [errmsg, setErrmsg] = React.useState<any>({});

    const handleDomain = (e) => {
        setDomain(e.target.value);
    };

    const handleClose = () => {
        props.close();
    };

    const handleSubmit = async () => {
        let formErrors = {};
        let formIsValid = true;
        if (domain === "" || domain === undefined) {
            formIsValid = false;
            formErrors["domain_err"] = "Domain Name is required.";
        }

        if (domain !== "" && domain !== undefined) {
            const description = domain;
            const data = { description, isActive: true };
            const response = await axios.post(domainApi(), data, {
                headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
            })
                .then((response: AxiosResponse<any>) => {
                    showSnackBar(props, "Domain Succefully created!", 3000, "success");
                    props.loadDomain();
                    props.close();
                })
                .catch((error: AxiosError) => {
                    const errorDetails: Error = setErrorStatus(error);
                    showSnackBar(
                        props,
                        "Failed - Domain Create! " + errorDetails?.message,
                        3000,
                        "error"
                    );
                });
        }
        setErrmsg(formErrors);
        return formIsValid;
    };

    return (
        <form>
            <Grid container padding={"10px"}>
                <Typography variant="h4">Create Domain</Typography>
                <Grid item xs={12} mt={"15px"} mb={"35px"}>
                    <Typography
                        style={{ lineHeight: "8px" }}
                        mb={"10px"}
                        variant="caption"
                        display="block"
                        gutterBottom
                    >
                        Domain
                    </Typography>
                    <TextField
                        sx={{ width: "100%" }}
                        id="outlined-basic"
                        onChange={handleDomain}
                        defaultValue={domain}
                        variant="outlined"
                    />
                    {errmsg?.domain_err && (
                        <Typography
                            style={{ lineHeight: "8px", padding: "5px 0px", color: "red" }}
                            pl={"10px"}
                            variant="caption"
                            display="block"
                            gutterBottom
                        >
                            {errmsg?.domain_err}
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={4}></Grid>
                <Grid item xs={8} textAlign="end">
                    <Button onClick={handleClose} variant="outlined">
                        Cancel
                    </Button>{" "}
                    &nbsp;&nbsp;&nbsp;
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}
