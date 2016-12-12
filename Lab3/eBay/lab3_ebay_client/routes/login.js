var ejs = require("ejs");
var mysql = require('./mysql');
var encryption = require('./encryption');
var fs=require("file-system");
var winston = require('winston');

var soap = require('soap');
var baseURL = "http://localhost:8080/lab3_ebay_server/services";


exports.checklogin = function(req, res) {
    // check user already exists
	var username, signpassword, pwd_encrypted;
	username = req.param("username");
	signpassword = req.param("signpassword");
	
	pwd_encrypted = encryption.encrypt(signpassword);
		
	var json_responses;
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/services?wsdl";
	 var args = {username: username, pwd_encrypted: pwd_encrypted};
	  
	  
	  soap.createClient(url,option, function(err, client) {
	      client.login(args, function(err, result) {
			  
			  if(result.loginReturn==true) {
						//Assigning the session
						req.session.username = results[0].uname;
						req.session.handle = results[0].seller_handle;
						req.session.email = username;
						req.session.address=results[0].addressline1;
						req.session.payment=results[0].ccard_info;
						req.session.lastlogin=results[0].lastlogin;
						console.log("Session initialized");
						json_responses = {"statusCode" : 200};
						res.send(json_responses);

			  }
			  else if(result.loginReturn==false) {
                console.log("Invalid Login");
				json_responses = {"statusCode" : 401};
				res.send(json_responses);  
				  
			  }

	      });
	  });
						
};



exports.registeruser = function(req,res)
{
	var fname, lname, uname, email, regpassword, bdate, ulocation, contact, uname_flag=0, email_flag=0, pwd_decrypted, pwd_encrypted;
	fname = req.param("fname");
	lname = req.param("lname");
	uname = req.param("uname");
	email = req.param("email");
	regpassword = req.param("regpassword");
	bdate = req.param("bdate");
	ulocation = req.param("location");
	contact = req.param("contact");
	
	console.log("typeof(bdate) is: " + typeof(bdate));
	console.log("bdate is: " + bdate);
	
	if(lname=='undefined')
	{
	lname=0;	
	}
	if(bdate=='undefined')
	{
	bdate=0;	
	}
	if(ulocation=='undefined')
	{
	ulocation=0;	
	}
	if(contact=='undefined')
	{
	contact=0;	
	}
	
	
	pwd_encrypted = encryption.encrypt(regpassword);
	console.log("pwd_encrypted is: " + pwd_encrypted);

	var json_responses;
	
	
	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/services?wsdl";
	 var args = {uname: uname, pwd_encrypted: pwd_encrypted, fname: fname, lname: lname, email: email, bdate: bdate, ulocation: ulocation, contact: contact };
	  
	  
	  soap.createClient(url,option, function(err, client) {
	      client.register(args, function(err, result) {
			  
			  if(result.registerReturn==true) {
			  			console.log("Sending 501");
						json_responses = {"statusCode" : 501};
						res.send(json_responses);  
			  }
			  else if(result.homeReturn==false) {
						console.log("Sending 500");
						json_responses = {"statusCode" : 500};
						res.send(json_responses);  
				  
			  }

	      });
	  });	

};


