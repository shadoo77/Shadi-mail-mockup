import React, { useContext, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { RootContext } from "../../store";
import { updateReadUnread } from "../../store/actions/accounts";
// Config
import { resultsFilter, handleDate } from "./utils";
import { emailFolders } from "./config";

// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Checkbox,
  Box,
  Divider
} from "@material-ui/core/";
// Component
import MessageContent from "./MessageContent";
import FavoriteIcon from "./FavoriteIcon";

const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    //backgroundColor: "blue",
    padding: theme.spacing(0)
  },
  listItemStyle: {
    backgroundColor: "#F2F7FA",
    //fontWeight: 900,
    "&:hover": {
      backgroundColor: "#D7EBF4"
    }
  },
  favIconContainer: {
    position: "relative"
  },
  favInnerIcon: { position: "absolute", zIndex: 7, color: "yellow" },
  cardStyle: {
    backgroundColor: theme.palette.background.default,
    margin: 5,
    borderRadius: 2
  },
  cardHeader: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2)
  }
}));

export default props => {
  const classes = useStyles();
  const { state, dispatch } = useContext(RootContext);
  const { data } = state.currentAccount;
  const { checked } = state.selectedMessages;

  const [favorite, setFavorite] = useState([]);

  function selectMessagesSetter(messages) {
    dispatch({
      type: "SELECT_MESSAGES",
      payload: messages
    });
  }

  // Handle toggle
  const handleToggle = (element, setterFunc, msgId) => e => {
    e.stopPropagation();
    const currentIndex = element.indexOf(msgId);
    const newChecked = [...element];
    if (currentIndex === -1) {
      newChecked.push(msgId);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setterFunc(newChecked);
  };

  // Show message
  const chooseMessage = msgId => {
    const message = data.mail.find(msg => msg._id === msgId);
    message && !message.read && updateReadUnread(dispatch, data._id, msgId);
    props.history.push(
      `/account/accId/${data._id}/container/${props.match.params.cont}/mssg/${msgId}`
    );
  };

  // Render message
  const renderMessage = msgId => {
    const message =
      data &&
      data.mail &&
      data.mail.length &&
      data.mail.find(msg => msg._id === msgId);
    return (
      message &&
      message.content && (
        <MessageContent
          name={data.name}
          surName={data.surname}
          message={message}
          isFavorite={favorite.indexOf(message._id) !== -1}
        />
      )
    );
  };

  // Show bold font if it's unread
  const readUnread = (txt, read) => (
    <div style={{ fontWeight: !read ? 900 : "normal" }}>{txt}</div>
  );

  const getFilteredMails = () => {
    return (
      data &&
      data.mail &&
      data.mail.length &&
      resultsFilter(data.mail, props.filterSearch, "subject")
    );
  };

  const showMessagesAccordingContainer = () => {
    const filteredData = getFilteredMails();
    const { cont } = props.match.params;
    if (filteredData && filteredData.length) {
      if (cont === "inbox") {
        return filteredData.filter(msg => msg.belongTo === emailFolders.INBOX);
      } else if (cont === "spam") {
        return filteredData.filter(msg => msg.belongTo === emailFolders.SPAM);
      } else if (cont === "trash") {
        return filteredData.filter(msg => msg.belongTo === emailFolders.TRASH);
      }
    }
    return filteredData || [];
  };

  const filteredMessages = showMessagesAccordingContainer();

  const showDateWithFavoriteIcon = (date, icon) => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        flexWrap="nowrap"
        alignItems="center"
      >
        <Box>{date}</Box>
        <Box>{icon}</Box>
      </Box>
    );
  };

  return (
    <div>
      <CssBaseline />
      <main className={classes.content}>
        <Grid container direction="row" justify="center">
          <Grid
            item
            xs={12}
            md={5}
            style={{ minHeight: "100vh", borderRight: "1px solid #e2e2e2" }}
          >
            <List style={{ paddingTop: 0 }}>
              {filteredMessages && filteredMessages.length ? (
                filteredMessages.map((msg, i) => (
                  <React.Fragment key={msg._id}>
                    <ListItem
                      role={undefined}
                      dense
                      button
                      className={classes.listItemStyle}
                      onClick={() => chooseMessage(msg._id)}
                    >
                      <Checkbox
                        edge="start"
                        checked={checked.indexOf(msg._id) !== -1}
                        disableRipple
                        onClick={handleToggle(
                          checked,
                          selectMessagesSetter,
                          msg._id
                        )}
                      />
                      <ListItemText
                        id={msg._id}
                        primary={readUnread(msg.subject, msg.read)}
                        secondary={msg["sender name"]}
                        //onClick={() => chooseMessage(msg._id)}
                      />
                      <ListItemSecondaryAction>
                        {showDateWithFavoriteIcon(
                          readUnread(handleDate(msg.date), msg.read),
                          <div
                            onClick={handleToggle(
                              favorite,
                              setFavorite,
                              msg._id
                            )}
                          >
                            <FavoriteIcon
                              isFavorite={favorite.indexOf(msg._id) !== -1}
                            />
                          </div>
                        )}
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))
              ) : (
                <p>There is no messages</p>
              )}
            </List>
          </Grid>
          <Grid item xs={12} md={7}>
            <Switch>
              <Route
                path="/account/accId/:accId/container/:cont/mssg/:msgId"
                exact
                render={() => renderMessage(props.match.params.msgId)}
              />
              <Route render={() => <p>choose a message</p>} />
            </Switch>
          </Grid>
        </Grid>
      </main>
    </div>
  );
};
