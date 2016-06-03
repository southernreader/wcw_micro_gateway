module.exports = function(app) {

	app.get('/salesorder/:facility_name/:order_id/:cust_ref_num/:customer_id/:order_status/:item/:shipdate/:orderdate/:filteroptions/:filtervalue', function(req, res, next) {
		var request = require('request'),
		envar = require('envar');

		var options = {
			url: "http://"+envar('salesorder_service_ip')+":"+envar('salesorder_service_port')+req.originalUrl,  
			method: 'GET',
	  	    headers: {
			    'Content-Type': 'application/json'
			}
		};
		console.log(options);

		request.get(options, function(error,response,body){
			res.send(body);
		}).on("error", function(e){
			console.log("Got error: " + e.message);
			res.send("Sales Order Service Not Available");
		});

	});		
	app.get('/salesorder/:order_id',function(req, res, next) {
		var request = require('request'),
		envar = require('envar');

		var options = {
			url: "http://"+envar('salesorder_service_ip')+":"+envar('salesorder_service_port')+req.originalUrl, 
			method: 'GET',
	  	    headers: {
			    'Content-Type': 'application/json'
			}
		};
		console.log(options);

		request.get(options, function(error,response,body){
			res.send(body);
		}).on("error", function(e){
			console.log("Got error: " + e.message);
			res.send("Sales Order Service Not Available");
		});
	});
	app.get('/salesorder/item/:item',function(req, res, next) {
		var request = require('request'),
		envar = require('envar');

		var options = {
			url: "http://"+envar('salesorder_service_ip')+":"+envar('salesorder_service_port')+req.originalUrl,
			method: 'GET',
	  	    headers: {
			    'Content-Type': 'application/json'
			}
		};

		request.get(options, function(error,response,body){
			res.send(body);
		}).on("error", function(e){
			console.log("Got error: " + e.message);
			res.send("Sales Order Service Not Available");
		});
	});
}
	