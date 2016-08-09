/** @jsx React.DOM */

var CreateChar = React.createClass({displayName: "CreateChar",
	getInitialState: function() {
		return {
			username: '',
			talent: 'Warrior'
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
				    React.createElement("option", {value: "Wizard"}, "Wizard"), 
				    React.createElement("option", {value: "Fighter"}, "Fighter")
				), 
				React.createElement("button", {onClick: this.handleCreation}, "Create")
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
		//callback
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