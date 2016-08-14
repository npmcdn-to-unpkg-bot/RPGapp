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

	item.itemType = _i_type

	if(_i_type == RPG.Item.Type.Weapon) {
		item.damage = 10
		item.upgradeStatus = 0
	} else if(_i_type == RPG.Item.Type.Armor) {
		item.defense = 6
		item.protection = 4
		item.upgradeStatus = 0
	} else {
		item.defense = 2
	}

	return item
}

RPG.Item.upgradeWeapon = function(weapon) {
	if(weapon.itemType != RPG.Item.Type.Weapon) return false
	if(weapon.upgradeStatus > 4) return false

	weapon.damage += 3
	weapon.upgradeStatus++

	return weapon
}

RPG.Item.upgradeArmor = function(armor) {
	if(armor.itemType != RPG.Item.Type.Armor) return false
	if(armor.upgradeStatus > 4) return false

	armor.defense += 2
	armor.protection += 1
	armor.upgradeStatus++

	return armor
}

RPG.Item.setWeapon = function(player, _weapon) {
	if(!player.equipment) return false

	player.equipment.weapon = _weapon
}

RPG.Item.setArmor = function(player, _armor) {
	if(!player.equipment) return false

	player.equipment.armor = _armor
}