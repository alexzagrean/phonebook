// Pacakges
import React, { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

//Styles
import styles from "./NotFound.module.scss";

const NotFound: FunctionComponent = (): JSX.Element => {
  const navigate = useNavigate();
  const handleClickOnGoHome = () => {
    navigate("/");
  };
  return (
    <div className={styles.wrapper}>
      <h1>Page not found</h1>
      <p onClick={handleClickOnGoHome}>Go to Home page</p>
    </div>
  );
};

export default NotFound;
