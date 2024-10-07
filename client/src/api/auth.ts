import {AxiosError} from "axios";
import {instance} from "./index.ts";

export interface IResponseToken {
	access_token: string; refresh_token: string
}
export const getAccessAndRefreshToken = async (code: string): Promise<IResponseToken | null> => {
	try {
		const response = await instance.post("/auth/token", {
			code: code,
		});

		const data = response.data;
		if (data.access_token) {
			return {
				access_token: data.access_token,
				refresh_token: data.refresh_token
			};
		} else {
			console.error('Failed to exchange code for tokens', data);
			return null;
		}
	} catch (error: unknown) {
		const axiosError = error as AxiosError;
		console.error('AXIOS ERROR fetching token:', axiosError.response?.data || axiosError.message);
		return null;
	}
};