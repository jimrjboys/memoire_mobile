import { Entity } from '../entity';
export class Individual extends Entity {

	cin: string
	url: string
	phone: string
	email : string
	password: string
	pict: string[]

	getCin(formated: boolean = false): string {
		if (formated)
			return this.cin.split(' - ').join('')
		else
			return this.cin
	}

	setCin(cin: string , formated: boolean = false) {
		if (formated)
			this.cin = cin.split(' - ').join('')
		else
			this.cin =  cin
	}

	setPhone(phone: string ,formated: boolean = false) {
		if(formated)
			this.phone =  phone.split(' ').join('')
		else 
			this.phone  = phone
	}
}