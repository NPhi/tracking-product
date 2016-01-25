var mongoose = require('mongoose');

var ProductSchema = new mongoose.Schema({
	name : {type : String,required : true},
	quantity : {type : Number, required : true},
	updated_date : {type : String}
}

)

/**
 *
 *Model name is always plural in MongoDB 
 *
*/

var History = mongoose.model('histories',ProductSchema);




module.exports = History