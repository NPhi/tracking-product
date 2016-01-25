var JSX = require("node-jsx").install({
  extension: ".jsx"
});
var React = require('react')
// var Router = require('react-router')
// var clientRoutes = require('../client-routes.jsx')
var Product = require('../models/product')
var History = require('../models/history')
var SubmitPage = require('../pages/Submit.jsx')
var HomePage =require('../pages/Home.jsx')
var HistoryPage =require('../pages/History.jsx')
var DOM = React.DOM, body = DOM.body,div = DOM.div, script = DOM.script;

exports.index = function(req,res){

	// var ipAddr = req.headers["x-forwarded-for"];
 //  if (ipAddr){
 //    var list = ipAddr.split(",");
 //    ipAddr = list[list.length-1];
 //  } else {
 //    ipAddr = req.connection.remoteAddress;
 //  }
 //  console.log("this is IP ADRESS " + ipAddr);


	Product.find().sort({quantity:-1}).limit(15).then(function(products){

		products = Object.keys(products).map(function(key){return products[key]})

		var props={page :'home',allProducts: products}
		var element = React.createElement(HomePage,props);
		var markup = React.renderToString(element);

		var html = renderFullHtml(markup,props)

	    // Return the page to the browser
	    res.end(html)

	 	// Router.run(clientRoutes,function(Handler){
	 	// 	var props = {allProducts: products}
	 	// 	var element = React.createElement(Handler,props)
	 	// 	var markup = React.renderToString(element)
	 	// 	var html = renderFullHtml(markup,props)
	 	// 	res.end(html)
	 	// })


	})
	
}


exports.submit = function(req, res){
	var props = {page: 'submit'};
	var element = React.createElement(SubmitPage,props);
	var markup = React.renderToString(element);
	var html = renderFullHtml(markup,props)
	res.end(html)
}	

exports.history = function(req,res){

	History.find().sort({$natural : -1}).limit(15).then(function(products){

		products = Object.keys(products).map(function(key){return products[key]})

		var props = {page: 'history',allProducts:products};
		var element = React.createElement(HistoryPage,props);
		var markup = React.renderToString(element);
		var html = renderFullHtml(markup,props)
		
		res.end(html)
	})

	
}


function renderFullHtml(markup, props){

	var bodyHTML = React.renderToStaticMarkup(body(null,

	      // The actual server-side rendering of our component occurs here, and we
	      // pass our data in as `props`. This div is the same one that the client
	      // will "render" into on the browser from browser.js
	      div({id: 'main', dangerouslySetInnerHTML: {__html:
	       	markup
	      }}),

	      // The props should match on the client and server, so we stringify them
	      // on the page to be available for access by the code run in browser.js
	      // You could use any var name here as long as it's unique
	      script({dangerouslySetInnerHTML: {__html:
	        'var APP_PROPS = ' + JSON.stringify(props) + ';'
	      }}),

	      // Then the browser will fetch and run the browserified bundle consisting
	      // of browser.js and all its dependencies.
	      // We serve this from the endpoint a few lines down.
	      script({src: 'js/bundle.js'})
	 ))


	var head = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Kho</title><link rel="stylesheet" href="stylesheets/main.css" /></head>'
	return head + bodyHTML + '</html>'

}
