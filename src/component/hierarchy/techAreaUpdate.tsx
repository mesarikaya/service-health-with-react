import React from "react";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { red, green } from "@mui/material/colors";
import RedSwitch from "../global/switch";
import { useSelector } from "react-redux";
import Dropdown from "../global/dropdown";
import axios, { AxiosError, AxiosResponse } from "axios";
import { techAreaCount, techAreaUpdate } from "../../api";
import { useEffect } from "react";
import { showSnackBar } from "./../utils/utils";
import { setErrorStatus } from "../utils/setErrorMessage";
import { Error } from "./../../redux/types/data/error";

export default function TechnologyUpdate(props) {
  const [techArea, setTechArea] = React.useState<string>(
    props?.data?.description
  );
  const [value, setValue] = React.useState<string>(
    props?.data?.domain?.description
  );

  const [checked, setChecked] = React.useState(props?.data?.isActive);
  const selectDomain = (state) => state?.domain;
  const { domain: domainData } = useSelector(selectDomain);

  const [count, setCount] = React.useState<any>();

  const [errmsg, setErrmsg] = React.useState<any>({});

  useEffect(() => {
    axios
      .get(techAreaCount(props.data.id), {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((respond) => setCount(respond.data))
      .catch((error) => {
        console.error(error, "responsedatawa");
      });
  }, []);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  const handleTecharea = (e) => {
    setTechArea(e.target.value);
  };

  const handleClose = () => {
    props.close();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleDelete = async () => {
    const id = props?.data?.id;
    const response = await axios
      .delete(techAreaUpdate(id), {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response: AxiosResponse<any>) => {
        showSnackBar(props, "Techarea Succefully deleted!", 3000, "success");
        props.loadTechArea();
        props.close();
      })
      .catch((error: AxiosError) => {
        const errorDetails: Error = setErrorStatus(error);
        showSnackBar(
          props,
          "Failed - Criteria Delete!" + errorDetails?.message,
          3000,
          "error"
        );
      });
  };

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
      const domainid = domainData.filter((val) => {
        return val.description == value;
      });
      const data = {
        description: techArea,
        domain: {
          id: domainid[0].id,
          description: value,
        },
        id: id,
        domainId: domainid[0].id,
        isActive: checked,
      };
      const response = await axios
        .put(techAreaUpdate(id), data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response: AxiosResponse<any>) => {
          showSnackBar(props, "Techarea Succefully updated!", 3000, "success");
          props.loadTechArea();
          props.close();
        })
        .catch((error: AxiosError) => {
          const errorDetails: Error = setErrorStatus(error);
          showSnackBar(
            props,
            "Failed - Techarea Update!" + errorDetails?.message,
            3000,
            "error"
          );
        });
    }
    setErrmsg(formErrors);
    return formIsValid;
  };

  if (props?.length < 1) {
    return <div>loading...</div>;
  }

  const name =
    domainData?.length > 0 &&
    domainData.map((x) => {
      return x.description;
    });

  return (
    <form>
      <Grid container padding={"10px"}>
        <Typography variant="h4">Update Technology Area</Typography>
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
            id="outlined-basic"
            onChange={handleTecharea}
            defaultValue={props?.data?.description}
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
        <Grid item xs={4} pl={"10px"}>
          {count === 0 && (
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Disabled</Typography>
              <RedSwitch checked={checked} switchHandler={switchHandler} />
              <Typography>Enable</Typography>
            </Stack>
          )}
        </Grid>
        <Grid item xs={8} textAlign="end" pr={"10px"}>
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
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
