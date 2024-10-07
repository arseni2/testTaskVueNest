import {defineStore} from 'pinia';
import {IContactCreateResponse} from "../api/contact.ts";

interface ContactState {
	contacts: IContactCreateResponse[];
}

export const useContactStore = defineStore('contact', {
	state: (): ContactState => ({
		contacts: [],
	}),

	actions: {
		addContact(contact: IContactCreateResponse) {
			this.contacts.push(contact);
		}
	},
});