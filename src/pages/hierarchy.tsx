import * as React from "react";
import Tabcomponent from "../component/global/tabcomponent";
import { Grid, CircularProgress } from "@mui/material";
import Title from "../component/global/title/title";
import Button from "@mui/material/Button";
import DialogComponent from "../component/global/dialogComponent";
import CreateTechArea from "../component/hierarchy/createTechArea";
import CreateDomain from "../component/hierarchy/createDomain";
import CreateCategory from "../component/hierarchy/createCategory";
import CreateCriteria from "../component/hierarchy/createCriteria";
import { getTechArea } from "../redux/store/techArea/TechArea.actions";
import { getCategory } from "../redux/store/category/Category.actions";
import { getCriteria } from "../redux/store/criteria/Criteria.actions";
import { getDomain } from "../redux/store/domain/Domain.actions";
import { AppDispatch } from "../redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Snackbars from "./../component/global/snackbars";

export default function Hierarchy() {
  const [title, setTitle] = React.useState("Domain");
  const [open, setOpen] = React.useState(false);
  const [modalData, setModalData] = React.useState<any[]>();
  const dispatch = useDispatch<AppDispatch>();
  const selectDomain = (state) => state?.domain;
  const {
    domain,
    status: domainStatus,
    error: domainError,
  } = useSelector(selectDomain);
  const selectTechArea = (state) => state?.techArea;
  const {
    techArea,
    status: techAreaStatus,
    error: techAreaError,
  } = useSelector(selectTechArea);
  const selectCategory = (state) => state?.category;
  const {
    category,
    status: categoryStatus,
    error: categoryError,
  } = useSelector(selectCategory);
  const selectCriteria = (state) => state?.criteria;
  const {
    criteria,
    status: criteriaStatus,
    error: criteriaError,
  } = useSelector(selectCriteria);

  const [snack, setSnack] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [variant, setVariant] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [duration, setDuration] = React.useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (val) => {
    setOpen(true);
  };

  const loadDomain = async () => {
    await dispatch(getDomain());
  };

  const loadTechArea = async () => {
    await dispatch(getTechArea());
  };

  const loadCategory = async () => {
    await dispatch(getCategory());
  };

  const loadCriteria = async () => {
    await dispatch(getCriteria());
  };

  useEffect(() => {
    loadCriteria();
  }, [dispatch, category]);

  useEffect(() => {
    loadCategory();
  }, [dispatch, techArea]);

  useEffect(() => {
    loadTechArea();
  }, [dispatch, domain]);

  useEffect(() => {
    loadDomain();
  }, [dispatch]);

  const loadData = async () => {
    if (
      domainStatus === "succeeded" &&
      techAreaStatus === "succeeded" &&
      categoryStatus === "succeeded" &&
      criteriaStatus === "succeeded"
    ) {
      setLoading(false);
      setSnack(false);
    } else {
      let errorMessage: string = "";
      // var x = (domainStatus==='failed') ? (errorMessage += domainError) : (techAreaStatus==='failed') ? "Good Night!" : "";
      if (domainStatus === "failed") {
        errorMessage += domainError?.message;
      }
      if (techAreaStatus === "failed") {
        errorMessage += techAreaError?.message;
      }
      if (categoryStatus === "failed") {
        errorMessage += categoryError?.message;
      }
      if (criteriaStatus === "failed") {
        errorMessage += criteriaError?.message;
      }
      setVariant("error");
      await setMessage(errorMessage);
      errorMessage?.length > 0 && setSnack(true);
    }
  };

  useEffect(() => {
    loadData();
  }, [techAreaStatus, categoryStatus, criteriaStatus, domainStatus]);

  const breadcrumb = [
    {
      link: "/",
      title: "Configure",
    },
    {
      link: "/configure/hierarchies",
      title: "Hierarchies",
    },
  ];
  const handleChange = (val) => {
    if (val === 0) {
      setTitle("Domain");
    }
    if (val === 1) {
      setTitle("Technology Area");
    }
    if (val === 2) {
      setTitle("Category");
    }
    if (val === 3) {
      setTitle("Criteria");
    }
  };

  if (loading) {
    return (
      <>
        <div style={{ paddingTop: "1rem" }}>
          <Grid container direction="row" justifyContent="center">
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "12px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Loading
              </span>
              <CircularProgress disableShrink />
            </div>
          </Grid>
        </div>
      </>
    );
  }

  if (snack) {
    return (
      <Snackbars
        setSnack={setSnack}
        duration={duration}
        message={message}
        variant={variant}
      />
    );
  }

  return (
    <>
      <DialogComponent open={open} close={handleClose}>
        {title === "Domain" && (
          <CreateDomain
            setSnack={setSnack}
            message={setMessage}
            setDuration={setDuration}
            setVariant={setVariant}
            close={handleClose}
            loadDomain={loadDomain}
            data={modalData}
          />
        )}
        {title === "Technology Area" && (
          <CreateTechArea
            setSnack={setSnack}
            message={setMessage}
            setDuration={setDuration}
            setVariant={setVariant}
            close={handleClose}
            loadTechArea={loadTechArea}
            data={modalData}
          />
        )}
        {title === "Category" && (
          <CreateCategory
            setSnack={setSnack}
            message={setMessage}
            setDuration={setDuration}
            setVariant={setVariant}
            close={handleClose}
            loadCategory={loadCategory}
            data={modalData}
          />
        )}
        {title === "Criteria" && (
          <CreateCriteria
            setSnack={setSnack}
            message={setMessage}
            setDuration={setDuration}
            setVariant={setVariant}
            close={handleClose}
            loadCriteria={loadCriteria}
            data={modalData}
          />
        )}

        {/* <Form close={handleClose} data={modalData} /> */}
      </DialogComponent>
      <Title title={title} result={true} breadcrumb={breadcrumb}>
        <Grid
          direction="row"
          container
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button
            className="btncolor btnwidth"
            onClick={handleClickOpen}
            variant="contained"
            color="success"
          >
            Create New
          </Button>
        </Grid>
      </Title>
      <Tabcomponent
        setSnack={setSnack}
        message={setMessage}
        setDuration={setDuration}
        setVariant={setVariant}
        handleChange={handleChange}
        loadDomain={loadDomain}
        loadTechArea={loadTechArea}
        loadCategory={loadCategory}
        loadCriteria={loadCriteria}
      />
    </>
  );
}
