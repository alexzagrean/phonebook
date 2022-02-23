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
  createContact: async (contact: Row): Promise<string> => {
    try {
      await axios.post(`dummy/contacts/${contact.id}`, contact);
      return "Success";
    } catch (error) {
      return "Success";
    }
  },
  modifyContact: async (contact: Row): Promise<string> => {
    try {
      await axios.put(`dummy/contacts/${contact.id}`, contact);
      return "Success";
    } catch (error) {
      return "Success";
    }
  },
};

export const mocks: Row[] = [
  {
    firstName: "Alex",
    lastName: "Zagrean",
    company: "Busy Machines",
    phoneNumber: "0722012212",
    notes: "mock",
    id: "1",
  },
  {
    firstName: "George",
    lastName: "Sartian",
    company: "Blueprint",
    phoneNumber: "0722012212",
    notes: "mock",
    id: "2",
  },
  {
    firstName: "Bianca",
    lastName: "Lozan",
    company: "Alcatel",
    phoneNumber: "0722012212",
    notes: "mock",
    id: "3",
  },
];
