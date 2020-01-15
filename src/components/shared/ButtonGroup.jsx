import React from "react";
import { RootContext } from "../../store";
// Config
import { emailFolders } from "../shared/config";
// Material UI
import { Button, ButtonGroup, Checkbox, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TrashIcon from "@material-ui/icons/DeleteOutline";
import SpamIcon from "@material-ui/icons/RemoveCircleOutline";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOffOutlined";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex"
  },
  buttonGroup: {
    //display: "flex",
    flexDirection: "row",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  buttonStyle: {
    borderColor: "#d0d0d0",
    color: "#818181",
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  iconStyle: { fontSize: 19 }
}));

export default function GroupedButtons() {
  const { state, dispatch } = React.useContext(RootContext);
  const classes = useStyles();
  const [checked, setChecked] = React.useState(false);
  const { selectedMessages, currentAccount } = state;

  const handleChange = event => {
    setChecked(event.target.checked);
    const messages =
      currentAccount.data && currentAccount.data.mail.map(el => el._id);
    selectMessagesSetter(event.target.checked ? messages : []);
  };

  function selectMessagesSetter(messages) {
    dispatch({
      type: "SELECT_MESSAGES",
      payload: messages
    });
  }

  // Delete messages
  function deleteOrSpamMessages(container) {
    if (selectedMessages.checked && selectedMessages.checked.length) {
      dispatch({
        type: "DELETE_OR_SPAM_MESSAGES",
        payload: {
          messages: selectedMessages.checked,
          cont: container
        }
      });
      dispatch({
        type: "SELECT_MESSAGES",
        payload: []
      });
    }
  }

  return (
    <>
      <div className={classes.container}>
        <Checkbox
          checked={checked}
          onChange={handleChange}
          value="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
        <div className={classes.buttonGroup}>
          <ButtonGroup
            color="default"
            size="small"
            aria-label="outlined button group"
          >
            <Button className={classes.buttonStyle}>
              <VisibilityOffIcon className={classes.iconStyle} />
            </Button>
            <Button
              className={classes.buttonStyle}
              onClick={() => deleteOrSpamMessages(emailFolders.TRASH)}
            >
              <TrashIcon className={classes.iconStyle} />
            </Button>
            <Button
              className={classes.buttonStyle}
              onClick={() => deleteOrSpamMessages(emailFolders.SPAM)}
            >
              <SpamIcon className={classes.iconStyle} />
            </Button>
          </ButtonGroup>
        </div>
      </div>
      <Divider />
    </>
  );
}
