import React from "react";
import Interweave from "interweave";
// Utils
import { handleDate } from "./utils";
// Components
import FavoriteIcon from "./FavoriteIcon";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Divider, Card, Box } from "@material-ui/core/";

const useStyles = makeStyles(theme => ({
  cardStyle: {
    backgroundColor: theme.palette.background.default,
    margin: 5,
    borderRadius: 2
  },
  cardHeader: {
    backgroundColor: "#F1F6F9",
    padding: theme.spacing(2),
    fontSize: 13
  },
  subTit: {
    color: "#757575"
  }
}));

export default props => {
  const classes = useStyles();
  const { name, surName, message, isFavorite } = props;

  return (
    message &&
    message.content && (
      <Card className={classes.cardStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          className={classes.cardHeader}
        >
          <Box justifyContent="flex-start">
            <table>
              <tbody>
                <tr>
                  <td className={classes.subTit}>From : </td>
                  <td>{message["sender name"]}</td>
                </tr>
                <tr>
                  <td className={classes.subTit}>To : </td>
                  <td>{`${name} ${surName}`}</td>
                </tr>
              </tbody>
            </table>
          </Box>
          <Box justifyContent="flex-end">
            <div>
              {handleDate(message.date)}
              <FavoriteIcon isFavorite={isFavorite} />
            </div>
          </Box>
        </Box>
        <Divider />
        <div style={{ padding: "15px 20px 90px 20px" }}>
          <Interweave content={message.content} />
        </div>
      </Card>
    )
  );
};
