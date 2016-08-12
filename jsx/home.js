/** @jsx React.DOM */

var Dashboard = React.createClass({
	getInitialState: function() {
		return {
			points: 1000
		}
	},

	render: function() {
		return (
			<div className="dashboard">
				<div>You have <span>{this.state.points}</span> points to spend</div>

			</div>
		)
	},

	handlePointsChange: function(event) {

	}
})

var ActionItem = React.createClass({
	render: function() {
		return(
			<div></div>
		)
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
				    <option value="Wizard">Wizard</option>
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
		
		if(player) this.setState({created: true})
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