import { CustomFieldValue } from '../company/types';

export interface IDataForConvertCustomFields {
  custom_fields_values: CustomFieldValue[];
}
export const ConvertCustomFields = (data: IDataForConvertCustomFields) => {
  data.custom_fields_values.forEach((custom_field) => {
    const fieldValue = custom_field.value;
    custom_field.values = [{ value: fieldValue }];
    delete custom_field.value;
  });
};
