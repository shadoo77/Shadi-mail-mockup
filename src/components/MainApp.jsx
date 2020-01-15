import React, { useContext, useEffect, useState } from "react";
import { Switch, withRouter, Route } from "react-router-dom";
import { RootContext } from "../store/";
import { fetchAccounts } from "../store/actions/accounts";
import { updateCurrentAccount } from "../store/actions/currentAccount";
import mockupData from "../mockup.json";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// Components
import AppBar from "./shared/Appbar";
import SideBar from "./shared/Sidebar";
import Content from "./shared/Content";
import Header from "./shared/ButtonGroup";
// Config
import { emailFolders } from "./shared/config";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1
  }
}));

// Sort data according the date's value
const dateCompare = (a, b) => {
  const aDate = new Date(a.date);
  const bDate = new Date(b.date);
  return aDate.getTime() - bDate.getTime();
};

// Data organization
const handledData = accounts => {
  for (const [i, account] of accounts.entries()) {
    const sortedByDates = account.mail.sort(dateCompare);
    const temp = sortedByDates.map((el, index) => ({
      _id: `msg${index + 1}`,
      read: false,
      belongTo: emailFolders.INBOX,
      ...el
    }));
    account._id = account.name + i;
    account.mail = temp;
  }
  return accounts;
};

const MainApp = props => {
  const classes = useStyles();
  const { state, dispatch } = useContext(RootContext);
  const [filter, setFilter] = useState("");
  // Filter search
  const filterChange = val => {
    setFilter(val);
  };

  const clearSearch = () => {
    setFilter("");
  };

  // Organize state (add an id for each message)
  useEffect(() => {
    const data = handledData(mockupData.accounts);
    fetchAccounts(dispatch, data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Organize state (add an id for each message)
  useEffect(() => {
    if (props.match.params.accId) {
      const accountsIDs = state.accounts.items.map(el => el._id);
      const isFound = accountsIDs.some(el => el === props.match.params.accId);
      if (!isFound && state.accounts.items.length) {
        props.history.push(
          `/account/accId/${props.match.params.accId}/container/inbox/mssg/:msgId/err`
        );
      }
      const currAccount = state.accounts.items.find(
        account => account._id === props.match.params.accId
      );
      updateCurrentAccount(dispatch, currAccount);
    } else {
      if (
        state.accounts &&
        state.accounts.items &&
        state.accounts.items.length
      ) {
        const activeAccount = state.accounts.items[0];
        updateCurrentAccount(dispatch, activeAccount);
        props.history.push(
          `/account/accId/${activeAccount._id}/container/inbox`
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.accounts, props.match.params.accId]);

  const paths = [
    "/account/accId/:accId/container/:cont",
    "/account/accId/:accId/container/:cont/mssg/:msgId"
  ];
  const errorPaths = ["/account/accId/:accId/container/:cont/mssg/:msgId/err"];

  return (
    <div className={classes.root}>
      <AppBar
        searchFilter={filter}
        clearSearch={clearSearch}
        filterChange={filterChange}
        accounts={state.accounts.items}
        currentAccount={state.currentAccount.data}
      />
      <SideBar />
      {/* Content */}
      <div className={classes.content}>
        <div className={classes.toolbar} />
        <Header />
        <Switch>
          {paths.map(path => (
            <Route
              path={path}
              exact
              render={props => (
                <Content
                  data={state.accounts}
                  filterSearch={filter}
                  {...props}
                />
              )}
              key={path}
            />
          ))}
          {errorPaths.map(path => (
            <Route
              path={path}
              exact
              render={() => (
                <h2 style={{ color: "red" }}>
                  <center>incorrect id !</center>
                </h2>
              )}
              key={path}
            />
          ))}
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(MainApp);
