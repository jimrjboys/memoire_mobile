import { Injectable } from '@angular/core';
import { CyclosProvider } from './cyclos';
import { UserProfile } from '../../lib/models/user';

@Injectable()
export class UserProvider extends CyclosProvider {

	protected resource = 'users';

	getUsers(keywords?: string) : Promise<[UserProfile]> {
		return new Promise((resolve, reject) => {

			let params: {};

			if (keywords)
				params = {keywords: keywords};

			this.fetch(this.resource, 'GET', params).subscribe((response) => {
				let users: [UserProfile] = response.json();
				if (response.status == 200)
					resolve(users);
			}, (error) => {
				reject(error);
			});
			
		});
	}

	getUser(id: string) {
		return new Promise((resolve, reject) => {
			this.fetch(this.resource + '/' + id).subscribe((response) => {
				if (response.status == 200) 
					resolve(response.json());
			},(error) => reject(error))
		})
	}

}
