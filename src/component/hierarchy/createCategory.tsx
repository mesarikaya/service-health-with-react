import React, { useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store/store";
import Dropdown from "../global/dropdown";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getCategory } from "../../redux/store/category/Category.actions";
import { categoryApi } from "../../api";
import { showSnackBar } from "./../utils/utils";
import { setErrorStatus } from "../utils/setErrorMessage";
import { Error } from './../../redux/types/data/error';

export default function CreateCategory(props) {
  const [domain, setDomain] = React.useState<any>([]);
  const [category, setCategory] = React.useState<any>();
  const [value, setValue] = React.useState<string>("");
  const [domainValue, setDomainValue] = React.useState<string>("");

  const selectTechArea = (state) => state?.techArea;
  const { techArea: technologyData } = useSelector(selectTechArea);

  const [errmsg, setErrmsg] = React.useState<any>({});

  const dispatch = useDispatch<AppDispatch>();

  const handleCategory = (e) => {
    setCategory(e.target.value);
  };

  const handleClose = () => {
    props.close();
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleDomain = (e) => {
    setDomainValue(e.target.value);
  };
  const dataFilter = async () => {
    const domainName = await technologyData?.filter((item) => {
      return value?.includes(item?.description);
    });

    await setDomain(
      domainName.map((x) => {
        return x.domain.description;
      })
    );
    domainName.length === 1 && setDomainValue(domainName[0]?.domain?.description)
  };
  useEffect(() => {
    if (technologyData?.length > 0) {
      dataFilter();
    }
  }, [value]);

  const handleSubmit = async () => {
    let formErrors = {};
    let formIsValid = true;
    if (domainValue === "" || domainValue === undefined) {
      formIsValid = false;
      formErrors["domain_err"] = "Domain is required.";
    }

    if (value === "" || value === undefined) {
      formIsValid = false;
      formErrors["techArea_err"] = "TechArea is required.";
    }

    if (category === "" || category === undefined) {
      formIsValid = false;
      formErrors["category_err"] = "Category is required.";
    }

    if (
      domainValue !== "" &&
      domainValue !== undefined &&
      value !== "" &&
      value !== undefined &&
      category !== "" &&
      category !== undefined
    ) {
      const techid = technologyData.filter((val) => {
        return val.description == value;
      });
      const data = {
        description: category,
        techArea: {
          id: techid[0].id,
          description: techid[0].description,
          domain: {
            id: techid[0].domain.id,
            description: techid[0].domain.description,
          },
        },
        isActive: true,
      };

      const response = await axios.post(categoryApi(), data, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
        .then((response: AxiosResponse<any>) => {
          showSnackBar(props, "Category Succefully created!", 3000, "success");
          props.loadCategory();
          props.close();
        })
        .catch((error: AxiosError) => {
          const errorDetails: Error = setErrorStatus(error);
          console.debug("Show snack bar for failure");
          showSnackBar(
            props,
            "Failed - Category Create! " + errorDetails.message,
            3000,
            "error"
          );
        });
    }
    setErrmsg(formErrors);
    return formIsValid;
  };

  const technologyName =
    technologyData?.length > 0 &&
    technologyData?.map((x) => {
      return x?.description;
    });

  if (technologyData?.length < 0 && domain == undefined) {
    return <div>loading...</div>;
  }

  return (
    <form>
      <Grid container padding={"10px"}>
        <Typography variant="h4">Create Category</Typography>
        <Grid item xs={12} mt={"25px"} mb={"5px"} pr={"10px"}>
          <Typography
            style={{ lineHeight: "8px" }}
            mb={"10px"}
            variant="caption"
            display="block"
            gutterBottom
          >
            Category
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            onChange={handleCategory}
            id="outlined-basic"
            variant="outlined"
          />
          {errmsg?.category_err && (
            <Typography
              style={{ lineHeight: "8px", padding: "5px 0px", color: "red" }}
              pl={"10px"}
              variant="caption"
              display="block"
              gutterBottom
            >
              {errmsg?.category_err}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} mt={"15px"} mb={"5px"} pr={"10px"}>
          <Typography
            style={{ lineHeight: "8px" }}
            mb={"10px"}
            variant="caption"
            display="block"
            gutterBottom
          >
            Technology Area
          </Typography>
          <Dropdown
            width={"100%"}
            value={value}
            handleChange={handleChange}
            name={technologyName}
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
            value={domainValue}
            handleChange={handleDomain}
            name={domain}
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
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
