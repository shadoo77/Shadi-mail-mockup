import React, { useContext } from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { RootContext } from "../../store";
import {
  Box,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core/";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailOutlinedIcon from "@material-ui/icons/MailOutline";
import SendOutlinedIcon from "@material-ui/icons/SendOutlined";
import TrashIcon from "@material-ui/icons/DeleteOutline";
import SpamIcon from "@material-ui/icons/RemoveCircleOutline";
import DraftsIcon from "@material-ui/icons/DraftsOutlined";
// Config
import { emailFolders } from "./config";
import { isEmpty } from "./utils";

import { drawerDesktopWidth, drawerMobileWidth } from "./theme";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    webkitTransition: "width 1s",
    transition: "width 0.75s",
    width: drawerDesktopWidth,
    flexShrink: 0,
    [theme.breakpoints.down("xs")]: {
      width: drawerMobileWidth
    }
  },
  drawerPaper: {
    webkitTransition: "width 1s",
    transition: "width 0.75s",
    color: "#fff",
    backgroundColor: theme.palette.primary.main,
    width: drawerDesktopWidth,
    [theme.breakpoints.down("xs")]: {
      width: drawerMobileWidth
    }
  }
}));

export default withRouter(props => {
  const classes = useStyles();
  const { state } = useContext(RootContext);
  const { data } = state.currentAccount;

  // Switch container
  const switchContainer = container => {
    props.history.push(
      `/account/accId/${state.currentAccount.data._id}/container/${
        container === emailFolders.INBOX
          ? "inbox"
          : container === emailFolders.SPAM
          ? "spam"
          : "trash"
      }`
    );
  };

  const messageContainer = container => {
    let temp = 0;
    if (data && !isEmpty(data) && data.mail.length) {
      for (const em of data.mail) {
        if (em.belongTo === container && !em.read) {
          temp += 1;
        }
      }
    }
    return temp > 0 ? temp : null;
  };

  // container Text
  const containerTxt = container => {
    const messagesNumber = messageContainer(container);
    switch (container) {
      case emailFolders.INBOX:
        return `Inbox${messagesNumber ? `(${messagesNumber})` : ""}`;
      case emailFolders.DRAFT:
        return `Draft${messagesNumber ? `(${messagesNumber})` : ""}`;
      case emailFolders.SENT:
        return `Sent${messagesNumber ? `(${messagesNumber})` : ""}`;
      case emailFolders.SPAM:
        return `Spam${messagesNumber ? `(${messagesNumber})` : ""}`;
      case emailFolders.TRASH:
        return `Trash${messagesNumber ? `(${messagesNumber})` : ""}`;
      default:
        break;
    }
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
      anchor="left"
    >
      {/** The title */}
      <Box
        display="flex"
        justifyContent="center"
        alignContent="center"
        alignItems="center"
        mt={2}
        mb={1}
      >
        <Box fontWeight="fontWeightMedium">
          <MailOutlinedIcon fontSize="large" />
        </Box>
        <Box ml={2} fontSize="h5.fontSize">
          Mail
        </Box>
      </Box>
      {/** Compose button */}
      <Box display="flex" justifyContent="center">
        <Button
          size="large"
          variant="contained"
          color="secondary"
          disableElevation
        >
          Compose
        </Button>
      </Box>
      <List>
        <ListItem button onClick={() => switchContainer(emailFolders.INBOX)}>
          <ListItemIcon style={{ color: "#fff" }}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary={containerTxt(emailFolders.INBOX)} />
        </ListItem>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText primary={containerTxt(emailFolders.DRAFT)} />
        </ListItem>
        <ListItem button>
          <ListItemIcon style={{ color: "#fff" }}>
            <SendOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={containerTxt(emailFolders.SENT)} />
        </ListItem>
        <ListItem button onClick={() => switchContainer(emailFolders.SPAM)}>
          <ListItemIcon style={{ color: "#fff" }}>
            <SpamIcon />
          </ListItemIcon>
          <ListItemText primary={containerTxt(emailFolders.SPAM)} />
        </ListItem>
        <ListItem button onClick={() => switchContainer(emailFolders.TRASH)}>
          <ListItemIcon style={{ color: "#fff" }}>
            <TrashIcon />
          </ListItemIcon>
          <ListItemText primary={containerTxt(emailFolders.TRASH)} />
        </ListItem>
      </List>
    </Drawer>
  );
});
