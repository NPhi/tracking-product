var React = require('react');

/*
	ProductTable :
*/
var SearchActions = require('../actions/SearchActions')


//components
var ProductRow = require('./ProductRow.jsx')

var ProductTable = React.createClass({

  render: function() {

  	var allProducts = this.props.allProducts
  	var products = []

  	for(var key in allProducts){

  		var product = allProducts[key]

  		products.push(<ProductRow key={key} product={product} />)
  	}

    return (
        <ul id='todo-list' >
    			{products}
    		</ul>
      );
   }

});

module.exports = ProductTable