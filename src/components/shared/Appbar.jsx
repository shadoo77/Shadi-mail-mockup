import React from "react";
import { withRouter } from "react-router-dom";
import { drawerDesktopWidth, drawerMobileWidth } from "./theme";
import SearchBox from "./SearchBox";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Box
} from "@material-ui/core/";
import AccountCircle from "@material-ui/icons/AccountCircle";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    webkitTransition: "width 1s",
    transition: "width 0.75s",
    width: `calc(100% - ${drawerDesktopWidth}px)`,
    backgroundColor: theme.palette.primary.appBar,
    marginLeft: drawerDesktopWidth,
    [theme.breakpoints.down("xs")]: {
      width: `calc(100% - ${drawerMobileWidth}px)`
    }
  }
}));

export default withRouter(props => {
  const classes = useStyles();
  const {
    searchFilter,
    clearSearch,
    filterChange,
    accounts,
    currentAccount
  } = props;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const switchAccount = accountId => {
    setAnchorEl(null);
    props.history.push(
      `/account/accId/${accountId}/container/${props.match.params.cont}`
    );
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box flexGrow={1}>
            <SearchBox
              handleChange={filterChange}
              clearSearch={clearSearch}
              value={searchFilter}
            />
          </Box>
          <Box display="flex">
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              onClick={handleMenu}
              style={{ cursor: "pointer" }}
            >
              <Box style={{ textAlign: "center" }}>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box
                justifyContent="center"
                style={{ textAlign: "center" }}
                flexGrow={1}
              >
                {currentAccount &&
                  `${currentAccount["name"]} ${currentAccount["surname"]}`}
              </Box>
            </Box>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={open}
              onClose={handleClose}
            >
              {accounts &&
                accounts.length &&
                accounts.map(account => (
                  <MenuItem
                    onClick={() => switchAccount(account._id)}
                    key={account._id}
                  >{`${account["name"]} ${account["surname"]}`}</MenuItem>
                ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
});
