import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SiteData from './../component/site/siteData';
import Title from './../component/global/title/title';
import { Grid, Button } from '@mui/material';
import CreateSite from '../component/site/createSite';
import DialogComponent from '../component/global/dialogComponent';
import { AppDispatch } from '../redux/store/store';
import { getSites } from '../redux/store/sites/Sites.actions';
import { getSiteLocation } from '../redux/store/locationApiSitesData/allLocationSites.action';
import { getInvestmentCriticalities } from '../redux/store/investmentCriticality/investmentCriticalities.action';
import Snackbars from './../component/global/snackbars';
import FilterSite from './../component/site/filterSite';

export default function Site() {
  const dispatch = useDispatch<AppDispatch>();
  const selectInvestmentCriticality = (state: { investmentCriticality: any; }) => state?.investmentCriticality;
  const { investmentCriticality } = useSelector(selectInvestmentCriticality);
  const selectLocationApiSiteNames = (state: { locationApiSiteNames: any; }) => state?.locationApiSiteNames;
  const { siteNames } = useSelector(selectLocationApiSiteNames);
  const selectSites = (state: { sites: any; }) => state?.sites
  const { sites, status, error } = useSelector(selectSites);
  const [siteList, setSiteList] = React.useState<string[]>(sites);
  const [open, setOpen] = React.useState(false);
  const [siteSearchText, setSiteSearchText] = React.useState<string>("");
  const [snack, setSnack] = React.useState(false);
  const [variant, setVariant] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [duration, setDuration] = React.useState(null);

  const handleSiteSearchText = (event: any) => {
    event.preventDefault();
    setSiteSearchText(event.target.value);
  }

  const resetFilter = () => {
    setSiteList(sites)
  }

  useEffect(() => {
    setSiteList(sites)
  }, [sites])

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = (val: any) => {
    setOpen(true);
  };

  useEffect(() => {
    dispatch(getSites());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getInvestmentCriticalities());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getSiteLocation());
  }, [dispatch]);

  const breadcrumb = [
    {
      title: "Configure",
      link: "/"
    },
    {
      title: "Sites",
      link: "/configure/sites"
    }
  ]
  return (
    <>
      {snack && <Snackbars setSnack={setSnack} duration={duration} message={message} variant={variant} />}
      <DialogComponent open={open} close={handleClose}>
        <CreateSite setSnack={setSnack} message={setMessage} setDuration={setDuration} setVariant={setVariant} close={handleClose} locationSites={siteNames} criticalities={investmentCriticality} />
      </DialogComponent>
      <Title title="Sites" breadcrumb={breadcrumb} search={true} handleSiteSearchText={handleSiteSearchText}>
        <Grid direction="row" container justifyContent="flex-end" alignItems="center" >
          <Grid item>
            <Button className='btncolor btnwidth' onClick={handleClickOpen} variant="contained" color="success">
              Create New
            </Button>
          </Grid>
          <Grid>
            <FilterSite siteList={siteList} resetFilter={resetFilter} setSiteList={setSiteList} />
          </Grid>
        </Grid>
      </Title>
      <div className='tableWrapper' style={{ backgroundColor: "#f4f4f4", padding: "10px 20px", height: "calc(100vh - 240px)" }}>
        <SiteData setSnack={setSnack} message={setMessage} setDuration={setDuration} setVariant={setVariant} error={error} sites={siteList} status={status} siteSearchText={siteSearchText} />
      </div>
    </>
  )
}
