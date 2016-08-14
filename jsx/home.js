/** @jsx React.DOM */

var WarSkill = React.createClass({
	render: function() {
		return (
			<ol>
				<li>Buy Skill: Bash</li><button onClick={this.handlePurchase.bind(null, 'bash', 105)}>Buy</button>
				<li>Buy Skill: Smash</li><button onClick={this.handlePurchase.bind(null, 'smash', 155)}>Buy</button>
			</ol>
		)
	},

	handlePurchase: function(_name, _cost) {
		if(_cost > this.props.points) return false

		RPG.currPlayer.skills.push(RPG.Skills.getSkill(_name))

		return false
	}
})

var MageSkill = React.createClass({
	render: function() {
		return (
			<ol>
				<li>Buy Skill: Firebolt</li><button onClick={this.handlePurchase.bind(null, 'firebolt', 105)}>Buy</button>
				<li>Buy Skill: Hailstorm</li><button onClick={this.handlePurchase.bind(null, 'hailstorm', 155)}>Buy</button>
			</ol>
		)
	},

	handlePurchase: function(_name, _cost) {
		if(_cost > this.props.points) return false

		RPG.currPlayer.skills.push(RPG.Skills.getSkill(_name))

		return false
	}
})

var BowSkill = React.createClass({
	render: function() {
		return (
			<ol>
				<li>Buy Skill: Arrow Revolver</li><button onClick={this.handlePurchase.bind(null, 'revolver', 105)}>Buy</button>
				<li>Buy Skill: Magnum</li><button onClick={this.handlePurchase.bind(null, 'magnum', 155)}>Buy</button>
			</ol>
		)
	},

	handlePurchase: function(_name, _cost) {
		if(_cost > this.props.points) return false

		RPG.currPlayer.skills.push(RPG.Skills.getSkill(_name))

		return false
	}
})

var FtrSkill = React.createClass({
	render: function() {
		return (
			<ol>
				<li>Buy Skill: Punch</li><button onClick={this.handlePurchase.bind(null, 'punch', 105)}>Buy</button>
				<li>Buy Skill: Dropkick</li><button onClick={this.handlePurchase.bind(null, 'dropkick', 155)}>Buy</button>
			</ol>
		)
	},

	handlePurchase: function(_name, _cost) {
		if(_cost > this.props.points) return false

		RPG.currPlayer.skills.push(RPG.Skills.getSkill(_name))

		return false
	}
})

var Dashboard = React.createClass({
	getInitialState: function() {
		return {
			points: 1000,
		}
	},

	render: function() {
		var skillOpt
		switch(RPG.currTalent) {
			case RPG.Talent.WARRIOR:
				skillOpt = <WarSkill points={this.state.points}/>
				break;
			case RPG.Talent.MAGE:
				skillOpt = <MageSkill />
				break;
			case RPG.Talent.FIGHTER:
				skillOpt = <FtrSkill />
				break;
			case RPG.Talent.RANGER:
				skillOpt = <BowSkill />
				break;
			default:
				break;
		}

		return (
			<div className="dashboard">
				<div>You have <span>{this.state.points}</span> points to spend</div>
				<ol>
					<li>Upgrade Armor</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.equipment.armor, "Armor", 75)}>Buy</button>
					<li>Upgrade Weapon</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.equipment.weapon, "Weapon", 75)}>Buy</button>
					<li>Increase HP</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.hp, "HP", 50)}>Buy</button>
					<li>Increase MP</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.mp, "MP", 50)}>Buy</button>
					<li>Increase SP</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.sp, "SP", 25)}>Buy</button>
					<li>Increase Strength</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.str, "STR", 50)}>Buy</button>
					<li>Increase Dexterity</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.dex, "DEX", 50)}>Buy</button>
					<li>Increase Will</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.will, "WILL", 50)}>Buy</button>
					<li>Increase Intelligence</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.intl, "INTL", 50)}>Buy</button>
					<li>Increase Luck</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.luck, "LUCK", 25)}>Buy</button>
				</ol>

				{skillOpt}

				<button onClick={this.handleAdvance}>FIGHT</button>

			</div>
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

var CreateChar = React.createClass({
	getInitialState: function() {
		return {
			username: '',
			talent: 'Warrior',
			created: false
		}
	},

	render: function() {
		return (
			<div className="char-creation">
				<label>Username</label>
				<input type="text" 
						name="username" 
						ref="username" 
						value={this.state.username} 
						onChange={this.handleChange} />
				<label>Talent</label>
				<select ref="talent" value={this.state.talent} onChange={this.handleTalentSelect}>
					<option value="Warrior">Warrior</option>
				    <option value="Ranger">Ranger</option>
				    <option value="Mage">Mage</option>
				    <option value="Fighter">Fighter</option>
				</select>
				{this.state.created ? null : <button onClick={this.handleCreation}>Create</button>}
				{ this.state.created? <Dashboard /> : null }
			</div>
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

var RPGHome = React.createClass({
	render: function() {
		return (
			<div className="rpg">
				<CreateChar />
			</div>
		)
	}
})

var container = document.getElementById('myrpg')
ReactDOM.render(<RPGHome />, container)