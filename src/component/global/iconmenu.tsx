import React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import {
  ArrowDownward,
  ArrowUpward,
  Close,
  FilterList,
} from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { selectDashboard } from "../../redux/store/dashboard/Dashboard.selectors";
import type { AppDispatch } from "../../redux/store/store";
import {
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Dropdowncheck from "./dropdowncheck";
import moment from "moment";
import Dropdownchecksearch from "./dropdownchecksearch";
import Snackbars from "./snackbars";

export default function IconMenu(props) {
  const dispatch = useDispatch<AppDispatch>();

  const selectSite = (state) => state?.site;

  const { site: siteData } = useSelector(selectSite);

  const selectSiteEvent = (state) => state?.event;
  const { filterSite } = useSelector(selectSiteEvent);

  const selectFilter = (state) => state?.filter;
  const { filter, status, error } = useSelector(selectFilter);

  const [countryList, setCountryList] = React.useState([]);
  const [countrySelected, setCountrySelected] = React.useState<string[]>([]);

  const [domainList, setDomainList] = React.useState([]);
  const [domainSelected, setDomainSelected] = React.useState<string[]>([]);

  const [technologyList, setTechnologyList] = React.useState([]);
  const [technologySelected, setTechnologySelected] = React.useState<string[]>(
    []
  );

  const [categoryList, setCategoryList] = React.useState([]);
  const [categorySelected, setCategorySelected] = React.useState<string[]>([]);

  const [criteriaList, setCriteriaLists] = React.useState([]);
  const [criteriaSelected, setCriteriaSelected] = React.useState<string[]>([]);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [regionList, setRegionList] = React.useState([]);
  const [regionSelected, setRegionSelected] = React.useState<string[]>([]);

  const [sort, setSort] = React.useState("");

  const [update, setUpdate] = React.useState(false);

  const handleSort = (event) => {
    setSort(event.target.value);
  };

  const [date, setDate] = React.useState([]);

  const dateChange = (e) => {
    setDate(e.target.value);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dashBoard = useSelector(selectDashboard);

  const handleCountry = (e) => {
    const value = e.target.value;
    if (value[value?.length - 1] === "all") {
      setCountrySelected(
        countrySelected?.length === countryList?.length ? [] : countryList
      );
      return;
    }
    setCountrySelected(value);
    setUpdate(true);
  };
  const domainChange = (e) => {
    const value = e.target.value;
    if (value[value?.length - 1] === "all") {
      setDomainSelected(
        domainSelected?.length === domainList?.length ? [] : domainList
      );
      return;
    }
    setDomainSelected(value);
    selectTechno(value);
  };

  const technologyChange = (e) => {
    const value = e.target.value;
    if (value[value?.length - 1] === "all") {
      setTechnologySelected(
        technologySelected?.length === technologyList?.length
          ? []
          : technologyList
      );
      return;
    }
    setTechnologySelected(value);
    selectCategory(value);
  };

  const categoryChange = (e) => {
    const value = e.target.value;
    if (value[value?.length - 1] === "all") {
      setCategorySelected(
        categorySelected?.length === categoryList?.length ? [] : categoryList
      );
      return;
    }
    setCategorySelected(value);
    selectCriteria(value);
  };

  const criteriaChange = (e) => {
    const value = e.target.value;
    if (value[value?.length - 1] === "all") {
      setCriteriaSelected(
        criteriaSelected?.length === criteriaList?.length ? [] : criteriaList
      );
      return;
    }
    setCriteriaSelected(value);
  };

  const handleRegion = (e) => {
    const value = e.target.value;
    if (value[value?.length - 1] === "all") {
      setRegionSelected(
        setRegionSelected?.length === regionList.length ? [] : regionList
      );
      return;
    }
    setRegionSelected(value);
    // setRegionValue(e.target.value);
    selectCountry(value);
    setUpdate(true);
  };

  const selectClose = () => {
    // setTechnology(technologySelected)
    // setCriteria(criteriaSelected);
    // setCategory(categorySelected);
    // setDomain(domainSelected);
    // setCountryValue(countrySelected)
  };

  const selectCountry = async (value) => {
    const filterSiteData = await siteData.filter((x) => {
      return value.includes(x.region);
    });
    let country = filterSiteData?.map((x) => x.country);
    country = Array.from(new Set(country));
    setCountryList(country);
    setCountrySelected(country);
  };

  const selectTechno = async (value) => {
    let filters = filter.filter((item) => {
      return value?.includes(item.domainDescription);
    });
    let technologyLists = await filters.map((x) => x?.techAreaDescription);
    technologyLists = await Array.from(new Set(technologyLists));
    setTechnologyList(technologyLists);
    setTechnologySelected(technologyLists);
  };

  const selectCategory = async (value) => {
    let filters = filter.filter((item) => {
      return value?.includes(item.techAreaDescription);
    });
    let categoryLists = await filters.map((x) => x?.categoryDescription);
    categoryLists = await Array.from(new Set(categoryLists));
    setCategoryList(categoryLists);
    setCategorySelected(categoryLists);
    selectCriteria(categorySelected);
  };

  const selectCriteria = async (value) => {
    if (filter.length > 0) {
      let filters = filter.filter((item) => {
        return value?.includes(item.categoryDescription);
      });
      let criteriaLists = await filters.map(
        (x) => x?.assessmentCriteriaDescription
      );
      criteriaLists = await Array.from(new Set(criteriaLists));
      setCriteriaLists(criteriaLists);
      setCriteriaSelected(criteriaLists);
    }
  };

  useEffect(() => {
    selectTechno(domainSelected);
  }, [domainSelected]);

  useEffect(() => {
    selectCategory(technologySelected);
    // selectCriteria(categorySelected)
  }, [technologySelected]);

  useEffect(() => {
    selectCriteria(categorySelected);
  }, [categorySelected]);

  const filterCountry = async () => {
    if (!regionSelected.length) {
      setRegionSelected(props.region);
      setRegionList(props.region);
    }

    let country = await filterSite?.map((x) => x.country);
    country = Array.from(new Set(country));
    // setCountryList(country);
    setCountrySelected(country);
  };

  const filterDefault = async () => {
    let domainLists = await filter?.map((x) => x?.domainDescription);
    domainLists = Array.from(new Set(domainLists));
    setDomainList(domainLists);

    setDomainSelected(domainLists);

    let technologyLists = await filter?.map((x) => x?.techAreaDescription);
    technologyLists = await Array.from(new Set(technologyLists));
    setTechnologyList(technologyLists);

    setTechnologySelected(technologyLists);

    let categoryLists = await filter?.map((x) => x?.categoryDescription);
    categoryLists = await Array.from(new Set(categoryLists));
    setCategoryList(categoryLists);
    setCategorySelected(categoryLists);

    let criteriaLists = await filter?.map(
      (x) => x?.assessmentCriteriaDescription
    );
    criteriaLists = await Array.from(new Set(criteriaLists));
    setCriteriaLists(criteriaLists);
    setCriteriaSelected(criteriaLists);
  };

  const firstCountryLoad = async () => {
    let country = await siteData?.map((x) => x.country);
    country = Array.from(new Set(country));
    setCountryList(country);
  }

  useEffect(() => {
    firstCountryLoad();
  }, [siteData]);

  useEffect(() => {
    filterCountry();
  }, [filterSite]);

  useEffect(() => {
    if (filter.length > 0) {
      filterDefault();
      filterCountry();
    }
  }, [filter]);

  useEffect(() => {
    dispatch({
      type: "GET_DOMAIN_EVENT",
      payload: domainSelected,
    });
    dispatch({
      type: "GET_TECHNOLOGY_EVENT",
      payload: technologySelected,
    });
    dispatch({
      type: "GET_CATEGORY_EVENT",
      payload: categorySelected,
    });
    dispatch({
      type: "GET_CRITERIA_EVENT",
      payload: criteriaSelected,
    });
  }, [
    dispatch,
    filter,
    filterSite,
    technologySelected,
    criteriaSelected,
    categorySelected,
    domainSelected,
  ]);

  const filterDashboard = async () => {
    const data =
      (await dashBoard?.length) > 0 &&
      dashBoard.filter((group) => {
        if (group.assessmentResults.length > 0) {
          return group.assessmentResults.some(
            (item) =>
              (domainSelected?.length > 0
                ? domainSelected.includes(
                  item["assessmentCriteria"]["category"]["techArea"][
                  "domain"
                  ]["description"]
                )
                : true) &&
              (technologySelected?.length > 0
                ? technologySelected.includes(
                  item.assessmentCriteria.category.techArea.description
                )
                : true) &&
              (categorySelected?.length > 0
                ? categorySelected.includes(
                  item.assessmentCriteria.category.description
                )
                : true) &&
              (criteriaSelected?.length > 0
                ? criteriaSelected.includes(item.assessmentCriteria.description)
                : true) &&
              (date?.length > 0
                ? moment.utc(item.createDate).format("D M YYYY") ===
                moment(date).format("D M YYYY")
                : true)
          );
        } else {
          return (
            (domainSelected?.length > 0
              ? domainSelected.includes(group.domainDescription)
              : true) &&
            (technologySelected?.length > 0
              ? technologySelected.includes(group.techAreaDescription)
              : true) &&
            (categorySelected?.length > 0
              ? categorySelected.includes(group.categoryDescription)
              : true) &&
            (criteriaSelected?.length > 0
              ? criteriaSelected.includes(group.assessmentCriteriaDescription)
              : true) &&
            (date?.length > 0
              ? moment.utc(group?.createDate).format("D M YYYY") ===
              moment(date).format("D M YYYY")
              : true)
          );
        }
      });
    if (sort === "created_down") {
      await data.sort(custom_sort_down);
    }
    if (sort === "created_up") {
      await data.sort(custom_sort_up);
    }
    if (sort === "updated_up") {
      await data.sort(custom_sort_update_up);
    }
    if (sort === "updated_down") {
      await data.sort(custom_sort_update_down);
    }

    dispatch({
      type: "GET_FILTER_DATA",
      payload: data,
    });
  };

  useEffect(() => {
    filterDashboard();
  }, [dispatch, dashBoard]);

  const filterSiteCountry = async () => {
    if (update) {
      const filterSiteData = await siteData.filter((x) => {
        return (
          (regionSelected?.length > 0
            ? regionSelected.includes(x?.region)
            : true) &&
          (countrySelected?.length > 0
            ? countrySelected.includes(x.country)
            : true)
        );
      });
      await dispatch({
        type: "GET_FILTER_SITE",
        payload: filterSiteData,
      });
      setUpdate(false);
    }
  };

  const dataFilter = async () => {
    filterSiteCountry();
    filterDashboard();
  };

  const dataReset = () => {
    filterDefault();
    dispatch({
      type: "GET_FILTER_DATA",
      payload: dashBoard,
    });
    setCategorySelected(categoryList);
    setTechnologySelected(technologyList);
    setDomainSelected(domainList);
    setSort("");
    setDate([]);
  };

  function custom_sort_down(a, b) {
    return (
      new Date(a?.assessmentResults[0]?.createDate).getTime() -
      new Date(b?.assessmentResults[0]?.createDate).getTime()
    );
  }
  function custom_sort_up(a, b) {
    return (
      new Date(b?.assessmentResults[0]?.createDate).getTime() -
      new Date(a?.assessmentResults[0]?.createDate).getTime()
    );
  }
  function custom_sort_update_up(a, b) {
    return (
      new Date(b?.assessmentResults[0]?.updateDate).getTime() -
      new Date(a?.assessmentResults[0]?.updateDate).getTime()
    );
  }
  function custom_sort_update_down(a, b) {
    return (
      new Date(a?.assessmentResults[0]?.updateDate).getTime() -
      new Date(b?.assessmentResults[0]?.updateDate).getTime()
    );
  }

  if (status === "failed") {
    return (
      <>
        <Snackbars message={error?.message} variant={"error"} />
      </>);
  }

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <FilterList />
      </Button>
      <Menu
        sx={{ top: "-50px", left: "13px" }}
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="filterMenu"
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Grid container justifyContent="space-between">
          {/* <IgnoreDisabledListItem disabled> */}
          <Typography
            pl={"10px"}
            style={{
              fontSize: "18px",
              fontWeight: "700",
              paddingTop: "8px",
              paddingBottom: "10px",
            }}
            variant="caption"
            display="block"
            gutterBottom
          >
            Filter
          </Typography>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Grid>
        {/* </IgnoreDisabledListItem> */}
        <Typography
          style={{ lineHeight: "8px" }}
          pl={"10px"}
          variant="caption"
          display="block"
          gutterBottom
        >
          Region
        </Typography>
        <Dropdowncheck
          handleClose={selectClose}
          width={270}
          selected={regionSelected}
          handleChange={handleRegion}
          selectall={false}
          name={regionList}
        />
        {/* <Dropdown width={270} value={regionValue} handleChange={handleRegion} name={props.region} /> */}
        <Typography
          style={{ lineHeight: "8px" }}
          pl={"10px"}
          variant="caption"
          display="block"
          gutterBottom
        >
          Country
        </Typography>
        <Dropdownchecksearch
          handleClose={selectClose}
          width={270}
          selected={countrySelected}
          handleChange={handleCountry}
          selectall={true}
          name={countryList}
          setUpdate={setUpdate}
        />
        {/* <Dropdowncheck handleClose={selectClose} width={270} selected={countrySelected} handleChange={handleCountry} selectall={true} name={countryList} /> */}
        <Typography
          style={{ lineHeight: "8px" }}
          pl={"10px"}
          variant="caption"
          display="block"
          gutterBottom
        >
          Domain
        </Typography>
        <Dropdownchecksearch
          handleClose={selectClose}
          width={270}
          selected={domainSelected}
          handleChange={domainChange}
          selectall={true}
          name={domainList}
        />
        {/* <Dropdowncheck handleClose={selectClose} width={270} selected={domainSelected} handleChange={domainChange} selectall={true} name={domainList} /> */}
        <Typography
          style={{ lineHeight: "8px" }}
          pl={"10px"}
          variant="caption"
          display="block"
          gutterBottom
        >
          Technology Area
        </Typography>
        <Dropdownchecksearch
          handleClose={selectClose}
          width={270}
          selected={technologySelected}
          handleChange={technologyChange}
          selectall={true}
          name={technologyList}
        />
        {/* <Dropdowncheck handleClose={selectClose} width={270} selected={technologySelected} handleChange={technologyChange} selectall={true} name={technologyList} /> */}
        <Typography
          style={{ lineHeight: "8px" }}
          pl={"10px"}
          variant="caption"
          display="block"
          gutterBottom
        >
          Category
        </Typography>
        <Dropdownchecksearch
          handleClose={selectClose}
          width={270}
          selected={categorySelected}
          handleChange={categoryChange}
          selectall={true}
          name={categoryList}
        />
        {/* <Dropdowncheck handleClose={selectClose} width={270} selected={categorySelected} handleChange={categoryChange} selectall={true} name={categoryList} /> */}
        <Typography
          style={{ lineHeight: "8px" }}
          pl={"10px"}
          variant="caption"
          display="block"
          gutterBottom
        >
          Criteria
        </Typography>
        <Dropdownchecksearch
          handleClose={selectClose}
          width={270}
          selected={criteriaSelected}
          handleChange={criteriaChange}
          selectall={true}
          name={criteriaList}
        />
        {/* <Dropdowncheck handleClose={selectClose} width={270} selected={criteriaSelected} handleChange={criteriaChange} selectall={true} name={criteriaList} /> */}
        <Grid container style={{ padding: "0px 8px" }}>
          <Grid xs={6} style={{ paddingRight: "5px" }}>
            <Typography
              className="datemenu"
              style={{ lineHeight: "8px" }}
              mb={"10px"}
              variant="caption"
              display="block"
              gutterBottom
            >
              Sort By
            </Typography>
            <FormControl fullWidth>
              <Select
                style={{ fontSize: "13px" }}
                labelId="demo-simple-select-standard-label"
                SelectDisplayProps={{ style: { padding: "5px 10px" } }}
                className="sortBy"
                id="demo-simple-select-standard"
                displayEmpty
                label="Sort By"
                value={sort}
                onChange={handleSort}
              >
                <MenuItem
                  style={{ fontSize: 13 }}
                  onClick={() => setSort("")}
                  value="created_up"
                >
                  Date Created &nbsp;
                  <ArrowUpward
                    style={{ fontSize: 13, verticalAlign: "text-top" }}
                  />
                </MenuItem>
                <MenuItem
                  style={{ fontSize: 13 }}
                  onClick={() => setSort("")}
                  value="created_down"
                >
                  Date Created &nbsp;
                  <ArrowDownward
                    style={{ fontSize: 13, verticalAlign: "text-top" }}
                  />
                </MenuItem>
                <MenuItem
                  style={{ fontSize: 13 }}
                  onClick={() => setSort("")}
                  value="updated_up"
                >
                  Date Updated &nbsp;
                  <ArrowUpward
                    style={{ fontSize: 13, verticalAlign: "text-top" }}
                  />
                </MenuItem>
                <MenuItem
                  style={{ fontSize: 13 }}
                  onClick={(val) => setSort("")}
                  value="updated_down"
                >
                  Date Updated &nbsp;
                  <ArrowDownward
                    style={{ fontSize: 13, verticalAlign: "text-top" }}
                  />
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={6} style={{ paddingLeft: "10px" }}>
            <Typography
              className="datemenu"
              style={{ lineHeight: "8px" }}
              mb={"10px"}
              variant="caption"
              display="block"
              gutterBottom
            >
              Date Picker
            </Typography>
            <TextField
              inputProps={{ sx: { padding: "5px", fontSize: "13px" } }}
              value={date}
              onChange={dateChange}
              type="date"
              variant="outlined"
            />
          </Grid>
        </Grid>
        <Grid container style={{ padding: "10px" }}>
          <Button onClick={dataFilter} fullWidth variant="contained">
            Apply Filter
          </Button>
          <Button
            onClick={dataReset}
            style={{ marginTop: "10px" }}
            fullWidth
            variant="outlined"
          >
            Clear Filter
          </Button>
        </Grid>
      </Menu>
    </div>
  );
}
