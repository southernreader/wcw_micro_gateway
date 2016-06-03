module.exports = function(app) {
	app.get('/warehouse/names', function(req, res, next) {
		var request = require('request'),
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
	app.get('/itemmaster/names', function(req, res, next) {
		var request = require('request'),
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
}
