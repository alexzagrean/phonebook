export interface FormProps {
  fields: Field[];
  onSubmit: (value: any) => void;
  value?: any;
}

export interface Field {
  defaultValue?: string;
  flex?: number;
  label: string;
  name: string;
  required?: boolean;
  validation?: ValidationType;
}

export type ValidationType = "phoneNumber";
