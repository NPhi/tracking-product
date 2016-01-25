var React = require('react');

/*
	AutoComplete :
*/

var AutoComplete = React.createClass({
  render: function() {
    return <input
    			id={this.props.id}
    			className={this.props.className}
    			value={this.props.value}
    			disabled
    		/>;
  },
});

module.exports = AutoComplete