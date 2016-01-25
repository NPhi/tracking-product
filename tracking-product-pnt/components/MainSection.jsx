'use strict'

var React = require('react');

var SubmitActions = require('../actions/SubmitActions');
var SubmitStore = require('../stores/SubmitStore');

//components
var Header = require('./Header.jsx');
var Product = require('./Product.jsx');

/*
	 MainSetion :
*/

var MainSetion = React.createClass({

	render: function() {
	if (Object.keys(this.props.allProducts).length < 1) {
      return null;
    }

    var allProducts = this.props.allProducts;
    var i = 1;
    var products = [];
    for (var key in allProducts) {
      products.unshift(<Product id={i++} key={key} product={allProducts[key]} />);
    }

    return (
      <section>
        <ul id="todo-list">{products}</ul>
      </section>
    );
	}
});

module.exports = MainSetion