export interface ButtonProps {
  config: Config;
  onClickCell?: (key: keyof Row | "", id: string) => void;
  onClickHeaderCell?: (key: keyof Row | "") => void;
  onClickRow?: (id: string) => void;
  rows: Row[];
  sorting?: Sorting;
}

export interface Row {
  company: string;
  firstName: string;
  id: string;
  lastName: string;
  notes: string;
  phoneNumber: string;
}

export interface Sorting {
  field: keyof Row;
  order: "asc" | "desc";
}

export interface Config {
  fields: Field[];
}

export interface Field {
  label: string;
  name: keyof Row | "";
  renderContent?: () => JSX.Element;
}
