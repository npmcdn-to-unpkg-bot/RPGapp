/** @jsx React.DOM */

var Dashboard = React.createClass({displayName: "Dashboard",
	getInitialState: function() {
		return {
			points: 1000
		}
	},

	render: function() {
		return (
			React.createElement("div", {className: "dashboard"}, 
				React.createElement("div", null, "You have ", React.createElement("span", null, this.state.points), " points to spend")

			)
		)
	},

	handlePointsChange: function(event) {

	}
})

var ActionItem = React.createClass({displayName: "ActionItem",
	render: function() {
		return(
			React.createElement("div", null)
		)
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
				    React.createElement("option", {value: "Wizard"}, "Wizard"), 
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
		
		if(player) this.setState({created: true})
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