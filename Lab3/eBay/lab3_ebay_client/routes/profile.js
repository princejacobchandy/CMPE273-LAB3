
/*
 * GET profile page.
 */

 
var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");

var soap = require('soap');
var baseURL = "http://localhost:8080/lab3_ebay_server/services";

exports.redirectToProfile = function(req, res){
  res.render("profile");
};

exports.getprofile = function(req,res)
{

	console.log("reading user profile info from the database");	
	var passing_param=	req.session.email;
	var json_responses;
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/services?wsdl";
	 var args = {passing_param: passing_param};
	  
	  
	  soap.createClient(url,option, function(err, client) {
	      client.getprofile(args, function(err, result) {
			  
			  if(result.getprofileReturn==true) {
		    	  var xml = result.getprofileReturn;
				 
		    	  parseString(xml, function (err, output) {  
				   json_responses = {"statusCode" : 200, "results": output.results};
		    	   res.send(json_responses);   
		    	  });

			  }
			  else if(result.getprofileReturn==false) {
				var json_responses;
				json_responses = {"statusCode" : 201};
				res.send(json_responses);
				  
			  }

	      });
	  });
	
};



exports.getmyads = function(req,res)
{
	console.log("reading all the ads from the products_table in the database");
	var passing_param=	req.session.email;
	var json_responses;
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/services?wsdl";
	 var args = {passing_param: passing_param};
	  
	  
	  soap.createClient(url,option, function(err, client) {
	      client.getmyads(args, function(err, result) {
			  
			  if(result.getmyadsReturn==true) {
		    	  var xml = result.getmyadsReturn;
				 
		    	  parseString(xml, function (err, output) {  
				json_responses = {"statusCode" : 200, "product_list": output.results, "results_length": output.length};
				res.send(json_responses); 
		    	  });

			  }
			  else if(result.getamydsReturn==false) {
                console.log("database empty");
				var json_responses;
				json_responses = {"statusCode" : 201};
				res.send(json_responses);
			
				  
			  }

	      });
	  });	

};



exports.createanad = function(req,res)
{
	console.log("inside createand");
	var ptype,ptitle,pdesc,pqty,pprice,noofdays,suname,shandle,semail;

	shandle = req.session.handle;
	suname = req.session.username;
	semail = req.session.email;
	ptype = req.param("producttype");
	ptitle = req.param("productname");
	pdesc = req.param("productdesc");
	pqty = req.param("productqty");
	pprice = req.param("productprice");
	
		
			var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/services?wsdl";
	 var args = {shandle: shandle, suname: suname,ptitle: ptitle,pdesc: pdesc,pqty: pqty,pprice: pprice,semail: semail,ptype: ptype};
	   
	  soap.createClient(url,option, function(err, client) {
	      client.createad(args, function(err, result) {
			  
			  if(result.createadReturn==true) {
		    	  var xml = result.createadReturn;
				 
		    	  parseString(xml, function (err, output) {  
				console.log("data successfully inserted and data succesfully created");				
				var json_responses;
				json_responses = {"statusCode" : 200};
				res.send(json_responses);

			  }
			  else if(result.createadReturn==false) {
             
				var json_responses;
				json_responses = {"statusCode" : 201};
				res.send(json_responses);
			
				  
			  }

	      });
	  });	
		


};