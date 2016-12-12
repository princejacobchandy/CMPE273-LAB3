
/*
 * GET home page.
 */

var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");

var soap = require('soap');
var baseURL = "http://localhost:8080/lab3_ebay_server/services";



exports.redirectToCheckout = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
	res.render("checkout");	
	}
	else
	{
		res.redirect('/');
	}
};




exports.addaddresstodb = function(req,res)
{
			var address1 = req.param("address1");
			var address2 = req.param("address2");
			var address3 = req.param("address3");
			var address4 = req.param("address4");
			var address5 = req.param("address5");
			req.session.address=address1 + ', ' +  address2 + ', ' +  address3 + ', ' +  address4 + ', ' +  address5;

						
						
			var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/services?wsdl";
	 var args = {address1: address1, address2: address2,address3: address3,address4: address4,address5: address5,email: req.session.email};
	   
	  soap.createClient(url,option, function(err, client) {
	      client.addaddresstodb(args, function(err, result) {
			  
			  if(result.addaddresstodbReturn==true) {
		    	  var xml = result.addaddresstodbReturn;
				 
							console.log("address info was added/updated properly;")
							var json_responses;
							json_responses = {"statusCode": 200};
							res.send(json_responses);	
							console.log("pushed result to client");

			  }
			  else if(result.addaddresstodbReturn==false) {
             
				var json_responses;
				json_responses = {"statusCode" : 201};
				res.send(json_responses);
			
				  
			  }

	      });
	  });			
		
};




exports.validate = function(req, res) {

    var cardno = req.param("cardno");
	cardno=cardno.toString();
	var cardno_string=cardno;
    var cvvno = req.param("cvvno");
	cvvno=cvvno.toString();
	var edate = req.param("edate");
	var exMonth = "";
    var exYear = "";
	var exDay = "";
	var cardnumber = "";
	
	console.log("cardno_string is: " + cardno_string);
	
	for(var i=0;i<=3;i++)
	{
	exYear+=edate[i];	
	}
	
	for(var i=5;i<=6;i++)
	{
	exMonth+=edate[i];		
	}
	
	for(var i=8;i<=9;i++)
	{
	exDay+=edate[i];		
	}
	
	for(var i=12;i<=15;i++)
	{
	cardnumber+=cardno_string[i];		
	}

	
	console.log(cardno + ', ' + cvvno + ', ' + edate + ', ' + exMonth + ', ' + exYear);
    
    var cardno1 = /^(?:[0-9]{16})$/;
    var cardno2 = /^(?:[0-9]{3})$/;
    var today;
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    var results, result_code;
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
	
	console.log(dd + ', ' + mm + ', ' + yyyy);
	

	
    if (cardno.match(/^(?:[0-9]{16})$/)) {
        if (cvvno.match(/^(?:[0-9]{3})$/)) {
            if ((exMonth > 0 && exMonth < 13 && (exYear.match(/^(?:[0-9]{4})$/)) )) {
                if ((mm <= exMonth) && (yyyy <= exYear) && (dd <= exDay)) {
                    results = "Valid Credit Card";
					result_code=200;
					req.session.payment='************'+cardnumber;
				} else {
                    results = "Invalid Credit Card: Card Expired";
					result_code=201;
                }
            } else {
                results = "Invalid Credit Card: Invalid Date";
				result_code=201;
            }
        } else {
            results = "Invalid Credit Card: Invalid CVV";
			result_code=201;
        }

    } else {
        results = "Invalid Credit Card: Invalid Card Number";
		result_code=201;
    }

			console.log("credit card checked; results is: " + results);
			var json_responses;
			//json_responses = {"itemsInCart": req.session.currentcart};
			json_responses = {"statusCode": result_code, "results" : results};
			res.send(json_responses);	
			console.log("pushed result to client which is " + result_code);
};


exports.finalcheckout = function(req,res)
{
			var noofitems = req.param("noofitems");
			var totalamount = req.param("totalamount"); 
			var i;
			var temp_cart;
 
						
			var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/services?wsdl";
	 var args = {product_id: product_id, product_name: product_name,product_qty: product_qty,product_price: product_price,buyer_name: buyer_name,seller_name: seller_name, totalamt: totalamt, totalitems: totalitems, buyer_address: buyer_address, bill_payment: bill_payment};
	   
	  soap.createClient(url,option, function(err, client) {
	      client.finalcheckout(args, function(err, result) {
			  
			  if(result.finalcheckoutReturn==true) {
							
					json_responses = {"statusCode": 200};
					res.send(json_responses);	
					console.log("pushed 200 success to client");

			  }
			  else if(result.finalcheckoutReturn==false) {
             
				var json_responses;
				json_responses = {"statusCode" : 201};
				res.send(json_responses);
			
				  
			  }

	      });
	  });						

		
};



