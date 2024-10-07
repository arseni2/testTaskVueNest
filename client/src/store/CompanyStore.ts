import {defineStore} from 'pinia';
import {ICreateCompanyResponse} from "../api/company.ts";

interface CompanyState {
	companies: ICreateCompanyResponse[];
}

export const useCompanyStore = defineStore('company', {
	state: (): CompanyState => ({
		companies: [],
	}),

	actions: {
		addCompany(company: ICreateCompanyResponse) {
			this.companies.push(company);
		}
	},
});