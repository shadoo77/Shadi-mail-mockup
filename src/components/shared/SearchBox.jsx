import React from "react";
import {
  IconButton,
  Grid,
  Icon,
  InputAdornment,
  InputBase
} from "@material-ui/core/";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  container: {
    margin: "10px 0",
    padding: 0,
    width: "100%"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
}));

export default function({ value, handleChange, clearSearch }) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Grid
        container
        item
        xs={12}
        spacing={1}
        justify="flex-start"
        alignItems="flex-end"
      >
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            onChange={e => handleChange(e.target.value)}
            value={value}
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            endAdornment={
              value && (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => clearSearch()}
                    style={{ marginRight: 5 }}
                  >
                    <Icon style={{ color: "#fff" }}>close</Icon>
                  </IconButton>
                </InputAdornment>
              )
            }
            inputProps={{ "aria-label": "search" }}
          />
        </div>
      </Grid>
    </div>
  );
}
