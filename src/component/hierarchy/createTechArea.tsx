import React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import Dropdown from "../global/dropdown";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store/store";
import axios, { AxiosError, AxiosResponse } from "axios";
import { techAreaApi } from "../../api";
import { getTechArea } from "../../redux/store/techArea/TechArea.actions";
import { showSnackBar } from "./../utils/utils";
import { setErrorStatus } from "../utils/setErrorMessage";
import { Error } from './../../redux/types/data/error';

export default function CreateTechArea(props) {
  const [techArea, setTechArea] = React.useState<any>();
  const [value, setValue] = React.useState<string>(
    props?.data?.domain?.description
  );

  const selectDomain = (state) => state?.domain;
  const { domain: domainData } = useSelector(selectDomain);
  const [errmsg, setErrmsg] = React.useState<any>({});

  const dispatch = useDispatch<AppDispatch>();

  const handleTecharea = (e) => {
    setTechArea(e.target.value);
  };

  const handleClose = () => {
    props.close();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  if (props?.length < 1) {
    return <div>loading...</div>;
  }

  const name =
    domainData?.length > 0 &&
    domainData?.map((x) => {
      return x?.description;
    });

  const handleSubmit = async () => {
    let formErrors = {};
    let formIsValid = true;
    if (value === "" || value === undefined) {
      formIsValid = false;
      formErrors["domain_err"] = "Domain is required.";
    }
    if (techArea === "" || techArea === undefined) {
      formIsValid = false;
      formErrors["techArea_err"] = "TechArea is required.";
    }

    if (
      value !== "" &&
      value !== undefined &&
      techArea !== "" &&
      techArea !== undefined
    ) {
      const id = props?.data?.id;
      const domainid = domainData?.filter((val) => {
        return val?.description === value;
      });
      const data = {
        description: techArea,
        domain: {
          id: domainid[0].id,
          description: value,
        },
        domainId: domainid[0].id,
        isActive: true,
      };
      const response = await axios.post(techAreaApi(), data, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
        .then((response: AxiosResponse<any>) => {
          showSnackBar(props, "Techarea Succefully created!", 3000, "success");
          props.loadTechArea();
          props.close();
        })
        .catch((error: AxiosError) => {
          const errorDetails: Error = setErrorStatus(error);
          showSnackBar(
            props,
            "Failed - TechArea Create!" + errorDetails?.message,
            3000,
            "error"
          );
        })
    }
    setErrmsg(formErrors);
    return formIsValid;
  };

  return (
    <form>
      <Grid container padding={"10px"}>
        <Typography variant="h4">Create Technology Area</Typography>
        <Grid item xs={12} mt={"25px"} mb={"5px"} pr={"10px"}>
          <Typography
            style={{ lineHeight: "8px" }}
            mb={"10px"}
            variant="caption"
            display="block"
            gutterBottom
          >
            Technology Area
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            onChange={handleTecharea}
            id="outlined-basic"
            variant="outlined"
          />
          {errmsg?.techArea_err && (
            <Typography
              style={{ lineHeight: "8px", padding: "5px 0px", color: "red" }}
              pl={"10px"}
              variant="caption"
              display="block"
              gutterBottom
            >
              {errmsg?.techArea_err}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} mt={"15px"} mb={"35px"} pr={"10px"}>
          <Typography
            style={{ lineHeight: "8px" }}
            mb={"10px"}
            pl={"10px"}
            variant="caption"
            display="block"
            gutterBottom
          >
            Domain
          </Typography>
          <Dropdown
            width={"100%"}
            value={value}
            handleChange={handleChange}
            name={name}
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
        <Grid item xs={4} pl={"10px"}></Grid>
        <Grid item xs={8} textAlign="end" pr={"10px"}>
          {/* <Button variant="contained" sx={{ backgroundColor: red[700] }}>Delete</Button> &nbsp;&nbsp;&nbsp; */}
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
