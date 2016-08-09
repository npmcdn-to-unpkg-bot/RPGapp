if(typeof RPG === 'undefined') RPG = {};

RPG.Player = {}
RPG.Talent = {
	 WARRIOR: "Warrior"
	, MAGE: "Mage"
	, FIGHTER: "Fighter"
	, RANGER: "Ranger"
}

RPG.Player.initEquipment = function() {

	var equipment = {
		 helmet: ""
		, armor: ""
		, gloves: ""
		, boots: ""
		, weapon: ""
	}

	return equipment
}

RPG.Player.initStats = function() {

	var stats = {
		 hp: 100
		, mp: 100
		, sp: 100
		, str: 10
		, dex: 10
		, will: 10
		, intl: 10
		, luck: 10
	}

	return stats
}

RPG.Player.applyTalentBonus = function(_talent) {
	var stats = RPG.Player.initStats();

	switch(_talent) {
		case RPG.Talent.WARRIOR:
			stats.hp = Math.floor(stats.hp * 1.5);
			stats.str += 5;
			break;
		case RPG.Talent.MAGE:
			stats.mp = Math.floor(stats.mp * 1.5);
			stats.intl += 5;
		case RPG.Talent.FIGHTER:
			stats.hp = Math.floor(stats.hp * 1.25);
			stats.sp = Math.floor(stats.sp * 1.25);
			stats.will += 5;
			break;
		case RPG.Talent.RANGER:
			stats.sp = Math.floor(stats.sp * 1.5);
			stats.dex += 5;
			break;
		default:
			break;
	}

	return stats
}

RPG.Player.createPlayer = function(_name, _talent) {
	var _equipment = RPG.Player.initEquipment();
	var _stats = RPG.Player.applyTalentBonus(_talent);
	var player = {
		 name: _name
		, talent: _talent
		, equipment: _equipment
		, stats: _stats
	}

	return player
}