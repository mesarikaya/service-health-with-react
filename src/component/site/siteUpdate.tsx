import React from "react";
import {
  Button,
  Grid,
  TextField,
  CircularProgress,
  TextareaAutosize,
  TableBody,
  TableRow,
  TableCell,
  Table,
  TableContainer,
  Stack,
} from "@mui/material";
import { Typography } from "@mui/material";
import { red, green } from "@mui/material/colors";
import RedSwitch from "../global/switch";
import { useSelector, useDispatch } from "react-redux";
import Dropdown from "../global/dropdown";
import axios, { AxiosError, AxiosResponse } from "axios";
import { sitesUpdate, techAreaUpdate } from "../../api";
import type { AppDispatch } from "../../redux/store/store";
import { useEffect } from "react";
import { getLocations } from "../../redux/store/locationApiSitesData/filteredSiteLocations.action";
import Virtualize from "./virtual";
import { getSites } from "./../../redux/store/sites/Sites.actions";
import { loadingError, loadingErrorModal, showSnackBar } from "./../utils/utils";
import { setErrorStatus } from "../utils/setErrorMessage";
import { Error } from './../../redux/types/data/error';

export default function SiteUpdate(props) {
  // const [techarea, setTecharea] = React.useState<any>(props?.data?.description);
  const [siteValue, setSiteValue] = React.useState<any>(
    props.data?.mdmSiteName
  );
  const [mdmSite, setMdmSite] = React.useState<any>(props.data?.mdmSiteId);
  const [enterprise, setEnterprise] = React.useState<any>(
    props.data?.enterprise
  );
  const [business, setBusiness] = React.useState<any>(
    props.data?.businessGroup
  );
  const [reporting, setReporting] = React.useState<any>(
    props.data?.reportingUnit
  );
  const [nickname, setNickname] = React.useState<any>(props.data?.name);
  // const [error, setError] = React.useState<any>();
  const [filterdata, setFilterdata] = React.useState<any>([]);
  const [errmsg, setErrmsg] = React.useState<any>({});

  const [snack, setSnack] = React.useState(false);

  const [criticalitie, setCriticalitie] = React.useState<any>(
    props?.data.investmentCriticality.description
  );
  const [businessName, setBusinessName] = React.useState<any>([]);
  const [reportingName, setReportingName] = React.useState<any>([]);

  const [mdmName, setMdmName] = React.useState<any>([]);
  const [enterpriseName, setEnterpriseName] = React.useState<any>([]);

  const [checked, setChecked] = React.useState(props.data.isActive);

  const switchHandler = (event) => {
    setChecked(event.target.checked);
  };

  const dispatch = useDispatch<AppDispatch>();
  const selectLocationApiSiteNames = (state) => state?.locationApiSiteNames;
  const { siteNames } = useSelector(selectLocationApiSiteNames);
  const selectFilteredSites = (state) => state?.filteredLocationApiSites;
  const { locations, status, error } = useSelector(selectFilteredSites);
  const selectEvent = (state) => state?.investmentCriticality;
  const { investmentCriticality } = useSelector(selectEvent);
  const [notes, setNotes] = React.useState<string>("");

  const handleNotes = (event) => {
    setNotes(event.target.value);
  }

  const criticalValue =
    investmentCriticality?.length > 0
      ? investmentCriticality.map((x) => {
        return x?.description;
      })
      : [];

  const handleCriticalities = (event) => {
    setCriticalitie(event.target.value);
  };

  const loadSite = async () => {
    await dispatch(getSites());
  };

  useEffect(() => {
    setFilterdata([])
    setMdmName([]);
    setEnterpriseName([]);
    setBusinessName([])
    setReportingName([]);
    if (siteValue === undefined || siteValue === null || siteValue === "") {
      setMdmSite("")
      setEnterprise("")
      setBusiness("")
      setReporting("")
    }
  }, [siteValue]);

  const businessfilter = async () => {
    const mdmsiteid =
      locations?.length > 0 &&
      locations.map((x) => {
        return x?.mdm_site_id;
      });
    const umdmsiteid = Array.from(new Set(mdmsiteid));
    setMdmName(umdmsiteid);
    umdmsiteid?.length === 1 && setMdmSite(umdmsiteid[0])

    const enterp =
      locations?.length > 0 &&
      locations.map((x) => {
        return x.enterprise;
      });
    const umbenterp = Array.from(new Set(enterp));
    setEnterpriseName(umbenterp);
    umbenterp?.length === 1 && setEnterprise(umbenterp[0])
    const filterbusiness =
      locations?.length > 0 &&
      locations.filter((x) => {
        return (
          enterprise !== undefined &&
          enterprise?.length > 0 &&
          enterprise.includes(x.enterprise)
        );
      });

    const businessgroup =
      await filterbusiness?.length > 0
        ? filterbusiness.map((x) => {
          return x.business_group;
        })
        : [];
    setBusinessName(Array.from(new Set(businessgroup)));

    Array.from(new Set(businessgroup))?.length === 1 && setBusiness(businessgroup[0])

    const filterReport =
      filterbusiness?.length > 0 &&
      filterbusiness.filter((x) => {
        return business !== undefined && business.includes(x.business_group);
      });

    // filterReport.length === 0 && setBusiness("")

    const report =
      filterReport?.length > 0
        ? filterReport.map((x) => {
          return x.reporting_unit;
        })
        : [];
    setReportingName(Array.from(new Set(report)));
    report.length === 0 && setReporting("")
    report.length === 1 && setReporting(report[0])

    const filterData =
      filterReport?.length > 0 &&
      filterReport.filter((x) => {
        return reporting !== undefined && reporting.includes(x.reporting_unit);
      });
    setFilterdata(filterData);
  };
  useEffect(() => {
    if (locations?.length > 0 && siteValue !== undefined && siteValue !== null) {
      businessfilter();
    }
  }, [enterprise, locations, business, reporting]);

  const loadLocations = async () => {
    await dispatch(getLocations(siteValue));
  };

  useEffect(() => {
    if (siteValue !== undefined && siteValue !== "" && siteValue !== null) {
      loadLocations();
    }
  }, [dispatch, siteValue]);

  const handleSite = (value) => {
    setSiteValue(value);
  };

  const handleMdmsite = (e) => {
    setMdmSite(e.target.value);
  };

  const handleEnterprise = (e) => {
    setEnterprise(e.target.value);
  };

  const handleBusiness = (e) => {
    setBusiness(e.target.value);
  };

  const handleReporting = (e) => {
    setReporting(e.target.value);
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const handleClose = () => {
    props.close();
  };

  const handleDelete = async () => {
    const id = props?.data?.id;
    const response = await axios.delete(sitesUpdate(id), {
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
    });
    if (response.status === 204) {
      showSnackBar(props, "Site Succefully deleted!", 3000, "success");
    }

    props.loadSite();
  };


  useEffect(() => {
    if (locations?.length === 0) {
      setMdmSite("")
      setEnterprise("")
      setBusiness("")
      setReporting("")
    }
    // businessfilter();
  }, [locations])

  const handleSubmit = async () => {
    let formErrors = {};
    let formIsValid = true;
    if (siteValue === "" || siteValue === undefined || siteValue === null) {
      formIsValid = false;
      formErrors["sitename_err"] = "Site Name is required.";
    }
    if (mdmSite === "" || mdmSite === undefined) {
      formIsValid = false;
      formErrors["mdmsiteid_err"] = "MDM Site ID is required.";
    }
    if (enterprise === "" || enterprise === undefined) {
      formIsValid = false;
      formErrors["enterprise_err"] = "Enterprise is required.";
    }
    if (business === "" || business === undefined) {
      formIsValid = false;
      formErrors["business_err"] = "Business Group is required.";
    }
    if (reporting === "" || reporting === undefined) {
      formIsValid = false;
      formErrors["reporting_err"] = "Reporting Unit is required.";
    }
    if (criticalitie === "" || criticalitie === undefined) {
      formIsValid = false;
      formErrors["criticalitie_err"] = "Criticalitie is required.";
    }
    if (nickname === "" || nickname === undefined) {
      formIsValid = false;
      formErrors["nickname_err"] = "Nickname is required.";
    }
    if (filterdata[0]?.country === "" || filterdata[0]?.country === undefined) {
      formIsValid = false;
      formErrors["country_err"] = "Country is required.";
    }
    if (filterdata[0]?.region === "" || filterdata[0]?.region === undefined) {
      formIsValid = false;
      formErrors["region_err"] = "Region is required.";
    }
    if (
      siteValue !== "" &&
      siteValue !== null &&
      siteValue !== undefined &&
      mdmSite !== undefined &&
      mdmSite !== "" &&
      enterprise !== undefined &&
      enterprise !== "" &&
      business !== undefined &&
      business !== "" &&
      reporting !== undefined &&
      reporting !== "" &&
      criticalitie !== undefined &&
      criticalitie !== "" &&
      filterdata[0]?.region !== "" &&
      filterdata[0]?.region !== undefined &&
      filterdata[0]?.country !== "" &&
      filterdata[0]?.country !== undefined &&
      nickname !== "" &&
      nickname !== undefined
    ) {
      const id = props?.data?.id;
      const crti = investmentCriticality.filter((x) => {
        return criticalitie.includes(x.description);
      });
      const critid = crti.length > 0 && crti[0].id;
      const data = {
        id: id,
        name: nickname,
        mdmSiteId: mdmSite,
        mdmSiteName: siteValue,
        comment: notes,
        isActive: checked,
        region: filterdata[0]?.region,
        enterprise: enterprise,
        businessGroup: business,
        reportingUnit: reporting,
        address: filterdata[0]?.address_line_1,
        country: filterdata[0]?.country_desc,
        countryCode: filterdata[0]?.country,
        city: filterdata[0]?.city,
        state: filterdata[0]?.state,
        latitude: filterdata[0]?.latitude,
        longitude: filterdata[0]?.longitude,
        investmentCriticality: {
          id: critid,
          description: criticalitie,
        },
        investmentCriticalityId: critid,
      };

      const response = await axios
        .put(sitesUpdate(id), data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response: AxiosResponse<any>) => {
          showSnackBar(props, "Site Succefully updated!", 3000, "success");
          loadSite();
          props.close();
        })
        .catch((error: AxiosError) => {
          const errorDetails: Error = setErrorStatus(error);
          console.debug("Show snack bar for create");
          showSnackBar(
            props,
            "Failed - Site Update! " + errorDetails?.message,
            3000,
            "error"
          );
        });
    }
    setErrmsg(formErrors);
    return formIsValid;
  };

  if (props?.length < 1) {
    return <CircularProgress />;
  }

  return (
    <>
      <form>
        <Grid container padding={"10px"} mt={"-19px"}>
          <Grid item xs={12}>
            <Typography variant="h4" pl={"0px"}>
              Update Sites
            </Typography>
          </Grid>
          <TableContainer>
            <Table aria-label="simple table" className="form-style">
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography
                      style={{ lineHeight: "8px" }}
                      mb={"5px"}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Site Name
                    </Typography>
                    <Virtualize
                      value={siteValue}
                      handleChange={handleSite}
                      data={siteNames}
                    />
                    {errmsg?.sitename_err && (
                      <Typography
                        style={{
                          lineHeight: "8px",
                          padding: "5px 0px",
                          color: "red",
                        }}
                        pl={"10px"}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {errmsg?.sitename_err}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{ lineHeight: "8px" }}
                      mb={"5px"}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Site Nick Name
                    </Typography>
                    <TextField
                      sx={{ width: "100%", height: "27px", padding: "0px" }}
                      size="small"
                      id="outlined-basic"
                      onChange={handleNickname}
                      defaultValue={nickname}
                      variant="outlined"
                    />
                    {errmsg?.nickname_err && (
                      <Typography style={{ lineHeight: "8px", padding: "5px 0px", color: "red" }} pl={"10px"} variant="caption" display="block" gutterBottom>
                        {errmsg?.nickname_err}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography
                      style={{ lineHeight: "8px" }}
                      mb={"5px"}
                      pl={"10px"}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      MDM Site ID
                    </Typography>
                    <Dropdown
                      width={"100%"}
                      value={mdmSite}
                      handleChange={handleMdmsite}
                      name={mdmName}
                    />
                    {errmsg?.mdmsiteid_err && (
                      <Typography
                        style={{
                          lineHeight: "8px",
                          padding: "5px 0px",
                          color: "red",
                        }}
                        pl={"10px"}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {errmsg?.mdmsiteid_err}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{ lineHeight: "8px" }}
                      mb={"5px"}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      City
                    </Typography>
                    <TextField
                      className="inputStyle"
                      disabled
                      sx={{ width: "100%" }}
                      size="small"
                      id="outlined-basic"
                      onChange={handleBusiness}
                      value={filterdata?.length > 0 ? filterdata[0]?.city : ""}
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography
                      style={{ lineHeight: "8px" }}
                      mb={"5px"}
                      pl={"10px"}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Enterprise
                    </Typography>
                    <Dropdown
                      width={"100%"}
                      value={enterprise}
                      handleChange={handleEnterprise}
                      name={enterpriseName}
                    />
                    {errmsg?.enterprise_err && (
                      <Typography
                        style={{
                          lineHeight: "8px",
                          padding: "5px 0px",
                          color: "red",
                        }}
                        pl={"10px"}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {errmsg?.enterprise_err}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{ lineHeight: "8px" }}
                      mb={"5px"}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Country
                    </Typography>
                    <TextField
                      className="inputStyle"
                      disabled
                      sx={{ width: "100%" }}
                      size="small"
                      id="outlined-basic"
                      onChange={handleBusiness}
                      value={filterdata?.length > 0 ? filterdata[0]?.country_desc : ""}
                      variant="outlined"
                    />
                    {errmsg?.country_err && (
                      <Typography style={{ lineHeight: "8px", padding: "5px 0px", color: "red" }} pl={"10px"} variant="caption" display="block" gutterBottom>
                        {errmsg?.country_err}
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography
                      style={{ lineHeight: "8px" }}
                      mb={"5px"}
                      pl={"10px"}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Business Group
                    </Typography>
                    <Dropdown
                      width={"100%"}
                      value={business}
                      handleChange={handleBusiness}
                      name={businessName}
                    />
                    {/* <Dropdown width={"100%"} value={(businessName.length === 1 && businessName[0]) || business} handleChange={handleBusiness} name={businessName} /> */}
                    {errmsg?.business_err && (
                      <Typography
                        style={{
                          lineHeight: "8px",
                          padding: "5px 0px",
                          color: "red",
                        }}
                        pl={"10px"}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {errmsg?.business_err}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell style={{ padding: "0px" }}>
                    <TableRow>
                      <TableCell>
                        <Typography
                          style={{ lineHeight: "8px" }}
                          mb={"5px"}
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          State
                        </Typography>
                        <TextField
                          className="inputStyle"
                          disabled
                          sx={{ width: "100%" }}
                          size="small"
                          id="outlined-basic"
                          onChange={handleBusiness}
                          value={
                            filterdata?.length > 0 ? filterdata[0]?.state : ""
                          }
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          style={{ lineHeight: "8px" }}
                          mb={"5px"}
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Region
                        </Typography>
                        <TextField
                          className="inputStyle"
                          disabled
                          sx={{ width: "100%" }}
                          size="small"
                          id="outlined-basic"
                          onChange={handleBusiness}
                          value={
                            filterdata?.length > 0 ? filterdata[0]?.region : ""
                          }
                          variant="outlined"
                        />
                        {errmsg?.region_err && (
                          <Typography style={{ lineHeight: "8px", padding: "5px 0px", color: "red" }} pl={"10px"} variant="caption" display="block" gutterBottom>
                            {errmsg?.region_err}
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography
                      style={{ lineHeight: "8px" }}
                      mb={"5px"}
                      pl={"10px"}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Reporting Unit
                    </Typography>
                    <Dropdown
                      width={"100%"}
                      value={reporting}
                      handleChange={handleReporting}
                      name={reportingName}
                    />
                    {/* <Dropdown width={"100%"} value={reporting} handleChange={handleReporting} name={reportingName} /> */}
                    {errmsg?.reporting_err && (
                      <Typography style={{ lineHeight: "8px", padding: "5px 0px", color: "red" }} pl={"10px"} variant="caption" display="block" gutterBottom>
                        {errmsg?.reporting_err}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{ lineHeight: "8px" }}
                      mb={"5px"}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Address
                    </Typography>
                    <TextField
                      className="inputStyle"
                      disabled
                      sx={{ width: "100%" }}
                      size="small"
                      id="outlined-basic"
                      onChange={handleBusiness}
                      value={
                        filterdata?.length > 0
                          ? filterdata[0]?.address_line_1
                          : ""
                      }
                      variant="outlined"
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <Typography
                      style={{ lineHeight: "8px" }}
                      mb={"5px"}
                      pl={"10px"}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Criticalities
                    </Typography>
                    <Dropdown
                      className="inputStyle"
                      width={"100%"}
                      value={criticalitie}
                      handleChange={handleCriticalities}
                      name={criticalValue}
                    />
                    {errmsg?.criticalitie_err && (
                      <Typography
                        style={{
                          lineHeight: "8px",
                          padding: "5px 0px",
                          color: "red",
                        }}
                        pl={"10px"}
                        variant="caption"
                        display="block"
                        gutterBottom
                      >
                        {errmsg?.criticalitie_err}
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell style={{ padding: "0px" }}>
                    <TableRow>
                      <TableCell>
                        <Typography
                          style={{ lineHeight: "8px" }}
                          mb={"5px"}
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Latitude
                        </Typography>
                        <TextField
                          className="inputStyle"
                          disabled
                          sx={{ width: "100%" }}
                          size="small"
                          id="outlined-basic"
                          onChange={handleBusiness}
                          value={
                            filterdata?.length > 0 ? filterdata[0]?.latitude : ""
                          }
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          style={{ lineHeight: "8px" }}
                          mb={"5px"}
                          variant="caption"
                          display="block"
                          gutterBottom
                        >
                          Longitude
                        </Typography>
                        <TextField
                          className="inputStyle"
                          disabled
                          sx={{ width: "100%" }}
                          size="small"
                          id="outlined-basic"
                          onChange={handleBusiness}
                          value={
                            filterdata?.length > 0 ? filterdata[0]?.longitude : ""
                          }
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={2}>
                    <Typography
                      style={{ lineHeight: "8px" }}
                      mb={"5px"}
                      variant="caption"
                      display="block"
                      gutterBottom
                    >
                      Notes
                    </Typography>
                    <TextareaAutosize
                      onChange={handleNotes}
                      minRows={4}
                      style={{ width: "calc(100% - 8px)" }}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Typography>Disabled</Typography>
                      <RedSwitch
                        checked={checked}
                        switchHandler={switchHandler}
                      />
                      <Typography>Enable</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Button onClick={handleClose} variant="outlined">
                      Cancel
                    </Button>{" "}
                    &nbsp;&nbsp;&nbsp;
                    <Button onClick={handleSubmit} variant="contained">
                      Submit
                    </Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </form>
      {loadingErrorModal(status, error, setSnack)}
    </>
  );
}
