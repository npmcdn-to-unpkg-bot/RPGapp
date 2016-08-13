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
		switch(RPG.chosenTalent) {
			case RPG.Talent.WARRIOR:
				skillOpt = <WarSkill />
				break;
			case RPG.Talent.MAGE:
				skillOpt = <MageSkill />
				break;
			case RPG.Talent.FIGHTER:
				skillOpt = <BowSkill />
				break;
			case RPG.Talent.RANGER:
				skillOpt = <FtrSkill />
				break;
			default:
				break;
		}

		return (
			<div className="dashboard">
				<div>You have <span>{this.state.points}</span> points to spend</div>
				<ul>
					<li>Upgrade Armor</li>
					<li>Upgrade Weapon</li>
					<li>Increase HP</li>
					<li>Increase MP</li>
					<li>Increase SP</li>
					<li>Increase STR</li>
					<li>Increase DEX</li>
					<li>Increase WIL</li>
					<li>Increase INTL</li>
					<li>Increase LUCK</li>
				</ul>

				{skillOpt}

			</div>
		)
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
		
		var player = RPG.Player.createPlayer(name, talent)
		
		if(player) {
			this.setState({created: true})
			RPG.chosenTalent = talent
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