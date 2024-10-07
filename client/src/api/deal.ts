import {IDealCreate} from "../types.ts";
import {instance} from "./index.ts";

export interface ICreateDealResponse {
	id: number
	name: string
	request_id: string
}

export const CreateDeal = async (payload: IDealCreate): Promise<ICreateDealResponse> => {
	let data = await instance.post("deal", payload);
	return data.data;
}