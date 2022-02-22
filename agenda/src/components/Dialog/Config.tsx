import { Field } from "../Form/FormComponent.model";

export const fields: Field[] = [
  {
    label: "First Name",
    name: "firstName",
    flex: 2,
    required: true,
  },
  {
    label: "Last Name",
    name: "lastName",
    flex: 2,
    required: true,
  },
  {
    label: "Company",
    name: "company",
    flex: 2,
    required: true,
  },
  {
    label: "Phone Number",
    name: "phoneNumber",
    flex: 2,
    required: true,
    validation: "phoneNumber",
  },
  {
    label: "Notes",
    name: "notes",
    flex: 1,
  },
];
