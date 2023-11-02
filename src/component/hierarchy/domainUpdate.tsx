import * as React from "react";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { red, green } from "@mui/material/colors";
import RedSwitch from "../global/switch";
import axios, { AxiosError, AxiosResponse } from "axios";
import { domainUpdate } from "../../api";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { techDomainCount } from "./../../api";
import { showSnackBar } from "./../utils/utils";
import { setErrorStatus } from "./../utils/setErrorMessage";
import { Error } from "./../../redux/types/data/error";

export default function DomainUpdate(props) {
  const [domain, setDomain] = React.useState<string>(props?.data?.description);
  const [errmsg, setErrmsg] = React.useState<any>({});

  const [checked, setChecked] = React.useState(props?.data?.isActive);

  const [count, setCount] = React.useState<any>();

  const selectDashboard = (state) => state?.dashboard;
  const { dashboard: dashBoardData } = useSelector(selectDashboard);

  const hasDomain = dashBoardData
    .map((item) => item.domainDescription)
    .includes(props?.data?.description);
  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };
  const handleDomain = (e) => {
    setDomain(e.target.value);
  };

  useEffect(() => {
    axios
      .get(techDomainCount(props.data.id), {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((respond) => setCount(respond.data))
      .catch((error) => {
        console.error(error, "responsedatawa");
      });
  }, []);

  const handleDelete = async () => {
    const id = props?.data?.id;
    const response = await axios
      .delete(domainUpdate(id), {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response: AxiosResponse<any>) => {
        showSnackBar(props, "Domain Succefully Deleted!", 3000, "success");
        props.loadDomain();
        props.close();
      })
      .catch((error: AxiosError) => {
        const errorDetails: Error = setErrorStatus(error);
        showSnackBar(
          props,
          "Failed - Domain Delete!" + errorDetails?.message,
          3000,
          "error"
        );
      });
  };

  const handleSubmit = async () => {
    let formErrors = {};
    let formIsValid = true;
    if (domain === "" || domain === undefined) {
      formIsValid = false;
      formErrors["domain_err"] = "Domain Name is required.";
    }

    if (domain !== "" && domain !== undefined) {
      const id = props?.data?.id;
      const description = domain;
      const data = { id, description, isActive: checked };
      const response = await axios
        .put(domainUpdate(id), data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response: AxiosResponse<any>) => {
          showSnackBar(props, "Domain Succefully updated!", 3000, "success");
          props.loadDomain();
          props.close();
        })
        .catch((error: AxiosError) => {
          const errorDetails: Error = setErrorStatus(error);
          showSnackBar(
            props,
            "Failed - Domain Update! " + errorDetails?.message,
            3000,
            "error"
          );
        });
    }
    setErrmsg(formErrors);
    return formIsValid;
  };

  const handleClose = () => {
    props.close();
  };

  return (
    <form>
      <Grid container padding={"10px"}>
        <Typography variant="h4">Update Domain</Typography>
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
            defaultValue={props?.data?.description}
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
        <Grid item xs={4}>
          {count === 0 && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Disabled</Typography>
              <RedSwitch checked={checked} switchHandler={switchHandler} />
              <Typography>Enable</Typography>
            </Stack>
          )}
        </Grid>
        <Grid item xs={8} textAlign="end">
          {count === 0 && (
            <Button
              variant="contained"
              onClick={handleDelete}
              sx={{ backgroundColor: red[700] }}
            >
              Delete
            </Button>
          )}{" "}
          &nbsp;&nbsp;&nbsp;
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
