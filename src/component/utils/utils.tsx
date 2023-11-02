import { intersection } from "lodash";
import AttachmentFile from "../../redux/types/data/attachment";
import { fontSizes, weight } from "../utils/sizes";
import { colors } from "../utils/colors";
import { getFileExtension } from "../utils/getFileExtension";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileExcel,
  faFilePdf,
  faFileImage,
  faFile,
  faFileText,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Grid } from "@mui/material";
import { CircularProgress } from "@mui/material";
import Snackbars from "./../global/snackbars";
import { msalInstance } from "../..";

export function hasChildren(item: any) {
  const { children: children } = item;

  if (children === undefined) {
    return false;
  }

  if (children.constructor !== Array) {
    return false;
  }

  if (children?.length === 0) {
    return false;
  }

  return true;
}

export const flattenArr = (arr) => {
  const result = Array();
  arr.forEach((item) => {
    const { path, component, children } = item;
    result.push({ path, component });
    if (children) result.push(...flattenArr(children));
  });
  return result;
};

function isArrayWithLength(arr) {
  return Array.isArray(arr) && arr.length;
}

export function getAttachmentIcon(attachment: AttachmentFile) {
  /*Assuming that most of the files will be image or excel or pdf or txt file. Defaults to general file icon*/
  const fileExtension: string = getFileExtension(attachment?.fileName);
  if (["XLS", "XLSX", "CSV", "XLSB"].includes(fileExtension)) {
    return (
      <FontAwesomeIcon
        icon={faFileExcel as IconProp}
        size="1x"
        style={{ color: "#F40F02" }}
      />
    );
  } else if (["PDF"].includes(fileExtension)) {
    return (
      <FontAwesomeIcon
        icon={faFilePdf as IconProp}
        size="1x"
        style={{ color: colors.pdfRed }}
      />
    );
  } else if (["TXT"].includes(fileExtension)) {
    return (
      <FontAwesomeIcon
        icon={faFileText as IconProp}
        size="1x"
        style={{ color: colors.lightGray }}
      />
    );
  } else if (["JPG", "JPEG", "PNG", "GIF", "TIFF"].includes(fileExtension)) {
    return (
      <FontAwesomeIcon
        icon={faFileImage as IconProp}
        size="1x"
        style={{ color: colors.blue }}
      />
    );
  } else {
    return (
      <FontAwesomeIcon
        icon={faFile as IconProp}
        size="1x"
        style={{ color: colors.gray }}
      />
    );
  }
}

export function getAllowedRoutes(routes) {
  const accounts = msalInstance.getAllAccounts();
  const account = accounts[0] || {};
  let userRoles = [];
  if (account?.idTokenClaims !== undefined) {
    userRoles = (account.idTokenClaims as any).roles;
  }
  //const roles = JSON.parse(sessionStorage.getItem("userEntitlements") || "{}");

  return routes.filter(({ permission }) => {
    if (!permission) return true;
    else if (!isArrayWithLength(permission)) return true;
    else return intersection(permission, userRoles).length;
  });
}

export function showSnackBar(
  props,
  message: string,
  duration: number,
  variant: "error" | "warning" | "info" | "success"
) {
  props?.setSnack(true);
  props?.message(message);
  props?.setDuration(duration);
  props?.setVariant(variant);
}

export function loadingError(status, error, setSnack) {
  if (status === "loading") {
    return (
      <>
        <div style={{ paddingTop: "1rem" }}>
          <Grid container direction="row" justifyContent="center">
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "12px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Loading
              </span>
              <CircularProgress disableShrink />
            </div>
          </Grid>
        </div>
      </>
    );
  }
  if (status === "failed") {
    return (
      <>
        <Snackbars
          setSnack={setSnack}
          message={error?.message}
          duration={6000}
          variant={"error"}
        />
      </>
    );
  }
}

export function loadingErrorModal(status, error, setSnack) {
  if (status === "loading") {
    return (
      <>
        <div className="loader" style={{ paddingTop: "1rem" }}>
          <Grid container direction="row" justifyContent="center">
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  top: "12px",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Loading
              </span>
              <CircularProgress disableShrink />
            </div>
          </Grid>
        </div>
      </>
    );
  }
  if (status === "failed") {
    return (
      <>
        <Snackbars
          setSnack={setSnack}
          message={error?.message}
          duration={6000}
          variant={"error"}
        />
      </>
    );
  }
}
