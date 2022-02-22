import { Row } from "../Table/TableComponent.model";

export interface DialogProps {
  onChange: (value: string, field: string) => void;
  onClose: (action: "submit" | "cancel", value?: any) => void;
  open: boolean;
  value: Row;
}
