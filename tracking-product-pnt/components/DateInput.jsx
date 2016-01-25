var React = require('react')
var DataHelper = require('../helpers/DataHelper.js')
var KEY_CODE = require('../constants/Keys')
//components
var ErrorMessage = require('./ErrorMessage.jsx')


/*
	DateInput :
*/


var DateInput = React.createClass({
	getInitialState: function(){
		return {
			value : this.props.value || DataHelper.formatDate(new Date(),'dd/mm/yy'),
			error : ''
		}
	},

	render: function() {

	var error = this.state.error !== '' ? <ErrorMessage className='error-text' id='date-error-message' message={this.state.error} /> : ''

	return (<div id={this.props.id}>
			 <input
	              id="new-date"
	              placeholder={this.props.placeholder}
	              onChange={this._onChange}
	              onFocus={this._onFocus}
	              onBlur={this._onBlur}
	              onKeyDown={this._onKeyDown}
	              value={this.state.value}
	              tabIndex={this.props.tabIndex}
	    		/>
	    		<div>
	    			{error}
	    		</div>
			</div>);
	},

	_onFocus: function(){
		this.setState({error:''})
	},

	_onChange: function(e){
		if(e.target.value === '') this.setState({error:''})
		this.setState({value : e.target.value})
	},

	_onBlur: function(){
		var date = this.state.value
		if(this._isDateValid(date))
     		 this.props.onSaveDate(date)
   		
	},
	_onKeyDown: function(event){
		var date = this.state.value
		if (event.keyCode === KEY_CODE.enter && this._isDateValid(date))
				this.props.onNextFocus('quantInput')

	},
	_isDateValid: function(date){
		//check date fomat
		if(DataHelper.checkDate(date) !== null){
   		 	 this.setState({error: ''})
   		 	 return true
   		 }else{
     		 this.setState({error : 'Ngày sai'})
     		 return false
   		 }
	}
	


});

module.exports = DateInput