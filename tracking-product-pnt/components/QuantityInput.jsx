var React = require('react');
var KEY_CODE = require('../constants/Keys')
var DataHelper = require('../helpers/DataHelper')

/*
	QuantityInput :
		- get quantity from user -> save quantity in parent (ProductInput) -> give focus to ProductInput (SPACE OR ENTER keydowns)
	Validation :
		- empty
		- not int
		- if quantity is negative -> trigger product export mode

*/

var QuantityInput = React.createClass({

	render: function() {
		return <input
		          id={this.props.id}
		          placeholder={this.props.placeholder}
		          onChange={this._onChange}
		          value={this.props.value}
		          onKeyDown={this._onKeyDown}
		          onFocus={this._onFocus}
		          onBlur={this._onBlur}
		          autoFocus={true}
		          tabIndex={this.props.tabIndex}
		          ref="textInput"
		   		/>;
	},

	_jumpFocus: function(e){

		var value = e.target.value.trim();

		if(value !== '' && DataHelper.isInt(value)){
			this.props.onNextFocus('textInput')
		}else{
			this.props.onError('SL is integer')
		}

	},

	_onChange: function(e){

		this.props.onSaveQuantity(e.target.value)
	
	},

	_onKeyDown : function(e){
		if(e.keyCode === KEY_CODE.enter || e.keyCode === KEY_CODE.space){
			e.preventDefault()
			this._jumpFocus(e);
		}
	},
	_onFocus: function(){
		
		this.props.onError('')
	},
	_onBlur: function(e){
		if(this.props.className === 'edit')
			this._jumpFocus(e)
	}

});

module.exports = QuantityInput