

var soap = require('soap');
var baseURL = "http://localhost:8080/lab3_calculator_server/services";

exports.checkLocationsFun = function(req,res){
	
	var source = req.param("source");
	var destination = req.param("destination");
	var opcode = req.param("opcode");	
	
	console.log('source is ' + source);
	console.log('source is ' + destination);
	console.log('opcode is ' + opcode);
	
	var json_responses;
	
	
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/Home?wsdl";
	 var args = {source: source, destination: destination, opcode: opcode};
	  
	  
	  soap.createClient(url,option, function(err, client) {
	      client.home(args, function(err, result) {
			  
			  console.log('result from java service result.homeReturn is ' + result.homeReturn);
			  json_responses = {"statusCode" : result.homeReturn};
	          res.send(json_responses);
			  

	      });
	  });
};

exports.homepage = function(req, res){
  res.render('homepage', { title: 'Calculator' });
};
