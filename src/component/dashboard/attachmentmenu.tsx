import React from "react";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';

import { Grid, Typography } from "@mui/material";
import { Close, Attachment, Download } from '@mui/icons-material';
import axios from 'axios';
import { downloadAttachmentApi } from './../../api';
import { downloadFile } from "../utils/downloadFile";
import AttachmentFile from "../../redux/types/data/attachment";
import {getAttachmentIcon} from '../utils/utils'
import { getFileExtension } from './../utils/getFileExtension';

export default function AttachmentMenu(props) {

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
                    <IconButton onClick={handleClose} style={{padding:"0px"}}>
                        <Close />
                    </IconButton>
                </Grid>
                <Grid container justifyContent="space-between" pl={"10px"} pt={"0px"}>
                    {props?.children}
                </Grid>
                <Grid container justifyContent="flex-left" pl={"10px"} pt={props?.children && "25px"} sx={{ fontWeight:"700", alignItems: "center", paddingBottom:"10px", flexWrap: 'nowrap', fontSize:"14px", color:"#000" }}>
                        <Attachment /> &nbsp;
                        Criteria Attached Document
                </Grid>

                {props?.attachments?.map((attachment =>
                    <>
                        <Grid container className="attachMenu" style={{padding:"8px 13px 4px"}} justifyContent="end">
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
                        <Grid container justifyContent="end" pt={"3px"} pb={"10px"}>
                            <Grid item xs={12} style={{ fontSize: "12px", padding:"0px 15px" }}> {attachment?.updateDate.substr(0, 10)} &nbsp; {getFileExtension(attachment?.fileName)} &nbsp; {Math.round(attachment?.fileSize / 1000)}kb</Grid>
                        </Grid>
                    </>
                ))}
            </Menu>
        </>
    );
}


