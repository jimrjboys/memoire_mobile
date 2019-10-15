import { Injectable } from '@angular/core';
import { CyclosProvider } from './cyclos';
import { UserProfile } from '../../lib/models/user';

@Injectable()
export class ContactProvider extends CyclosProvider {

	resource = 'contacts';

	public action(action: string, user?: UserProfile) {
		let method: string;
		let url: string = 'self/' + this.resource;
		switch (action) {
			case "add":
				method = 'POST';
				url  += '/' + user.id;
				break;
			case "delete":
				method = 'DELETE';
				url  += '/' + user.id;
				break;
			case "get":
				method = 'GET';
				break;
		}
		return new Promise((resolve, reject) => {
			this.fetch(url, method).subscribe(
				(response) => {
					if (response.status == 200)
						resolve(response.json());
					else
							reject()
				}, (error) => {
					console.error(error);
					this.manageError(error);
					reject(error);
				})
		})
	}

}
