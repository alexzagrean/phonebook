// Pacakges
import React, { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//Models
import { Row } from "../../components/Table/TableComponent.model";

//Services
import { ContactsService } from "../../services/ContactsService";

// Styles
import styles from "./ViewContact.module.scss";

const ViewContact: FunctionComponent = (): JSX.Element => {
  const params = useParams();

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
    <div className={styles.wrapper}>
      <div className={styles["header-wrapper"]}>
        <h1>{`${contact?.firstName} ${contact?.lastName} - ${contact?.phoneNumber}`}</h1>
      </div>
      <div className={styles.content}>
        <div className={styles.row}>
          <div className={styles.label}>First Name</div>
          <div className={styles.value}>{contact?.firstName}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Last Name</div>
          <div className={styles.value}>{contact?.lastName}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Company</div>
          <div className={styles.value}>{contact?.company}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Phone number</div>
          <div className={styles.value}>{contact?.phoneNumber}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.label}>Notes</div>
          <div className={styles.value}>{contact?.notes}</div>
        </div>
      </div>
    </div>
  );
};

export default ViewContact;
