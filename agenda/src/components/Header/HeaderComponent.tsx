// Packages
import React from "react";

// Styles
import styles from "./HeaderComponent.module.scss";

//Models
import { HeaderProps } from "./HeaderComponent.model";

export const HeaderComponent = (props: HeaderProps): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <h1>Agenda App</h1>
    </div>
  );
};
