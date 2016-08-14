/** @jsx React.DOM */

var WarSkill = React.createClass({displayName: "WarSkill",
	render: function() {
		return (
			React.createElement("ol", null, 
				React.createElement("li", null, "Buy Skill: Bash"), React.createElement("button", {onClick: this.handlePurchase.bind(null, 'bash', 105)}, "Buy"), 
				React.createElement("li", null, "Buy Skill: Smash"), React.createElement("button", {onClick: this.handlePurchase.bind(null, 'smash', 155)}, "Buy")
			)
		)
	},

	handlePurchase: function(_name, _cost) {
		if(_cost > this.props.points) return false

		RPG.currPlayer.skills.push(RPG.Skills.getSkill(_name))

		return false
	}
})

var MageSkill = React.createClass({displayName: "MageSkill",
	render: function() {
		return (
			React.createElement("ol", null, 
				React.createElement("li", null, "Buy Skill: Firebolt"), React.createElement("button", {onClick: this.handlePurchase.bind(null, 'firebolt', 105)}, "Buy"), 
				React.createElement("li", null, "Buy Skill: Hailstorm"), React.createElement("button", {onClick: this.handlePurchase.bind(null, 'hailstorm', 155)}, "Buy")
			)
		)
	},

	handlePurchase: function(_name, _cost) {
		if(_cost > this.props.points) return false

		RPG.currPlayer.skills.push(RPG.Skills.getSkill(_name))

		return false
	}
})

var BowSkill = React.createClass({displayName: "BowSkill",
	render: function() {
		return (
			React.createElement("ol", null, 
				React.createElement("li", null, "Buy Skill: Arrow Revolver"), React.createElement("button", {onClick: this.handlePurchase.bind(null, 'revolver', 105)}, "Buy"), 
				React.createElement("li", null, "Buy Skill: Magnum"), React.createElement("button", {onClick: this.handlePurchase.bind(null, 'magnum', 155)}, "Buy")
			)
		)
	},

	handlePurchase: function(_name, _cost) {
		if(_cost > this.props.points) return false

		RPG.currPlayer.skills.push(RPG.Skills.getSkill(_name))

		return false
	}
})

var FtrSkill = React.createClass({displayName: "FtrSkill",
	render: function() {
		return (
			React.createElement("ol", null, 
				React.createElement("li", null, "Buy Skill: Punch"), React.createElement("button", {onClick: this.handlePurchase.bind(null, 'punch', 105)}, "Buy"), 
				React.createElement("li", null, "Buy Skill: Dropkick"), React.createElement("button", {onClick: this.handlePurchase.bind(null, 'dropkick', 155)}, "Buy")
			)
		)
	},

	handlePurchase: function(_name, _cost) {
		if(_cost > this.props.points) return false

		RPG.currPlayer.skills.push(RPG.Skills.getSkill(_name))

		return false
	}
})

var Dashboard = React.createClass({displayName: "Dashboard",
	getInitialState: function() {
		return {
			points: 1000,
		}
	},

	render: function() {
		var skillOpt
		switch(RPG.currTalent) {
			case RPG.Talent.WARRIOR:
				skillOpt = React.createElement(WarSkill, {points: this.state.points})
				break;
			case RPG.Talent.MAGE:
				skillOpt = React.createElement(MageSkill, null)
				break;
			case RPG.Talent.FIGHTER:
				skillOpt = React.createElement(FtrSkill, null)
				break;
			case RPG.Talent.RANGER:
				skillOpt = React.createElement(BowSkill, null)
				break;
			default:
				break;
		}

		return (
			React.createElement("div", {className: "dashboard"}, 
				React.createElement("div", null, "You have ", React.createElement("span", null, this.state.points), " points to spend"), 
				React.createElement("ol", null, 
					React.createElement("li", null, "Upgrade Armor"), React.createElement("button", {onClick: this.handlePurchase.bind(null, RPG.currPlayer.equipment.armor, "Armor", 75)}, "Buy"), 
					React.createElement("li", null, "Upgrade Weapon"), React.createElement("button", {onClick: this.handlePurchase.bind(null, RPG.currPlayer.equipment.weapon, "Weapon", 75)}, "Buy"), 
					React.createElement("li", null, "Increase HP"), React.createElement("button", {onClick: this.handlePurchase.bind(null, RPG.currPlayer.stats.hp, "HP", 50)}, "Buy"), 
					React.createElement("li", null, "Increase MP"), React.createElement("button", {onClick: this.handlePurchase.bind(null, RPG.currPlayer.stats.mp, "MP", 50)}, "Buy"), 
					React.createElement("li", null, "Increase SP"), React.createElement("button", {onClick: this.handlePurchase.bind(null, RPG.currPlayer.stats.sp, "SP", 25)}, "Buy"), 
					React.createElement("li", null, "Increase Strength"), React.createElement("button", {onClick: this.handlePurchase.bind(null, RPG.currPlayer.stats.str, "STR", 50)}, "Buy"), 
					React.createElement("li", null, "Increase Dexterity"), React.createElement("button", {onClick: this.handlePurchase.bind(null, RPG.currPlayer.stats.dex, "DEX", 50)}, "Buy"), 
					React.createElement("li", null, "Increase Will"), React.createElement("button", {onClick: this.handlePurchase.bind(null, RPG.currPlayer.stats.will, "WILL", 50)}, "Buy"), 
					React.createElement("li", null, "Increase Intelligence"), React.createElement("button", {onClick: this.handlePurchase.bind(null, RPG.currPlayer.stats.intl, "INTL", 50)}, "Buy"), 
					React.createElement("li", null, "Increase Luck"), React.createElement("button", {onClick: this.handlePurchase.bind(null, RPG.currPlayer.stats.luck, "LUCK", 25)}, "Buy")
				), 

				skillOpt, 

				React.createElement("button", {onClick: this.handleAdvance}, "FIGHT")

			)
		)
	},

	handlePurchase: function(purchaseItem, purchaseType, cost) {
		if(cost > this.state.points) return false

		//console.log(purchaseItem, purchaseType, cost)

		if(isNaN(purchaseItem)) {
			//console.log(purchaseType, RPG.Item.Type.Weapon)
			if(purchaseType == RPG.Item.Type.Weapon) {
				console.log('upgrading weapon ...')
				var weapon = RPG.Item.upgradeWeapon(purchaseItem)
				if(!weapon) {
					alert('you cannot upgrade further!')
					return false
				}

				RPG.Item.setWeapon(RPG.currPlayer, weapon)
			} 

			if(purchaseType == RPG.Item.Type.Armor) {
				console.log('upgrading armor ...')
				var armor = RPG.Item.upgradeArmor(purchaseItem)
				if(!armor) {
					alert('you cannot upgrade further')
					return false
				}

				RPG.Item.setArmor(RPG.currPlayer, armor)
			}
		} else {
			switch(purchaseType) {
				case "HP":
					RPG.currPlayer.stats.hp += 5
					break
				case "MP":
					RPG.currPlayer.stats.mp += 5
					break
				case "SP":
					RPG.currPlayer.stats.sp += 5
					break
				case "STR":
					RPG.currPlayer.stats.str += 5
					break
				case "DEX":
					RPG.currPlayer.stats.dex += 5
					break
				case "WILL":
					RPG.currPlayer.stats.will += 5
					break
				case "INTL":
					RPG.currPlayer.stats.intl += 5
					break
				case "LUCK":
					RPG.currPlayer.stats.luck += 5
					break
				default:
					break
			}
		}

		this.setState({points: this.state.points - cost})

		return false
	},

	handleAdvance: function(event) {
		confirm("Do you want to proceed?")
	}
})

var CreateChar = React.createClass({displayName: "CreateChar",
	getInitialState: function() {
		return {
			username: '',
			talent: 'Warrior',
			created: false
		}
	},

	render: function() {
		return (
			React.createElement("div", {className: "char-creation"}, 
				React.createElement("label", null, "Username"), 
				React.createElement("input", {type: "text", 
						name: "username", 
						ref: "username", 
						value: this.state.username, 
						onChange: this.handleChange}), 
				React.createElement("label", null, "Talent"), 
				React.createElement("select", {ref: "talent", value: this.state.talent, onChange: this.handleTalentSelect}, 
					React.createElement("option", {value: "Warrior"}, "Warrior"), 
				    React.createElement("option", {value: "Ranger"}, "Ranger"), 
				    React.createElement("option", {value: "Mage"}, "Mage"), 
				    React.createElement("option", {value: "Fighter"}, "Fighter")
				), 
				this.state.created ? null : React.createElement("button", {onClick: this.handleCreation}, "Create"), 
				 this.state.created? React.createElement(Dashboard, null) : null
			)
		)
	},

	handleChange: function(event) {
    	this.setState({username: event.target.value})
 	},

	handleTalentSelect: function(event) {
		this.setState({talent: event.target.value})
	},

	handleCreation: function() {
		var name = this.state.username
		var talent = this.state.talent
		
		var p1 = RPG.Player.createPlayer(name, talent)
		
		if(p1) {
			this.setState({created: true})
			RPG.currPlayer = p1
			RPG.currTalent = talent
		}
	}
})

var RPGHome = React.createClass({displayName: "RPGHome",
	render: function() {
		return (
			React.createElement("div", {className: "rpg"}, 
				React.createElement(CreateChar, null)
			)
		)
	}
})

var container = document.getElementById('myrpg')
ReactDOM.render(React.createElement(RPGHome, null), container)