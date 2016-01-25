
var assign = require('object-assign');

var AppDispatcher = require('../dispatcher/AppDispatcher')
var EventEmitter = require('events').EventEmitter;
var SubmitConstants = require('../constants/SubmitConstants')
var DataHelper = require('../helpers/DataHelper')

var CHANGE_EVENT = 'change';

var _products = {};

//contains suggest names of product
var _textFilters = {};

/**
 *
 * create a NEW product 
 param : data - {name: 'product', quantity: 10}
 creating id so it is easy to manipulate with React
 *
*/
function create(data){

	var productIndex = productIndexOf(data)

	if(productIndex !== -1){
		updateQuantity(data.quantity,productIndex);
	}else{

		var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
		_products[id] = {
			id: id,
			quantity: data.quantity,
			name: data.name,
			updated_date: data.date
		};

	}

}

function update(data,index){
	_products[index] = assign({},_products[index],data)
}

function updateQuantity(quantity,index){
	_products[index].quantity += quantity
}

function productIndexOf(data){

	for(var i in _products){
		if(_products[i].name === data.name)
			return i
	}

	return -1
}

/**
 *
 *delete one item in products lists
 *
*/

function destroy(id) {
	delete _products[id];
}

/**
 *
 *delete all items in products lists
 *
*/

function destroyAll(){
	_products = {}
}

/**
 *
 *get names related to ProductTextInput
 *@param : object{'text' : 
 					0 : {"name"},
 					1 : {"name"},
 					and more...
 				}
 *
*/	
function updateSugNames(data){

	_textFilters = {};

	data = DataHelper.filterEmptyObject(data)

	for (var i in data) {
	  	var obj = {id:i,name : data[i],selected:false}
	  	_textFilters[i] = assign({},obj)
	}

}


/**
 *
 *update selected sugname
 *
*/
function updateSelected(id,updates){
	_textFilters[id] = assign({},_textFilters[id],updates)
	for(var i in _textFilters){
		if(i !== id && _textFilters[i].selected){
			_textFilters[i].selected = false;
		}
	}
}

/**
 *
 *reset the sugname obj
 *
*/
function clearSugNames(){
	for(var i in _textFilters){
			_textFilters[i].selected = false;
	}
}


var SubmitStore = assign({}, EventEmitter.prototype,{

	getAll : function(){
		return _products;
	},

	getSugNames:function(){
		return _textFilters;
	},

	getDate : function(){
		return 'date';
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

}) // end SubmitStore

//register callbacks to handle all actions
AppDispatcher.register(function(action){
	switch(action.actionType){
		case SubmitConstants.SUBMIT_CREATE:
			create(action.data);
			SubmitStore.emitChange();
			break;
		case SubmitConstants.SUBMIT_UPDATE:
			update(action.data, action.id)
			SubmitStore.emitChange();
			break;
		case SubmitConstants.SUBMIT_DESTROY:
			destroy(action.data);
			SubmitStore.emitChange();
			break;
		case SubmitConstants.SUBMIT_DESTROY_ALL:
			destroyAll();
			SubmitStore.emitChange();
			break;
		case SubmitConstants.SUBMIT_SUGGEST:
			updateSugNames(action.data);
			SubmitStore.emitChange();
			break;
		case SubmitConstants.SUBMIT_SELECTED:
			updateSelected(action.id,{selected : true});
			SubmitStore.emitChange();
			break;
		case SubmitConstants.SUBMIT_UNSELECTED:
			clearSugNames();
			SubmitStore.emitChange();
			break;
		default: ;

	}
})

module.exports = SubmitStore;