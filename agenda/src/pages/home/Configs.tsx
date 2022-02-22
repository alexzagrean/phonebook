//Components
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";

//Configs
import { Config } from "../../components/Table/TableComponent.model";

//Styles
import styles from "./Home.module.scss";

export const TableConfig: Config = {
  fields: [
    {
      name: "firstName",
      label: "First Name",
    },
    {
      name: "lastName",
      label: "Last Name",
    },
    {
      name: "company",
      label: "Company",
    },
    {
      name: "phoneNumber",
      label: "Phone Number",
    },
    {
      name: "notes",
      label: "Notes",
    },
    {
      name: "",
      label: "",
      renderContent: (): JSX.Element => {
        return (
          <Button variant="outlined" className={styles["edit-button"]}>
            Edit
            <EditIcon fontSize={"small"} />
          </Button>
        );
      },
    },
  ],
};
