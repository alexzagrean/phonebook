import EditIcon from "@mui/icons-material/Edit";
import { Config } from "../../components/Table/TableComponent.model";

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
        return <EditIcon />;
      },
    },
  ],
};
