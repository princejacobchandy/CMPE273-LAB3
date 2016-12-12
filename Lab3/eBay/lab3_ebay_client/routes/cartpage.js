
/*
 * GET cart page.
 */

var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");

var soap = require('soap');
var baseURL = "http://localhost:8080/lab3_ebay_server/services";


//Redirects to the homepage
exports.redirectToCartpage = function(req,res)
{

	if(req.session.username)
	{
		res.render("cartpage",{firstname:results[0].fname});	
	}
	else
	{
		res.redirect('/');
	}
};




//buyer_uname is email id and dont change it
exports.getthecart = function(req,res)
{
	
	var getUser = " select * from shoppingcart where buyer_uname = '"+req.session.email+"' ";
	var json_responses;
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/services?wsdl";
	 var args = {username: username, pwd_encrypted: pwd_encrypted};
	  
	  
	  soap.createClient(url,option, function(err, client) {
	      client.getthecart(args, function(err, result) {
			  
			  if(result.getthecartReturn==true) {
				 var xml = result.getthecartReturn;
				 
		    	 parseString(xml, function (err, output) {  
				
				json_responses = {"statusCode": 300, "itemsInCart": results};
				res.send(json_responses);
				console.log("pushed 300 and the cart info to client");
		    	  });
			  }
			  else if(result.getthecartReturn==false) {
			console.log("in getthecart function; cart empty")
			var json_responses;
		
			json_responses = {"statusCode": 301};
			res.send(json_responses);	
			console.log("pushed 301 client");	  
				  
			  }

	      });
	  });	
	
};

	
	
	
	
