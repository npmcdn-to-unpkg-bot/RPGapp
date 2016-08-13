/** @jsx React.DOM */

var WarSkill = React.createClass({displayName: "WarSkill",
	render: function() {
		return (
			React.createElement("ol", null, 
				React.createElement("li", null, "Buy Skill: Smash"), 
				React.createElement("li", null, "Buy Skill: Defense"), 
				React.createElement("li", null, "Buy Skill: Bash")
			)
		)
	}
})

var MageSkill = React.createClass({displayName: "MageSkill",
	render: function() {
		return (
			React.createElement("ol", null, 
				React.createElement("li", null, "Buy Skill: Firebolt"), 
				React.createElement("li", null, "Buy Skill: Mana Shield"), 
				React.createElement("li", null, "Buy Skill: Hailstorm")
			)
		)
	}
})

var BowSkill = React.createClass({displayName: "BowSkill",
	render: function() {
		return (
			React.createElement("ol", null, 
				React.createElement("li", null, "Buy Skill: Magnum"), 
				React.createElement("li", null, "Buy Skill: Arrow Revolver"), 
				React.createElement("li", null, "Buy Skill: Counter")
			)
		)
	}
})

var FtrSkill = React.createClass({displayName: "FtrSkill",
	render: function() {
		return (
			React.createElement("ol", null, 
				React.createElement("li", null, "Buy Skill: Dropkick"), 
				React.createElement("li", null, "Buy Skill: Tumble"), 
				React.createElement("li", null, "Buy Skill: Punch")
			)
		)
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
		switch(RPG.chosenTalent) {
			case RPG.Talent.WARRIOR:
				skillOpt = React.createElement(WarSkill, null)
				break;
			case RPG.Talent.MAGE:
				skillOpt = React.createElement(MageSkill, null)
				break;
			case RPG.Talent.FIGHTER:
				skillOpt = React.createElement(BowSkill, null)
				break;
			case RPG.Talent.RANGER:
				skillOpt = React.createElement(FtrSkill, null)
				break;
			default:
				break;
		}

		return (
			React.createElement("div", {className: "dashboard"}, 
				React.createElement("div", null, "You have ", React.createElement("span", null, this.state.points), " points to spend"), 
				React.createElement("ul", null, 
					React.createElement("li", null, "Upgrade Armor"), 
					React.createElement("li", null, "Upgrade Weapon"), 
					React.createElement("li", null, "Increase HP"), 
					React.createElement("li", null, "Increase MP"), 
					React.createElement("li", null, "Increase SP"), 
					React.createElement("li", null, "Increase STR"), 
					React.createElement("li", null, "Increase DEX"), 
					React.createElement("li", null, "Increase WIL"), 
					React.createElement("li", null, "Increase INTL"), 
					React.createElement("li", null, "Increase LUCK")
				), 

				skillOpt

			)
		)
	},

	handlePointsChange: function(event) {
		// checks if enough points
		// calls corresponding handler
		// skills, stats, upgrades
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
		
		var player = RPG.Player.createPlayer(name, talent)
		
		if(player) {
			this.setState({created: true})
			RPG.chosenTalent = talent
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