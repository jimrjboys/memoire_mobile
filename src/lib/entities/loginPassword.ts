import { Password } from '../models/password';
export class LoginPassword implements Password {
	type;
	checkConfirmation;
	forceChange;
	constructor(password?: Password) {
		for (var key in password) {
			this[key] = password[key];
		}
		this.checkConfirmation = true;
		this.type = "login";
		this.forceChange = false;
	}
}