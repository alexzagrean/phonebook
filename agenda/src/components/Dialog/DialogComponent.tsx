// Packages
import React, { useEffect, useState } from "react";

// Styles
import styles from "./DialogComponent.module.scss";

//Material
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";

//Models
import { DialogProps } from "./DialogComponent.model";
import { Row } from "../Table/TableComponent.model";

export const DialogComponent = (props: DialogProps): JSX.Element => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Row>({
    firstName: "",
    lastName: "",
    company: "",
    phoneNumber: "",
    notes: "",
    id: "",
  });

  useEffect(() => {
    setOpen(props.open);
  }, [props.open]);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  const handleClose = (action: "submit" | "cancel") => {
    props.onClose && props.onClose(action);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange && props.onChange(event.target.value, event.target.name);
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="alert-dialog-title">{"Add new contact"}</DialogTitle>
      <DialogContent className={styles["dialog-content"]}>
        <div className={styles.row}>
          <TextField
            label="First Name"
            variant="outlined"
            className={styles["input"]}
            onChange={handleChange}
            name="firstName"
            value={value.firstName}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            className={styles["input"]}
            onChange={handleChange}
            name="lastName"
            value={value.lastName}
          />
        </div>
        <div className={styles.row}>
          <TextField
            label="Company"
            variant="outlined"
            className={styles["input"]}
            onChange={handleChange}
            name="company"
            value={value.company}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            className={styles["input"]}
            onChange={handleChange}
            name="phoneNumber"
            value={value.phoneNumber}
          />
        </div>
        <div className={styles.row}>
          <TextField
            label="Notes"
            variant="outlined"
            className={styles["input"]}
            onChange={handleChange}
            name="notes"
            value={value.notes}
          />
        </div>
      </DialogContent>
      <DialogActions className={styles["buttons-wrapper"]}>
        <Button onClick={handleClose.bind(null, "cancel")}>Cancel</Button>
        <Button onClick={handleClose.bind(null, "submit")} autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
