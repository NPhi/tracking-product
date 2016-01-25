
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter;
var SearchConstants = require('../constants/SearchConstants')
var DataHelper = require('../helpers/DataHelper')


var CHANGE_EVENT = 'change';

var _products = [];


/**
 *
 *load the products at first time to sync with the static props.AllProducts in Home.jsx
 *
*/

function load(products){
	_products = products
}

/**
 *add loaded products into _products
 *@products: object {0 : {name:'string',quantity: int}....}
 *
*/

function add(products){	

	products = DataHelper.filterEmptyObject(products,'name')
	for(var i in products){
		_products.push(products[i])
	}

}

function search(products){
	products =  DataHelper.filterEmptyObject(products,'name')
	_products = Object.keys(products).map(function(k) { return products[k] });
}

/**
 *
 *get filtered products and update _products
 *@products : object {0 : {name:'string',quantity: int}....}

*/

function search(products){
	products =  DataHelper.filterEmptyObject(products,'name')
	_products = Object.keys(products).map(function(k) { return products[k] });
}

var SearchStore = assign({}, EventEmitter.prototype,{

	getAll : function(){
		return _products;
	},

	emitChange : function(){
		this.emit(CHANGE_EVENT);
	},

	addChangeListener: function(callback){
		this.on(CHANGE_EVENT,callback)
	},

	removeChangeListener: function(callback){
		this.removeListener(CHANGE_EVENT, callback)
	}

}) // end SearchStore

//register callbacks to handle all actions
AppDispatcher.register(function(action){
	switch(action.actionType){
		case SearchConstants.SEARCH_LOAD_HISTORY:
			load(action.products);
			SearchStore.emitChange();
			break;
		case SearchConstants.SEARCH_LOAD_HISTORY_TEXT:
			search(action.products);
			SearchStore.emitChange();
			break;
		case SearchConstants.SEARCH_HISTORY:
			add(action.products);
			SearchStore.emitChange();
			break;
		default: ;

	}
})

module.exports = SearchStore;