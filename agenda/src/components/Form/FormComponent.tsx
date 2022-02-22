// Packages
import React from "react";

// Styles
import styles from "./FormComponent.module.scss";

//Models
import { Field, FormProps, ValidationType } from "./FormComponent.model";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import validator from "validator";

export const FormComponent = (props: FormProps): JSX.Element => {
  const { control, handleSubmit } = useForm();
  const renderInput = (field: Field) => {
    return (
      <Controller
        name={field.name}
        rules={{
          required: { value: field.required === true, message: "This field is mandatory" },
          validate: { value: (value) => validateField(value, field.validation) || "This field is invalid" },
        }}
        control={control}
        defaultValue={props.value && props.value[field.name]}
        render={({ field: { onChange, value, ref }, formState: { errors } }) => {
          return (
            <TextField
              label={field.label}
              variant="outlined"
              className={styles.fullWidth}
              ref={ref}
              value={value || ""}
              onChange={onChange}
              error={errors[field.name] !== undefined}
              helperText={errors[field.name] ? errors[field.name].message : undefined}
            />
          );
        }}
      />
    );
  };

  const renderForm = () => {
    return props.fields.map((element, index) => (
      <div className={`${styles.field} ${styles["flex" + (element.flex || 1)]}`} key={`${element.name}${index}`}>
        {renderInput({ ...element })}
      </div>
    ));
  };

  return (
    <form onSubmit={handleSubmit(props.onSubmit ? props.onSubmit : () => {})} className={styles.form} id="user-form">
      {renderForm()}
    </form>
  );
};

const validateField = (value: string, type?: ValidationType) => {
  if (type === "phoneNumber") {
    return validator.isMobilePhone(value);
  } else {
    return true;
  }
};
