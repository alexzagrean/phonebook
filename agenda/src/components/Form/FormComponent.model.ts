export interface FormProps {
  onSubmit: (value: any) => void;
  fields: Field[];
  value?: any;
}

export interface Field {
  name: string;
  defaultValue?: string;
  label: string;
  flex?: number;
  required?: boolean;
  validation?: ValidationType;
}

export type ValidationType = "phoneNumber";
