export class Credential {
	protected name: string;
	private password: string;

	public constructor(credential: {[key: string]: string}) {
		this.setName(credential.name);
    this.setPassword(credential.password);
	}

	public getHash() :string {
		if (this.name && this.password)
			return btoa(this.name +':'+ this.password);
	}

	public setName(name: string) {
		if (name)
			this.name = name;
	}

	public setPassword(password: string) {
		if (password)
			this.password = password;
	}
}
