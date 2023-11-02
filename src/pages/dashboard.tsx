import { Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableData from "../component/dashboard/tableData";
import IconMenu from "../component/global/iconmenu";
import Title from "../component/global/title/title";
import { getDashboard } from "../redux/store/dashboard/Dashboard.actions";
import type { AppDispatch } from "../redux/store/store";
import { getSite } from "../redux/store/site/Site.actions";
import { getFilter } from "./../redux/store/filter/filter.action";
import { sitesUpdate, downloadSiteAttachment } from "./../api";
import axios from "axios";
import Snackbars from "../component/global/snackbars";

const region = ["EMEA", "AP", "LA", "NA"];

export default function Dashboard() {
  const [value, setValue] = React.useState<string | null>(region[0]);
  const [inputValue, setInputValue] = React.useState("");
  const selectSite = (state) => state?.site;
  const selectSiteEvent = (state) => state?.event;
  const { filterSite } = useSelector(selectSiteEvent);
  const { site: siteData, status, error } = useSelector(selectSite);
  const [site, setSite] = React.useState<string>(siteData[0]?.site);
  const [siteId, setSiteId] = React.useState<number>(siteData[0]?.siteId);
  const [siteDetailData, setSiteDetailData] = React.useState<any | null>();
  const [attachment, setAttachment] = React.useState<any | null>();
  const [snack, setSnack] = React.useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const loadSite = async () => {
    dispatch(getSite(region));
    dispatch(getFilter());
    if (site !== undefined) {
      dispatch(getDashboard(site));
    }
  };

  useEffect(() => {
    loadSite();
  }, [dispatch]);

  useEffect(() => {
    setSite(siteData[0]?.site);
    setSiteId(siteData[0]?.siteId);
    setInputValue(siteData[0]?.site);
    dispatch({
      type: "GET_FILTER_SITE",
      payload: siteData,
    });
  }, [dispatch, siteData]);

  useEffect(() => {
    setSite(filterSite[0]?.site);
    setSiteId(filterSite[0]?.siteId);
    setInputValue(filterSite[0]?.site);
  }, [filterSite]);

  useEffect(() => {
    if (site !== undefined && siteId !== undefined && siteId !== null) {
      dispatch(getDashboard(site));
      axios
        .get(sitesUpdate(siteId), {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        })
        .then((respond) => setSiteDetailData(respond.data))
        .catch((error) => {
          console.error(error, "Passed site");
        });
      handleDownload(siteId);
    }
  }, [dispatch, site]);

  const handleDownload = (id) => {
    axios
      .get(downloadSiteAttachment(id), {
        headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
      })
      .then((resp) => {
        setAttachment(resp.data);
      });
  };

  const breadcrumb = [
    {
      link: "/",
      title: "Dashboard",
    },
  ];

  const setSnackState = (snackState: boolean) => {
    setSnack(snackState);
  };

  return (
    <>
      {snack && (
        <Snackbars
          duration={3000}
          setSnack={setSnackState}
          message={"Criteria Succefully updated!"}
          variant={"success"}
        />
      )}
      <Title
        title={site}
        data={siteDetailData}
        attachment={attachment}
        breadcrumb={breadcrumb}
        icon={true}
        handleDownload={handleDownload}
      >
        <Grid
          direction="row"
          sx={{ display: "flex", justifyContent: "flex-end" }}
          justifyContent="flex-end"
          alignItems="center"
        >
          <Grid item>
            {siteData?.length > 1 && (
              <>
                <Autocomplete
                  value={site || ""}
                  defaultValue={site || ""}
                  onChange={(event: any, newValue: any | null) => {
                    setSite(newValue?.site);
                    setSiteId(newValue?.siteId);
                  }}
                  autoHighlight
                  getOptionLabel={(option: Object | string) =>
                    option["site"] || option
                  }
                  isOptionEqualToValue={(option, value) => {
                    return option["site"] === value;
                  }}
                  inputValue={inputValue}
                  onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                  }}
                  id="controllable-states-demo"
                  disableClearable={value !== null}
                  options={filterSite}
                  sx={{ width: 250 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Site" />
                  )}
                />
              </>
            )}
          </Grid>
          <Grid>
            <IconMenu value={value} region={region} />
          </Grid>
        </Grid>
      </Title>
      <div
        style={{
          backgroundColor: "#f4f4f4",
          padding: "15px",
          height: "calc(100vh - 240px)",
          overflowY: "scroll",
          overflowX: "hidden",
        }}
      >
        <TableData setSnack={setSnackState} />
      </div>
    </>
  );
}
