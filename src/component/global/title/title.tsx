import React from "react";
import Breadcrumb from "./breadcrumb";
import Typography from "@mui/material/Typography";
import { Grid, Tooltip, TextField, Button } from "@mui/material";
import {
  BusinessCenter,
  Comment,
  KeyboardDoubleArrowUp,
  MyLocation,
  Attachment,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../../../redux/store/store";
import axios from "axios";
import { SiteAttachment } from "./../../../api";
import Siteattachmentmenu from "../../dashboard/siteattachmentmenu";

export default function Title(props) {
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [file, setFile] = React.useState<any>("");

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  const selectSiteEvent = (state) => state?.event;
  const { domain_event, category_event, criteria_event, technology_event } =
    useSelector(selectSiteEvent);

  const selectCategory = (state) => state?.category;
  const { category: categoryData } = useSelector(selectCategory);
  const selectDomain = (state) => state?.domain;
  const { domain: domainData } = useSelector(selectDomain);
  const selectTechnology = (state) => state?.techArea;
  const { techArea: technologyData } = useSelector(selectTechnology);
  const selectCriteria = (state) => state?.criteria;
  const { criteria: criteriaData } = useSelector(selectCriteria);

  const handleOnChange = async (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    var formdata = new FormData();
    formdata.append("file", file);
    formdata.append("siteId", props?.data?.id);
    formdata.append("createdBy", "Ergin");
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    };
    const response2 = await axios
      .post(SiteAttachment(), formdata, config)
      .catch((error) => {
        console.error(error);
      });
    if (response2?.status == 200) {
      props?.handleDownload(props?.data?.id);
    }
  };

  return (
    <>
      <Grid
        direction="row"
        p={3}
        container
        boxShadow={5}
        style={{ position: "relative" }}
        justifyContent="space-between"
        alignItems="center"
        className="titlebar"
      >
        <Grid item xs={5}>
          <Grid
            direction="row"
            alignItems="center"
            container
            justifyContent="space-between"
          >
            <div style={{ width: props.search && "100%" }}>
              <Breadcrumb name={props?.breadcrumb} link="/" />

              <Typography
                variant="h4"
                style={{
                  fontWeight: "700",
                  fontSize: "36px",
                  marginTop: "10px",
                }}
              >
                {props.title}
              </Typography>
              {props.search && (
                <>
                  {" "}
                  <TextField
                    style={{ width: "100%", marginTop: "20px" }}
                    className="searchControl"
                    id="filled-basic"
                    onChange={props.handleSiteSearchText}
                    placeholder="Search for a Site"
                    variant="filled"
                  />
                </>
              )}
            </div>
          </Grid>
          {/*-- Very bad coding practice. For now I ahve expanded what Deepak has created. But in the long run this needs to be structured better */}
          {/* {props?.result && <Typography style={{ marginTop: "20px", color: "#4c4c4c", fontWeight: "700" }} variant="subtitle2">Result : Domain {domainData.length} &gt; Technology {technologyData.length} &gt; Category {categoryData.length} &gt; Criteria {criteriaData.length} </Typography>} */}
          {props?.result && (
            <Typography
              style={{
                marginTop: "10px",
                fontSize: "14px",
                color: "#4c4c4c",
                fontWeight: "700",
                marginBottom: "5px"
              }}
              variant="subtitle2"
            >
              {domainData?.length > 0 && (
                <>
                  <span
                    className="bground"
                    style={{ width: "15px", height: "19px" }}
                  >
                    {domainData?.length}{" "}
                  </span>{" "}
                  Domain{" "}
                </>
              )}{" "}
              {technologyData?.length > 0 && (
                <>
                  {" "}
                  <span
                    className="bground"
                    style={{ width: "15px", height: "19px" }}
                  >
                    {technologyData?.length}
                  </span>{" "}
                  Technology
                </>
              )}{" "}
              {categoryData?.length > 0 && (
                <>
                  {" "}
                  <span
                    className="bground"
                    style={{ width: "15px", height: "19px" }}
                  >
                    {" "}
                    {categoryData?.length}{" "}
                  </span>{" "}
                  Category
                </>
              )}{" "}
              {criteriaData?.length > 0 && (
                <>
                  {" "}
                  <span
                    className="bground"
                    style={{ width: "15px", height: "19px" }}
                  >
                    {" "}
                    {criteriaData?.length}{" "}
                  </span>{" "}
                  Criteria
                </>
              )}{" "}
            </Typography>
          )}
          {props?.icon && (
            <Typography
              style={{
                marginTop: "10px",
                fontSize: "14px",
                color: "#4c4c4c",
                fontWeight: "700",
                marginBottom: "5px"
              }}
              variant="subtitle2"
            >
              {domain_event?.length > 0 && (
                <>
                  <span
                    className="bground"
                    style={{ width: "15px", height: "19px" }}
                  >
                    {domain_event?.length}{" "}
                  </span>{" "}
                  Domain{" "}
                </>
              )}{" "}
              {technology_event?.length > 0 && (
                <>
                  {" "}
                  <span
                    className="bground"
                    style={{ width: "15px", height: "19px" }}
                  >
                    {technology_event?.length}
                  </span>{" "}
                  Technology
                </>
              )}{" "}
              {category_event?.length > 0 && (
                <>
                  {" "}
                  <span
                    className="bground"
                    style={{ width: "15px", height: "19px" }}
                  >
                    {" "}
                    {category_event?.length}{" "}
                  </span>{" "}
                  Category
                </>
              )}{" "}
              {criteria_event?.length > 0 && (
                <>
                  {" "}
                  <span
                    className="bground"
                    style={{ width: "15px", height: "19px" }}
                  >
                    {" "}
                    {criteria_event?.length}{" "}
                  </span>{" "}
                  Criteria
                </>
              )}{" "}
            </Typography>
          )}
        </Grid>
        <Grid xs={7} style={{ display: "flex" }} justifyContent="flex-end">
          {props?.icon && (
            <div
              style={{ paddingLeft: "20px", marginTop: "18px" }}
              className="attachment"
            >
              <Tooltip
                title={props?.data?.investmentCriticality?.description}
                placement="top-start"
                arrow
              >
                <KeyboardDoubleArrowUp style={{ color: "#E46B39" }} />
              </Tooltip>{" "}
              &nbsp;
              <Tooltip
                title={
                  <>
                    <Typography variant="caption"> Location </Typography>
                    {props?.data?.address}
                  </>
                }
              >
                <MyLocation style={{ color: "#007582" }} />
              </Tooltip>
              &nbsp;
              <Tooltip
                title={
                  <>
                    <Typography
                      variant="caption"
                      style={{ display: "block", width: "100%" }}
                    >
                      {" "}
                      Business Unit{" "}
                    </Typography>
                    {props?.data?.businessGroup}
                  </>
                }
              >
                <BusinessCenter style={{ color: "#007582" }} />
              </Tooltip>
              &nbsp;
              <Tooltip title={props?.data?.comment} placement="top-start" arrow>
                <Comment style={{ color: "#007582" }} />
              </Tooltip>
              <Tooltip title={"Attachment"} placement="top-start" arrow>
                <Siteattachmentmenu
                  attachments={props?.attachment}
                  id={props?.data?.id}
                  attachmentMethod={props?.handleDownload}
                >
                  <Button
                    variant="contained"
                    className="attachmentButton"
                    aria-label="upload picture"
                    component="label"
                  >
                    <Attachment /> &nbsp; Attach More
                    <input
                      hidden
                      onChange={handleOnChange}
                      accept="image/*"
                      type="file"
                    />
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    className="attachmentSubmit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                  <span style={{ fontWeight: "700", fontSize: "13px" }}>
                    {file?.name}
                  </span>
                </Siteattachmentmenu>
              </Tooltip>
            </div>
          )}
          {props.children}
        </Grid>
      </Grid>
    </>
  );
}
