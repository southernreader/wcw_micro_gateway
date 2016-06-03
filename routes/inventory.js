
module.exports = function(app) {
	app.get('/inventory/:facility_id/:item_id/:facility_type/:filter/:filter_value', function(req, res, next) {
		var request = require('request');
		envar = require('envar');

		var options = {
			url: "http://"+envar('inventory_service_ip')+":"+envar('inventory_service_port')+req.originalUrl,  
			method: 'GET',
	  	    headers: {
			    'Content-Type': 'application/json'
			}
		};

		request.get(options, function(error,response,body){
			res.send(body);
		}).on("error", function(e){
			//console.log("Got error: " + e.message);
			next(e);
		});

	});		
	app.get('/inventory/:facility_id/:item_id/:item_status', function(req, res, next) {
		var request = require('request'),
		config = require('config');

		var options = {
			url: "http://"+envar('inventory_service_ip')+":"+envar('inventory_service_port')+req.originalUrl,  
			method: 'GET',
	  	    headers: {
			    'Content-Type': 'application/json'
			}
		};

		request.get(options, function(error,response,body){
			res.send(body);
		}).on("error", function(e){
			//console.log("Got error: " + e.message);
			next(e);
		});

	});	
}
