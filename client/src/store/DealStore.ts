import {defineStore} from 'pinia';
import {ICreateDealResponse} from "../api/deal.ts";

interface ContactState {
	deals: ICreateDealResponse[];
}

export const useDealStore = defineStore('deal', {
	state: (): ContactState => ({
		deals: [],
	}),

	actions: {
		addDeal(contact: ICreateDealResponse) {
			this.deals.push(contact);
		}
	},
});