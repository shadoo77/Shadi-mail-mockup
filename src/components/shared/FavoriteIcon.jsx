import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { IconButton } from "@material-ui/core/";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import StarRateIcon from "@material-ui/icons/StarRate";

const useStyles = makeStyles(() => ({
  favIconContainer: {
    position: "relative"
  },
  favInnerIcon: { position: "absolute", zIndex: 7, color: "yellow" }
}));

export default ({ isFavorite }) => {
  const classes = useStyles();
  return (
    <IconButton edge="end" className={classes.favIconContainer}>
      <StarBorderIcon />
      {isFavorite ? <StarRateIcon className={classes.favInnerIcon} /> : null}
    </IconButton>
  );
};
