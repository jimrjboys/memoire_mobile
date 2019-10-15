import { Phone } from '../models/phone';
import { Entity } from '../entity';
export class MobilePhone extends Entity implements Phone {
	name;
	enabledForSms;
	verified;
	kind = 'landLine';
	number;
	constructor(phone: Phone) {
		super(phone);
		this.name = 'mobile';
		this.enabledForSms = true;
		this.verified = true;
		this.kind = 'landLine';
	}
}