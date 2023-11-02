import * as React from "react";
import {
  AddComment,
  Chat,
  Edit,
  HourglassEmptyOutlined,
  HourglassFull,
  KeyboardArrowDown,
  KeyboardArrowUp,
  NotInterested,
  Refresh,
  RemoveCircleOutline,
  WatchLater,
  InfoOutlined,
  North,
  South,
  East,
} from "@mui/icons-material";
import Typography from "@mui/material/Typography";
import {
  Tooltip,
  IconButton,
  Collapse,
  CircularProgress,
  Grid,
} from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store/store";
import Form from "./form";
import DialogComponent from "../global/dialogComponent";
import moment from "moment";
import { green, red } from "@mui/material/colors";
import AttachmentMenu from "./attachmentmenu";
import Snackbars from "./../global/snackbars";
import { loadingError } from "../utils/utils";

export default function TableData(props) {
  const selectDashboard = (state) => state?.dashboard;
  const {
    dashboard: dashBoardData,
    status,
    error,
  } = useSelector(selectDashboard);
  const dispatch = useDispatch<AppDispatch>();

  const [open, setOpen] = React.useState(false);
  const [snack, setSnack] = React.useState(false);

  const [collapse, setCollapse] = React.useState({});
  const [modalData, setModalData] = React.useState<any>(null);
  const selectEvent = (state) => state?.event;
  const { filterData: dataFilter } = useSelector(selectEvent);

  useEffect(() => {
    if (status !== "loading" && dashBoardData?.length > 0) {
      dispatch({
        type: "GET_FILTER_DATA",
        payload: dashBoardData,
      });
    }
  }, []);

  const handleClickOpen = (val) => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const recommendationStatus = (val) => {
    if (val === "Done") {
      return (
        <Tooltip title={val}>
          <HourglassEmptyOutlined />
        </Tooltip>
      );
    }
    if (val === "Not Started") {
      return (
        <Tooltip title={val}>
          <HourglassFull />
        </Tooltip>
      );
    }
    if (val === "Waiting") {
      return (
        <Tooltip title={val}>
          <WatchLater />
        </Tooltip>
      );
    }
    if (val === "In Progress") {
      return (
        <Tooltip title={val}>
          <Refresh />
        </Tooltip>
      );
    }
    if (val === "Canceled") {
      return (
        <Tooltip title={val}>
          <NotInterested />
        </Tooltip>
      );
    }
    if (val === "No Need for Remediation") {
      return (
        <Tooltip title={val}>
          <RemoveCircleOutline />
        </Tooltip>
      );
    }
  };

  return (
    <>
      {loadingError(status, error, setSnack)}

      {React.useMemo(() => {
        return (
          status !== "loading" && (
            <>
              <DialogComponent open={open} close={handleClose}>
                <Form
                  close={handleClose}
                  setSnack={props?.setSnack}
                  data={modalData}
                />
              </DialogComponent>
              <Grid
                className="header-container"
                style={{ marginTop: "0px !important" }}
                container
                item
                spacing={2}
              >
                <Grid style={{ paddingLeft: "25px" }} xs={3}>
                  {" "}
                  Criteria /
                  <span style={{ color: "#7f7f7f" }}> Category / </span>
                  <span style={{ color: "#7f7f7f", fontWeight: "500" }}>
                    Area
                  </span>{" "}
                </Grid>
                <Grid xs={2}> Domain </Grid>
                <Grid xs={1} style={{ textAlign: "center" }}>
                  {" "}
                  Score
                </Grid>
                <Grid xs={2} style={{ textAlign: "center" }}>
                  {" "}
                  Updated Date{" "}
                </Grid>
                <Grid xs={2} style={{ textAlign: "center" }}>
                  {" "}
                  Recommendation &amp; Notes
                </Grid>
                <Grid xs={1} style={{ textAlign: "center" }}>
                  {" "}
                  Status
                </Grid>
                <Grid xs={1} style={{ textAlign: "center" }}>
                </Grid>
              </Grid>
              <>
                {dataFilter?.length > 0 &&
                  dataFilter?.map((x, index, arr) => (
                    <>
                      {x?.assessmentResults?.length === 0 && (
                        <Grid
                          className="main-container"
                          container
                          item
                          spacing={2}
                        >
                          <Grid xs={3}>
                            <div className="button-box"> </div>
                            <div
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                minHeight: "73px ",
                              }}
                            >
                              <Typography variant="subtitle1">
                                {" "}
                                <strong>
                                  {" "}
                                  {x?.assessmentCriteriaDescription}{" "}
                                </strong>{" "}
                                <Tooltip
                                  className="infotip"
                                  title={x?.techStandardDescription}
                                >
                                  <span>
                                    <InfoOutlined />
                                  </span>
                                </Tooltip>
                              </Typography>
                              <Typography variant="caption">
                                {" "}
                                {x?.categoryDescription} /{" "}
                                <span style={{ fontWeight: "500" }}>
                                  {x?.techAreaDescription}
                                </span>{" "}
                              </Typography>
                            </div>
                          </Grid>
                          <Grid
                            xs={2}
                            className="alignCenter"
                            style={{
                              fontWeight: "700",
                              alignItems: "flex-start",
                            }}
                          >
                            {" "}
                            {x?.domainDescription}{" "}
                          </Grid>
                          <Grid xs={6}> </Grid>
                          <Grid
                            style={{ alignItems: "flex-end" }}
                            className="editbutton alignCenter"
                            xs={1}
                          >
                            <span
                              onClick={() => {
                                setModalData(x);
                                setOpen(true);
                              }}
                            >
                              <Edit />
                            </span>
                          </Grid>
                        </Grid>
                      )}
                      {x?.assessmentResults?.length > 1 ? (
                        <Grid
                          className={
                            collapse[index]
                              ? "main-container withcollapse"
                              : "main-container withoutcollapse"
                          }
                          container
                          item
                          spacing={2}
                        >
                          <React.Fragment key={props}>
                            <Grid xs={3}>
                              <IconButton
                                aria-label="expand row"
                                className="chevron"
                                size="small"
                                onClick={() =>
                                  setCollapse((prev) => ({
                                    ...prev,
                                    [index]: !prev[index],
                                  }))
                                }
                              >
                                {collapse[index] ? (
                                  <KeyboardArrowUp />
                                ) : (
                                  <KeyboardArrowDown />
                                )}
                              </IconButton>
                              <div
                                style={{
                                  marginLeft: "20px",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  minHeight: "73px ",
                                }}
                              >
                                <Typography variant="subtitle1">
                                  <strong>
                                    {" "}
                                    {
                                      x.assessmentResults[0].assessmentCriteria
                                        .description
                                    }{" "}
                                  </strong>{" "}
                                  <Tooltip
                                    className="infotip"
                                    title={
                                      x.assessmentResults[0].assessmentCriteria
                                        .tech_standard_description
                                    }
                                  >
                                    <span>
                                      <InfoOutlined />
                                    </span>
                                  </Tooltip>
                                </Typography>
                                <Typography variant="caption">
                                  {" "}
                                  {
                                    x.assessmentResults[0].assessmentCriteria
                                      .category.description
                                  }{" "}
                                  /{" "}
                                  <span style={{ fontWeight: "500" }}>
                                    {
                                      x.assessmentResults[0].assessmentCriteria
                                        .category.techArea.description
                                    }
                                  </span>
                                </Typography>
                              </div>
                            </Grid>
                            <Grid
                              xs={2}
                              className="alignCenter"
                              style={{
                                fontWeight: "700",
                                paddingLeft: "0px",
                                alignItems: "flex-start",
                              }}
                            >
                              {
                                x.assessmentResults[0].assessmentCriteria
                                  .category.techArea.domain.description
                              }
                            </Grid>
                            <Grid
                              className="score alignCenter"
                              xs={1}
                              style={{
                                color:
                                  x.assessmentResults[0].score ==
                                    x?.assessmentResults[1]?.score
                                    ? "#FFB100"
                                    : x.assessmentResults[0].score <
                                      x?.assessmentResults[1]?.score
                                      ? "#BC080D"
                                      : "#007582",
                              }}
                            >
                              <span style={{ fontWeight: "700" }}>
                                {" "}
                                {x.assessmentResults[0].score ==
                                  x?.assessmentResults[1]?.score ? (
                                  <East />
                                ) : x.assessmentResults[0].score <
                                  x?.assessmentResults[1]?.score ? (
                                  <South />
                                ) : (
                                  <North />
                                )}{" "}
                                <span
                                  style={{
                                    display: "inline",
                                    color:
                                      x.assessmentResults[0].score == "1"
                                        ? "#BC080D"
                                        : x.assessmentResults[0].score == "2"
                                          ? "#FFB100"
                                          : "#007582",
                                  }}
                                >
                                  {x.assessmentResults[0].score}
                                </span>{" "}
                              </span>
                            </Grid>
                            <Grid
                              xs={2}
                              style={{ fontSize: "15px", textAlign: "center" }}
                            >
                              <div className="toopTip alignCenter">
                                <Tooltip
                                  title={
                                    "Updated By: " +
                                    x.assessmentResults[0].updatedBy
                                  }
                                >
                                  <span
                                    style={{
                                      fontWeight: "700",
                                      textTransform: "capitalize",
                                    }}
                                    className="updatedBy "
                                  >
                                    {moment
                                      .utc(x.assessmentResults[0]?.updateDate)
                                      .format("D MMM YYYY")}
                                  </span>
                                </Tooltip>
                              </div>
                            </Grid>
                            <Grid
                              xs={2}
                              className="alignCenter"
                              style={{ textAlign: "center" }}
                            >
                              <span>
                                {x.assessmentResults[0].recommendationText &&
                                  x.assessmentResults[0].recommendationText
                                    ?.length > 1 && (
                                    <Tooltip
                                      title={
                                        x.assessmentResults[0]
                                          .recommendationText
                                      }
                                    >
                                      <AddComment sx={{ color: red[700] }} />
                                    </Tooltip>
                                  )}
                                {x.assessmentResults[0]?.notes &&
                                  x.assessmentResults[0].notes?.length > 1 && (
                                    <Tooltip
                                      title={x.assessmentResults[0].notes}
                                    >
                                      <Chat sx={{ color: green[700] }} />
                                    </Tooltip>
                                  )}{" "}
                              </span>
                            </Grid>
                            <Grid xs={1} className="alignCenter">
                              {recommendationStatus(
                                x.assessmentResults[0].recommendationStatus
                                  .description
                              )}
                            </Grid>
                            <Grid
                              className="editbutton alignCenter"
                              style={{
                                paddingLeft: "0px",
                                alignItems: "flex-end",
                              }}
                              xs={1}
                            >
                              <span>
                                {x.attachments.length > 0 && (
                                  <AttachmentMenu attachments={x.attachments} />
                                )}{" "}
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <Edit
                                  onClick={() => {
                                    setModalData(x);
                                    setOpen(true);
                                  }}
                                />
                              </span>
                            </Grid>
                            {/* collapse */}
                            <div
                              className="collapseContainer"
                              style={{ display: "block", width: "100%" }}
                            >
                              <Collapse
                                in={collapse[index]}
                                timeout="auto"
                                unmountOnExit
                              >
                                {collapse[index] &&
                                  x?.assessmentResults
                                    ?.slice(1)
                                    .map((row, index, arr) => (
                                      <Grid
                                        className="subcontainer"
                                        container
                                        item
                                        spacing={2}
                                      >
                                        <Grid xs={3}>
                                          <div className="button-box"> </div>
                                        </Grid>
                                        <Grid xs={2}>{ }</Grid>
                                        <Grid
                                          className="score spanCenter"
                                          xs={1}
                                          style={{
                                            fontWeight: "700",
                                            color:
                                              row.score == arr[index + 1]?.score
                                                ? "#FFB100"
                                                : row.score <
                                                  arr[index + 1]?.score
                                                  ? "#BC080D"
                                                  : "#007582",
                                          }}
                                        >
                                          <span>
                                            {index ==
                                              x?.assessmentResults.length - 2 ? (
                                              <East
                                                style={{ color: "#FFB100" }}
                                              />
                                            ) : (
                                              <>
                                                {row.score ==
                                                  arr[index + 1]?.score ? (
                                                  <East />
                                                ) : row.score >
                                                  arr[index + 1]?.score ? (
                                                  <North />
                                                ) : (
                                                  <South />
                                                )}{" "}
                                              </>
                                            )}
                                            <span
                                              style={{
                                                display: "inline",
                                                color:
                                                  row.score == "1"
                                                    ? "#BC080D"
                                                    : row.score == "2"
                                                      ? "#FFB100"
                                                      : "#007582",
                                              }}
                                            >
                                              {" "}
                                              {row.score}
                                            </span>
                                          </span>
                                        </Grid>
                                        {/* <Grid className='score' xs={1}>{row.score < arr[index - 1]?.score ? <East /> : <South />} {row.score}</Grid> */}
                                        <Grid xs={2} className="spanCenter">
                                          <Tooltip
                                            title={
                                              "Updated By : " + row.updatedBy
                                            }
                                          >
                                            <span
                                              style={{
                                                fontWeight: "700",
                                                textTransform: "capitalize",
                                              }}
                                              className="updatedBy"
                                            >
                                              {" "}
                                              {moment
                                                .utc(row?.updateDate)
                                                .format("D MMM YYYY")}
                                            </span>
                                          </Tooltip>
                                        </Grid>
                                        <Grid
                                          className="spanCenter"
                                          xs={2}
                                          style={{ textAlign: "center" }}
                                        >
                                          {row.recommendationText &&
                                            row.recommendationText?.length >
                                            1 && (
                                              <Tooltip
                                                title={row.recommendationText}
                                              >
                                                <AddComment
                                                  sx={{ color: red[700] }}
                                                />
                                              </Tooltip>
                                            )}
                                          {row?.notes &&
                                            row.notes?.length > 1 && (
                                              <Tooltip title={row.notes}>
                                                <Chat
                                                  sx={{ color: green[700] }}
                                                />
                                              </Tooltip>
                                            )}
                                        </Grid>
                                        <Grid className="spanCenter" xs={1}>
                                          {recommendationStatus(
                                            row.recommendationStatus.description
                                          )}
                                        </Grid>
                                        <Grid
                                          className="editbutton"
                                          xs={1}
                                        ></Grid>
                                      </Grid>
                                    ))}
                              </Collapse>
                            </div>
                            {/* end collapse */}
                          </React.Fragment>
                        </Grid>
                      ) : (
                        x?.assessmentResults?.length > 0 &&
                        x?.assessmentResults?.map((row, index, arr) => (
                          <Grid
                            className="main-container"
                            container
                            item
                            spacing={2}
                          >
                            <Grid xs={3}>
                              <div className="button-box"> </div>
                              <div
                                style={{
                                  marginLeft: "10px",
                                  display: "flex",
                                  flexDirection: "column",
                                  justifyContent: "space-between",
                                  minHeight: "73px ",
                                }}
                              >
                                <Typography variant="subtitle1">
                                  <strong>
                                    {" "}
                                    {row.assessmentCriteria.description}{" "}
                                  </strong>{" "}
                                  <Tooltip
                                    className="infotip"
                                    title={
                                      row.assessmentCriteria
                                        .tech_standard_description
                                    }
                                  >
                                    <span>
                                      <InfoOutlined />
                                    </span>
                                  </Tooltip>
                                </Typography>
                                <Typography variant="caption">
                                  {" "}
                                  {
                                    row.assessmentCriteria.category.description
                                  }{" "}
                                  /{" "}
                                  <span style={{ fontWeight: "500" }}>
                                    {
                                      row.assessmentCriteria.category.techArea
                                        .description
                                    }
                                  </span>
                                </Typography>
                              </div>
                            </Grid>
                            <Grid
                              xs={2}
                              className="alignCenter"
                              style={{
                                fontWeight: "700",
                                alignItems: "flex-start",
                              }}
                            >
                              {
                                row.assessmentCriteria.category.techArea.domain
                                  .description
                              }
                            </Grid>
                            <Grid
                              xs={1}
                              style={{ color: "#FFB100", fontWeight: "700" }}
                              className="score alignCenter"
                            >
                              <span>
                                {<East />}{" "}
                                <span
                                  style={{
                                    display: "inline",
                                    color:
                                      row.score == "1"
                                        ? "#BC080D"
                                        : row.score == "2"
                                          ? "#FFB100"
                                          : "#007582",
                                  }}
                                >
                                  {row.score}
                                </span>
                              </span>
                            </Grid>
                            <Grid xs={2} className="alignCenter">
                              <Tooltip title={"Updated By : " + row.updatedBy}>
                                <span
                                  className="updatedBy"
                                  style={{
                                    fontWeight: "700",
                                    textTransform: "capitalize",
                                  }}
                                >
                                  {moment
                                    .utc(row?.updateDate)
                                    .format("D MMM YYYY")}
                                </span>
                              </Tooltip>
                            </Grid>
                            <Grid
                              xs={2}
                              className="alignCenter"
                              style={{ textAlign: "center" }}
                            >
                              <span>
                                {row.recommendationText &&
                                  row.recommendationText?.length > 1 && (
                                    <Tooltip title={row.recommendationText}>
                                      <AddComment sx={{ color: red[700] }} />
                                    </Tooltip>
                                  )}
                                {row?.notes && row.notes?.length > 1 && (
                                  <Tooltip title={row.notes}>
                                    <Chat sx={{ color: green[700] }} />
                                  </Tooltip>
                                )}
                              </span>
                            </Grid>
                            <Grid xs={1} className="alignCenter">
                              {recommendationStatus(
                                row.recommendationStatus.description
                              )}
                            </Grid>
                            <Grid
                              className="editbutton alignCenter"
                              style={{
                                paddingLeft: "0px",
                                alignItems: "flex-end",
                              }}
                              xs={1}
                            >
                              <span>
                                {x.attachments.length > 0 && (
                                  <AttachmentMenu attachments={x.attachments} />
                                )}{" "}
                                &nbsp; &nbsp; &nbsp; &nbsp;
                                <Edit
                                  onClick={() => {
                                    setModalData(x);
                                    setOpen(true);
                                  }}
                                />
                              </span>
                            </Grid>
                          </Grid>
                        ))
                      )}
                    </>
                  ))}
              </>
            </>
          )
        );
      }, [status, dataFilter, open, collapse])}
    </>
    // ), [loading, dataFilter, open, collapse])
  );
}
