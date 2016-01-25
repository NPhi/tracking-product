//OBJECTS

exports.filterEmptyObject = function(obj,key){


	for (var i in obj) {

		var o = obj[i]

		if (o === null || o === undefined) {
		    delete obj[i];
		 }else if(typeof key !== 'undefined' && typeof o[key] === 'undefined'){
		 	delete obj[i]
		 }

	}

	return obj

}

//DATE

exports.checkDate = function(date){
	if(date === '')
    return false
	  var matches = /^([1-9]{1}|0[1-9]|1\d|2\d|3[01])\/([1-9]{1}|0[1-9]|1[0-2])\/(\d{2})$/.exec(date);
	  return matches
}

exports.formatDate = function(date, type){

	var dateFor;
	var dd = date.getDate();
	var mm = date.getMonth()+1; //January is 0!
	var yyyy = date.getFullYear();

	if(type === 'dd/mm/yy'){

		var yy = yyyy.toString().substring(2,4)

		dateFor = dd+'/'+mm+'/'+yy;
	}

	return dateFor
	
}

//NUMBER
exports.isInt = function(num){
	return num%1  === 0;
}