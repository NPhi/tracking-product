var falcorExpress = require('falcor-express')
var Router = require('falcor-router')

var routes = require('./handlers')
var Product = require('./models/product')
var History = require('./models/history')

module.exports = function(app){

	//render pages

	app.get('/',routes.index)

	app.get('/n', routes.submit)

	app.get('/history',routes.history)

	/**
	 *
	 *handle POST method to update new products and quantities
	 *
	*/

	app.post('/post/products', function(req,res){

		var dataArr = Object.keys(req.body).map(function(key){return req.body[key]})

		History.create(dataArr,function(err){
	    	if(err){
	    		console.log(err)
	    	}
	    	else{
	    		console.log('save history')
	    	}
	    })

	    Product.updateMore(req.body,function(err){

	    	if(err){
	    		res.json({data : 'err'})
	    	}
	    	else{
	    		res.json({data: 'sent'})
	    	}
	    })

	  
		
	})

	/**
	 *
	 *virtual model using to be a one model everywhere in Browser
	 *
	*/

	app.use('/model.json',falcorExpress.dataSourceRoute(function(req,res){
		return new Router([
		{
			/**
			 *
			 *route : products["jean"][{length:5}]
			 * ---> {
						"jean" :{
							0 : "jean 1",
							1 : "new jean",
							...until 4
						}
			 		}
			 *
			*/	
			route : "products[{keys:text}][{integers:indexs}]",
			get: function(pathSet){

				//searching text to suggest product names
				var reg = '\\b'+pathSet.text

				return Product.find({'name' : new RegExp(reg,"i")}).then(function(products){
					var results = []

					for(var i = 0; i < pathSet.indexs.length; i++){
						if(products[i]){
							results.push({
							path:["products",pathSet.text,i],
							 value : products[i].name
							})
						}
						else{
							return results
						}				
					}

					return results

				})

			}
		}, //end route object
		{
			/**
			 *
			 *route : products[{length : 5}].name or .quantity
			 * ----> {
						0 : {
							name : "a",
							quantity : 10
						},
						.....until 5
			 		}
			 *
			*/	
			route : "products[{integers:indexes}]['name','quantity','updated_date']",
			get: function(pathSet){
				
				 var f = pathSet.indexes[0]
				return Product.find().sort({quantity: -1 }).skip(f).limit(pathSet.indexes.length).then(function(products){
					
					var results = []

					products.forEach(function(product){
						pathSet[2].forEach(function(key){
							results.push({
								path:["products",f,key],
								value: product[key]
							})
						}) 
						f++ //need the key is exactly the same with the key in the client route
					})

					return results;

				})

			}
		}, //end route object

		{
			/**
			 *
			 *route : products.length
			 * ---> {
						length : 1000
			 		}
			 *
			*/
			route: "products['length']",
			get : function(pathSet){
				return Product.count().then(function(len){
					return {
						path: ["products","length"],
						value : len
					}
				})
			}
		}, //end route object
		{
			route: "sproducts[{keys:text}][{integers:indexes}]['name','quantity','updated_date']",
			get: function(pathSet){
				var reg = '\\b'+pathSet.text
				var f = pathSet.indexes[0]

				return Product.find({'name' : new RegExp(reg,"i")}).sort({quantity:-1}).limit(pathSet.indexes.length).then(function(products){
					var results = []

					products.forEach(function(product){
						pathSet[3].forEach(function(key){
							results.push({
								path:["sproducts",pathSet.text,f,key],
								value: product[key]
							})
						})
						f++
					})

					return results

				})
			}
		}, //end tour object
		{
			/**
			 *
			 * numproducts[0] will give all products with 0 quantity
			 *
			*/
			route: "numproducts[{integers:num}][{integers:indexes}]['name','quantity','updated_date']",
			get: function(pathSet){


				var f = pathSet.indexes[0]

				var num = parseInt(pathSet.num) + 1

				return Product.find({'quantity' :{$lt : num}}).sort({quantity:-1}).limit(pathSet.indexes.length).then(function(products){
					

					var results = []

					products.forEach(function(product){
						pathSet[3].forEach(function(key){
							results.push({
								path:["numproducts",pathSet.num,f,key],
								value: product[key]
							})
						})
						f++
					})

					return results

				})
			}
		}, //end tour object

		{
			route: "shistories[{keys:text}][{integers:indexes}]['name','quantity','updated_date']",
			get: function(pathSet){
				var reg = '\\b'+pathSet.text
				var f = pathSet.indexes[0]

				return History.find({'name' : new RegExp(reg,"i")}).sort({$natural : -1}).limit(pathSet.indexes.length).then(function(products){
					var results = []

					products.forEach(function(product){
						pathSet[3].forEach(function(key){
							results.push({
								path:["shistories",pathSet.text,f,key],
								value: product[key]
							})
						})
						f++
					})

					return results

				})
			}
		}, //end tour object
		{
			/**
			 *
			 *route : histories.length
			 * ---> {
						length : 1000
			 		}
			 *
			*/
			route: "histories['length']",
			get : function(pathSet){
				return History.count().then(function(len){
					return {
						path: ["histories","length"],
						value : len
					}
				})
			}
		}, //end route object
		{
			/**
			 *
			 *route : products[{length : 5}].name or .quantity
			 * ----> {
						0 : {
							name : "a",
							quantity : 10
						},
						.....until 5
			 		}
			 *
			*/	
			route : "histories[{integers:indexes}]['name','quantity','updated_date']",
			get: function(pathSet){
				
				 var f = pathSet.indexes[0]
				return History.find().sort({$natural: -1 }).skip(f).limit(pathSet.indexes.length).then(function(products){
					
					var results = []

					products.forEach(function(product){
						pathSet[2].forEach(function(key){
							results.push({
								path:["histories",f,key],
								value: product[key]
							})
						}) 
						f++ //need the key is exactly the same with the key in the client route
					})

					return results;

				})

			}
		}, //end route object
		{
			route: "hello",
			call: function(callPath,args){
				console.log('call it')
				console.log(callPath)
				return {path:["hello"],value:"world"}
			}
		}


		])//end Router
	}))


}