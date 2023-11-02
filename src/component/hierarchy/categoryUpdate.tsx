import React, { useEffect } from "react";
import { Button, Grid, Stack, TextField } from "@mui/material";
import { Typography } from "@mui/material";
import { red, green } from "@mui/material/colors";
import RedSwitch from "../global/switch";
import { useSelector } from "react-redux";
import Dropdown from "../global/dropdown";
import { categoryUpdate } from "../../api";
import axios, { AxiosError, AxiosResponse } from "axios";
import { techCategoryCount } from "./../../api";
import { showSnackBar } from "./../utils/utils";
import { setErrorStatus } from "../utils/setErrorMessage";
import { Error } from "./../../redux/types/data/error";

export default function CategoryUpdate(props) {
  const [domain, setDomain] = React.useState<any>([]);
  const [category, setCategory] = React.useState<string>(
    props?.data?.description
  );
  const [value, setValue] = React.useState<string>(
    props?.data?.techArea?.description
  );
  const [domainValue, setDomainValue] = React.useState<string>(
    props?.data?.techArea?.domain?.description
  );

  const [errmsg, setErrmsg] = React.useState<any>({});

  const [checked, setChecked] = React.useState(props?.data?.isActive);
  const selectDomain = (state) => state?.domain;
  const selectTechArea = (state) => state?.techArea;
  const { techArea: technologyData } = useSelector(selectTechArea);

  const [count, setCount] = React.useState<any>();

  useEffect(() => {
    axios
      .get(techCategoryCount(props.data.id), {
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
  const handleScore = (e) => {
    setDomain(e.target.value);
  };
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
    const domainName = await technologyData.filter((item) => {
      return value.includes(item.description);
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

  const technologyName =
    technologyData?.length > 0 &&
    technologyData.map((x) => {
      return x.description;
    });

  const handleDelete = async () => {
    const id = props?.data?.id;
    const response = await axios
      .delete(categoryUpdate(id), {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((response: AxiosResponse<any>) => {
        showSnackBar(props, "Category Succefully deleted!", 3000, "success");
        props.loadCategory();
        props.close();
      })
      .catch((error: AxiosError) => {
        const errorDetails: Error = setErrorStatus(error);
        showSnackBar(
          props,
          "Failed - Category Delete!" + errorDetails?.message,
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
      const id = props?.data?.id;
      const techid = technologyData.filter((val) => {
        return val.description == value;
      });
      const data = {
        id: id,
        description: category,
        techArea: {
          id: techid[0].id,
          description: techid[0].description,
          domain: {
            id: techid[0].domain.id,
            description: techid[0].domain.description,
          },
        },
        isActive: checked,
      };

      const response = await axios
        .put(categoryUpdate(id), data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response: AxiosResponse<any>) => {
          showSnackBar(props, "Category Succefully updated!", 3000, "success");
          props.loadCategory();
          props.close();
        })
        .catch((error: AxiosError) => {
          const errorDetails: Error = setErrorStatus(error);
          showSnackBar(
            props,
            "Failed - Category Update! " + errorDetails.message,
            3000,
            "error"
          );
        });
    }
    setErrmsg(formErrors);
    return formIsValid;
  };

  if (technologyData?.length < 0 && domain === undefined) {
    return <div>loading...</div>;
  }

  return (
    <form>
      <Grid container padding={"10px"}>
        <Typography variant="h4">Update Category</Typography>
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
            id="outlined-basic"
            onChange={handleCategory}
            defaultValue={props.data.description}
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
              onClick={handleDelete}
              variant="contained"
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
