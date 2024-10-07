interface ITag {
	id: number;
	name: string;
	color: string
}
export interface ICreateTag {
	name: string;
	color: string
}

export interface ICreateCustomFieldValue {
	value: string,
	field_code: string
}

export interface ICreateCustomFieldValueDeal {
	value: string,
	field_id: number
}

export interface ICustomFieldValue {
	field_code: string;
	value: string;
}

export interface IContactCreate {
	name: string
	first_name: string
	last_name: string
	responsible_user_id: number
	custom_fields_values: ICustomFieldValue[]
	tags_to_add: Partial<ITag>[],
}

export interface IDealCreate {
	name: string
	price: number
	pipeline_id: number
	status_id: number
	responsible_user_id: number
	custom_fields_values: ICustomFieldValue[]
	tags_to_add: Partial<ITag>[],
}

export interface ICompanyCreate {
	name: string;
	responsible_user_id: number;
	created_by?: number;
	updated_by?: number;
	created_at?: number;
	updated_at?: number;
	custom_fields_values: ICustomFieldValue[];
	tags_to_add: Partial<ITag>[];
	request_id?: string;
}

interface ErrorDetail {
	code: string,
	detail: string,
	path: string
}

export interface ErrorResponse {
	message: string
	validationErrors: ErrorDetail[]
}