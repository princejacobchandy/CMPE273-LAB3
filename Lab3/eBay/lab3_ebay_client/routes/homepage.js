var ejs = require("ejs");
var mysql = require('./mysql');
var fs=require("file-system");

var soap = require('soap');
var baseURL = "http://localhost:8080/lab3_ebay_server/services";

//Redirects to the homepage
exports.redirectToHomepage = function(req,res)
{
	//Checks before redirecting whether the session is valid
	if(req.session.username)
	{
	res.render("homepage");
    } else {
	console.log("redirectToHompage din't work");
	res.redirect('/');
	}
};


//Logout the user - invalidate the session
exports.logout = function(req,res)
{
	
var login_timestamp=new Date();	
fs.appendFile('public/logs/ebayLogs.txt', login_timestamp + ' : ' + 'User signed out : ' +req.session.username+ '\n', function(err){});
	
	req.session.destroy();
	res.redirect('/');
	console.log("session destroyed");
	console.log("logging out");
	//console.log("redirecting to '/' ");
	
	};
	
	
	
	
	
exports.gettheads = function(req,res)
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


	
// NOTE: In this function, buyer username is used as buyeremail id and shouldn't be changed
exports.addtocart = function(req,res)
{
	
	console.log("inside addtocart function");
	var prodid, prodqty, prodprice, prodname, proddesc, prodseller, prod_total_qty, itemsInCart=[];
	prodid = req.param("product_id");
	prodqty = req.param("product_qty");
	
	prodprice = req.param("product_price");
	prodname = req.param("product_pname");
	proddesc = req.param("product_pdesc");
	prodseller_email = req.param("product_seller_email");
	prodseller_uname = req.param("product_seller_uname");
	
	
	prod_total_qty=req.param("product_total_qty");
	console.log(prodid + ', ' + prodqty + ', ' + prodprice + ', ' + prodname + ', ' + proddesc + ', ' + prodseller_email + ', ' + prodseller_uname + ', ' + prod_total_qty);
	
	if(req.session.currentcart!=undefined)
	{
		itemsInCart = req.session.currentcart;
	}
	
	itemsInCart.push({"prodid" : prodid, 'prodqty' : prodqty, 'prodprice' : prodprice, 'prodname' : prodname, 'proddesc' : proddesc,  'prodseller_email' : prodseller_email, 'prodseller_uname' : prodseller_uname, });
	req.session.currentcart = itemsInCart;


	var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/services?wsdl";
	 var args = {prodid: prodid, prodqty: prodqty, prodname: prodname, proddesc: proddesc, prodprice: prodprice, prodseller_uname: prodseller_uname, prodseller_email: prodseller_email, prod_total_qty: prod_total_qty};
	  
	  
	  soap.createClient(url,option, function(err, client) {
	      client.getmyads(args, function(err, result) {
			  
			  if(result.getmyadsReturn==true) {
		    	  var xml = result.getmyadsReturn;
				 
		    	  parseString(xml, function (err, output) {  
				json_responses = {"statusCode" : 200};
				res.send(json_responses);
		    	  });

			  }
			  else if(result.getamydsReturn==false) {
                console.log("database empty");
				var json_responses;
											json_responses = {"statusCode": 302};
							res.send(json_responses);
			
				  
			  }
						
};


exports.placebid = function(req,res)
{
				
	console.log("inside placebid function");
	var prodid, prodqty, prodprice, prodname, proddesc, prodseller, prodbuyer, bidprice;
	prodid = req.param("product_id");
	prodqty = req.param("product_qty");
	prodprice = req.param("product_price");
	prodname = req.param("product_pname");
	proddesc = req.param("product_pdesc");
	prodseller = req.param("product_seller_email");
	prodbuyer = req.session.email;	
	bidprice = req.param("product_bprice");
	

						
							var option = {
			ignoredNamespaces : true	
		};
	 var url = baseURL+"/services?wsdl";
	 var args = {prodid: prodid, prodqty: prodqty, prodname: prodname, proddesc: proddesc, prodprice: prodprice, prodseller_uname: prodseller_uname, prodseller_email: prodseller_email, prod_total_qty: prod_total_qty};
	  
	  
	  soap.createClient(url,option, function(err, client) {
	      client.getmyads(args, function(err, result) {
			  
			  if(result.getmyadsReturn==true) {
		    	  var xml = result.getmyadsReturn;
				 
		    	  parseString(xml, function (err, output) {  
									console.log("new info was added to bidding table")
									var json_responses;
									json_responses = {"statusCode": 200, "currenttimer": currenttimer};
									res.send(json_responses);
		    	  });

			  }
			  else if(result.getamydsReturn==false) {
								console.log("bidding time is over")
									var json_responses;
									json_responses = {"statusCode": 201};
									res.send(json_responses);	
			
				  
			  }
	
						};
	

