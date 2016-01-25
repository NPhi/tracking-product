var mongoose = require('mongoose');
var async = require('async')

var ProductSchema = new mongoose.Schema({
	
	name : {type : String,required : true, index: {unique:true, dropDups : true}},
	quantity : {type : Number, required : true},
	updated_date : {type : String}

}

)

var Product = mongoose.model('products',ProductSchema);

/**
 *
 *udpate one product if err will return callback(err)
	if successful will return callback()
 *
*/
Product.updateOne = function(p,callback){
	
	Product.findOne({name:p.name},'quantity',function(err,product){
		if(product){
			p.quantity += product.quantity
		}

		Product.update({name:p.name},{quantity:p.quantity,updated_date:p.updated_date},{upsert : true},function(err,res){
			if(err) {
				return callback(err)
			}
			callback()
		})

	})

	
}

/**
 *
 *INSERT FUNCTION
 *@param : m is iteration to update model
 * - update if exist and insert if doesn't
*/

Product.updateMore = function(m,callback){

    async.each(m,Product.updateOne,callback)
   
}





module.exports = Product