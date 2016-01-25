var React = require('react');

/*
	 ProductRow :
*/

var ProductRow = React.createClass({
  render: function() {

  	var product = this.props.product;

  	var date = product.updated_date
  	var date_short
  	if(typeof date === 'undefined'){
  		date_short = ''
  	}else{
  		date_short = date.substr(0,product.updated_date.length - 3)
  	}

    return (<li>
		        <div className="view">
		          <label>
		            <span id="quantity">{product.quantity}</span>
		            <span id="name">{product.name}</span>  
		            <span id="updated-date">{date_short}</span>  
		          </label>
		        </div>
     		 </li>);
  }
});

module.exports = ProductRow