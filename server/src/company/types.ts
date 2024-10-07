interface CustomFieldValueValue {
  value: string;
}
export interface Tag {
  id: number;
  name: string;
  color: string;
}
export interface CustomFieldValue {
  field_code: string;
  value: string;
  values?: CustomFieldValueValue[]
}
