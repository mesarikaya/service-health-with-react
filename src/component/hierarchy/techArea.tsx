import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store/store'
import DialogComponent from '../global/dialogComponent';
import Chipcomponent from '../global/chipcomponent'
import { Grid, TextField } from '@mui/material';
import { getTechArea } from '../../redux/store/techArea/TechArea.actions';
import TechnologyUpdate from './techAreaUpdate';

export default function Technology(props) {
    const selectTechArea = (state) => state?.techArea;
    const { techArea: technologyData, loading } = useSelector(selectTechArea);
    const dispatch = useDispatch<AppDispatch>();

    const [open, setOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState<any[]>()
    const [domainData, setDomainData] = React.useState<any[]>()

    const [technologySearch, setTechnologySearch] = React.useState(technologyData)

    React.useEffect(() => {
        setTechnologySearch(technologyData);
    }, [technologyData])

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (val) => {
        setOpen(true);
    };

    const searchTechnology = (e) => {
        const updateData = technologyData.filter(item => {

            return item.description.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1;
        })
        setTechnologySearch(updateData);
    }

    return React.useMemo(() => (
        <>
            <DialogComponent open={open} close={handleClose}>
                <TechnologyUpdate setSnack={props?.setSnack} message={props?.message} setDuration={props?.setDuration} setVariant={props?.setVariant} close={handleClose} loadTechArea={props.loadTechArea} data={modalData} />
            </DialogComponent>
            <Grid style={{ padding: "15px" }} spacing={2}>
                <TextField className='searchControl' id="filled-basic" onChange={searchTechnology} placeholder="Search for a Technology" variant="filled" />
            </Grid>
            <div className='tabdata' style={{ height: "calc(100vh - 430px)", paddingTop: "0px", overflowY: "scroll" }}>
                <Grid style={{ padding: "15px" }} container spacing={2}>
                    {technologySearch?.length > 0 && technologySearch.map((row) => (
                        <Grid key={row.id} item xs={3} style={{ paddingTop: "0px !important" }}>
                            <> <Chipcomponent handleClickOpen={handleClickOpen} setModal={setModalData} setDomainData={setDomainData} data={row} /></>
                        </Grid>
                    )
                    )}
                </Grid>
            </div>
        </>
    ), [loading, technologyData, technologySearch, open])
}
