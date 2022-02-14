import { Row } from "../Table/TableComponent.model";

export interface DialogProps {
  onClose: (action: "submit" | "cancel") => void;
  onChange: (value: string, field: string) => void;
  open: boolean;
  value: Row;
}
