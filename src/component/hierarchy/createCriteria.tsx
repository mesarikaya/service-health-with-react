import React, { useEffect } from "react";
import { Button, Grid, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store/store";

import Dropdown from "../global/dropdown";
import { criteriaApi } from "../../api";
import axios, { AxiosError, AxiosResponse } from "axios";
import { getCriteria } from "../../redux/store/criteria/Criteria.actions";
import { showSnackBar } from "./../utils/utils";
import { setErrorStatus } from "../utils/setErrorMessage";
import { Error } from './../../redux/types/data/error';

export default function CreateCriteria(props) {
  const [domain, setDomain] = React.useState<any>([]);
  const [techArea, setTechArea] = React.useState<any>([]);
  const [criteria, setCriteria] = React.useState<any>();
  const [techAreaValue, setTechAreaValue] = React.useState<string>("");
  const [categoryValue, setCategoryValue] = React.useState<any>();
  const [domainValue, setDomainValue] = React.useState<string>("");
  const selectCategory = (state) => state?.category;
  const { category: categoryData } = useSelector(selectCategory);
  const [techDescription, setTechDescription] = React.useState<string>("");
  const [errmsg, setErrmsg] = React.useState<any>({});

  const dispatch = useDispatch<AppDispatch>();

  const handleCriteria = (e) => {
    setCriteria(e.target.value);
  };

  const handleClose = () => {
    props.close();
  };

  const dataFilter = async () => {
    const domainName = await categoryData.filter((item) => {
      return categoryValue?.includes(item?.description);
    });

    setDomain(
      domainName.map((x) => {
        return x.techArea.domain.description;
      })
    );
    domainName.length === 1 && setDomainValue(domainName[0]?.techArea?.domain?.description)
    domainName.length === 1 && setTechAreaValue(domainName[0]?.techArea?.description)
    setTechArea(
      domainName.map((x) => {
        return x.techArea.description;
      })
    );
  };

  useEffect(() => {
    if (categoryData?.length > 0) {
      dataFilter();
    }
  }, [categoryValue]);

  const handleTechArea = (e) => {
    setTechAreaValue(e.target.value);
  };

  const handleDomain = (e) => {
    setDomainValue(e.target.value);
  };

  const handleCategory = (e) => {
    setCategoryValue(e.target.value);
  };

  const handleTechDescription = (e) => {
    setTechDescription(e.target.value);
  };

  const categoryName =
    categoryData?.length > 0 &&
    categoryData.map((x) => {
      return x.description;
    });

  const handleSubmit = async () => {
    let formErrors = {};
    let formIsValid = true;
    if (domainValue === "" || domainValue === undefined) {
      formIsValid = false;
      formErrors["domain_err"] = "Domain is required.";
    }

    if (techAreaValue === "" || techAreaValue === undefined) {
      formIsValid = false;
      formErrors["techArea_err"] = "TechArea is required.";
    }

    if (categoryValue === "" || categoryValue === undefined) {
      formIsValid = false;
      formErrors["category_err"] = "Category is required.";
    }

    if (criteria === "" || criteria === undefined) {
      formIsValid = false;
      formErrors["criteria_err"] = "Criteria is required.";
    }

    if (
      domainValue !== "" &&
      criteria !== undefined &&
      criteria !== "" &&
      domainValue !== undefined &&
      techAreaValue !== "" &&
      techAreaValue !== undefined &&
      categoryValue !== "" &&
      categoryValue !== undefined
    ) {
      const id = props?.data?.id;
      const catid = categoryData.filter((val) => {
        return val.description == categoryValue;
      });

      const data = {
        id: id,
        description: criteria,
        category: {
          id: catid[0].id,
          description: catid[0].description,
          techArea: {
            id: catid[0].techArea.id,
            description: catid[0].techArea.description,
            domain: {
              id: catid[0].techArea.domain.id,
              description: catid[0].techArea.domain.description,
            },
          },
          techAreaId: catid[0].techArea.id,
        },
        tech_standard_description: techDescription,
        isActive: true,
        categoryId: catid[0].id,
      };

      const response = await axios.post(criteriaApi(), data, {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
        .then((response: AxiosResponse<any>) => {
          showSnackBar(props, "Criteria Succefully created!", 3000, "success");
          props.loadCriteria();
          props.close();
        })
        .catch((error: AxiosError) => {
          const errorDetails: Error = setErrorStatus(error);
          console.debug("Show snack bar for failure");
          showSnackBar(
            props,
            "Failed - Criteria Create! " + errorDetails.message,
            3000,
            "error"
          );
        });
    }
    setErrmsg(formErrors);
    return formIsValid;
  };

  if (
    categoryData?.length > 0 &&
    domain === undefined &&
    techArea === undefined
  ) {
    return <div>loading...</div>;
  }

  return (
    <form>
      <Grid container padding={"10px"}>
        <Typography variant="h4">Create Criteria</Typography>
        <Grid item xs={12} mt={"25px"} mb={"5px"} pr={"10px"}>
          <Typography
            style={{ lineHeight: "8px" }}
            mb={"10px"}
            variant="caption"
            display="block"
            gutterBottom
          >
            Criteria
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            onChange={handleCriteria}
            id="outlined-basic"
            variant="outlined"
          />
          {errmsg?.criteria_err && (
            <Typography
              style={{ lineHeight: "8px", padding: "5px 0px", color: "red" }}
              pl={"10px"}
              variant="caption"
              display="block"
              gutterBottom
            >
              {errmsg?.criteria_err}
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
            Category
          </Typography>
          <Dropdown
            width={"100%"}
            value={categoryValue}
            handleChange={handleCategory}
            name={categoryName}
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
            value={techAreaValue}
            handleChange={handleTechArea}
            name={techArea}
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
        <Grid item xs={12} mt={"15px"} mb={"5px"} pr={"10px"}>
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
        <Grid item xs={12} mt={"15px"} mb={"35px"} pr={"10px"}>
          <Typography
            style={{ lineHeight: "8px" }}
            mb={"10px"}
            variant="caption"
            display="block"
            gutterBottom
          >
            Tech Standard Description
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            id="outlined-basic"
            onChange={handleTechDescription}
            variant="outlined"
          />
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
