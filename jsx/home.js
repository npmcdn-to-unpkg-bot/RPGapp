/** @jsx React.DOM */

var CreateChar = React.createClass({
	getInitialState: function() {
		return {
			username: '',
			talent: 'Warrior'
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
				<button onClick={this.handleCreation}>Create</button>
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
		//callback
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