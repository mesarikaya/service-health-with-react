import * as React from "react";
import { useEffect } from "react";
import {
  Brightness6,
  CheckBox,
  CircleNotifications,
  Edit,
  IndeterminateCheckBox,
  Recommend,
  ReportProblem,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { Tooltip, CircularProgress, Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store/store";
import { green, red, yellow } from "@mui/material/colors";
import DialogComponent from "../global/dialogComponent";
import SiteUpdate from "./siteUpdate";
import {
  Column,
  Table,
  AutoSizer,
  defaultTableRowRenderer,
} from "react-virtualized";
import "react-virtualized/styles.css";
import Snackbars from "./../global/snackbars";

export default function SiteData(props) {
  const dispatch = useDispatch<AppDispatch>();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(-1);
  const tableRef = React.useRef<any>(null);

  const [modalData, setModalData] = React.useState(null);
  const selectEvent = (state) => state?.event;
  const [searchData, setSearchData] = React.useState<any[]>([]);

  useEffect(() => {
    setSearchData(props.sites);
  }, []);

  useEffect(() => {
    if (props.siteSearchText?.length !== 0) {
      setSearchData(
        props.sites.filter((item) => {
          return (
            item?.name
              ?.toLowerCase()
              .search(props.siteSearchText?.toLowerCase()) !== -1
          );
        })
      );
    } else {
      setSearchData(props.sites);
    }
  }, [props.siteSearchText, props.sites]);

  const handleClose = () => {
    setOpen(false);
  };

  const setInvestmentCriticalityToolTip = (val) => {
    if (val === "Low") {
      return (
        <Tooltip title={val}>
          <Recommend sx={{ color: green[900] }} />
        </Tooltip>
      );
    }

    if (val === "Medium") {
      return (
        <Tooltip title={val}>
          <Brightness6 sx={{ color: yellow[600] }} />
        </Tooltip>
      );
    }

    if (val === "High") {
      return (
        <Tooltip title={val}>
          <CircleNotifications sx={{ color: yellow[900] }} />
        </Tooltip>
      );
    }

    if (val === "Critical") {
      return (
        <Tooltip title={val}>
          <ReportProblem sx={{ color: red[900] }} />
        </Tooltip>
      );
    }
  };

  const cellRenderer = ({ rowIndex }) => {
    if (rowIndex !== selectedIndex) {
      return (
        <Details index={rowIndex}>
          <KeyboardArrowDown />
        </Details>
      );
    } else {
      return (
        <Details index={-1}>
          <KeyboardArrowUp />{" "}
        </Details>
      );
    }
  };

  React.useEffect(() => {
    if (tableRef?.current) {
      tableRef.current.recomputeRowHeights();
    }
  }, [selectedIndex]);

  const _getRowHeight = ({ index }) => (index === selectedIndex ? 190 : 115);

  const Details = ({ children, index }) => (
    <div style={{ cursor: "pointer" }} onClick={() => setSelectedIndex(index)}>
      {children}
    </div>
  );

  const rowRenderer = (props) => {
    const { index, style, className, key, rowData } = props;
    if (index === selectedIndex) {
      return (
        <div
          style={{
            ...style,
            display: "flex",
            width: style.width - 35,
            flexDirection: "column",
            height: "170px",
          }}
          className={"mainRow"}
          key={key}
        >
          {defaultTableRowRenderer({
            ...props,
            style: { width: style.width, height: 100 },
          })}
          <div>
            <Grid
              container
              spacing={2}
              style={{
                textTransform: "capitalize",
                fontWeight: "bold",
                width: "100%",
                borderTop: "1px solid #ccc",
              }}
            >
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                Latitude / Longitude
              </Grid>
              <Grid item xs={3}>
                Address
              </Grid>
              <Grid item xs={3}>
                Site Type
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={3}></Grid>
              <Grid item xs={3} style={{ padding: "20px 0px 20px 12px" }}>
                {rowData.latitude} / {rowData.longitude}
              </Grid>
              <Grid item xs={3} style={{ padding: "20px 6px" }}>
                {rowData.address}
              </Grid>
              <Grid item xs={3}></Grid>
            </Grid>
          </div>
        </div>
      );
    }
    return (
      <div
        style={{
          ...style,
          display: "flex",
          width: style.width - 35,
          flexDirection: "column",
          height: "100px",
        }}
        className={"mainRow"}
        key={key}
      >
        {defaultTableRowRenderer({
          ...props,
          style: { width: style.width, height: 100 },
        })}
      </div>
    );
  };

  return (
    <>
      {props?.status === "loading" && (
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
      )}
      {props?.status === "failed" && (
        <>
          <Snackbars message={props?.error?.message} variant={"error"} />
        </>
      )}
      {props?.status !== "loading" && (
        <>
          <DialogComponent open={open} close={handleClose}>
            <SiteUpdate
              setSnack={props?.setSnack}
              message={props?.message}
              setDuration={props?.setDuration}
              setVariant={props?.setVariant}
              close={handleClose}
              data={modalData}
            />
          </DialogComponent>
          <AutoSizer>
            {({ height, width }) => (
              <Table
                gridStyle={{ outline: "none" }}
                noRowsRenderer={() =>
                  searchData?.length < 1 ? <CircularProgress /> : null
                }
                width={width}
                height={height}
                headerHeight={40}
                rowHeight={_getRowHeight}
                sort
                sortBy
                rowCount={searchData.length}
                rowRenderer={rowRenderer}
                ref={tableRef}
                rowGetter={({ index }) => searchData[index]}
              >
                <Column
                  label=""
                  cellDataGetter={({ rowData }) => rowData.length}
                  cellRenderer={cellRenderer}
                  dataKey="index"
                  disableSort
                  width={80}
                />
                <Column width={200} label="Site" dataKey="name" />
                <Column width={200} label="Region" dataKey="region" />
                <Column
                  className={"enterprise"}
                  width={200}
                  label="Enterprise"
                  dataKey="enterprise"
                />
                <Column
                  width={250}
                  label="Business Group"
                  dataKey="businessGroup"
                />
                <Column width={300} label="Business" dataKey="reportingUnit" />
                <Column
                  width={200}
                  label="Investment Criticality"
                  dataKey="investmentCriticality"
                  cellRenderer={({ cellData }) =>
                    setInvestmentCriticalityToolTip(cellData?.description)
                  }
                />
                <Column
                  width={100}
                  label="Status"
                  dataKey="isActive"
                  cellRenderer={({ cellData }) =>
                    cellData ? <CheckBox /> : <IndeterminateCheckBox />
                  }
                />
                <Column
                  width={100}
                  label=""
                  dataKey="index"
                  cellRenderer={({ rowData }) => (
                    <div
                      onClick={() => {
                        setModalData(rowData);
                        setOpen(true);
                      }}
                    >
                      {" "}
                      <Edit />
                    </div>
                  )}
                />
              </Table>
            )}
          </AutoSizer>
        </>
      )}
    </>
  );
}
