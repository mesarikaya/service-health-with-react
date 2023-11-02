import React, { useState } from "react";

import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { hasChildren, getAllowedRoutes } from "./../../utils/utils";
import routes from "./../../../config/routes";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { mainTheme } from "../../utils/theme";
import { ThemeProvider } from "@mui/system";
import { Link } from "react-router-dom";
import { Box, ListItemButton } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import { useIsAuthenticated } from "@azure/msal-react";
import { SignOutButton } from "./../../SignOut";
import { SignInButton } from "./../../SignInButton";
import { InteractionStatus } from "@azure/msal-browser";

export default function Sidebar() {
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const name = accounts[0] && accounts[0].name;
  const subtitle = name?.match(/\(([^)]+)\)/);

  //console.log("inprogress status: ", inProgress);
  return (
    <ThemeProvider theme={mainTheme()}>
      <Box
        height="100vh"
        sx={{
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "background.default",
          color: "text.primary",
          p: 3,
        }}
      >
        {isAuthenticated && (
          <>
            <br />
            <Stack style={{ padding: "15px" }}>
              {name && <Avatar src="/broken-image.jpg" />}
              <Typography variant="body1">
                {name?.replace(/\s*(?:\[[^\]]*\]|\([^)]*\))\s*/g, "")}
              </Typography>
              <Typography variant="caption">
                {subtitle != null && subtitle[0]}
              </Typography>
            </Stack>
            <br />
          </>
        )}

        {getAllowedRoutes(routes).map((item, key) => (
          <MenuItem key={key} item={item} isAuthenticated={isAuthenticated} />
        ))}

        {isAuthenticated ? (
          <SignOutButton />
        ) : inProgress !== InteractionStatus.Startup &&
          inProgress !== InteractionStatus.HandleRedirect ? (
          <SignInButton />
        ) : null}
      </Box>
    </ThemeProvider>
  );
}

const MenuItem = (props) => {
  const Component = hasChildren(props.item) ? MultiLevel : SingleLevel;
  return <Component item={props} />;
};

const SingleLevel = (props) => {
  if (props.item.item.name === "Help") {
    if (!props.item.isAuthenticated) {
      return (
        <div style={{ paddingTop: "20px" }}>
          <Help item={props.item} />
        </div>
      );
    }
    return <Help item={props.item} />;
  }
  return (
    <Link
      to={props.item.item.path}
      style={{ color: "#fff", textDecoration: "none" }}
    >
      <ListItemButton>
        {props.item.item.icon && (
          <ListItemIcon>
            {<props.item.item.icon className="w-8 h-8" />}
          </ListItemIcon>
        )}
        <ListItemText primary={props.item.item.name} />
      </ListItemButton>
    </Link>
  );
};

const Help = (props) => {
  return (
    <>
      <a
        href={"https://wiki.cargill.com/display/OLEE/TechHealth"}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: "#fff", textDecoration: "none" }}
      >
        <ListItemButton>
          {props.item.item.icon && (
            <ListItemIcon>
              {<props.item.item.icon className="w-8 h-8" />}
            </ListItemIcon>
          )}
          <ListItemText primary={props.item.item.name} />
        </ListItemButton>
      </a>
    </>
  );
};

const MultiLevel = (props) => {
  const { children: items } = props.item.item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          {<props.item.item.icon className="w-8 h-8" />}
        </ListItemIcon>
        <ListItemText primary={props.item.item.name} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit className="test">
        <List component="div" disablePadding>
          {items.map((child, key, index) => (
            <MenuItem key={key + index} item={child} />
          ))}
        </List>
      </Collapse>
    </>
  );
};
