export abstract class Entity {

	constructor(model?: {}) {
		for (var key in model) {
			this[key] = model[key];
		}
	}
}