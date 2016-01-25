var AppDispatcher = require('../dispatcher/AppDispatcher')
var SearchConstants = require('../constants/SearchConstants')
var FalcorModel = require('../helpers/FalcorModel')
var DataHelper = require('../helpers/DataHelper')
var falcor = require('falcor')

var SearchActions = {


	/**
	 *
	 * load products from app.js to sync with markup data
	 * @param: products Array [{'name': 'string','quantity': int)}...]
	 *
	*/

	loadProducts: function(products){

		var actionType = SearchConstants.SEARCH_LOAD_PRODUCTS;

		AppDispatcher.dispatch({
			actionType : actionType,
			products : products		
		})

	},

	/**
	 *LOADING Product from the server with specific numbers 
	 * @param: length : int <-- the current allProducts.length in Home.jsx
	 *
	*/


	getProducts : function(length,loadNums){

		FalcorModel.get(["products","length"]).then(function(res){
			
			var serverLength = res.json.products.length
			if(serverLength !== length){
				var to = length + loadNums

				var actionType = SearchConstants.SEARCH_PRODUCTS
				
				FalcorModel.get(["products",{from: length, to: to},['name','quantity','updated_date']]).then(function(res){

					AppDispatcher.dispatch({
						actionType : actionType,
						products : res.json.products		
					})
				})
			}

		})

	},

	/**
	 *
	 *LOADING products from the server with text
	 * @param : string text
	 *
	*/

	searchProducts: function(text){
		
		var actionType = SearchConstants.SEARCH_LOAD_WITH_TEXT

		var route = 'sproducts'

		var integers = {length : 15}
		
		if(DataHelper.isInt(text)){ // if text is numbers, search by less than quantity

			text = parseInt(text)
			route = 'numproducts'
			integers.length = 30 

		}


		FalcorModel.get([route,text,integers,['name','quantity','updated_date']]).then(function(res){
					
			AppDispatcher.dispatch({
				actionType : actionType,
				products : res.json[route][text]	
			})

		})
		

		


	},

	loadHistory : function(products){

		var actionType = SearchConstants.SEARCH_LOAD_HISTORY;

		AppDispatcher.dispatch({
			actionType : actionType,
			products : products		
		})
	},
	searchHistory : function(text){
		FalcorModel.get(["shistories",text,{length:15},['name','quantity','updated_date']]).then(function(res){
			
			var actionType = SearchConstants.SEARCH_LOAD_HISTORY_TEXT

			AppDispatcher.dispatch({
				actionType : actionType,
				products : res.json.shistories[text]	
			})
		})
	},
	getHistory : function(length, loadNums){
		FalcorModel.get(["histories","length"]).then(function(res){
			
			var serverLength = res.json.histories.length
			if(serverLength !== length){

				var to = length + loadNums

				var actionType = SearchConstants.SEARCH_HISTORY
				
				FalcorModel.get(["histories",{from: length, to: to},['name','quantity','updated_date']]).then(function(res){

					AppDispatcher.dispatch({
						actionType : actionType,
						products : res.json.histories		
					})
				})

			}

		})
	}

	

}




module.exports = SearchActions;