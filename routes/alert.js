
module.exports = function(app) {
	app.get('/alert/:facility_id/:func/:alert_id/:alert_type', function(req, res, next) {
		var request = require('request'),
		envar = require('envar');

		var options = {
			url: "http://"+envar('dashboard_service_ip')+":"+envar('dashboard_service_port')+req.originalUrl,  
			method: 'GET',
	  	    headers: {
			    'Content-Type': 'application/json'
			}
		};

		request.get(options, function(error,response,body){
			res.send(body);
		}).on("error", function(e){
			console.log("Got error: " + e.message);
		});		
	});		
	app.post('/alert/:ack',function(req,res,next){
		var request = require('request'),
		envar = require('envar');

		var options = {
			url: "http://"+envar('dashboard_service_ip')+":"+envar('dashboard_service_port')+req.originalUrl,  
			method: 'GET',
	  	    headers: {
			    'Content-Type': 'application/json'
			}
		};

		request.get(options, function(error,response,body){
			res.send(body);
		}).on("error", function(e){
			console.log("Got error: " + e.message);
		});		
	});
	app.get('/alert/', function(req, res, next) {
		var request = require('request'),
		envar = require('envar');

		var options = {
			url: "http://"+envar('dashboard_service_ip')+":"+envar('dashboard_service_port')+req.originalUrl,
			method: 'GET',
	  	    headers: {
			    'Content-Type': 'application/json'
			}
		};

		request.get(options, function(error,response,body){
			res.send(body);
		}).on("error", function(e){
			console.log("Got error: " + e.message);
		});		
	});		
	app.get('/alert/openalerts', function(req, res, next) {
		var request = require('request'),
		envar = require('envar');

		var options = {
			url: "http://"+envar('dashboard_service_ip')+":"+envar('dashboard_service_port')+req.originalUrl,  
			method: 'GET',
	  	    headers: {
			    'Content-Type': 'application/json'
			}
		};

		request.get(options, function(error,response,body){
			res.send(body);
		}).on("error", function(e){
			console.log("Got error: " + e.message);
		});		
	}); 
}