import {IContactCreate} from "../types.ts";
import {instance} from "./index.ts";

export interface IContactCreateResponse {
	id: number
	name: string
	request_id: string
}

export const CreateContact = async (payload: IContactCreate): Promise<IContactCreateResponse> => {
	let data = await instance.post("contact", payload);
	return data.data;
}