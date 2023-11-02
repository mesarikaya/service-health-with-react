import React from "react";
import { useEffect } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import {
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
import moment from "moment";
import Dropdownchecksearch from './../global/dropdownchecksearch';
import Snackbars from './../global/snackbars';
import Dropdowncheck from "../global/dropdowncheck";

export default function FilterSite(props) {
    const dispatch = useDispatch<AppDispatch>();

    const selectSite = (state) => state?.site;

    const selectFilter = (state) => state?.filter;
    const { filter, status, error } = useSelector(selectFilter);

    const [countryList, setCountryList] = React.useState<string[]>([]);
    const [countrySelected, setCountrySelected] = React.useState<string[]>([]);

    const [enterpriseList, setEnterpriseList] = React.useState<string[]>([]);
    const [enterpriseSelected, setEnterpriseSelected] = React.useState<string[]>([]);

    const [businessGroupList, setBusinessGroupList] = React.useState<string[]>([]);
    const [businessGroupSelected, setBusinessGroupSelected] = React.useState<string[]>([]);

    const [businessList, setBusinessList] = React.useState<string[]>([]);
    const [businessSelected, setBusinessSelected] = React.useState<string[]>([]);

    const [criticalityList, setCriticalityList] = React.useState<string[]>([]);
    const [criticalitySelected, setCriticalitySelected] = React.useState<string[]>([]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [regionList, setRegionList] = React.useState<string[]>([]);
    const [regionSelected, setRegionSelected] = React.useState<string[]>([]);

    const [update, setUpdate] = React.useState(false);


    const [site, setDate] = React.useState([]);

    const selectSites = (state: { sites: any; }) => state?.sites
    const { sites: filteredSite } = useSelector(selectSites);

    // const filteredSite = [...props?.siteList]

    const siteChange = (e) => {
        setDate(e.target.value);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCountry = (e) => {
        const value = e.target.value;
        if (value[value?.length - 1] === "all") {
            setCountrySelected(
                countrySelected?.length === countryList?.length ? [] : countryList
            );
            return;
        }
        setCountrySelected(value);
        selectCountry(value)
        setUpdate(true);
    };
    const enterpriseChange = (e) => {
        const value = e.target.value;
        if (value[value?.length - 1] === "all") {
            setEnterpriseSelected(
                enterpriseSelected?.length === enterpriseList?.length ? [] : enterpriseList
            );
            return;
        }
        setEnterpriseSelected(value);
        selectEnterprise(value);
    };

    const businessGroupChange = (e) => {
        const value = e.target.value;
        if (value[value?.length - 1] === "all") {
            setBusinessGroupSelected(
                businessGroupSelected?.length === businessGroupList?.length
                    ? []
                    : businessGroupList
            );
            return;
        }
        setBusinessGroupSelected(value);
        selectBusinessGroup(value);
    };

    const businessChange = (e) => {
        const value = e.target.value;
        if (value[value?.length - 1] === "all") {
            setBusinessSelected(
                businessSelected?.length === businessList?.length ? [] : businessList
            );
            return;
        }
        setBusinessSelected(value);
        selectBusiness(value);
    };

    const criticalityChange = (e) => {
        const value = e.target.value;
        if (value[value?.length - 1] === "all") {
            setCriticalitySelected(
                criticalitySelected?.length === criticalityList?.length ? [] : criticalityList
            );
            return;
        }
        setCriticalitySelected(value);
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
        selectRegion(value);
        setUpdate(true);
    };

    const selectClose = () => {
    };

    const selectRegion = async (value) => {
        const filterSiteData = await filteredSite?.filter((x) => {
            return value.includes(x.region);
        });
        let country = filterSiteData?.map((x) => x.country);
        country = Array.from(new Set(country));
        setCountryList(country);
        setCountrySelected(country);
    };

    const selectCountry = async (value) => {
        // const filterSiteData = await filteredSite.filter((x) => {
        //     return value.includes(x.country);
        // });
        let filterSiteData = filteredSite.filter((group) => {
            return (
                (regionSelected?.length > 0
                    ? regionSelected.includes(group.region)
                    : true) &&
                (countrySelected?.length > 0
                    ? value.includes(group.country)
                    : true)
            );
        });
        let enterprise = filterSiteData?.map((x) => x.enterprise);
        enterprise = Array.from(new Set(enterprise));
        setEnterpriseList(enterprise);
        setEnterpriseSelected(enterprise);
    };

    const selectEnterprise = async (value) => {
        // let filters = filteredSite.filter((item) => {
        //     return value?.includes(item.enterprise);
        // });
        let filters = filteredSite.filter((group) => {
            return (
                (regionSelected?.length > 0
                    ? regionSelected.includes(group.region)
                    : true) &&
                (countrySelected?.length > 0
                    ? countrySelected.includes(group.country)
                    : true) &&
                (enterpriseSelected?.length > 0
                    ? value.includes(group.enterprise)
                    : true)
            );
        });
        let businessGroup = await filters.map((x) => x?.businessGroup);
        businessGroup = await Array.from(new Set(businessGroup));
        setBusinessGroupList(businessGroup);
        setBusinessGroupSelected(businessGroup);
    };

    const selectBusinessGroup = async (value) => {
        // let filters = filteredSite.filter((item) => {
        //     return value?.includes(item.businessGroup);
        // });
        let filters = filteredSite.filter((group) => {
            return (
                (regionSelected?.length > 0
                    ? regionSelected.includes(group.region)
                    : true) &&
                (countrySelected?.length > 0
                    ? countrySelected.includes(group.country)
                    : true) &&
                (enterpriseSelected?.length > 0
                    ? enterpriseSelected.includes(group.enterprise)
                    : true) &&
                (businessGroupSelected?.length > 0
                    ? value.includes(group.businessGroup)
                    : true)
            );
        });
        let business = await filters.map((x) => x?.reportingUnit);
        business = await Array.from(new Set(business));
        setBusinessList(business);
        setBusinessSelected(business);
        selectBusiness(businessSelected);
    };

    const selectBusiness = async (value) => {
        if (filteredSite.length > 0) {
            // let filters = filteredSite.filter((item) => {
            //     return value?.includes(item.reportingUnit);
            // });
            let filters = filteredSite.filter((group) => {
                return (
                    (regionSelected?.length > 0
                        ? regionSelected.includes(group.region)
                        : true) &&
                    (countrySelected?.length > 0
                        ? countrySelected.includes(group.country)
                        : true) &&
                    (enterpriseSelected?.length > 0
                        ? enterpriseSelected.includes(group.enterprise)
                        : true) &&
                    (businessGroupSelected?.length > 0
                        ? businessGroupSelected.includes(group.businessGroup)
                        : true) &&
                    (criticalitySelected?.length > 0
                        ? value.includes(group.reportingUnit)
                        : true)
                );
            });
            let criticality = await filters.map(
                (x) => x?.investmentCriticality.description
            );
            criticality = await Array.from(new Set(criticality));
            setCriticalityList(criticality);
            setCriticalitySelected(criticality);
        }
    };

    useEffect(() => {
        selectRegion(regionSelected);
    }, [regionSelected]);


    useEffect(() => {
        selectCountry(countrySelected);
    }, [countrySelected]);

    useEffect(() => {
        selectEnterprise(enterpriseSelected);
    }, [enterpriseSelected]);

    useEffect(() => {
        selectBusinessGroup(businessGroupSelected);
    }, [businessGroupSelected]);

    useEffect(() => {
        selectBusiness(businessSelected);
    }, [businessSelected]);


    const filterData = async () => {
        const data =
            (await filteredSite?.length) > 0 &&
            filteredSite.filter((group) => {
                return (
                    (regionSelected?.length > 0
                        ? regionSelected.includes(group.region)
                        : true) &&
                    (countrySelected?.length > 0
                        ? countrySelected.includes(group.country)
                        : true) &&
                    (enterpriseSelected?.length > 0
                        ? enterpriseSelected.includes(group.enterprise)
                        : true) &&
                    (businessGroupSelected?.length > 0
                        ? businessGroupSelected.includes(group.businessGroup)
                        : true) &&
                    (businessSelected?.length > 0
                        ? businessSelected.includes(group.reportingUnit)
                        : true) &&
                    (criticalitySelected?.length > 0
                        ? criticalitySelected.includes(group.investmentCriticality.description)
                        : true)
                );
            });
        console.log(data)
        props.setSiteList(data);
    };


    const dataFilter = async () => {
        filterData();
    };

    const dataReset = () => {
        props?.resetFilter();
        filterDefault()
    };

    const filterDefault = async () => {
        let country = filteredSite?.map((x) => x.country);
        country = Array.from(new Set(country));
        setCountryList(country);
        setCountrySelected(country);

        let enterprise = filteredSite?.map((x) => x.enterprise);
        enterprise = Array.from(new Set(enterprise));
        setEnterpriseList(enterprise);
        setEnterpriseSelected(enterprise);

        let businessgroup = filteredSite?.map((x) => x.businessGroup);
        businessgroup = Array.from(new Set(businessgroup));
        setBusinessGroupList(businessgroup);
        setBusinessGroupSelected(businessgroup);

        let business = filteredSite?.map((x) => x.reportingUnit);
        business = Array.from(new Set(business));
        setBusinessList(business);
        setBusinessSelected(business);

        let criticality = filteredSite?.map((x) => x?.investmentCriticality?.description);
        criticality = Array.from(new Set(criticality));
        setCriticalityList(criticality);
        setCriticalitySelected(criticality);

        let region = filteredSite?.map((x) => x.region);
        region = Array.from(new Set(region));
        setRegionList(region);
        setRegionSelected(region);
    };

    useEffect(() => {
        filterDefault()
    }, [filteredSite])

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
                    Enterprise
                </Typography>
                <Dropdownchecksearch
                    handleClose={selectClose}
                    width={270}
                    selected={enterpriseSelected}
                    handleChange={enterpriseChange}
                    selectall={true}
                    name={enterpriseList}
                />
                {/* <Dropdowncheck handleClose={selectClose} width={270} selected={domainSelected} handleChange={domainChange} selectall={true} name={domainList} /> */}
                <Typography
                    style={{ lineHeight: "8px" }}
                    pl={"10px"}
                    variant="caption"
                    display="block"
                    gutterBottom
                >
                    Business Group
                </Typography>
                <Dropdownchecksearch
                    handleClose={selectClose}
                    width={270}
                    selected={businessGroupSelected}
                    handleChange={businessGroupChange}
                    selectall={true}
                    name={businessGroupList}
                />
                {/* <Dropdowncheck handleClose={selectClose} width={270} selected={technologySelected} handleChange={technologyChange} selectall={true} name={technologyList} /> */}
                <Typography
                    style={{ lineHeight: "8px" }}
                    pl={"10px"}
                    variant="caption"
                    display="block"
                    gutterBottom
                >
                    Business
                </Typography>
                <Dropdownchecksearch
                    handleClose={selectClose}
                    width={270}
                    selected={businessSelected}
                    handleChange={businessChange}
                    selectall={true}
                    name={businessList}
                />
                {/* <Dropdowncheck handleClose={selectClose} width={270} selected={categorySelected} handleChange={categoryChange} selectall={true} name={categoryList} /> */}
                <Typography
                    style={{ lineHeight: "8px" }}
                    pl={"10px"}
                    variant="caption"
                    display="block"
                    gutterBottom
                >
                    Criticality
                </Typography>
                <Dropdownchecksearch
                    handleClose={selectClose}
                    width={270}
                    selected={criticalitySelected}
                    handleChange={criticalityChange}
                    selectall={true}
                    name={criticalityList}
                />
                {/* <Typography
                    style={{ lineHeight: "8px" }}
                    pl={"10px"}
                    variant="caption"
                    display="block"
                    gutterBottom
                >
                    Site Type
                </Typography>
                <Dropdownchecksearch
                    handleClose={selectClose}
                    width={270}
                    selected={criticalitySelected}
                    handleChange={criticalityChange}
                    selectall={true}
                    name={criticalityList}
                /> */}
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
