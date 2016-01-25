var React = require('react');
//var Router = require('react-router')
//var clientRoutes = require('./client-routes.jsx')

var SubmitPage = require('./pages/Submit.jsx');
var HomePage =require('./pages/Home.jsx');
var History = require('./pages/History.jsx')
var SearchActions = require('./actions/SearchActions')

// // Snag the initial state that was passed from the server side
 var props = window.APP_PROPS

var element;

switch(props.page){
	case 'submit' : element = <SubmitPage/>;
					break;
	case 'home'	  : SearchActions.loadProducts(props.allProducts); //sync _products in Store == props.allProducts
					element = <HomePage allProducts={props.allProducts}/>;
					break;
	case 'history' : SearchActions.loadHistory(props.allProducts)
					element = <History allProducts={props.allProducts} />
					break;
}

React.render(element,document.getElementById('main'));

// Router.run(clientRoutes, function(Root){
// 	SearchActions.loadProducts(props.allProducts);
// 	React.render(<Root allProducts={props.allProducts}  />,document.getElementById('main'))
// })
