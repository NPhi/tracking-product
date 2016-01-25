var React = require('react');
var classNames = require('classnames')
var SubmitActions = require('../actions/SubmitActions')
var KEY_CODE = require('../constants/Keys')

/*
	SugText : show a list of product names based on 
				given text
*/

var SugNameList = React.createClass({

	render: function() {

		var sugNames = this.props.sugNames;

		var len = Object.keys(sugNames).length;

		var lists = [];

		var self = this

		Object.keys(sugNames).forEach(function(i){
			if(i !== "5")
		    lists.push(<SugItem onSave={self.props.onSave} key={sugNames[i].name} sugName={sugNames[i]} />)
		
		})


		return (<div onKeyDown={this._onKeyDown} className={this.props.className}>
					<ul>
						{lists}
					</ul>
				</div>);
	}
});

var SugItem = React.createClass({

	render: function(){
		return (
			<li onMouseEnter={this._onMouseEnter} onMouseLeave={this._onMouseLeave} onClick={this._onClick} className={classNames({'selected' : this.props.sugName.selected})}>
				{this.props.sugName.name}
			</li>
		)
	},

	_onMouseEnter: function(){

		SubmitActions.toggleSugNameSelected(this.props.sugName.id)
	
	},

	_onClick: function(){
		this.props.onSave()
	}

})

module.exports = SugNameList