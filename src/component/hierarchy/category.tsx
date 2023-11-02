import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { AppDispatch } from '../../redux/store/store'
import DialogComponent from '../global/dialogComponent';
import Chipcomponent from '../global/chipcomponent'
import { Grid, TextField } from '@mui/material';
import { getCategory } from '../../redux/store/category/Category.actions';
import CategoryUpdate from './categoryUpdate';

export default function Category(props) {
    const selectCategory = (state) => state?.category
    const { category: categoryData, loading } = useSelector(selectCategory);
    const dispatch = useDispatch<AppDispatch>();

    const [open, setOpen] = React.useState(false);
    const [modalData, setModalData] = React.useState<any[]>();
    const [domainData, setDomainData] = React.useState<any[]>();
    const [technologyData, setTechnologyData] = React.useState<any[]>();

    const [categorySearch, setCategorySearch] = React.useState(categoryData);

    React.useEffect(() => {
        setCategorySearch(categoryData);
    }, [categoryData])

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpen = (val) => {
        setOpen(true);

    };

    const searchCategory = (e) => {
        const updateData = categoryData.filter(item => {

            return item.description.toLowerCase().search(
                e.target.value.toLowerCase()
            ) !== -1;
        })

        setCategorySearch(updateData)
    }



    return React.useMemo(() => (
        <>
            <DialogComponent open={open} close={handleClose}>
                <CategoryUpdate setSnack={props?.setSnack} message={props?.message} setDuration={props?.setDuration} setVariant={props?.setVariant} loadCategory={props.loadCategory} close={handleClose} data={modalData} />
            </DialogComponent>
            <Grid style={{ padding: "15px" }} spacing={2}>
                <TextField className='searchControl' id="filled-basic" onChange={searchCategory} placeholder="Search for a Category" variant="filled" />
            </Grid>
            <div className='tabdata' style={{ height: "calc(100vh - 430px)", paddingTop: "0px", overflowY: "scroll" }}>
                <Grid style={{ padding: "15px" }} container spacing={2}>{categorySearch?.length > 0 && categorySearch.map((row) => (
                    <Grid key={row.id} item xs={3}>
                        <> <Chipcomponent handleClickOpen={handleClickOpen} setModal={setModalData} setTechnologyData={setTechnologyData} setDomainData={setDomainData} data={row} /></>
                    </Grid>
                )
                )}
                </Grid>
            </div>
        </>
    ), [loading, categoryData, categorySearch, searchCategory, open])
}
