import {ICompanyCreate} from "../types.ts";
import {instance} from "./index.ts";

export interface ICreateCompanyResponse {
	id: number
	name: string
	is_deleted: boolean
	request_id: string
}
export const CreateCompany = async (payload: ICompanyCreate): Promise<ICreateCompanyResponse> => {
	let data = await instance.post("company", payload);
	return data.data;
};