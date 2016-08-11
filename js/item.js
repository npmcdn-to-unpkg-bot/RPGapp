RPG.Item = {}

RPG.Item.Type = {
	 Helmet: "Helmet"
	, Armor: "Armor"
	, Gloves: "Gloves"
	, Boots: "Boots"
	, Weapon: "Weapon"
}

RPG.Item.initItem = function(_i_type) {
	if(!_i_type || (Object.keys(RPG.Item.Type).indexOf(_i_type) < 0) ) return false

	var item = {}

	if(_i_type == RPG.Item.Type.Weapon) {
		item.damage = 10
	} else if(_i_type == RPG.Item.Type.Armor) {
		item.defense = 6
		item.protection = 4
	} else {
		item.defense = 2
	}

	return item
}