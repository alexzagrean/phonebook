// Pacakges
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Models
import { Row } from "../../components/Table/TableComponent.model";

//Services
import { ContactsService } from "../../services/ContactsService";

// Styles
import styles from "./ViewContact.module.scss";

//Material
import ArrowBack from "@mui/icons-material/ArrowBack";

const ViewContact: FunctionComponent = (): JSX.Element => {
  const ref = useRef(null);
  const params = useParams();
  const navigate = useNavigate();
  const [contact, setContact] = useState<Row | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      let data = await ContactsService.getContacts();
      if (params.id) {
        let newContact = data.find((element) => element.id === params.id);
        setContact(newContact);
      }
    };
    fetchData();
  }, [params]);
  return (
    <div className={styles.wrapper} ref={ref}>
      <div className={styles["header-wrapper"]}>
        <ArrowBack onClick={() => navigate("/")} className={styles["back-icon"]} />
        <h1>{`${contact?.firstName} ${contact?.lastName}`}</h1>
        <span className={styles.separator}>-</span>
        <h1>{`${contact?.phoneNumber}`}</h1>
      </div>
      <div className={styles.content}>
        <div className={styles["field-wrapper"]}>
          <div className={styles.label}>First Name</div>
          <div className={styles.value}>{contact?.firstName}</div>
        </div>
        <div className={styles["field-wrapper"]}>
          <div className={styles.label}>Last Name</div>
          <div className={styles.value}>{contact?.lastName}</div>
        </div>
        <div className={styles["field-wrapper"]}>
          <div className={styles.label}>Company</div>
          <div className={styles.value}>{contact?.company}</div>
        </div>
        <div className={styles["field-wrapper"]}>
          <div className={styles.label}>Phone number</div>
          <div className={styles.value}>{contact?.phoneNumber}</div>
        </div>
        <div className={styles["field-wrapper"]}>
          <div className={styles.label}>Notes</div>
          <div className={styles.value}>{contact?.notes}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
