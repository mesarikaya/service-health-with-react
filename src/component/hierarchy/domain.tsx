import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store/store'
import DialogComponent from '../global/dialogComponent';
import Chipcomponent from '../global/chipcomponent'
import { getDomain } from '../../redux/store/domain/Domain.actions';
import { Grid } from '@mui/material';
import DomainUpdate from './domainUpdate';

export default function Domain(props) {
    const selectDomain = (state) => state?.domain
    const { domain: domainData, loading } = useSelector(selectDomain);
    const dispatch = useDispatch<AppDispatch>();

    const [open, setOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState<any[]>()
    const [create, setCreate] = React.useState<any[]>()

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (val) => {
        setOpen(true);
    };
    return React.useMemo(() => (
        <>
            <DialogComponent open={open} close={handleClose}>
                <DomainUpdate setSnack={props?.setSnack} message={props?.message} setDuration={props?.setDuration} setVariant={props?.setVariant} close={handleClose} loadDomain={props.loadDomain} setCreate={setCreate} data={modalData} />
            </DialogComponent>
            <div className='tabdata' style={{ height: "calc(100vh - 350px)", paddingTop:"0px", overflowY: "scroll"}}>
                <Grid style={{ padding: "15px" }} container spacing={2}>
                    {domainData?.length > 0 && domainData.map((row) => (
                        <Grid key={row.id} item xs={3} style={{ paddingTop: "0px !important" }}>
                            <>
                                <Chipcomponent handleClickOpen={handleClickOpen} setModal={setModalData} data={row} />
                            </>
                        </Grid>
                    )
                    )} 
                </Grid>
            </div>
        </>
    ), [loading, open, domainData])
}
