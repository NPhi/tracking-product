var AppDispatcher = require('../dispatcher/AppDispatcher')
var SubmitConstants = require('../constants/SubmitConstants')
var ProductAPI =  require('../helpers/ProductAPI')
var FalcorModel = require('../helpers/FalcorModel')

var SubmitActions = {

	/**
	 *receiving NEW product data
	 *@param - data : {name : 'product', quantity : 20}
	 *
	*/

	createProduct : function(data){
		
		var actionType = SubmitConstants.SUBMIT_CREATE;

		AppDispatcher.dispatch({
			actionType : actionType,
			data : data
		})
		
	},

	/**
	 *
	 * receiving id from Product.jsx
	 * @param - data string/int - id
	 *	
	*/

	destroy: function(data){

		var actionType = SubmitConstants.SUBMIT_DESTROY;

		AppDispatcher.dispatch({
			actionType : actionType,
			data : data
		})
	},

	/**
	 *
	 *trigger to destroy all products
	 *
	*/

	destroyAll: function(){

		var actionType = SubmitConstants.SUBMIT_DESTROY_ALL;

		AppDispatcher.dispatch({
			actionType : actionType
		})

	},

	/**
	 *
	 *receiving id and updated data
	 *@param - (id,data) --> id(int) and data({name:'product',quantity:20})
	*/

	updateProduct: function(id,data) {

		var actionType = SubmitConstants.SUBMIT_UPDATE;

		AppDispatcher.dispatch({
			actionType: actionType,
			id: id,
			data : data
		})

	},

	/**
	 *
	 *receiving text from ProductInput
	 * and get suggest names from Server
	 * {
			'text' : {
				0 : "name"
				and more..
			}	
	 * }
	 *
	*/

	getSuggestNames: function(text){

		text = text.trim();

		var actionType = SubmitConstants.SUBMIT_SUGGEST;
		
		if(text === ''){
			return AppDispatcher.dispatch({
				
				actionType: actionType,
				data : {}

			})
		}
		FalcorModel.get(["products",text,{length:5}]).then(function(res){	

			var sugNames = res.json.products[text]
	
			AppDispatcher.dispatch({
				
				actionType: actionType,
				data : sugNames

			})
		},function(err){
			if(err){
				AppDispatcher.dispatch({
				
					actionType: actionType,
					data : {}

				})
			}
		})



	},

	/**
	 *
	 *receivin int id of sugName 
	 *determine to trigger SUBMIT_SELECTED AND SUBMIT_UNSELECTED
	*/

	toggleSugNameSelected: function(id){
		
		var actionType = SubmitConstants.SUBMIT_SELECTED;


		AppDispatcher.dispatch({
			
			actionType: actionType,
			id : id.toString()

		})

	},
	undoSugSelected : function(){
		var actionType = SubmitConstants.SUBMIT_UNSELECTED;
		AppDispatcher.dispatch({	
			actionType: actionType
		})
	},

	/**
	 *
	 *update product to the server
	 *@param : array products
	 *
	*/
	postProducts: function(data){
		ProductAPI.postProducts(data,SubmitActions.destroyAll);
	}

}



module.exports = SubmitActions;