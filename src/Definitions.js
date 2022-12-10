export class Pokeobj {
	constructor(
		id,
		name,
		types,
		sprite,
		noDamage,
		quarterDamage,
		halfDamage,
		doubleDamage,
		fourXDamage
	) {
		this.id = id;
		this.name = name;
		this.types = types;
		this.sprite = sprite;
		this.noDamage = noDamage;
		this.quarterDamage = quarterDamage;
		this.halfDamage = halfDamage;
		this.doubleDamage = doubleDamage;
		this.fourXDamage = fourXDamage;
	}
}

export class pokemonDetail {
	constructor(id, name, types, sprite, default_sprite, stats) {
		this.id = id;
		this.name = name;
		this.types = types;
		this.sprite = sprite;
		this.default_sprite = default_sprite;
		this.stats = stats;
	}
}

export class Stats {
	constructor(hp, attack, special_attack, defense, special_defense, speed) {
		this.hp = hp;
		this.attack = attack;
		this.special_attack = special_attack;
		this.defense = defense;
		this.special_defense = special_defense;
		this.speed = speed;
	}
}
