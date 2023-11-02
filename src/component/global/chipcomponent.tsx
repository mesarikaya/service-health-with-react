import * as React from "react";
import Chip from "@mui/material/Chip";
import { CheckBox, DisabledByDefault, Edit } from "@mui/icons-material";
import { red } from "@mui/material/colors";

export default function CustomDeleteIconChips(props) {
  const handleClick = () => {
    console.info("You clicked the Chip.");
  };

  const handleDelete = () => {
    props.handleClickOpen();
    props?.setModal(props?.data);
  };

  const style = {
    borderRadius: 0,
    justifyContent: "left",
    padding: "10px",
    boxShadow: "0px 2px 10px -2px rgba(0, 0, 0, 0.18)",
    borderBottom: "1px solid #73B3BA",
    backgroundColor: "#fff",
    maxWidth: "100%",
    width: "100%",
    height: "50px",
    "& .MuiChip-deleteIcon": {
      position: "absolute",
      right: "8px",
    },
  };

  return (
    <Chip
      sx={style}
      icon={
        props ? <CheckBox /> : <DisabledByDefault sx={{ color: red[700] }} />
      }
      label={props.data.description}
      onDelete={handleDelete}
      deleteIcon={<Edit />}
    />
  );
}
