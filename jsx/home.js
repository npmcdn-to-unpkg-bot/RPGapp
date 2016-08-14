/** @jsx React.DOM */

var WarSkill = React.createClass({
	render: function() {
		return (
			<ol>
				<li>Buy Skill: Smash</li>
				<li>Buy Skill: Defense</li>
				<li>Buy Skill: Bash</li>
			</ol>
		)
	}
})

var MageSkill = React.createClass({
	render: function() {
		return (
			<ol>
				<li>Buy Skill: Firebolt</li>
				<li>Buy Skill: Mana Shield</li>
				<li>Buy Skill: Hailstorm</li>
			</ol>
		)
	}
})

var BowSkill = React.createClass({
	render: function() {
		return (
			<ol>
				<li>Buy Skill: Magnum</li>
				<li>Buy Skill: Arrow Revolver</li>
				<li>Buy Skill: Counter</li>
			</ol>
		)
	}
})

var FtrSkill = React.createClass({
	render: function() {
		return (
			<ol>
				<li>Buy Skill: Dropkick</li>
				<li>Buy Skill: Tumble</li>
				<li>Buy Skill: Punch</li>
			</ol>
		)
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
				skillOpt = <WarSkill />
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
					<li>Increase HP</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.hp, 50)}>Buy</button>
					<li>Increase MP</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.mp, 50)}>Buy</button>
					<li>Increase SP</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.sp, 25)}>Buy</button>
					<li>Increase Strength</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.str, 50)}>Buy</button>
					<li>Increase Dexterity</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.dex, 50)}>Buy</button>
					<li>Increase Will</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.will, 50)}>Buy</button>
					<li>Increase Intelligence</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.intl, 50)}>Buy</button>
					<li>Increase Luck</li><button onClick={this.handlePurchase.bind(null, RPG.currPlayer.stats.luck, 25)}>Buy</button>
				</ol>

				{skillOpt}

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
			// do the same for stats
		}

		this.setState({points: this.state.points - cost})

		return false
	},

	handlePointsChange: function(event) {
		// checks if enough points
		// calls corresponding handler
		// skills, stats, upgrades
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