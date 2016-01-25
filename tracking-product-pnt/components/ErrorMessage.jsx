var React = require('react')

/*
	ErrorMessage :
*/

var ErrorMessage = React.createClass({
  render: function() {
    return <span id={this.props.id} className={this.props.className}>{this.props.message}</span>
  }
});

module.exports = ErrorMessage