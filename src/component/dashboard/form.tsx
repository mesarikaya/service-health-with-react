import React from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  TextareaAutosize,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Dropdown from "../global/dropdown";
import {
  Attachment,
  AddComment,
  Chat,
  Download,
  DeleteForever,
} from "@mui/icons-material";
import { Typography } from "@mui/material";
import {
  assessmentResultApi,
  attachmentApi,
  downloadAttachmentApi,
  downloadCriteriaAttachment,
} from "./../../api";
import axios from "axios";
import type { AppDispatch } from "../../redux/store/store";
import { useSelector, useDispatch } from "react-redux";
import { useMsal } from "@azure/msal-react";
import { green } from "@mui/material/colors";
import { getDashboard } from "../../redux/store/dashboard/Dashboard.actions";
import { useEffect } from "react";
import { downloadFile } from "../utils/downloadFile";
import AttachmentFile from "../../redux/types/data/attachment";
import { fontSizes, weight } from "../utils/sizes";
import { colors } from "../utils/colors";
import { getFileExtension } from "../utils/getFileExtension";
import { getAttachmentIcon } from "../utils/utils";

export default function Form(props) {
  const classes = useStyles();
  const [score, setScore] = React.useState<string | null>(
    props?.data?.assessmentResults[0]?.score
  );
  const [status, setStatus] = React.useState<any>(
    props?.data?.assessmentResults[0]?.recommendationStatus?.description
  );
  const [notes, setNotes] = React.useState<string | number | undefined>(
    props?.data?.assessmentResults[0]?.notes
  );
  const [recommendationText, setRecommendationText] = React.useState<
    string | number | undefined
  >(props?.data?.assessmentResults[0]?.recommendationText);
  const [updatedAt, setUpdatedAt] = React.useState<any>();
  const [error, setError] = React.useState<any>();
  const [file, setFile] = React.useState<any>([]);
  const [filesToDelete, setFilesToDelete] = React.useState<any>([]);
  const [criticalitie, setCriticalitie] = React.useState<any>();
  const [errmsg, setErrmsg] = React.useState<any>({});
  const [attachment, setAttachment] = React.useState<any | null>();
  const { instance, accounts, inProgress } = useMsal();
  const name = accounts[0] && accounts[0].name;

  const selectEvent = (state) => state?.event;

  const dispatch = useDispatch<AppDispatch>();

  const { criticalities } = useSelector(selectEvent);

  const criticalValue =
    criticalities?.length > 0
      ? criticalities.map((x) => {
        return x.description;
      })
      : [];

  const handleCriticalities = (event) => {
    setCriticalitie(event.target.value);
  };

  useEffect(() => { }, [attachment]);

  const handleScore = (e) => {
    setScore(e.target.value);
  };
  const handleStatus = (e) => {
    setStatus(e.target.value);
  };
  const handleNotes = (e) => {
    setNotes(e.target.value);
  };

  const handleRecommendation = (e) => {
    setRecommendationText(e.target.value);
  };

  const scoreList = [1, 2, 3];

  // TODO: These should be made an api call to the backend
  const statusList = [
    "No Need for Remediation",
    "In Progress",
    "Not Started",
    "Done",
    "Cancelled",
    "Waiting",
  ];

  // TODO: These should be made an api call to the backend
  const list = [
    {
      id: 1,
      description: "Waiting",
    },
    {
      id: 2,
      description: "Not Started",
    },
    {
      id: 3,
      description: "In Progress",
    },
    {
      id: 4,
      description: "Cancelled",
    },
    {
      id: 5,
      description: "Done",
    },
    {
      id: 6,
      description: "No Need for Remediation",
    },
  ];

  const handleSubmits = async (e) => {
    e.preventDefault();

    await addNewSiteCriteriaAttachments();
    await deleteSiteCriteriaAttachments();
    await createNewAssessmentResult();
  };

  const addNewSiteCriteriaAttachments = async () => {
    if (file.length > 0) {
      let formdata = new FormData();
      for (let i = 0; i < file.length; i++) {
        let files = file[i];
        formdata.append("files", files);
      }
      formdata.append("siteId", props?.data?.siteId);
      formdata.append(
        "assessmentCriteriaId",
        props?.data?.assessmentCriteriaId
      );
      formdata.append(
        "createdBy",
        "props?.data?.assessmentResults[0]?.createdBy"
      );
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      };
      await axios
        .post(attachmentApi(), formdata, config)
        .then((response) => {
          console.log("Site Succefully updated!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const deleteSiteCriteriaAttachments = async () => {
    filesToDelete.forEach(async (fileToDelete) => {
      await axios
        .delete(downloadAttachmentApi(fileToDelete), {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUpdatedAt("Attachment Succefully deleted!");
        })
        .catch((error) => {
          console.log("Error on delete with err: ", error);
        });
    });
  };

  const createNewAssessmentResult = async () => {
    let critId: any;
    list.map((x) => {
      if (x.description === status) {
        critId = x.id;
      }
    });

    let formErrors = {};
    let formIsValid = true;
    if (score === "" || score === undefined) {
      formIsValid = false;
      formErrors["scoreErr"] = "Score is required.";
    }
    if (status === "" || status === undefined) {
      formIsValid = false;
      formErrors["statusErr"] = "Status is required.";
    }
    if (notes === "" || notes === undefined) {
      formIsValid = false;
      formErrors["notesErr"] = "Notes is required.";
    }
    if (recommendationText === "" || recommendationText === undefined) {
      formIsValid = false;
      formErrors["recommendationErr"] = "Recommendation is required.";
    }
    if (
      score !== "" &&
      score !== undefined &&
      notes !== undefined &&
      notes !== "" &&
      recommendationText !== undefined &&
      recommendationText !== ""
    ) {
      const crti = criticalities?.filter((x) => {
        return criticalitie?.includes(x?.description);
      });
      const critid = crti.length > 0 && crti[0].id;
      const updatedBy = name?.replace(/\s*(?:\[[^\]]*\]|\([^)]*\))\s*/g, "");
      const data = {
        assessmentCriteria: {
          id: props?.data?.assessmentCriteriaId,
        },
        site: {
          id: props?.data?.siteId,
        },
        recommendationStatus: {
          id: critId,
        },
        score: score,
        recommendationText: recommendationText,
        notes: notes,
        createdBy: updatedBy,
        updatedBy: updatedBy,
      };

      await axios
        .post(assessmentResultApi(), data, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          setUpdatedAt("Criteria Succefully updated!");
          dispatch(getDashboard(props?.data?.siteName));
          props?.setSnack(true);
          props?.close();
        })
        .catch((error) => {
          console.log(error);
          setError(error?.response?.data?.message);
          setUpdatedAt("");
        });
    }

    setErrmsg(formErrors);
    return formIsValid;
  };

  const handleClose = () => {
    props?.close();
  };

  const style = {
    boxShadow: "none",
    height: "30px",
    border: "1px solid #0000009c",
    borderRadius: "0px",
    "& .MuiChip-icon": {
      order: 1, // the label has a default order of 0, so this icon goes after the label
      marginRight: "10px", // add some space between icon and delete icon
      cursor: "pointer",
    },
    "& .MuiChip-deleteIcon": {
      order: 2, // since this is greater than an order of 1, it goes after the icon
    },
  };

  const handleDownload = (file: AttachmentFile) => {
    axios({
      url: downloadAttachmentApi(file.id),
      method: "GET",
      headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      responseType: "blob",
    }).then((response) => {
      downloadFile(response, file);
    });
  };

  const attachmentData = (siteid: any, critid: any) => {
    axios
      .get(downloadCriteriaAttachment(siteid, critid), {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((resp) => {
        setAttachment(resp.data);
      });
  };

  useEffect(() => {
    attachmentData(props?.data?.siteId, props?.data?.assessmentCriteriaId);
  }, [dispatch]);

  const handleDelete = async (fileId: number) => {
    filesToDelete.push(fileId);
    setFilesToDelete(filesToDelete);
    const indexToDelete = attachment.findIndex((item) => {
      return item.id === fileId;
    });
    
    if (indexToDelete === -1) {
      return false;
    }

    attachment.splice(indexToDelete, 1);
    setAttachment([...attachment]);
  };

  if (props?.length < 1) {
    return <div>loading...</div>;
  }

  const handleOnChange = (e) => {
    setFile([...file, e.target.files[0]]);
  };

  return (
    <form className="form" id="forms" onSubmit={handleSubmits}>
      <Grid className="critForm" container padding={"10px"}>
        <Grid item xs={12}>
          <Typography
            className={classes.title}
            sx={{ fontSize: "36px !important", fontWeight: 500 }}
          >
            Update Criteria - {props?.data?.siteName}
          </Typography>
          <Typography
            className={classes.title}
            sx={{ fontSize: "15px !important", fontWeight: 500 }}
            gutterBottom
          >
            You are going to make changes on Available Backup Capacity / Backup
            System.
          </Typography>
          <Typography
            className={classes.breadcrumb}
            sx={{
              fontSize: "13px !important",
              fontWeight: 400,
              color: "#666666 !important",
            }}
            gutterBottom
          >
            Site Assessment: {props?.data?.assessmentResults[0]?.site?.city}{" "}
            {">"}{" "}
            {
              props?.data?.assessmentResults[0]?.assessmentCriteria?.category
                ?.techArea?.description
            }
            ,{" "}
            {
              props?.data?.assessmentResults[0]?.assessmentCriteria?.category
                ?.techArea?.domain?.description
            }{" "}
            {">"}{" "}
            {
              props?.data?.assessmentResults[0]?.assessmentCriteria?.category
                ?.description
            }
          </Typography>
        </Grid>

        <Grid item xs={6} style={{ marginBottom: "0.5rem" }}>
          <Typography
            className={classes.formFieldLabel}
            variant="caption"
            gutterBottom
          >
            Score
          </Typography>
          <Dropdown
            width={"100%"}
            value={score}
            handleChange={handleScore}
            name={scoreList}
          />

          {errmsg?.scoreErr && (
            <Typography
              style={{
                lineHeight: "8px",
                padding: "5px 10px 10px 10px",
                color: "red",
              }}
              pl={"10px"}
              variant="caption"
              display="block"
              gutterBottom
            >
              {errmsg?.scoreErr}
            </Typography>
          )}
        </Grid>

        <Grid
          item
          xs={6}
          style={{ paddingLeft: "25px", marginBottom: "0.5rem" }}
        >
          <Typography
            className={classes.formFieldLabel}
            variant="caption"
            gutterBottom
          >
            Status
          </Typography>
          <Dropdown
            width={"100%"}
            value={status}
            handleChange={handleStatus}
            name={statusList}
          />
          {errmsg?.statusErr && (
            <Typography
              style={{
                lineHeight: "8px",
                padding: "5px 10px 10px 10px",
                color: "red",
              }}
              pl={"10px"}
              variant="caption"
              display="block"
              gutterBottom
            >
              {errmsg?.statusErr}
            </Typography>
          )}
        </Grid>

        <Grid item xs={6} style={{ marginBottom: "0.5rem" }}>
          <Typography
            className={classes.formFieldLabel}
            variant="caption"
            gutterBottom
          >
            Recommendation{" "}
            <AddComment style={{ color: "#CD0D15", fontSize: "21px" }} />
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Please provide your recommendation"
            className={classes.textArea}
            value={recommendationText}
            onChange={handleRecommendation}
          />
          {errmsg?.recommendationErr && (
            <Typography
              style={{
                lineHeight: "8px",
                padding: "5px 0px 10px 0px",
                color: "red",
              }}
              pl={"0px"}
              variant="caption"
              display="block"
              gutterBottom
            >
              {errmsg?.recommendationErr}
            </Typography>
          )}
        </Grid>
        <Grid
          item
          xs={6}
          style={{ paddingLeft: "25px", marginBottom: "0.5rem" }}
        >
          <Typography
            className={classes.formFieldLabel}
            variant="caption"
            gutterBottom
          >
            Notes <Chat style={{ color: "#007582", fontSize: "21px" }} />
          </Typography>
          <TextareaAutosize
            aria-label="minimum height"
            minRows={3}
            placeholder="Please provide additional notes"
            className={classes.textArea}
            value={notes}
            onChange={handleNotes}
          />
          {errmsg?.notesErr && (
            <Typography
              style={{
                lineHeight: "8px",
                padding: "5px 0px 10px 0px",
                color: "red",
              }}
              pl={"0px"}
              variant="caption"
              display="block"
              gutterBottom
            >
              {errmsg?.notesErr}
            </Typography>
          )}
        </Grid>
        <br />
        <br />
        <Grid item xs={12} style={{ marginBottom: "0.5rem" }}>
          <IconButton
            className={classes.attachButton}
            size="small"
            aria-label="upload picture"
            component="label"
          >
            <input
              hidden
              onChange={handleOnChange}
              accept="image/*"
              type="file"
            />
            <Attachment style={{ fontSize: fontSizes.md }} />
            <Typography style={{ fontSize: fontSizes.sm }}>Attach</Typography>
          </IconButton>
          <span style={{ fontWeight: "700" }}> {file[0]?.name}</span>
        </Grid>
        <Grid item xs={12}>
          <Typography
            className={classes.formFieldLabel}
            variant="caption"
            gutterBottom
          >
            Attached Documents
          </Typography>
          <Grid container justifyContent="start">
            {attachment?.length > 0 &&
              attachment.map((attachment) => (
                <>
                  <Grid item xs={3} style={{ paddingRight: "10px" }}>
                    <Chip
                      sx={style}
                      label={attachment.fileName}
                      variant="outlined"
                      onDelete={() => handleDownload(attachment)}
                      deleteIcon={<Download />}
                      icon={getAttachmentIcon(attachment)}
                    />
                    <Grid container justifyContent="end" pt={"5px"} pr={"5px"}>
                      <Grid
                        item
                        xs={11}
                        style={{ fontSize: "11px", paddingTop: "5px" }}
                      >
                        {" "}
                        {attachment?.updateDate.substr(0, 10)} &nbsp;{" "}
                        {getFileExtension(attachment?.fileName)} &nbsp;{" "}
                        {Math.round(attachment?.fileSize / 1000)}kb
                      </Grid>
                      <Grid
                        justifyContent="end"
                        item
                        xs={1}
                        onClick={() => handleDelete(attachment?.id)}
                      >
                        {" "}
                        <DeleteForever
                          style={{
                            fontSize: "19px",
                            color: "#CD0D15",
                            verticalAlign: "top",
                          }}
                        />{" "}
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              ))}
          </Grid>
        </Grid>
        <Grid container justifyContent="end">
          <Button
            style={{ background: "#d3d3e3" }}
            onClick={handleClose}
            variant="outlined"
          >
            Cancel
          </Button>{" "}
          &nbsp;&nbsp;&nbsp;
          <Button onClick={handleSubmits} type="submit" variant="contained">
            Submit
          </Button>
        </Grid>
        <Grid item xs={12} mt={3}>
          <Typography sx={{ color: green[800] }}> {updatedAt} </Typography>
        </Grid>
      </Grid>
    </form>
  );
}

const useStyles = makeStyles({
  title: {
    fontSize: fontSizes.xl,
    color: colors.darkBlack,
    fontStyle: "normal",
    fontWeight: weight.xl,
    lineHeight: "100%",
    marginBottom: "0.5rem",
  },
  info: {
    fontSize: fontSizes.lg,
    color: colors.darkBlack,
    fontStyle: "normal",
    fontWeight: weight.xxl,
    lineHeight: "100%",
    marginBottom: "0.5rem",
  },
  breadcrumb: {
    fontSize: fontSizes.md,
    color: colors.gray,
    fontStyle: "normal",
    fontWeight: weight.sm,
    lineHeight: "100%",
    marginBottom: "1rem",
  },
  formFieldLabel: {
    fontSize: fontSizes.xss,
    color: colors.gray,
    fontStyle: "normal",
    fontWeight: weight.xl,
    lineHeight: "100%",
    marginBottom: "0.25rem",
  },
  textArea: {
    fontSize: fontSizes.sm,
    color: colors.gray,
    width: "100%",
    borderRadius: "5px",
  },
  attachButton: {
    color: colors.darkBlack,
    background: colors.lightGray,
    fontWeight: weight.xl,
    borderRadius: "12px !important",
  },

  attachText: {
    fontSize: fontSizes.xss,
    color: colors.darkBlack,
  },
});
