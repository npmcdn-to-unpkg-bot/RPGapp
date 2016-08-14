RPG.Skills = {}

RPG.Skills.Type = {
	Normal: "WeaponAttack"
	, Spell: "ManaAttack"
	, Channel: "StaminaAttack"
	, Ultimate: "Ultimate"
}

// all classes share a set of common skills
// each class gets its unique skills

// skill - name, castType, dmgOutput, restriction

RPG.SkillsList = ['bash', 'smash', 'firebolt', 'hailstorm', 'revolver', 'magnum', 'punch', 'dropkick']

RPG.Skills.createSkill = function(_name, _talent, _skillType, _bonus) {
	if(_bonus == null) _bonus = 0

	var _castTime = 0
	if(	_skillType == RPG.Skills.Type.Spell ) _castTime = 3 // config this later
	if( _skillType == RPG.Skills.Type.Ultimate ) _castTime = 6

	var skill = {
		name: _name
		, talent: _talent
		, castTime: _castTime
		, stamCost: (_skillType == RPG.Skills.Type.Channel) ? 15 : 0
		, manaCost: (_skillType == RPG.Skills.Type.Spell) ? 15 : 0
		, damage: 10
	}

	return skill
}

RPG.Skills.normalAttack = function(_talent) {
	return RPG.Skills.createSkill("normal attack", null, RPG.Skills.Type.Normal)
}

RPG.Skills.getSkill = function(_name) {
	if(RPG.SkillsList.indexOf(_name) < 0) return false

	return RPG.Skills[_name]
}

RPG.Skills.bash = RPG.Skills.createSkill("bash", RPG.Talent.WARRIOR, RPG.Skills.Type.Channel)
RPG.Skills.smash = RPG.Skills.createSkill("smash", RPG.Talent.WARRIOR, RPG.Skills.Type.Ultimate, 5)
RPG.Skills.firebolt = RPG.Skills.createSkill("firebolt", RPG.Talent.MAGE, RPG.Skills.Type.Spell)
RPG.Skills.hailstorm = RPG.Skills.createSkill("hailstorm", RPG.Talent.MAGE, RPG.Skills.Type.Ultimate, 5)
RPG.Skills.revolver = RPG.Skills.createSkill("revolver", RPG.Talent.RANGER, RPG.Skills.Type.Channel)
RPG.Skills.magnum = RPG.Skills.createSkill("magnum", RPG.Talent.RANGER, RPG.Skills.Type.Ultimate, 5)
RPG.Skills.punch = RPG.Skills.createSkill("punch", RPG.Talent.FIGHTER, RPG.Skills.Type.Channel)
RPG.Skills.dropkick = RPG.Skills.createSkill("dropkick", RPG.Talent.FIGHTER, RPG.Skills.Type.Ultimate, 5)