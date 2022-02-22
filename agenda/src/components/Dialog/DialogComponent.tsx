// Packages
import React, { useEffect, useState } from "react";

// Styles
import styles from "./DialogComponent.module.scss";

//Material
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

//Components
import { DialogProps } from "./DialogComponent.model";
import { FormComponent } from "../Form/FormComponent";

//Models
import { Row } from "../Table/TableComponent.model";

//Configs
import { fields } from "./Config";

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

  const handleClose = () => {
    props.onClose && props.onClose("cancel");
  };

  const handleFormSubmit = (formValue: any) => {
    props.onClose && props.onClose("submit", { ...formValue, id: value.id });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle id="alert-dialog-title">{"Add new contact"}</DialogTitle>
      <DialogContent className={styles["dialog-content"]}>
        <FormComponent fields={fields} onSubmit={handleFormSubmit} value={value} />
      </DialogContent>
      <DialogActions className={styles["buttons-wrapper"]}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" form="user-form">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
