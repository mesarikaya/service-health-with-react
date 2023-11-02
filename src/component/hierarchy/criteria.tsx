import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store/store'
import DialogComponent from '../global/dialogComponent';
import Chipcomponent from '../global/chipcomponent'
import { Grid, TextField } from '@mui/material';
import { getCriteria } from '../../redux/store/criteria/Criteria.actions';
import CriteriaUpdate from './criteriaUpdate';

export default function Criteria(props) {
    const selectCriteria = (state) => state?.criteria
    const { criteria: criteriaData, loading } = useSelector(selectCriteria);
    const dispatch = useDispatch<AppDispatch>();

    const [open, setOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState<any[]>()

    const [criteriaSearch, setCriteriaSearch] = React.useState(criteriaData)

    React.useEffect(() => {
        setCriteriaSearch(criteriaData);
    }, [criteriaData])

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (val) => {
        setOpen(true);
    };

    const searchCriteria = (e) => {
        const updateData = criteriaData.filter(item => {

            return item.description.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1;
        })

        setCriteriaSearch(updateData);
    }

    return React.useMemo(() => (
        <>
            <DialogComponent open={open} close={handleClose}>
                <CriteriaUpdate setSnack={props?.setSnack} message={props?.message} setDuration={props?.setDuration} setVariant={props?.setVariant} loadCriteria={props.loadCriteria} close={handleClose} data={modalData} />
            </DialogComponent>
            <Grid style={{ padding: "15px" }} spacing={2}>
                <TextField className='searchControl' id="filled-basic" onChange={searchCriteria} placeholder="Search for a Technology" variant="filled" />
            </Grid>
            <div className='tabdata' style={{ height: "calc(100vh - 430px)", paddingTop: "0px", overflowY: "scroll" }}>
                <Grid style={{ padding: "15px" }} container spacing={2}>{criteriaSearch.length > 0 && criteriaSearch.map((row) => (
                    <Grid key={row.id} item xs={3}>
                        <> <Chipcomponent handleClickOpen={handleClickOpen} setModal={setModalData} data={row} /></>
                    </Grid>
                )
                )}
                </Grid>
            </div>
        </>
    ), [loading, criteriaData, criteriaSearch, searchCriteria, open])
}
