var React = require('react');

/*
	SearchInput :
*/


var SearchInput = React.createClass({
	getInitialState: function(){
	 return {value : this.props.value || ''}
	},

  render: function() {
    return (<input
    	id={this.props.id}
      style={{width: '100%'}}
    	type='text'
      value = {this.state.value}
    	placeholder={this.props.placeholder}
      ref='searchInput'
      autoFocus
    	onBlur={this._onBlur}
      onChange={this._onChange}
    />)
  },

  /**
   * @param {object} event
   */
  _onChange: function(/*object*/ event) {

    var value = event.target.value
  
    this.props.onChange(value)

    this.setState({
      value : value
    })

  },
  _onBlur : function(event){

  }

});

module.exports = SearchInput