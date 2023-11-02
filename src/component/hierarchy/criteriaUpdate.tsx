import React, { useEffect } from "react";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { red, green } from "@mui/material/colors";
import RedSwitch from "../global/switch";
import { useSelector } from "react-redux";
import Dropdown from "../global/dropdown";
import axios, { AxiosError, AxiosResponse } from "axios";
import { criteriaUpdate, techCriteriaCount } from "../../api";
import { showSnackBar } from "./../utils/utils";
import { setErrorStatus } from "../utils/setErrorMessage";
import { Error } from "../../redux/types/data/error";

export default function CriteriaUpdate(props) {
  const [domain, setDomain] = React.useState<any>([]);
  const [techArea, setTechArea] = React.useState<any>([]);
  const [criteria, setCriteria] = React.useState<string>(
    props?.data?.description
  );
  const [value, setValue] = React.useState<string>(
    props?.data?.category?.techArea?.description
  );
  const [categoryValue, setCategoryValue] = React.useState<string>(
    props?.data?.category?.description
  );
  const [domainValue, setDomainValue] = React.useState<string>(
    props?.data?.category?.techArea?.domain?.description
  );
  const [techDescription, setTechDescription] = React.useState<string>(
    props?.data?.tech_standard_description
  );
  const [errmsg, setErrmsg] = React.useState<any>({});

  const [count, setCount] = React.useState<any>();

  const [checked, setChecked] = React.useState(props?.data?.isActive);

  const selectCategory = (state) => state?.category;
  const { category: categoryData } = useSelector(selectCategory);

  useEffect(() => {
    axios
      .get(techCriteriaCount(props.data.id), {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((respond) => setCount(respond.data))
      .catch((error) => {
        console.log(error, "responsedata");
      });
  }, []);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  const handleCriteria = (e) => {
    setCriteria(e.target.value);
  };

  const handleTechDescription = (e) => {
    setTechDescription(e.target.value);
  };

  const handleClose = () => {
    props.close();
  };

  const dataFilter = async () => {
    const domainName = await categoryData.filter((item) => {
      return categoryValue.includes(item.description);
    });
    setDomain(
      domainName.map((x) => {
        return x.techArea.domain.description;
      })
    );
    domainName.length === 1 && setDomainValue(domainName[0]?.techArea?.domain?.description)
    domainName.length === 1 && setValue(domainName[0]?.techArea?.description)
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

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleDomain = (e) => {
    setDomainValue(e.target.value);
  };
  const handleCategory = (e) => {
    setCategoryValue(e.target.value);
  };
  const categoryName =
    categoryData?.length > 0 &&
    categoryData.map((x) => {
      return x.description;
    });

  const handleDelete = async () => {
    const id = props?.data?.id;
    const response = await axios
      .delete(criteriaUpdate(id), {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response: AxiosResponse<any>) => {
        showSnackBar(props, "Criteria Succefully Deleted!", 3000, "success");
        props.loadCriteria();
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
    if (domainValue === "" || domainValue === undefined) {
      formIsValid = false;
      formErrors["domain_err"] = "Domain is required.";
    }

    if (value === "" || value === undefined) {
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
      value !== "" &&
      value !== undefined &&
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
        isActive: checked,
        categoryId: catid[0].id,
      };

      const response = await axios
        .put(criteriaUpdate(id), data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response: AxiosResponse<any>) => {
          showSnackBar(props, "Criteria Succefully updated!", 3000, "success");
          props.loadCriteria();
          props.close();
        })
        .catch((error: AxiosError) => {
          const errorDetails: Error = setErrorStatus(error);
          showSnackBar(
            props,
            "Failed - Criteria Update! " + errorDetails.message,
            3000,
            "error"
          );
        });
    }
    setErrmsg(formErrors);
    return formIsValid;
  };

  if (
    categoryData?.length < 0 &&
    domain === undefined &&
    techArea === undefined
  ) {
    return <div>loading...</div>;
  }

  return (
    <form>
      <Grid container padding={"10px"}>
        <Typography variant="h4">Update Criteria</Typography>
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
            id="outlined-basic"
            onChange={handleCriteria}
            defaultValue={props.data.description}
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
            value={value}
            handleChange={handleChange}
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
            defaultValue={props?.data?.tech_standard_description}
            variant="outlined"
          />
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
          <Button
            onClick={handleDelete}
            variant="contained"
            sx={{ backgroundColor: red[700] }}
          >
            Delete
          </Button>{" "}
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
