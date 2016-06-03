
module.exports = function(app) {
	app.get('/dashboard/widgets/', function(req, res, next) {
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
			res.send("Dashboard Service Not Available");			
		});
	});		
	app.get('/dashboard/widgetlist/', function(req, res, next) {
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
			res.send("Dashboard Service Not Available");
		});
	});		
	app.get('/dashboard/templates/', function(req, res, next) {
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
			res.send("Dashboard Service Not Available");
		});
	});		
	app.get('/dashboard/templatedetails/:templatename', function(req, res, next) {
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
			res.send("Dashboard Service Not Available");
		});
	});	
	app.post('/dashboard/templatesave/', function(req, res, next) {
		var http = require('http'),
		envar = require('envar');  
		var options = {
			hostname: envar('dashboard_service_ip'),
			port: envar('dashboard_service_port'),
			path: req.originalUrl, 
			method: 'POST',
	  	    headers: {
			    'Content-Type': 'application/json'
			}
		};
		var req1 = http.request(options, function(res1) {
			res.send("Saved Successfully");
		});

		// write data to request body
		req1.write(JSON.stringify(req.body));
		req1.end();		
	});			
	app.post('/dashboard/templatecreate/', function(req, res, next) {
		var http = require('http'),
		envar = require('envar');  
		var options = {
			hostname: envar('dashboard_service_ip'),
			port: envar('dashboard_service_port'),
			path: req.originalUrl, 
			method: 'POST',
	  	    headers: {
			    'Content-Type': 'application/json'
			}
		};
		var req1 = http.request(options, function(res1) {
			res.send("Saved Successfully");
		});

		// write data to request body
		req1.write(JSON.stringify(req.body));
		req1.end();
	});	
	app.delete('/dashboard/remove/:templatename', function(req, res, next) {
		var request = require('request');

        var jsonobj = {};
	    jsonobj.name = req.params.templatename;
   		var envar = require('envar');
		
		var options = {
			url: "http://"+envar('dashboard_service_ip')+":"+envar('dashboard_service_port')+req.originalUrl,
			method: 'DELETE',
	  	    headers: {
			    'Content-Type': 'application/json'
			},
			json:jsonobj	
		};
		request(options,function(){res.send("deleted!!!");});
	});
	app.get('/dashboard/chartdata/:chartlabel', function(req, res, next) {
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
			res.send("Dashboard Service Not Available");
		});
	});				
}