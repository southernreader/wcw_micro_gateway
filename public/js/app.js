angular.module('MyApp', ['ngRoute','ngAnimate','directives','ngSanitize','nvd3','nvd3ChartDirectives','highcharts-ng','btford.socket-io']).config(
		[ '$routeProvider', function($routeProvider) {
			$routeProvider
			.when('/Search', {
				templateUrl : 'partials/FOTL.html',
				controller : HomeController
			}).when('/home', {
				templateUrl : 'partials/FOTL.html',
				controller : HomeController
			}).when('/', {
				templateUrl : 'partials/FOTL.html',
				controller : HomeController
			}).when('/login', {
				templateUrl : 'partials/home.html',
				controller : MainController
			}).when('/Inventory', {
				templateUrl : 'partials/inventory.html',
				controller : InventoryController
			}).when('/Status Details', {
				templateUrl : 'partials/status_details.html',
				controller : ModalController
			}).when('/Sales Order', {
				templateUrl : 'partials/sales_orders.html',
				controller : SalesOrderController
			}).when('/Purchase Order', {
				templateUrl : 'partials/purchase_orders.html',
				controller : PurchaseOrderController		
			}).when('/PO Details', {
				templateUrl : 'partials/pur_ord_det.html',
				controller : PurchaseOrderController		
			}).when('/Dashboard/Alerts', {
				templateUrl : 'partials/alerts.html',
				controller : AlertController		
			}).when('/Dashboard/:templateid', {
				templateUrl : 'partials/Dashboard.html',
				controller : DashboardController		
			}).when('/My Dashboard', {
				templateUrl : 'partials/dashboardCustomization.html',
				controller : DashboardController		
			}).when('/home', {
				templateUrl : 'partials/home.html',
				controller : MenuController		
			}).when('/Order Details', {
				templateUrl : 'partials/orderdet.html',
				controller : SalesOrderController		
			}).when('/Item Details', {
				templateUrl : 'partials/itemdet.html',
				controller : OrderLineController		
			}).when('/Planning', {
				templateUrl : 'partials/UC.html',
				controller : OrderLineController		
			}).when('/Reports', {
				templateUrl : 'partials/UC.html',
				controller : OrderLineController		
			}).when('/Administration', {
				templateUrl : 'partials/UC.html',
				controller : OrderLineController		
			}).when('/ASN', {
				templateUrl : 'partials/UC.html',
				controller : OrderLineController		
			}).when('/Admin', {
				templateUrl : 'partials/UC.html',
				controller : OrderLineController		
			}).when('/Defaults', {
				templateUrl : 'partials/UC.html',
				controller : OrderLineController		
			});
		  } 
		]).factory('Warehouseservices', [function() {
			var facility_id = null;
			var item_id = null;
			var from_date = new Date();
			var to_date = new Date();
			var transaction_date = null;
			var transaction_id = null;
			var creditor_ac_number = null;
			var creditor_ac_name = null;
			var inventory_rows = null;
			var modal_status = null;
			var statuses = null;
			var inventory_rows_original = null;
			var order_rows = null;
			var poorder_rows=null;
			var item_rows = null;
			var db_templates = [];
			var salesorder = null;
			var purchaseorder=null;
			var loggedin = "";
			var abcd = null;
			return {
				add_abcd: function(x) {
					abcd = x;
				},
				retrieve_abcd: function() {
					return abcd;
				},
				add_loggedin: function(x) {
					loggedin = x;
				},
				retrieve_loggedin: function() {
					return loggedin;
				},
				add_inventory_rows_original: function(inventoryrowsoriginal) {
					inventory_rows_original = inventoryrowsoriginal;
				},
				retrieve_inventory_rows_original: function() {
					return inventory_rows_original;
				},
				add_statuses: function(statuses1) {
					statuses = statuses1;
				},
				retrieve_statuses: function() {
					return statuses;
				},
				add_modal_status: function(modalstatus) {
					modal_status = modalstatus;
				},
				retrieve_modal_status: function() {
					return modal_status;
				},
				add_inventory_rows: function(inventoryrows) {
					inventory_rows = inventoryrows;
				},
				retrieve_inventory_rows: function() {
					return inventory_rows;
				},
				add_facility_id: function(facilityid) {
					facility_id = facilityid;
				},
				retrieve_facility_id: function() {
					return facility_id;
				},
				add_from_date: function(fromdate) {
					from_date = fromdate;
				},
				retrieve_from_date: function() {
					return from_date;
				},
				add_to_date: function(todate) {
					to_date = todate;
				},
				retrieve_to_date: function() {
					return to_date;
				},
				add_item_id: function(itemid) {
					item_id = itemid;
				},
				retrieve_item_id: function() {
					return item_id;
				},
				add_transaction_id: function(transactionid) {
					transaction_id = transactionid;
				},
				retrieve_transaction_id: function() {
					return transaction_id;
				},
				add_transaction_date: function(transactiondate) {
					transaction_date = transactiondate;
				},
				retrieve_transaction_date: function() {
					return transaction_date;
				},
				add_creditor_ac_number: function(acnumber) {
					creditor_ac_number = acnumber;
				},
				retrieve_creditor_ac_number: function() {
					return creditor_ac_number;
				},
				add_creditor_name: function(name) {
					creditor_name = name;
				},
				retrieve_creditor_name: function() {
					return creditor_name;
				},
				add_order_rows: function(orderrows) {
					order_rows = orderrows;
				},
				retrieve_order_rows: function(){
					return order_rows;
				},
				add_poorder_rows: function(orderrows) {
					poorder_rows = orderrows;
				},
				retrieve_poorder_rows: function(){
					return poorder_rows;
				},
				add_item_rows: function(item) {
					item_rows = item;
				},
				retrieve_item_rows: function(){
					return item_rows;
				},
				add_templates: function(templates) {
					db_templates = templates;
				},
				retrieve_templates: function(){
					return db_templates;
				},
				add_salesorder:function(orders){
					salesorder = orders;
				},
				retrieve_salesorder: function(){
					return salesorder;
				},
				add_purchaseorder:function(orders){
					purchaseorder = orders;
				},
				retrieve_purchaseorder: function(){
					return purchaseorder;
				}
				};
		  }
		]).factory('socket', function (socketFactory) {
    		return socketFactory();
  		}).directive('myScroll', ['$interval', function($interval) {
			function link(scope, element, attrs) {
				var timeoutId;
      
				// var top;
				var left;
				left = 0;
				// top = 0;

				/*  function updateList() {
						if(top<-200) {top = 200;}
						top = top - 15;
						element.find('ul').css({
						'top': top + "px"
					});
				} */
	  
		function updateList() {
			if(left <-800) {left = 800;}
			left = left - 1;
			element.find('ul').css({
			'left': left + "px"
        });
		}	
		element.on('$destroy', function() {
        $interval.cancel(timeoutId);
      });

      
      timeoutId = $interval(function() {
        updateList(); 
      }, 40);
    }

    return {
      link: link,
      scope: {
        datalist: "=datalist"
      },
      template: "<div class='list-container'><ul><li ng-repeat='item in datalist'>{{item}}</li></ul></div>"
    };
  }]).filter("myFilter", function(){
    return function(input, test){
        var newArray = [];
		console.log("input.length"+input.length);
     //   for(var x = 0; x < input.length/2; x=x+1){
       //      newArray.push(input[x]);   
			 
       // }
	   
	    if(input.length<3){
		      newArray.push(input[x]); 
			  console.log("input.length less than 3"+input.length);
			  }
			  else
		  for(var x = 0; x < input.length-2; x=x+1){
             newArray.push(input[x]);   
			 console.log("input.length loop-----------------"+input.length);
        }
		
        return newArray;
    }
});



