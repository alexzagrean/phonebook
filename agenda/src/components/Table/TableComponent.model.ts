export interface ButtonProps {
  rows: Row[];
  onClickRow?: (id: string) => void;
  onClickHeaderCell?: (key: keyof Row | "") => void;
  onClickCell?: (key: keyof Row | "", id: string) => void;
  sorting?: Sorting;
  config: Config;
}

export interface Row {
  firstName: string;
  lastName: string;
  company: string;
  phoneNumber: string;
  notes: string;
  id: string;
}

export interface Sorting {
  field: keyof Row;
  order: "asc" | "desc";
}

export interface Config {
  fields: Field[];
}

export interface Field {
  name: keyof Row | "";
  label: string;
  renderContent?: () => JSX.Element;
}
