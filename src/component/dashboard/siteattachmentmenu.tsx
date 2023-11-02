import React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { Grid, Typography } from "@mui/material";
import { Close, Attachment, Download, DeleteForever } from '@mui/icons-material';
import axios from 'axios';
import { downloadAttachmentApi } from './../../api';
import { downloadFile } from "../utils/downloadFile";
import AttachmentFile from "../../redux/types/data/attachment";
import {getAttachmentIcon} from '../utils/utils'


export default function Siteattachmentmenu(props) {

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleDownload = (file: AttachmentFile) => {
        axios({
            url: downloadAttachmentApi(file.id),
            method: "GET",
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
            responseType: "blob"
        }).then(response => {
            downloadFile(response, file);
        });
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = async (val) => {
        const response = await axios.delete(downloadAttachmentApi(val), {
            headers: { Authorization: `Bearer ${sessionStorage.getItem("token")}` },
        })
        if (response.status === 204) {
            props.attachmentMethod(props?.id)
        }
    }
    
    return (
        <>
            <Button
                aria-controls="simple-menu2"
                aria-haspopup="true"
                onClick={handleClick}
                style={{ padding: "0px", verticalAlign: "top" }}
            >
                <Attachment />
            </Button>
            <Menu
                id="simple-menu2"
                anchorEl={anchorEl}
                className="attachmentMenu"
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Grid container justifyContent="flex-end">
                    <IconButton onClick={handleClose} style={{ padding: "0px" }}>
                        <Close />
                    </IconButton>
                </Grid>
                <Grid container justifyContent="space-between" pl={"10px"} pt={"0px"}>
                    {props?.children}
                </Grid>
                <Grid container justifyContent="flex-left" pb={"10px"} pl={"10px"} pt={props?.children && "25px"} sx={{ flexWrap: 'nowrap', alignItems: "center",  fontWeight:"700", fontSize: "14px", color: "#000" }}>
                    <Attachment /> &nbsp;
                    Site Attached Documents
                </Grid>

                {props?.attachments?.map((attachment =>
                    <>
                        <Grid container className="attachMenu" justifyContent="end">
                            <Grid item xs={9}>
                                <Typography variant="h5"> {attachment.fileName}</Typography>
                            </Grid>
                            <Grid item xs={3} sm container>
                                <Grid item xs={6}>
                                {getAttachmentIcon(attachment)}
                                </Grid>
                                <Grid item xs={6}>
                                    <Download onClick={() => handleDownload(attachment)} />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid container justifyContent="end" pt={"10px"} style={{ textTransform: "uppercase", padding: "5px 12px 10px" }}>
                            <Grid item xs={11} style={{ fontSize: "12px", paddingTop:"5px" }}> {attachment?.updateDate.substr(0, 10)} &nbsp; &nbsp; {(attachment?.fileName).split('.').pop()} &nbsp; &nbsp; {Math.round(attachment?.fileSize / 1000)}kb</Grid>
                            <Grid justifyContent="end" item xs={1} onClick={() => handleDelete(attachment?.id)}> <DeleteForever style={{ fontSize: "19px", color: "#CD0D15", verticalAlign: "top" }} /> </Grid>
                        </Grid>
                    </>
                ))}
            </Menu>
        </>
    );
}
