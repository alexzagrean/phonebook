import { Row } from "../Table/TableComponent.model";

export interface DialogProps {
  onClose: (action: "submit" | "cancel", value?: any) => void;
  onChange: (value: string, field: string) => void;
  open: boolean;
  value: Row;
}
