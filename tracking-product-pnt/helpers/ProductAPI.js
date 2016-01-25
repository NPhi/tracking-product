module.exports = {

	postProducts : function(data,cb){

		var len = Object.getOwnPropertyNames(data).length;
		//if data is not empty
		if(len > 0){
			var obj = JSON.stringify(data);	

			var xhr = new XMLHttpRequest();

			xhr.open("POST", "/post/products", true);
			xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
			xhr.send(obj);
			
			xhr.onreadystatechange=function()
			  {
			  	
			  if (xhr.readyState==4 && xhr.status==200)
			    {
			    	var result = JSON.parse(xhr.responseText);
			    	if(result.data === 'err'){
			    		alert('lỗi mạng ! chưa lưu được !');
			    	}else if(result.data === 'sent'){
			    		alert('lưu ! thành công !');
			    		cb();
			    	}
			    }
			    else if(xhr.status===0)
			    	alert('lỗi mạng ! chưa lưu được');

			  }
		}
		else{
			console.log('do nothing')
		}
	}

}