import { User } from '../models/user';
import { Group } from './group';
import { Entity } from '../entity';
export class Member extends Entity implements User {
	public group: string;
	constructor(user?: User) {
		super(user);
		this.group = Group.MEMBER;
	}
}