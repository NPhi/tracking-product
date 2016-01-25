var React = require('react');
var Router = require('react-router')
var Route = Router.Route
var DefaultRoute = Router.DefaultRoute;
var SubmitPage = require('./pages/Submit.jsx');
var HomePage =require('./pages/Home.jsx');
var History = require('./pages/History.jsx')

var routes = (
	<Route>
		<Route path="submit" handler={SubmitPage} />
		<Route path="history" handler={History} />
		<DefaultRoute handler={HomePage}/>

	</Route>
)

module.exports = routes