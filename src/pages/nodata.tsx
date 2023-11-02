import React from "react";
import Typography from "@mui/material/Typography";
import Title from "../component/global/title/title";
import bgimage from "../assets/images/bgimage.png";

export default function Nodata() {
  return (
    <>
      {/* <Title /> */}
      <div
        style={{
          backgroundColor: "#f4f4f4",
          backgroundSize: "cover",
          padding: "15px",
          height: `calc(100vh - 80px)`,
          color: "#FFF",
          backgroundImage: `url(${bgimage})`,
        }}
      >
        <Typography variant="h2"></Typography>
      </div>
    </>
  );
}
