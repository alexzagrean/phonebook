import axios from "axios";
import { Row } from "../components/Table/TableComponent.model";

export const ContactsService = {
  getContacts: async (): Promise<Row[]> => {
    try {
      await axios.get("dummy/contacts");
      return mocks;
    } catch (error) {
      return mocks;
    }
  },
};

export const mocks: Row[] = [
  {
    firstName: "Alex",
    lastName: "Zagrean",
    company: "BusyMachines",
    phoneNumber: "0722012212",
    notes: "mock",
    id: "1",
  },
  {
    firstName: "George",
    lastName: "Sartian",
    company: "BusyMachines",
    phoneNumber: "0722012212",
    notes: "mock",
    id: "2",
  },
  {
    firstName: "Bianca",
    lastName: "Lozan",
    company: "BusyMachines",
    phoneNumber: "0722012212",
    notes: "mock",
    id: "3",
  },
];
