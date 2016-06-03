function MainController($scope,$rootScope, $timeout, $http, $window,Warehouseservices) {

		/*setInterval(function(){
			$http.get('/alert/openalerts/').success(function(data){
			$scope.openalerts = data.count;
			//$rootscope.openalerts = data.count;
			console.log("openlerts",JSON.stringify(data.count));
			});
		},1000);
		*/
		$scope.pageTitle = "";
		var obj = {}, parameterString;
		parameterString = $window.location.href.split('?')[1];
		console.log("HHHHHHHHH "+parameterString);
			if (parameterString != undefined){
			var split = parameterString.split('=');
			obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
			}
		if(obj.uname){
			window.localStorage && window.localStorage.setItem('user', obj.uname);
			window.location = '/';
		}
		if(window.localStorage && window.localStorage.getItem('user') ){
			$scope.user = JSON.parse(window.localStorage.getItem('user'));
		}

		$scope.url = $window.location.href.slice(0,22);
    	var m = function(){
        	console.log("USUSUSUSUSUS "+$window.location.href.slice(0,22));
		}
		m();

		$scope.operation = function(temp){
			$scope.dashboardviewerUrl = "abc.html?widgets="+temp;
			console.log("$scopetemplatepreview  ---------> "+temp);
			$window.location.href = $scope.dashboardviewerUrl;
		}


		$scope.selectedMenu = null;
		/*$scope.showHideConfig = function(menu){
			var submenuShown = false;
			$scope.pageTitle = "";
			$.each($scope.configmenu, function(i, m){
				if(m===menu){
					menu.showsubmenu = !menu.showsubmenu;
				}
				else {
					m.showsubmenu = false;
				}
				if(m.showsubmenu){
					submenuShown = true;
					$scope.selectedMenu = m;
					$scope.pageTitle = m.label;
				}
			});

			$.each($scope.configmenu, function(i, m){
				m.showmenu = !submenuShown;
			});
		};*/
		$scope.showHideSubmenu = function(menu){
			var submenuShown = false;
			$scope.pageTitle = "";
			$.each($scope.tutorialmenu, function(i, m){
				if(m===menu){
					menu.showsubmenu = !menu.showsubmenu;
				}
				else {
					m.showsubmenu = false;
				}
				if(m.showsubmenu){
					submenuShown = true;
					$scope.selectedMenu = m;
					$scope.pageTitle = m.label;
				}
			});

			$.each($scope.tutorialmenu, function(i, m){
				m.showmenu = !submenuShown;
			});
		};

		$scope.backMenu = function(){
			$scope.selectedMenu = null;
			$scope.pageTitle = "";
			$.each($scope.tutorialmenu, function(i, m){
            m.showmenu = true;
            m.showsubmenu = false;
			});
		}

		$scope.changeTitle = function(menu){
			console.log('change title', menu);
			var title = "";
			if(typeof menu ==='string') { title = menu; }
			else if(typeof menu.label ==='string') { title = menu.label; }
			$scope.pageTitle = title;
		}

		$http.get('/dashboard/templates/').success(function(data){
            var dbTemplates=[];
			var submenuData=[];
            for(i in data){
				if(data[i].instance.templatename!=null){
                    dbTemplates.push(data[i].instance.templatename);
					submenuData.push(data[i].instance.templatename);
					}
					console.log(JSON.stringify(dbTemplates)+"dbT"+JSON.stringify(submenuData));
				};

		$scope.dashboardLinks = dbTemplates;
		console.log("template name",$scope.tempname)

		var lang = [
			{"label":"English"},
			{"label":"Espanol"}
		];

		var searchmenu = [
			{"label":"Inventory"},
			{"label":"Sales Order"},
			{"label":"Purchase Order"},
			{"label":"ASN"}
		];



        $scope.tutorialmenu = [
			{"label":"Search", "showmenu": true,
				"searchmenu":searchmenu},
			{"label": "Dashboards", "showmenu": true,
				"submenu":submenuData},
			{"label": "Operations","showmenu": true,
				"submenu":["Alerts"]},
			{"label": "Planning", "showmenu": true,
				"submenu":["TBD"]},
			{"label": "Reports", "showmenu": true,
				"submenu":["TBD"]},
			{"label":"Administration", "showmenu": true,
				"lang":lang}
		];


		$scope.tutorialmenu.submenu = submenuData;
			//submenuData.unshift("Alerts");
			console.log("$scope.tutorialmenu.submenu "+JSON.stringify($scope.tutorialmenu.submenu));
		});

		$scope.$on('clickCurrentMiniStatement', function(event) {
			$timeout(function() {
				$scope.$broadcast('clickedCurrentMiniStatement');
			}, 100);
		});

		$scope.$on('clickLoanMiniStatement', function(event) {
			$timeout(function() {
				$scope.$broadcast('clickedLoanMiniStatement');
			}, 100);
		});

		$scope.Logout = function() {
			$http.post('./login').success(function(data) {
				$window.location.href = '/login.jade';
				$window.location.href = '/';
			});
		};

		$scope.changeView = function(){
			$window.location.href= '/#/Result Query';
		}

		$scope.showNavbar = function (){
			console.log("inside menu........");
			var leftMenu = $('.left-menu'),
            rightBlock = $('.right-block');
			leftMenu.width('15%');
        }

		$scope.hideNavbar = function (){
			var leftMenu = $('.left-menu'),
            rightBlock = $('.right-block');
			leftMenu.width('0');
        }
}

function LoginController($scope,$http,$location,$window,Warehouseservices) {

		$scope.Login = function(){
			console.log("Inside LoginController");
			console.log("LOgin Link" + "/"+"?uname"+"="+JSON.stringify($scope.user));
			var name = JSON.stringify($scope.user);
			Warehouseservices.add_loggedin(name);
			$window.location.href = "/"+"?uname"+"="+name;
		}
}

function search($scope, $http, $sce, $q) {
		$scope.today = function() {
			var dte = new Date();
			dte.setMonth(dte.getMonth() - 1, 1);
			$scope.dt = dte;
		};

		$scope.today();

		$scope.clear = function() {
			$scope.dt = null;
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};

		$scope.toggleMin();

		$scope.open1 = function($event) {
			console.log('Clicked Open');
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened1 = true;
		};

		$scope.today2 = function() {
			$scope.dt2 = new Date();
		};

		$scope.today2();

		$scope.clear2 = function() {
			$scope.dt2 = null;
		};

		$scope.toggleMin2 = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};

		$scope.toggleMin2();

		$scope.open2 = function($event) {
			console.log('Clicked Open');
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened2 = true;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.format = 'dd-MMMM-yyyy';

		$scope.$on('clickedCurrentMiniStatement', function(event) {
			angular.element('#debitstatement').trigger('click');
		});

		$scope.$on('clickedLoanMiniStatement', function(event) {
			angular.element('#loanstatement').trigger('click');
		});

		$scope.availableTags = [
			"EQ001",
			"EQ002",
			"EQ003",
			"EQ004",
			"EQ005",
			"EQ006",
			"EQ007",
			"EQ008",
			"DEUTSCHE BANK AG NAM",
			"ACTAVIS PLC COM SHS ",
			"ATLAS FINANCIAL HOLD",
			"DEUTSCHE BANK AG NAM"
		];

		$scope.complete=function(){
			$( "#tags" ).autocomplete({
			source: $scope.availableTags
			});
		}

		$scope.complete1=function(){
			$( "#tags1" ).autocomplete({
			source: $scope.availableTags
			});
		}
		console.log("enterereeeeeeee");
}

function searchcontroller($scope, $timeout, $http, $window,Warehouseservices){

		$scope.today = function() {
			var dte = new Date();
			$scope.dt = dte;
		};

		$scope.today();

		$scope.clear = function() {
			$scope.dt = null;
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};

		$scope.toggleMin();

		$scope.open1 = function($event) {
			console.log('Clicked Open');
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened1 = true;
		};

		$scope.open3 = function($event) {
			console.log('Clicked Open3');
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened3 = true;
			$scope.opened2 = false;
			$scope.opened1 = false;
		};

		$scope.today3 = function(){
			$scope.dt3 = new Date();
		};

		$scope.today3();

		$scope.today2 = function() {
			$scope.dt2 = new Date();
		};

		$scope.today2();

		$scope.clear2 = function() {
			$scope.dt2 = null;
		};

		$scope.toggleMin2 = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};

		$scope.clear3 = function() {
			$scope.dt3 = null;
		};

		$scope.toggleMin2();

		$scope.open2 = function($event) {
			console.log('Clicked Open');
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened2 = true;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.format = 'yyyy-MM-dd';
        $scope.changeView = function(){
            var ac = "NL16INGB0004551942";
            console.log("VVVVVVV ", ac)
            Warehouseservices.add_debtor_ac_number(ac);
            var rightNow = new Date($scope.dt);
            rightNow.setDate(rightNow.getDate()+1);
            console.log("rightNow ",rightNow);
            $scope.res = rightNow.toISOString().slice(0,10);console.log("$scope.res"+$scope.res);
            Warehouseservices.add_from_date($scope.res);
            rightNow = new Date($scope.dt2);
            rightNow.setDate(rightNow.getDate()+1);
            console.log("rightNow ",rightNow);
            $scope.res2 = rightNow.toISOString().slice(0,10).replace(/-/g,"-");
            Warehouseservices.add_to_date($scope.res2);
            $window.location.href= '/#/Orders';
        };

        $scope.searchTrades = function(){
        };

        $scope.getaccountdetails2 = function() {
            console.log("========= ",'/orders/NL16INGB0004551942/'+$scope.res+'/'+$scope.res2);
            $http.get('/transactions/NL16INGB0004551942/'+$scope.res+'/'+$scope.res2).success(function(data) {
                $scope.credit = data;
            });
        };
}

function InventoryController($scope, $http, $window, Warehouseservices) {
		//$scope.invdata = Warehouseservices.retrieve_abcd();
		$scope.getwarehouseinventory = function(evnt) {
			if(evnt == null || evnt.keyCode==9){
			var facility_name = $scope.facilityname;  if (facility_name == "") facility_name=null;
			var item_name = $scope.itemid; if (item_name == "") item_name=null; console.log(facility_name," ", item_name);
			var radio = $scope.selected;
			var filter = $scope.data.singleSelect; if (filter == "") filter = null;
			var filter_value = $scope.filter_Value; if (filter_value == "") filter_value = null;
			var item_status =  $scope.itemstatus;
			if (facility_name!=null) facility_name=facility_name.substring(0,5);
			if (item_name!=null) item_name=item_name.substring(0,10);
			    $http({ method: 'GET', url: '/inventory/'+facility_name+'/'+item_name+'/'+radio+'/'+filter+'/'+filter_value}).then(
		        function successcb(response) {
		            var data = response.data;
			    var SOH=0;
		            var map = {};
		            var keys = [], values= [];
		            facilities=$scope.facilities;
					console.log("facilities=================="+facility_name);
		            items=$scope.items;
		            $scope.hotInventory=[];
		            for (rows in data) {map = resolve(data[rows], keys, map, item_status);}
		            console.log("ddddd "+keys);
		            for (i in keys){ values.push(map[keys[i]]); }
		            $scope.inventory = values;
		            $scope.inventory_bkup = values;
		            for (k in values){
		                var status = values[k].instance.Status;
		                for (count in status) {
		                    if(status[count].Status != "In Transit") SOH=SOH+status[count].Qty;
		                };
		                values[k].instance.SOH = SOH;

					for(desc in facilities){
		                var str_array = facilities[desc].split('-');
		                if(values[k].instance.Facility_Name==str_array[0]){
		                    values[k].instance.Facility_Description = str_array[1];
		                    console.log("got it"+str_array[1]+values[k].instance.Facility_Description);
		                };

		                for(desc in items){
							var str_array = items[desc].split('-');
		                    if(values[k].instance.Item_ID==str_array[0].toString()){
								values[k].instance.Item_Description = str_array[1];
		                        console.log("got it"+str_array[1]+values[k].instance.Item_Description);
							};

						};

		            };

					SOH=0;
					values[k].instance.myStyle={'background-color':'white'}
					if (values[k].instance.Hot_Inventory == "True")
						{
							values[k].instance.myStyle={'background-color':'#F78181'};
							$scope.hotInventory.push(values[k]);
						}
		            };

						Warehouseservices.add_inventory_rows_original($scope.inventory_bkup);
		        },
		function errorcb(response){
		        	$scope.inventory = null;
		        	$scope.errormessage = "Inventory Service Not Available";
		        } 
	        );
	        $scope.showHotInventory();
	        }
    	};

	  	$(document).ready(function () {
        	$("#btnExport").click(function (){
           		$("#invtbl").
                btechco_excelexport({
                    containerid: "invtbl", 
                    datatype: $datatype.Table
                });
				console.log("Export************************");
        	});
    	});

		var resolve = function(row,keys,map,itemstate){
	        var key = row.instance.Facility_Name+row.instance.Item_ID;
	        var status = row.instance.Status;
	        var item_status = itemstate;
	        if(key in map) {
	            for (count in status) {
	                map[key].instance.Status[count].Qty = map[key].instance.Status[count].Qty+status[count].Qty;
	            };
	        }else {
	            //before inserting the row into map check if the status - itemStatus is greater than zero
	            console.log("item_statusitem_statusitem_statusitem_statusitem_statusitem_status"+item_status);
	            switch(item_status) {
	                case "Available":{
	                    console.log("Available "+status[0].Qty);
	                    if (status[0].Qty > 0){
	                        map[key] = row;
	                        keys.push(key);
	                    }
	                }
	                break;
	                case "Damaged":{
	                    console.log("Damaged "+status[1].Qty);
	                    if (status[1].Qty > 0){
	                        map[key] = row;
	                        keys.push(key);
	                    }
	                }
	                break;
	                case "RCV Stage":{
	                    if (status[2].Qty > 0){
	                    console.log("RCV Stage "+status[2].Qty);
	                        map[key] = row;
	                        keys.push(key);
	                    }
	                }
	                break;
	                case "QA":{
	                    if (status[3].Qty > 0){
	                    console.log("QA "+status[3].Qty);
	                        map[key] = row;
	                        keys.push(key);
	                    }
	                }
	                break;
	                case "Allocated":{
	                    if (status[4].Qty > 0){
	                    console.log("Allocated "+status[4].Qty);
	                        map[key] = row;
	                        keys.push(key);
	                    }
	                }
	                break;
	                case "Hold":{
	                    if (status[5].Qty > 0){
	                    console.log("Hold "+status[5].Qty);
	                        map[key] = row;
	                        keys.push(key);
	                    }
	                }
	                break;
	                case "In Transit":{
	                    if (status[6].Qty > 0){
	                    console.log("In transit "+status[6].Qty);
	                        map[key] = row;
	                        keys.push(key);
	                    }
	                }
	                break;
	                default:{
	                    console.log("default ");
	                        map[key] = row;
	                        keys.push(key);
	                }
	            }
			}
				return map;
		};

		$scope.showHotInventory = function(){
			console.log("Inside hotInventory ",$scope.checked);
			if ($scope.checked == true) $scope.inventory = $scope.hotInventory;
			else $scope.inventory = $scope.inventory_bkup;
		};
		$scope.gototransactions = function(facility,item,status){
			console.log("Inside gototransactions"+facility," ",item, " ",status);
			Warehouseservices.add_modal_status(status);
			$http.get('/inventory/'+facility+'/'+item+'/'+status).success(function(data) {
				Warehouseservices.add_inventory_rows(data);
				$window.location.href= '/#/Status Details';
			});
		};

		$scope.load = function() {
	$http({ method: 'GET', url: '/warehouse/names'}).then( function successcb(response) {
            var data = response.data;
            $scope.warehousemaster = data;
            $scope.facilities =[];
            for (item in data){
                var wh_id_name = data[item].instance.Warehouse_ID + "-"+data[item].instance.Warehouse_Name;
                 $scope.facilities.push(wh_id_name);
            };
            console.log($scope.facilities);
        }, function errorcb(response){
        	$scope.errormessage = "Inventory Service Not Available";	
        });

		$http({ method: 'GET', url:'/itemmaster/names' }).then(function successcb(response) {
            var data = response.data;
            $scope.itemsmaster = data;
            $scope.items = [];
            for (item in data){
                var item_id_name = data[item].instance.Item_ID + "-"+data[item].instance.Item_Description;
                 $scope.items.push(item_id_name);
            };
            console.log($scope.items);
        }, function errorcb(response){
        	console.log(" %%%%%%%%%%%% "+JSON.stringify(response));	
        }); 
        $scope.statuses = [
			"Available",
			"Damaged",
			"RCV Stage",
			"QA",
			"Allocated",
			"Hold",
			"In Transit",
        ];

        $scope.data = {
            availableOptions: [
				{id: 'PO_Nbr', name: 'PO'},
				{id: 'Lot_Nbr', name: 'Lot/Batch #'},
				{id: 'ASN_Nbr', name: 'ASN'},
				{id: 'Splr_Id', name: 'Supplier'},
				{id: 'Distro_Number', name: 'Sales Order'},
            ]
        };

		$scope.selected="WHST";
        Warehouseservices.add_statuses($scope.statuses);

        var inventory_rows_original = Warehouseservices.retrieve_inventory_rows_original(); 
        if ( inventory_rows_original != null)
            $scope.inventory = inventory_rows_original;
		};

		$scope.load();

		$scope.complete1=function(){
			$scope.facilityname = $('#facility_name').val();
			$( "#facility_name" ).autocomplete({
				source: $scope.facilities,
				select: function (event, ui) {
					$scope.facilityname = ui.item.value;
					console.log("facilityname"+$scope.facilityname);
				}
			});
		};

		$scope.complete2=function(){
	        $scope.itemid = $('#item_name').val();
	        $( "#item_name" ).autocomplete({
				source: $scope.items,
				select: function (event, ui) {
						$scope.itemid = ui.item.value;
						console.log("facilityname"+$scope.itemstatus);
				}
	        });
		};

		$scope.complete3=function(){
			$scope.itemstatus = $('#item_status').val();
			$( "#item_status" ).autocomplete({
			source: $scope.statuses
			});
		};

		$scope.filter=function(){
			$scope.getwarehouseinventory(null);
		};

		$scope.reset1 = function(){
			$scope.filter_Value = null;
		};

		var obj = {}, parameterString,pairs;
		parameterString = $window.location.href.split('?')[1];
		if(parameterString){
            pairs = parameterString.split('&');
			for(i in pairs){
				var split = pairs[i].split('=');
				obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
            }

			$scope.facilityname = obj.facilityname;
			console.log("Warehouse_ID",obj.facilityname)
			$scope.itemid = obj.orderid;
			$scope.getwarehouseinventory(null);
        }
}

function ModalController($scope, $window, Warehouseservices){

		$scope.showInventory = function(){
        $scope.modal_status = Warehouseservices.retrieve_modal_status();
        $scope.index = Warehouseservices.retrieve_statuses().indexOf($scope.modal_status);
        $scope.status_inventory = Warehouseservices.retrieve_inventory_rows();
		}

		$scope.showInventory();

		var values = [];
		values = $scope.status_inventory;

		for(k in values){
			for(desc in facilities){
                var str_array = facilities[desc].split('-');
                if(values[k].instance.Facility_Name==str_array[0]){
                    values[k].instance.Facility_Description = str_array[1];
					console.log("fac desc  "+str_array[1]);
                };
            for(desc in items){
                var str_array = items[desc].split('-');
                if(values[k].instance.Item_ID==str_array[0].toString()){
                    values[k].instance.Item_Description = str_array[1];
                };
            };

            };
		}

		$scope.loadInventory = function(){
        $window.location.href= '/#/Inventory';
		}
}

function SalesOrderController($scope, $http, $window, Warehouseservices) {
		$scope.selectedorderid = null;
		$scope.YesOrNo = "Value";
		$scope.salesorder1 = Warehouseservices.retrieve_order_rows();

		$scope.getwarehouseorders = function(evnt) {
			if(evnt == null || evnt.keyCode==9){
				var order_id = $scope.orderid;if (order_id == "") order_id=null;
				var facility_name = $scope.facilityname;  if (facility_name == "") facility_name=null;
				if (facility_name!=null) facility_name=facility_name.substring(0,5);
				var cust_ref_num = $scope.custrefnum;if(cust_ref_num == "") cust_ref_num = null;
				var customer_id = $scope.customer_id; if (customer_id == "") customer_id = null;
				var order_status = $scope.data1.singleSelect;
				var item = $scope.item; if (item == "") item=null;
				var shipdate = $scope.dt; if(shipdate != undefined) shipdate = shipdate.toISOString().slice(0,10);
				var orderdate = $scope.dt2; if(orderdate != undefined) orderdate = orderdate.toISOString().slice(0,10);
				var filteroptions = $scope.data2.singleSelect2; if (filteroptions == "" || filteroptions == null) {filteroptions = null; $scope.filter_Value="";}
				if (filteroptions == "Late Shipment" || filteroptions == "Short Shipped") $scope.YesOrNo = "Enter 'YES' or 'NO'";
				var filtervalue = $scope.filter_Value; if (filtervalue == "") filtervalue = null;

				console.log("Inside getwarehouseinventory ------order_id", order_id, "cust_ref_num ", cust_ref_num,
				"customer_id ",customer_id, "order_status ",order_status,"item ",item,"ship_date ",shipdate,"order_date ",orderdate,
				"filteroptions ", filteroptions, "filtervalue "+filtervalue);
				/*if(facility_name==undefined && order_id==undefined && cust_ref_num==undefined && customer_id==undefined
				&& order_status==undefined && item==undefined && shipdate==undefined &&
				orderdate==undefined && filteroptions==undefined && filtervalue==undefined){
					$scope.salesOrderFilterFormEmpty = true;
					console.log("Filter form needs to be filled")
					return;
				}
				else {
					$scope.salesOrderFilterFormEmpty = false;
				}*/
				console.log("URL "+'/salesorder/'+facility_name+'/'+order_id+'/'+cust_ref_num+'/'+customer_id+'/'+order_status+'/'+item+'/'+shipdate+'/'+orderdate+'/'+filteroptions+'/'+filtervalue);
				$http.get('/salesorder/'+facility_name+'/'+order_id+'/'+cust_ref_num+'/'+customer_id+'/'+order_status+'/'+item+'/'+shipdate+'/'+orderdate+'/'+filteroptions+'/'+filtervalue).success(function(data) {
					$scope.salesorder=data;
					$scope.order_line_item= null;
					Warehouseservices.add_salesorder(data);

					if ($scope.salesorder.length != 0) {
						$scope.currentfocus = $scope.salesorder[0];
						$scope.selectedorderid =  $scope.currentfocus.instance.Order_ID;
						$scope.currentfocus.instance.myStyle={"background-color":"yellow"};
						$scope.order_line_item = $scope.currentfocus.instance.Order_line;
					}
				console.log("back"+$scope.salesorder);

				var value = [];
				facilities = $scope.facilities;
				value = $scope.salesorder;
				for(k in value){
					for(desc in facilities){
						var str_array = facilities[desc].split('-');
						if(value[k].instance.Facility_Name==str_array[0]){
							value[k].instance.Facility_Description = str_array[1];
							console.log("got it"+str_array[1]+value[k].instance.Facility_Description);
						};

					};
				};

				});

			};
		}

		$scope.salesorder = Warehouseservices.retrieve_salesorder();
		if($scope.salesorder && $scope.salesorder.length > 0){
			$scope.currentfocus = $scope.salesorder[0];
		}

		console.log("orders data"+$scope.salesorder);

				$scope.gotoordertransactions = function(orderid){
					console.log("Inside gotoordertransactions"+orderid," ");
					$http.get('/salesorder/'+orderid).success(function(data) {
					Warehouseservices.add_order_rows(data);
					$window.location.href= '/#/Order Details';
					console.log($window.location.href);
					});
				};
				$scope.gotoorderlinetransactions = function(item){
					console.log("Inside gotoorderlinetransactions"+item," ");
					$http.get('salesorder/item/'+item).success(function(data) {
					Warehouseservices.add_item_rows(data);
					console.log("item+++++"+item);
					console.log("data"+data);
					console.log("order line data"+data);
					console.log("order line data"+$scope.salesorderitem );
					$window.location.href= '/#/Item Details';
					console.log($window.location.href);
					});
				};

		$http.get('/warehouse/names').success(function(data) {
            $scope.warehousemaster = data;
            $scope.facilities =[];
            for (item in data){
                var wh_id_name = data[item].instance.Warehouse_ID + "-"+data[item].instance.Warehouse_Name;
                $scope.facilities.push(wh_id_name);
            };
            console.log($scope.facilities);
        });

	   $http.get('/itemmaster/names').success(function(data) {
            $scope.itemsmaster = data;
            $scope.items = [];
            for (item in data){
                var item_id_name = data[item].instance.Item_ID + "-"+data[item].instance.Item_Description;
                $scope.items.push(item_id_name);
            };
            console.log($scope.items);
        });

		$scope.loadSalesOrder = function(){
			$window.location.href= '/#/Sales Order';
			console.log("URL++++++++++"+$window.location.href);
		};

		$scope.loadSales = function(){
			$window.location.href= '/#/Sales Order';
			console.log("URL++++++++++orderline"+$window.location.href);
		};

		$scope.complete1=function(){
        $scope.facilityname = $('#facility_name').val();
        $( "#facility_name" ).autocomplete({
			source: $scope.facilities,
			select: function (event, ui) {
				$scope.facilityname = ui.item.value;
				console.log("facilityname"+$scope.facilityname);
            }
        });
		};

		$scope.complete2=function(){
        $scope.item = $('#item_status').val();
		//console.log("itemvcal",$scope.items);
        $( "#item_status" ).autocomplete({
			source: $scope.items,
			select: function (event, ui) {
				$scope.item = ui.item.value;
				console.log("itemname"+$scope.item);
            }
        });
		};

		var lateShipments = function(data, filtervalue){
        var late_ships = [];
        for(j in data){
            var oLine = data[j].instance.Order_line;
            for(i in oLine){
                oLine[i].ActShipmentDate = new Date(oLine[i].ActShipmentDate);
                oLine[i].Est_Shipment_Date = new Date(oLine[i].Est_Shipment_Date);
                console.log("date "+ oLine[i].ActShipmentDate.getTime()+ "\n"+oLine[i].Est_Shipment_Date.getTime() );
                if (filtervalue == "true") {
                    if (oLine[i].ActShipmentDate.getTime() > oLine[i].Est_Shipment_Date.getTime()) {
                        late_ships = data[j];
                    }
                }else if (filtervalue == "false"){
                    if (oLine[i].ActShipmentDate.getTime() <= oLine[i].Est_Shipment_Date.getTime()) {
                        late_ships = data[j];
                    }
                }

            }
        }
            return late_ships;
		}

		var shortShipments = function(data, filtervalue){
			var short_ships = [];
			for(j in data){
				var oLine = data[j].instance.Order_line;
				for(i in oLine){
					if (filtervalue == "true") {
						if (oLine[i].Shipped_Qty < oLine[i].Ordered_QTY) {
                        short_ships = data[j];
                    }
					}else if (filtervalue == "false"){
						if (oLine[i].Shipped_Qty == oLine[i].Ordered_QTY) {
                        short_ships = data[j];
						}
					}
                }
			}
            return short_ships;
		}

		$scope.load = function() {
			$scope.data1 = {
            availableOrder: [
				{id: 'Edit', name: 'Edit'},
				{id: 'Released', name: 'Released'},
				{id: 'Selected into Wave', name: 'Selected into Wave'},
				{id: 'Picked', name: 'Picked'},
				{id: 'Packed', name: 'Packed'},
				{id: 'Loading', name: 'Loading'},
				{id: 'Shipped', name: 'Shipped'},
				{id: 'Closed', name: 'Closed'},
				{id: 'On-Hold', name: 'On-Hold'},
				{id: 'Error', name: 'Error'},
			]
			};

			$scope.data2 = {
				availableOptions: [
					{id: 'Batch Number', name: 'Batch Number'},
					{id: 'Partial Ship', name: 'Partial Shipments'},
					{id: 'Back Order Number', name: 'Back Order'},
					{id: 'Late Shipment', name: 'Late Shipment'},
					{id: 'Short Shipment', name: 'Short Shipped'},
					{id: 'Order Line Modified', name: 'Modified Date'},
					{id: 'Order Line Ordered', name: 'Ordered Date'},
					{id: 'Order Line Shipped', name: 'Shipped Date'}
				]
			};
			$scope.data3 = {
				selectoptions: [
					{id:'yes',name:'YES'},
					{id:'no',name:'NO'}
				]
			}
		};
		$scope.load();

		$scope.displayorderline=function(orderid){
			$scope.selectedorderid = orderid;
			if(orderid != 'undefined'){
                $scope.order_line_item = resolve($scope.salesorder,orderid);
			}
		};

		var resolve = function(data,orderid){
			for (i in data){
				if(data[i].instance.Order_ID == orderid) {
					$scope.currentfocus.instance.myStyle={"background-color":"#F2F2F2"};
					data[i].instance.myStyle={"background-color":"yellow"};
					$scope.currentfocus = data[i];

					return data[i].instance.Order_line;
				}
			}
		};

		$scope.today = function() {
			var dte = new Date();
			dte.setMonth(dte.getMonth() - 1, 1);
			$scope.dt = dte;
		};

		$scope.clear = function() {
			$scope.dt = null;
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};

		$scope.toggleMin();

		$scope.open1 = function($event) {
			console.log('Clicked Open');
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened1 = true;
			$scope.opened2 = false;
		};

		$scope.today2 = function() {
			$scope.dt2 = new Date();
		};

		$scope.clear2 = function() {
			$scope.dt2 = null;
		};

		$scope.toggleMin2 = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};

		$scope.toggleMin2();

		$scope.toggleMin3 = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin3();


		$scope.open2 = function($event) {
			console.log('Clicked Open');
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened2 = true;
			$scope.opened1 = false;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.format = 'dd-MMMM-yyyy';

		$scope.$on('clickedCurrentMiniStatement', function(event) {
			angular.element('#debitstatement').trigger('click');
		});

		$scope.$on('clickedLoanMiniStatement', function(event) {
			angular.element('#loanstatement').trigger('click');
		});

		$scope.reset = function(){
            console.log("before reset",$scope.data2.singleSelect2);
			var filteroptions = $scope.data2.singleSelect2;
            if (filteroptions == "" || filteroptions == null) {filteroptions = null; $scope.filter_Value="";}
			if(filteroptions == "Batch Number" || filteroptions == "Partial Shipments" || filteroptions == "Back Order") $scope.YesOrNo="Value";
			if (filteroptions == "Late Shipment" || filteroptions == "Short Shipment") {$scope.YesOrNo = "Enter 'YES' or 'NO'";}
			var filtervalue = $scope.filter_Value; if (filtervalue == "") filtervalue = null;
			console.log("after reset");

			$scope.filter_Value = null;
		};


        $scope.itemStatusShow = function(statusType){
            var filteroptions = $scope.data2.singleSelect2;
            if(filteroptions=="Batch Number" || filteroptions=="Partial Ship" || filteroptions=="Back Order Number"){
                if(statusType=="alphanumeric"){ return true; }
                else { return false;}
            }

            else if(filteroptions=="Late Shipment" || filteroptions == "Short Shipment"){
                if(statusType=="yesno"){ return true; }
                    else { return false;}
					console.log("shipment",filteroptions);
                }
				else if(filteroptions=="Order Line Modified" || filteroptions=="Order Line Ordered" || filteroptions=="Order Line Shipped"){
                     if(statusType=="date"){ return true; }
                     else { return false;}
					console.log("shipment",filteroptions);
                }
                else {
                    if(statusType=="alphanumeric"){ return true; }
                    else { return false;}
                }
        };

		var obj = {}, parameterString,pairs;
		parameterString = $window.location.href.split('?')[1];
		if(parameterString){
            pairs = parameterString.split('&');

		for(i in pairs){
			var split = pairs[i].split('=');
			obj[decodeURIComponent(split[0])] = decodeURIComponent(split[1]);
        }

        $scope.facilityname = obj.facilityname;
		console.log("Warehouse_ID",obj.facilityname)
		$scope.orderid = obj.orderid;
		$scope.data1.singleSelect = obj.order_status;
		$scope.getwarehouseorders(null);
        }

}

function PurchaseOrderController($scope, $http, $window, Warehouseservices){

		//$scope.selectedorderid = null;
		$scope.purchaseorder1 = Warehouseservices.retrieve_poorder_rows();
		$scope.purchaseorder = Warehouseservices.retrieve_purchaseorder();
		console.log("drill down"+$scope.purchaseorder1);
		//$scope.salesorder = Warehouseservices.retrieve_salesorder();
		if($scope.purchaseorder && $scope.purchaseorder.length > 0){
			$scope.currentfocus = $scope.purchaseorder[0];
		}

		$scope.getwarehousepurchaseorders = function(evnt) {
			if(evnt == null || evnt.keyCode==9){
				var purchase_order = $scope.po;if (purchase_order == "") purchase_order=null;
				var facility_name = $scope.facilityname;  if (facility_name == "") facility_name=null;
				if (facility_name!=null) facility_name=facility_name.substring(0,5);
				var sup_ref_num = $scope.suprefno;if(sup_ref_num == "") sup_ref_num = null;
				var po_status = $scope.poStatus;
				var item = $scope.item; if (item == "") item=null;
				var mdate = $scope.dt; if(mdate != undefined) mdate = mdate.toISOString().slice(0,10);
				var recvdate = $scope.dt2; if(recvdate != undefined) recvdate = recvdate.toISOString().slice(0,10);
				var filteroptions = $scope.poFilterOption; if (filteroptions == "" || filteroptions == null) {filteroptions = null; $scope.filter_Value="";}
				//if (filteroptions == "Late Shipment" || filteroptions == "Short Shipped") $scope.YesOrNo = "Enter 'YES' or 'NO'";
				var filtervalue = $scope.filter_Value; if (filtervalue == "") filtervalue = null;

				console.log("Inside getwarehousepurchaseorder ------purchase_order", purchase_order, "sup_ref_num ", sup_ref_num,
				"po_status ",po_status,"item ",item,"modified_date ",mdate,"received_date ",recvdate,
				"filteroptions ", filteroptions, "filtervalue "+filtervalue);
				if(facility_name==undefined && purchase_order==undefined && sup_ref_num==undefined
				&& po_status==undefined && item==undefined && mdate==undefined &&
				recvdate==undefined && filteroptions==undefined && filtervalue==undefined){
					$scope.poOrderFilterFormEmpty = true;
					console.log("Filter form needs to be filled")
					return;
				}
				else {
					$scope.poOrderFilterFormEmpty = false;
				}
				console.log("PO URL "+'/purchaseorder/'+facility_name+'/'+purchase_order+'/'+sup_ref_num+'/'+'/'+po_status+'/'+item+'/'+mdate+'/'+recvdate+'/'+filteroptions+'/'+filtervalue);
				$http.get('/purchaseorder/'+facility_name+'/'+purchase_order+'/'+sup_ref_num+'/'+po_status+'/'+item+'/'+mdate+'/'+recvdate+'/'+filteroptions+'/'+filtervalue).success(function(data) {
					$scope.purchaseorder=data;
					//Warehouseservices.add_purchaseorder(data);

					if ($scope.purchaseorder.length != 0) {
						$scope.currentfocus = $scope.purchaseorder[0];
						$scope.selectedorderid =  $scope.currentfocus.instance.PO_Nbr;
						$scope.currentfocus.instance.myStyle={"background-color":"yellow"};
						$scope.order_line_item = $scope.currentfocus.instance.Order_line;
					}
				console.log("back"+JSON.stringify($scope.purchaseorder));

				var value = [];
				facilities = $scope.facilities;
				value = $scope.purchaseorder;
				for(k in value){
					for(desc in facilities){
						var str_array = facilities[desc].split('-');
						if(value[k].instance.Facility_Name==str_array[0]){
							value[k].instance.Facility_Description = str_array[1];
							console.log("got it"+str_array[1]+value[k].instance.Facility_Description);
						};

					};
				};

				});

			};
		}
		$scope.load = function(){
			$scope.data1 = {
            availablePurchaseOrder: [
				{id: 'Edit', name: 'Edit'},
				{id: 'Received', name: 'Received'},
				{id: 'On-Hold', name: 'On-Hold'},
				{id: 'Error', name: 'Error'},
				{id: 'Closed', name: 'Closed'},
			]
			};
			$scope.data2 = {
            availableFilterOptions: [
				{id: 'Batch', name: 'Batch No'},
				{id: 'Partial', name: 'Partial'},
				{id: 'Modified', name: 'Modified Date'},
				{id: 'Received', name: 'Received Date'},
			]
			};
		}
		$scope.load();

		$scope.gotopurchaseordertransactions = function(orderid){
					console.log("Inside gotopurchaseordertransactions"+purchase_order," ");
					$http.get('/purchaseorder/'+purchase_order).success(function(data) {
					Warehouseservices.add_poorder_rows(data);
					$window.location.href= '/#/PO Details';
					console.log($window.location.href);
					});
				};
		$scope.gotopurchaseorderlinetransactions = function(item){
					console.log("Inside gotopurchaseorderlinetransactions"+item," ");
					$http.get('purchaseorder/item/'+item).success(function(data) {
					Warehouseservices.add_poItem_rows(data);
					console.log("item+++++"+item);
					console.log("data"+data);
					console.log("PO line data"+data);
					console.log("PO line data"+$scope.poorderitem );
					$window.location.href= '/#/POItem Details';
					console.log($window.location.href);
					});
				};
		$http.get('/warehouse/names').success(function(data) {
            $scope.warehousemaster = data;
            $scope.facilities =[];
            for (item in data){
                var wh_id_name = data[item].instance.Warehouse_ID + "-"+data[item].instance.Warehouse_Name;
                $scope.facilities.push(wh_id_name);
            };
            console.log($scope.facilities);
        });

	    $http.get('/itemmaster/names').success(function(data) {
            $scope.itemsmaster = data;
            $scope.items = [];
            for (item in data){
                var item_id_name = data[item].instance.Item_ID + "-"+data[item].instance.Item_Description;
                $scope.items.push(item_id_name);
            };
            console.log($scope.items);
        });
		$scope.loadPOOrder = function(){
			$window.location.href= '/#/Purchase Order';
			console.log("URL++++++++++"+$window.location.href);
		};

		$scope.loadPOSales = function(){
			$window.location.href= '/#/Purchase Order';
			console.log("URL++++++++++orderline"+$window.location.href);
		};

		$scope.complete1=function(){
        $scope.facilityname = $('#facility_name').val();
        $( "#facility_name" ).autocomplete({
			source: $scope.facilities,
			select: function (event, ui) {
				$scope.facilityname = ui.item.value;
				console.log("facilityname"+$scope.facilityname);
            }
        });
		};

		$scope.displayorderline=function(purchase_order){
			$scope.selectedorderid = purchase_order;
			if(purchase_order != 'undefined'){
                $scope.order_line_item = resolve($scope.purchaseorder,purchase_order);
			}
		};

		var resolve = function(data,orderid){
			for (i in data){
				if(data[i].instance.PO_Nbr == purchase_order) {
					$scope.currentfocus.instance.myStyle={"background-color":"#F2F2F2"};
					data[i].instance.myStyle={"background-color":"yellow"};
					$scope.currentfocus = data[i];

					return data[i].instance.Order_line;
				}
			}
		};
		$scope.today = function() {
			var dte = new Date();
			dte.setMonth(dte.getMonth() - 1, 1);
			$scope.dt = dte;
		};

		$scope.clear = function() {
			$scope.dt = null;
		};

		$scope.toggleMin = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};

		$scope.toggleMin();

		$scope.open1 = function($event) {
			console.log('Clicked Open');
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened1 = true;
			$scope.opened2 = false;
		};

		$scope.today2 = function() {
			$scope.dt2 = new Date();
		};

		$scope.clear2 = function() {
			$scope.dt2 = null;
		};

		$scope.toggleMin2 = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};

		$scope.toggleMin2();

		$scope.toggleMin3 = function() {
			$scope.minDate = $scope.minDate ? null : new Date();
		};
		$scope.toggleMin3();


		$scope.open2 = function($event) {
			console.log('Clicked Open');
			$event.preventDefault();
			$event.stopPropagation();
			$scope.opened2 = true;
			$scope.opened1 = false;
		};

		$scope.dateOptions = {
			formatYear: 'yy',
			startingDay: 1
		};

		$scope.format = 'dd-MMMM-yyyy';

		$scope.$on('clickedCurrentMiniStatement', function(event) {
			angular.element('#debitstatement').trigger('click');
		});

		$scope.$on('clickedLoanMiniStatement', function(event) {
			angular.element('#loanstatement').trigger('click');
		});

		$scope.itemStatusShow = function(statusType){
            var filteroptions = $scope.poFilterOption;
            if(filteroptions=="Batch No" || filteroptions=="Partial"){
                if(statusType=="alphanumeric"){ return true; }
                else { return false;}
            }

            /*else if(filteroptions=="Late Shipment" || filteroptions == "Short Shipment"){
                if(statusType=="yesno"){ return true; }
                    else { return false;}
					console.log("shipment",filteroptions);
                } */
				else if(filteroptions=="Modified Date" || filteroptions=="Received Date"){
                     if(statusType=="date"){ return true; }
                     else { return false;}
					console.log("shipment",filteroptions);
                }
                else {
                    if(statusType=="alphanumeric"){ return true; }
                    else { return false;}
                }
        };

}

function MenuController($scope){
		$scope.showtutorials = false;
		$scope.showarticles = false;
		$scope.showTutorials = function(){
			$scope.showtutorials = true;
		}

		$scope.hideTutorials = function() {
			$scope.showtutorials = false;
		}

		$scope.showArticles = function() {
			$scope.showarticles = true;
		}

		$scope.hideArticles = function() {
			$scope.showarticles = false;
		}
}

function DashboardController($scope,$rootScope,$http,$route,$timeout,$window,Warehouseservices,$routeParams){
		$scope.parentwindow = $window;
		$scope.tempname = $routeParams.templateid;
		console.log("$routeParams"+$scope.tempname );
		$scope.dashboardviewerUrl = "abc.html";
		$scope.preview = function(){
			$scope.dashboardviewerUrl = "abc.html?widgets="+$scope.seleted_db_template;
			console.log("$scope.dashboardviewerUrl"+$scope.dashboardviewerUrl+$scope.singleSelect1);
			console.log("$scopetemplatepreview"+$scope.seleted_db_template);
		var indexArray = [];
		for(var i=0,j=$scope.singleSelectdata.length;i<j;i++){
			indexArray.push( $scope.origSingleSelectdata.indexOf($scope.singleSelectdata[i]) );
		}
		console.log('indexArray', indexArray)
		$scope.resetdb = function(){
			if($scope.seleted_db_template == null){
				$scope.seleted_db_template == null;
			}
		}
		if($scope.seleted_db_template){
			$scope.dashboardviewerUrl = "abc.html?template="+$scope.seleted_db_template;
		}
		else {
			$scope.dashboardviewerUrl = "abc.html?widgets="+$scope.singleSelectdata.join(',');
		}
		}

		$scope.viewer = '';
			try{
				console.log($window.location.split('?')+"window");
				$scope.viewer = $window.location.search.replace("?", '').split("&")[0].split("=")[1].split(",");
			}catch(e){}

		$scope.baroptions={
			chart: {
                type: 'multiBarChart',
                height: 300,
				width: 400,
                margin : {
                    top: 20,
                    right: 100,
                    bottom: 45,
                    left: 30
                },
				title: true,
                x: function(d){console.log(d.label+"label");return d.label;},
                y: function(d){return d.value;},
                clipEdge: true,
				showLegend: true,
				showControls: false,
				color: ["gold","lawngreen","hotpink","midnightblue","green"],
                duration: 500,
                stacked: true,
				tooltips: false,
                xAxis: {
                    showMaxMin: true
                },
                yAxis: {
                    axisLabel: 'value',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }},
			title:{
                enable: true,
                text: '',
                css:
                {
                color: 'midnightblue',
                fontWeight: 'bold'
                }
            }
		};

		$scope.baroptions1={
			chart: {
                type: 'multiBarChart',
				title: true,
                x: function(d){console.log(d.label+"label");return d.label;},
                y: function(d){return d.value;},
                clipEdge: true,
				showLegend: true,
				showControls: false,
				color: ["gold","lawngreen","hotpink","midnightblue","green"],
                duration: 500,
                stacked: true,
				tooltips: false,
                xAxis: {
                    showMaxMin: true
                },
                yAxis: {
                    axisLabel: 'value',
                    tickFormat: function(d){
                        return d3.format(',.2f')(d);
                    }
                }},
			title: {
                enable: true,
                text: '',
                css:
                {
                color: 'midnightblue',
                fontWeight: 'bold'

                }
                }


			};


		$scope.bardata = [
			{
                "key": "Series1",
                "color": "#d62728",
                "values": [
                    {
                        "label" : "Group A" ,
                        "value" : 1.8746444827653
                    } ,
                    {
                        "label" : "Group B" ,
                        "value" : 8.0961543492239
                    } ,
                    {
                        "label" : "Group C" ,
                        "value" : 0.57072943117674
                    } ,
                    {
                        "label" : "Group D" ,
                        "value" : 2.4174010336624
                    } ,
                    {
                        "label" : "Group E" ,
                        "value" : 0.72009071426284
                    } ,
                    {
                        "label" : "Group F" ,
                        "value" : 0.77154485523777
                    } ,
                    {
                        "label" : "Group G" ,
                        "value" : 0.90152097798131
                    } ,
                    {
                        "label" : "Group H" ,
                        "value" : 0.91445417330854
                    } ,
                    {
                        "label" : "Group I" ,
                        "value" : 0.055746319141851
                    }
                ]
            },
            {
                "key": "Series2",
                "color": "#1f77b4",
                "values": [
                    {
                        "label" : "Group A" ,
                        "value" : 25.307646510375
                    } ,
                    {
                        "label" : "Group B" ,
                        "value" : 16.756779544553
                    } ,
                    {
                        "label" : "Group C" ,
                        "value" : 18.451534877007
                    } ,
                    {
                        "label" : "Group D" ,
                        "value" : 8.6142352811805
                    } ,
                    {
                        "label" : "Group E" ,
                        "value" : 7.8082472075876
                    } ,
                    {
                        "label" : "Group F" ,
                        "value" : 5.259101026956
                    } ,
                    {
                        "label" : "Group G" ,
                        "value" : 0.30947953487127
                    } ,
                    {
                        "label" : "Group H" ,
                        "value" : 0
                    } ,
                    {
                        "label" : "Group I" ,
                        "value" : 0
                    }
                ]
            }
        ];

        function generateData() {
            return stream_layers(3,50+Math.random()*50,.1).map(function(data, i) {
                return {
                    key: 'Stream' + i,
                    values: data
                };
            });
        }

        function stream_layers(n, m, o) {
            if (arguments.length < 3) o = 0;
            function bump(a) {
                var x = 1 / (.1 + Math.random()),
                    y = 2 * Math.random() - .5,
                    z = 10 / (.1 + Math.random());
                for (var i = 0; i < m; i++) {
                    var w = (i / m - y) * z;
                    a[i] += x * Math.exp(-w * w);
                }
            }
            return d3.range(n).map(function() {
                var a = [], i;
                for (i = 0; i < m; i++) a[i] = o + o * Math.random();
                for (i = 0; i < 5; i++) bump(a);
                return a.map(stream_index);
            });
        }

        function stream_waves(n, m) {
            return d3.range(n).map(function(i) {
                return d3.range(m).map(function(j) {
                    var x = 20 * j / m - i / 3;
                    return 2 * x * Math.exp(-.5 * x);
                }).map(stream_index);
            });
        }
        function stream_index(d, i) {
            return {x: i, y: Math.max(0, d)};
        }

		var pieoptions1 = {
            chart: {
                type: 'pieChart',
                title: true,
                x: function(d){return d.Status;},
                y: function(d){return d.Count;},
                showLabels: true,
				pieLabelsOutside: true,
				pie: {
				growOnHover: true
				},
				color: ["chocolate","blue","yellow","grey","green"],
				showLegend: false,
				labelSunbeamLayout: true,
				tooltips: false
				},
            title: {
                enable: true,
                text: '',
                css:
                {
                color: 'midnightblue',
                fontWeight: 'bold'

                }
                }
        };


		var pieoptions = {
            chart: {
                type: 'pieChart',
                title: true,

                height: 300,
                width: 400,
                x: function(d){return d.Status;},
                y: function(d){return d.Count;},
                showLabels: true,
               pieLabelsOutside: true,
               pie: {
               growOnHover: true
               },
               color: ["chocolate","blue","yellow","grey","green"],
               showLegend: false,
               labelSunbeamLayout: true,
               tooltips: false,
				margin: {left:30,top:0,botttom:0,right:100},

				pie: { 
				dispatch: { 

				elementClick: 

				function (e){console.log("elementclick"+JSON.stringify(e));
					console.log("STATUS",JSON.stringify(e));
					$window.location.href = "/#/"+"Sales Order"+"?order_status"+"="+JSON.parse(JSON.stringify(e)).point.Status;
					console.log("DASHBOARD",$window.location.href);
				}
				}
				}
          	},
            title: {
                enable: true,
                text: '',
                css:
                {
                color: 'midnightblue',
                fontWeight: 'bold'

                }
                }
        };

		$scope.highchartsBar = {
			options: {
			chart: {
                type: 'column',

                options3d: {
				enabled: true,
                alpha: 15,
                beta: 15,
                depth: 110
            }
            },
			colors: ['#80dfff', '#ff8080', '#ffff80', '#80ffaa', '#ffccff'],
				 legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
        },
        tooltip: {
            headerFormat: '<b>{point.x}</b><br/>',
            pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
        },
			plotOptions: {
            column: {
                stacking: '',
                dataLabels: {
                    enabled: true,
                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
                    style: {
                        textShadow: '0 0 3px black'
                    }
                }
            }
        }
        },
         series: [],
		 yAxis: {
            min: 0,
            title: {
                text: ' '

            },
            stackLabels: {
                enabled: true,
                style: {
                    fontWeight: 'bold',
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
                }
            }},

		xAxis: {
            categories: []
        },
        title: {
            text: ' ',
			style: {
         color: 'midnightblue',
         fontWeight: 'bold'
		}
        }
		}

		$scope.highchartsPie={
			options: {
            chart: {
            type: 'pie',
            options3d: {
				enabled: true,
                alpha: 45,
				beta: 0
            },

			},

			colors: ['#80dfff', '#ff8080', '#ffff80', '#80ffaa', '#ffccff'],
			plotOptions: {
            pie: {
                depth: 50,
				size : 250,
				dataLabels:{
				distance:-10
				}
            }
			}
            },

			title: {
            text: ' ',
			style: {
			color: 'midnightblue',
			fontWeight: 'bold'
			}
			},
			series: [{
            data: [],
			animation: true,
              point:{
                  events:{
                      click: function (event) {
						console.log(this.name)	;
                          //$window.location.href = "/#/"+"Sales Order"+"?order_status"+"="+JSON.parse(JSON.stringify(e)).point.Status;
$window.location.href = "/#/"+"Sales Order"+"?order_status"+"="+this.name;
                      }
                  }
              }




			}]
		}

		$scope.highchartsDonut={

		options:{
		chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            }
        },
		colors: ['#80dfff', '#ff8080', '#ffff80', '#80ffaa', '#ffccff'],
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45,
				size : 250,
				dataLabels:{
				distance:-10
				}
            }
        }
        },
        title: {
            text: ' ',
			style: {
         color: 'midnightblue',
         fontWeight: 'bold'
		}
        },
        subtitle: {
            text: ' '
        },

        series: [{

            data: [


            ]
        }]
        }


		$scope.highchartsLine={
    options:{
    chart: {
                zoomType: 'x'
            },
			colors: ['#80dfff', '#ff8080', '#ffff80', '#80ffaa', '#ffccff'],
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            }
            },
            title: {
                text: ' ',
				style: {
         color: 'midnightblue',
         fontWeight: 'bold'
      }
            },
            subtitle: {
                text: ''
            },
            xAxis: {
                type: ''
            },
yAxis: [{ // Primary yAxis
            labels: {
                format: '',
                style: {
                    color: "black"
                }
            },
            title: {
                text: '',
                style: {
                    color: "black"
                }
            },
            opposite: true

        }, { // Secondary yAxis
            gridLineWidth: 0,
			opposite: false,
            title: {
                text: '',
                style: {
                    color: "black"
                }
            },
            labels: {
                format: '{value} ',
                style: {
                    color: "black"
                }
            },
			opposite: false

        }, { // Tertiary yAxis
            gridLineWidth: 0,
            title: {
                text: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            labels: {
                format: '',
                style: {
                    color: Highcharts.getOptions().colors[1]
                }
            },
            opposite: false
        }],

            legend: {
                enabled: false
            },


            series: [


			]
        }


		$scope.chartOptions = [];
		$scope.dataOptions = [];
		$scope.chartOptionssecondHalf = [];

		$scope.dataOptionssecondHalf = [];
        $scope.dbTemplates = [];
		$scope.DurationTypes=[
		"Daily","Weekly","Quaterly","Monthly","Yearly","Shift"
				];
        $scope.singleSelectdata=[];
        $scope.dataSet=[];
    	$scope.dataSetSecondHalf=[];
    	$scope.index=0;
		$scope.thirdindex=0;
		$scope.chartOptionsThirdHalf=[];
		var donutoptions1 = {
            chart: {
                type: 'pieChart',
                title: true,


                x: function(d){return d.Status;},
                y: function(d){return d.Count;},
                showLabels: true,
               pieLabelsOutside: true,
               pie: {
               growOnHover: true
               },
               donut: true,
			   color: ["brown","darkgoldenrod","blue","yellow","grey","green"],
				donutRatio: 0.25,
				noData: 'Data aint here',
				donutLabelsOutside: 'true',
               showLegend: false,
               labelSunbeamLayout: true,
               tooltips: false


            },
            title: {
                enable: true,
                text:'',
                css:
                {
                color: 'midnightblue',
                fontWeight: 'bold'

                }
                }
        };


 var donutoptions = {
            chart: {
                type: 'pieChart',
                title: true,

                height: 300,
                width: 400,
                x: function(d){return d.Status;},
                y: function(d){return d.Count;},
                showLabels: true,
               pieLabelsOutside: true,
			   color: ["brown","darkgoldenrod","#F78181","yellow","grey","green"],
               pie: {
               growOnHover: true
               },
               donut: true,
            donutRatio: 0.25,
            noData: 'Data aint here',
            donutLabelsOutside: 'true',
               showLegend: false,
               labelSunbeamLayout: true,
               tooltips: false,
            margin: {left:30,top:0,botttom:0,right:100}

            },
            title: {
                enable: true,
                text:'',
                css:
                {
                color: 'midnightblue',
                fontWeight: 'bold'

                }
                }
        };

		$scope.loaddbdetailsTemp1 = function(){
			$scope.viewer = '';
			try{
                var pairs = $window.location.search.slice(1).split('&');
                var result = {};
                pairs.forEach(function(pair) {
                    pair = pair.split('=');
                    result[pair[0]] = decodeURIComponent(pair[1] || '');
                });
			var dbTemplates=[];
			var count=0;
			if(result.template){
				$scope.viewer = result.template;
				$http.get('/dashboard/templatedetails/'+$scope.viewer).success(function(data1){
					var l=0;
					var length=data1.length;
					console.log("DB MESSAGE"+length);
					getData(l, 3,data1,length);

                        getDataSecondHalf(3,6,data1,length);
getDataThirdHalf(6,9,data1,length);

				});
			}
			else {
				$scope.viewer = result.widgets;
				console.log("inside widgets before function");
				var splitString=$scope.viewer.split(",");
				var count=0;
				$scope.secondindex=0;
				getWidgets(0,splitString.length,splitString,count);
				console.log("chartOptions"+JSON.stringify($scope.chartOptions));
				console.log("secondchartOptions"+JSON.stringify($scope.chartOptionssecondHalf));
			}}catch(e){}
				console.log("inside loaddbdetails123"+$scope.viewer);
				console.log("inside loaddbdetails123"+$scope.viewer);
        }

		function getWidgets(index1, widgetsLength, widgetList,count) {
			console.log("inside index123"+index1,widgetsLength);
			$http.get('/dashboard/widgetlist/').success(function(data1){
                var l=0;
				var length=widgetsLength;
				for(index in widgetList){
				for(k in data1){
					if(data1[k].instance.Title==widgetList[index]){
						console.log("DB MESSAGE"+JSON.stringify(data1[k].instance)+JSON.stringify(widgetList));

						getDataWidgets(index,data1[k].instance);

                      //  getDataSecondHalfWidgets(index,data1[k].instance);
                        						//getDataThirdHalfWidgets(index,data1[k].instance);
					console.log("datacontroller"+data1[k].instance.ChartType);
                    }
				}
				}

			console.log("chartOptions"+JSON.stringify($scope.chartOptions));
			console.log("secondchartOptions"+JSON.stringify($scope.chartOptionssecondHalf));
			}).error(function(resp){
				console.log("error"+JSON.stringify(resp));
			});
		}

        function getDataWidgets(i,  templateList) {
			$http.get('/dashboard/chartdata/'+templateList.Title).success(function(resp){
			console.log("getData"+i,length,JSON.stringify(templateList));
			if(templateList.ChartType=="Bar"){
				var temp = angular.copy($scope.highchartsBar);
				temp.title['text']=templateList.Title;
				if(templateList.Controls=="Stacked")
					      temp.options.plotOptions.column['stacking']="normal";
				for(k in resp){
					var data=[];
					for(j in resp[k].values){
						console.log("resp label"+resp[k].values[j].label);
						if(temp.xAxis['categories'].length==0)
					    temp.xAxis['categories'].push(resp[k].values[j].label);
						else{
							var found=0;
							for( z in temp.xAxis['categories']){
								if(temp.xAxis['categories'][z]==resp[k].values[j].label)
								found=1;
								console.log("resp xAxis"+temp.xAxis['categories'][0]);

							}
						if(found==0)
							temp.xAxis['categories'].push(resp[k].values[j].label);
						}
						data.push(resp[k].values[j].value);
					}
				temp.series.push({"name":resp[k].key,"data":data});
				}
				$scope.chartOptions[i]=temp;
				console.log("chartoptions"+JSON.stringify($scope.chartOptions));
				temp=[];

			}

			else if(templateList.ChartType=="Pie"){
				console.log("inside pie");
				var temp = angular.copy($scope.highchartsPie);
				temp.title['text']=templateList.Title;
				var data=[];
				for(k in resp){
					data.push({"name":resp[k].Status,"y":resp[k].Count});
				}
				temp.series[0].data=angular.copy(data);
				$scope.chartOptions[i]=temp;
				console.log("chartoptions"+JSON.stringify($scope.chartOptions));
				temp=[];

			}
			else if(templateList.ChartType=="Doughnut"){
				console.log("inside Doughnut");
				var temp = angular.copy($scope.highchartsDonut);
				temp.title['text']=templateList.Title;
				var data=[];
				for(k in resp){
					data.push({"name":resp[k].Status,"y":resp[k].Count});
				}
				temp.series[0].data=angular.copy(data);
				$scope.chartOptions[i]=temp;
				console.log("chartoptions"+JSON.stringify($scope.chartOptions));
				temp=[];
			}

			else if(templateList.ChartType=="Line"){
				console.log("inside Line");
				var temp = angular.copy($scope.highchartsLine);
				temp.title['text']=templateList.Title;
				var data=[];
				for(k in resp){
				//	data.push({"type":"","name":resp[k].key,"data":resp[k].values});


				if(k==0 && templateList.Multi_Axis==true){
						 console.log("spline"+templateList.Multi_Axis);

						 data.push({"type":"spline","name":resp[k].key,"yAxis": 1,"data":resp[k].values});}
						 else{
						  //console.log("spline1");
												data.push({"type":"spline","name":resp[k].key,"data":resp[k].values});}


					//	temp.yAxis[0].opposite="false";

						// data.push({"type":"spline","name":resp[k].key,"yAxis": 1,"data":resp[k].values});}


				}
				temp.series=angular.copy(data);
				$scope.chartOptions[i]=temp;
				console.log("chartoptions"+JSON.stringify($scope.chartOptions));
				temp=[];
			}


			}).error(function(resp){
				$scope.dataSet[i] = [];
				console.log(JSON.stringify(resp)+"resperror"+templateList[i]);
			});


		}

		function getDataSecondHalfWidgets(i, templateList) {
			$http.get('/dashboard/chartdata/'+templateList.Title).success(function(resp) {
			console.log("getDatasecond"+i+length);
			if(templateList.ChartType=="Bar"){
			var temp = angular.copy($scope.highchartsBar);
			temp.title['text']=templateList.Title;
			if(templateList.Controls=="Stacked")
					      temp.options.plotOptions.column['stacking']="normal";
			for(k in resp){
				var data=[];
				for(j in resp[k].values){
					console.log("resp label"+resp[k].values[j].label);
					if(temp.xAxis['categories'].length==0)
					temp.xAxis['categories'].push(resp[k].values[j].label);
					else{
						var found=0;
						for( z in temp.xAxis['categories']){
							if(temp.xAxis['categories'][z]==resp[k].values[j].label)
								found=1;
								console.log("resp xAxis"+temp.xAxis['categories'][0]);
						}
						if(found==0)
							temp.xAxis['categories'].push(resp[k].values[j].label);
					}
						data.push(resp[k].values[j].value);
				}
					temp.series.push({"name":resp[k].key,"data":data});
			}
					$scope.chartOptions[i]=temp;
					console.log("chartoptions"+JSON.stringify($scope.chartOptions));
					temp=[];

			}

			else if(templateList.ChartType=="Pie"){
				console.log("inside pie");
				var temp = angular.copy($scope.highchartsPie);
				temp.title['text']=templateList.Title;
				var data=[];
				for(k in resp){
					data.push({"name":resp[k].Status,"y":resp[k].Count});
				}
				temp.series[0].data=angular.copy(data);
				$scope.chartOptions[i]=temp;
				console.log("chartoptions"+JSON.stringify($scope.chartOptions));
				temp=[];
			}

			else if(templateList.ChartType=="Doughnut"){
				console.log("inside Doughnut");
				var temp = angular.copy($scope.highchartsDonut);
				temp.title['text']=templateList.Title;
				var data=[];
				for(k in resp){
					data.push({"name":resp[k].Status,"y":resp[k].Count});
				}
				temp.series[0].data=angular.copy(data);
				$scope.chartOptions[i]=temp;
				console.log("chartoptions"+JSON.stringify($scope.chartOptions));
				temp=[];
			}

			else if(templateList.ChartType=="Line"){
				console.log("inside Line");
				var temp = angular.copy($scope.highchartsLine);
				temp.title['text']=templateList.Title;
				var data=[];
				for(k in resp){
					data.push({"type":"","name":resp[k].key,"data":resp[k].values});
				}
				temp.series=angular.copy(data);
				$scope.chartOptions[i]=temp;
				console.log("chartoptions"+JSON.stringify($scope.chartOptions));
				temp=[];
			}

			console.log(JSON.stringify(resp)+"respsecond"+templateList[i]+i);

			}).error(function(resp){
				$scope.dataSetSecondHalf[secondindex] = [];
				console.log(JSON.stringify(resp)+"resperror"+templateList[i]+i);

			});


		}

		$http.get('/alert/').success(function(data){
			var dataMessage = [];
			var dataType = [];
			var alertType = [];
			var dataval = [];
			var ack = []
			$scope.items = [];
			for(i in data){
				$scope.items.push({"message":data[i].Alert_Message,
							  "type":data[i].Alert_Type,
							  "alert_type":data[i].Service,
							  "value":data[i].Value,
							  "ack":data[i].Ack,
							  "alert_id":data[i].Alert_Id,
							  "facility_id":data[i].Facility_ID});
			};

			$scope.items.sort(function(itema, itemb){
                if(itema.type==itemb.type){
                return 0;
                }
                if(
					(itema.type=='Critical' && (itemb.type=='Medium' || itemb.type=='Low')) ||
                    (itema.type=='Medium' && (itemb.type=='Low') )
                     ){
						return -1;
                    }
                    else {
						return 1;
					}
            });

		console.log("ALERT2111",JSON.stringify($scope.items)) ;
		console.log("DATA--",JSON.stringify($scope.items));
		$scope.alertType = function(item,val,aid){
            console.log("FRAME",val,item,aid);
            var jsondata = {};
            jsondata.Alert_ID = aid;
            $http.post('/alert/true', jsondata).success(function(data){
                   console.log(" ACK SAVED");
            });
			// $window.location.href = "/#/"+item+"?orderid"+"="+val+"?facility_name"+"="+wid;
			$window.location.href = "/#/"+item+"?orderid"+"="+val;
			console.log("Service",$window.location.href);
			//$window.location.href = "/#/"+item+"?orderid="+val+"&facilityname="+wid;

		}

		$scope.sortedItems = function(count){
			return $scope.items.slice(0, count);
		}

		});

		$scope.loaddbdetailsTemp = function(){
			var dbTemplates=[];
			var count=0;
			$http.get('/dashboard/templatedetails/'+$routeParams.templateid).success(function(data1){
                var l=0;
				var length=data1.length;
				console.log("DB MESSAGE"+length);
				getData(l, 3,data1,length);

                getDataSecondHalf(3,6,data1,length);
			 getDataThirdHalf(6,9,data1,length);
			});
		}

			function getData(i, length,templateList,actualength) {

    if (i < length && i< actualength) {
      $http.get('/dashboard/chartdata/'+templateList[i].Title).success(function(resp) {
        $scope.dataSet[i] = resp;
		console.log(JSON.stringify(resp)+"resp"+JSON.stringify(templateList[i]));
		if(templateList[i].ChartType=="Bar"){
		var temp = angular.copy($scope.highchartsBar);

					   temp.title['text']=templateList[i].Title;
					   if(templateList[i].Controls=="Stacked")
					      temp.options.plotOptions.column['stacking']="normal";
					  for(k in resp){
					  var data=[];
					  for(j in resp[k].values){
					   console.log("resp label"+resp[k].values[j].label);
					   if(temp.xAxis['categories'].length==0)
					     temp.xAxis['categories'].push(resp[k].values[j].label);
					 else{
					   var found=0;
					   for( z in temp.xAxis['categories']){
					      if(temp.xAxis['categories'][z]==resp[k].values[j].label)
						     found=1;
					     console.log("resp xAxis"+temp.xAxis['categories'][0]);

						 }
						 if(found==0)
						   temp.xAxis['categories'].push(resp[k].values[j].label);
						 }

						 data.push(resp[k].values[j].value);



						 }

						 temp.series.push({"name":resp[k].key,"data":data});
					   }
					   $scope.chartOptions[i]=temp;
					 console.log("chartoptions"+JSON.stringify($scope.chartOptions));




					  temp=[];

		}

		else if(templateList[i].ChartType=="Pie"){
		console.log("inside pie");
		var temp = angular.copy($scope.highchartsPie);
					   temp.title['text']=templateList[i].Title;
					   var data=[];
					  for(k in resp){





						 data.push({"name":resp[k].Status,"y":resp[k].Count});
						 //bala
						console.log("HHHHHHHHHH"+resp[k].Status, temp.options.colors[k]);
						if(resp[k].Status == "Receiving") temp.options.colors[k] = "Green";
						if(resp[k].Status == "Error") temp.options.colors[k] = "Red";
						if(resp[k].Status == "Completed") temp.options.colors[k] = "Blue";
						if(resp[k].Status == "Inprogress") temp.options.colors[k] = "#FFC200";
						if(resp[k].Status == "Awaiting Dock") temp.options.colors[k] = "Orange";
						if(resp[k].Status == "Priority") temp.options.colors[k] = "Red";
						if(resp[k].Status == "Scheduled") temp.options.colors[k] = "#00FFFF";
						if(resp[k].Status == "Unloading") temp.options.colors[k] = "Yellow";
						if(resp[k].Status == "Released") temp.options.colors[k] = "#00FFFF";
						if(resp[k].Status == "Selected In Wave") temp.options.colors[k] = "#00FFFF";
						if(resp[k].Status == "Picked") temp.options.colors[k] = "#FFC200";
						if(resp[k].Status == "Packing") temp.options.colors[k] = "Orange";
						if(resp[k].Status == "Staging") temp.options.colors[k] = "Green";
						if(resp[k].Status == "Shipped") temp.options.colors[k] = "Blue";

						 }


						 temp.series[0].data=angular.copy(data);

					   $scope.chartOptions[i]=temp;
					 console.log("chartoptions"+JSON.stringify($scope.chartOptions));




					  temp=[];

		}



		else if(templateList[i].ChartType=="Doughnut"){
		console.log("inside Doughnut");
		var temp = angular.copy($scope.highchartsDonut);
					   temp.title['text']=templateList[i].Title;
					   var data=[];
					  for(k in resp){





						 data.push({"name":resp[k].Status,"y":resp[k].Count});
						 //bala
						console.log("HHHHHHHHHH"+resp[k].Status, temp.options.colors[k]);
						if(resp[k].Status == "Receiving") temp.options.colors[k] = "Green";
						if(resp[k].Status == "Error") temp.options.colors[k] = "Red";
						if(resp[k].Status == "Completed") temp.options.colors[k] = "Blue";
						if(resp[k].Status == "Inprogress") temp.options.colors[k] = "#FFC200";
						if(resp[k].Status == "Awaiting Dock") temp.options.colors[k] = "Orange";
						if(resp[k].Status == "Priority") temp.options.colors[k] = "Red";
						if(resp[k].Status == "Scheduled") temp.options.colors[k] = "#00FFFF";
						if(resp[k].Status == "Unloading") temp.options.colors[k] = "Yellow";
						if(resp[k].Status == "Released") temp.options.colors[k] = "#00FFFF";
						if(resp[k].Status == "Selected In Wave") temp.options.colors[k] = "#00FFFF";
						if(resp[k].Status == "Picked") temp.options.colors[k] = "#FFC200";
						if(resp[k].Status == "Packing") temp.options.colors[k] = "Orange";
						if(resp[k].Status == "Staging") temp.options.colors[k] = "Green";
						if(resp[k].Status == "Shipped") temp.options.colors[k] = "Blue";


						 }


						 temp.series[0].data=angular.copy(data);

					   $scope.chartOptions[i]=temp;
					 console.log("chartoptions"+JSON.stringify($scope.chartOptions));




					  temp=[];

		}

		else if(templateList[i].ChartType=="Line"){

		console.log("inside Line");
		var temp = angular.copy($scope.highchartsLine);
					   temp.title['text']=templateList[i].Title;
					   var data=[];
					  for(k in resp){

					 if(k==0 && templateList[i].Multi_Axis==true){
             //console.log("spline111"+templateList[i].Multi_Axis);
             temp.yAxis[0].opposite="true";
             data.push({"type":"spline","name":resp[k].key,"yAxis": 1,"data":resp[k].values});
             
             }
             else{
             
              temp.yAxis[1].opposite="false";
              
             data.push({"type":"spline","name":resp[k].key,"yAxis": 2,"data":resp[k].values});}


						//temp.yAxis[0].opposite="false";

						//data.push({"type":"spline","name":resp[k].key,"yAxis": 2,"data":resp[k].values});}

						 }



						// data.push({"type":"","name":resp[k].key,"data":resp[k].values});





						 temp.series=angular.copy(data);

					   $scope.chartOptions[i]=temp;
					 console.log("chartoptions"+JSON.stringify($scope.chartOptions));




					  temp=[];
		}

        ++i;

        getData(i, length, templateList,actualength);
      }).error(function(resp){
	    $scope.dataSet[i] = [];
		console.log(JSON.stringify(resp)+"resp"+templateList[i].Title);
        ++i;

        getData(i, length, templateList,actualength);

	  });

    }

 }


function getDataSecondHalf(i, length, templateList,actualength) {

    if (i < length && i<actualength) {
      $http.get('/dashboard/chartdata/'+templateList[i].Title).success(function(resp) {

        $scope.dataSetSecondHalf[$scope.index] = resp;
		console.log(JSON.stringify(resp)+"respsecond"+templateList[i].Title+$scope.index);


		if(templateList[i].ChartType=="Bar"){
		var temp = angular.copy($scope.highchartsBar);
					   temp.title['text']=templateList[i].Title;
					      if(templateList[i].Controls=="Stacked")
					      temp.options.plotOptions.column['stacking']="normal";

					  for(k in resp){
					  var data=[];
					  for(j in resp[k].values){
					   console.log("resp label"+resp[k].values[j].label);
					   if(temp.xAxis['categories'].length==0)
					     temp.xAxis['categories'].push(resp[k].values[j].label);
					 else{
					   var found=0;
					   for( z in temp.xAxis['categories']){
					      if(temp.xAxis['categories'][z]==resp[k].values[j].label)
						     found=1;
					     console.log("resp xAxis"+temp.xAxis['categories'][0]);

						 }
						 if(found==0)
						   temp.xAxis['categories'].push(resp[k].values[j].label);
						 }

						 data.push(resp[k].values[j].value);



						 }

						 temp.series.push({"name":resp[k].key,"data":data});
					   }
					   $scope.chartOptionssecondHalf[$scope.index]=temp;
					 console.log("chartOptionssecondHalf"+JSON.stringify($scope.chartOptionssecondHalf));




					  temp=[];

		}

		else if(templateList[i].ChartType=="Pie"){
		console.log("inside pie");
		var temp = angular.copy($scope.highchartsPie);
					   temp.title['text']=templateList[i].Title;
					   var data=[];
					  for(k in resp){





						 data.push({"name":resp[k].Status,"y":resp[k].Count});


						 }


						 temp.series[0].data=angular.copy(data);

					   $scope.chartOptionssecondHalf[$scope.index]=temp;
					 console.log("chartOptionssecondHalf"+JSON.stringify($scope.chartOptionssecondHalf));




					  temp=[];

		}



		else if(templateList[i].ChartType=="Doughnut"){
		console.log("inside Doughnut");
		var temp = angular.copy($scope.highchartsDonut);
					   temp.title['text']=templateList[i].Title;
					   var data=[];
					  for(k in resp){





						 data.push({"name":resp[k].Status,"y":resp[k].Count});


						 }


						 temp.series[0].data=angular.copy(data);

					   $scope.chartOptionssecondHalf[$scope.index]=temp;
					 console.log("chartOptionssecondHalf"+JSON.stringify($scope.chartOptionssecondHalf));




					  temp=[];

		}

		else if(templateList[i].ChartType=="Line"){

		console.log("inside Line");
		var temp = angular.copy($scope.highchartsLine);
					   temp.title['text']=templateList[i].Title;
					   var data=[];
					  for(k in resp){


					    if(k==0 && templateList[i].Multi_Axis==true){
             //console.log("spline111"+templateList[i].Multi_Axis);
             temp.yAxis[0].opposite="true";
             data.push({"type":"spline","name":resp[k].key,"yAxis": 1,"data":resp[k].values});
             
             }
             else{
             
              temp.yAxis[1].opposite="false";
              
             data.push({"type":"spline","name":resp[k].key,"yAxis": 2,"data":resp[k].values});}
						// data.push({"type":"spline","name":resp[k].key,"yAxis": 1,"data":resp[k].values});}

						 }


						 //data.push({"type":"","name":resp[k].key,"data":resp[k].values});





						 temp.series=angular.copy(data);

					   $scope.chartOptionssecondHalf[$scope.index]=temp;
					 console.log("chartOptionssecondHalf"+JSON.stringify($scope.chartOptionssecondHalf));




					  temp=[];
		}











        ++i;
		++$scope.index
        getDataSecondHalf(i, length, templateList,actualength);
      }).error(function(resp){
	  $scope.dataSetSecondHalf[$scope.index] = null;
		console.log(JSON.stringify(resp)+"resp"+templateList[i].Title+$scope.index);
        ++i;
		++$scope.index
        getDataSecondHalf(i, length, templateList,actualength);
	  });

    }
  }



  function getDataThirdHalf(i, length, templateList,actualength) {

    if (i < length && i < actualength) {
      $http.get('/dashboard/chartdata/'+templateList[i].Title).success(function(resp) {

        //$scope.dataSetThirdHalf[$scope.thirdindex] = resp;
		console.log(JSON.stringify(resp)+"respsecond"+templateList[i].Title+$scope.index);


		if(templateList[i].ChartType=="Bar"){
		var temp = angular.copy($scope.highchartsBar);
					   temp.title['text']=templateList[i].Title;
					      if(templateList[i].Controls=="Stacked")
					      temp.options.plotOptions.column['stacking']="normal";

					  for(k in resp){
					  var data=[];
					  for(j in resp[k].values){
					   console.log("resp label"+resp[k].values[j].label);
					   if(temp.xAxis['categories'].length==0)
					     temp.xAxis['categories'].push(resp[k].values[j].label);
					 else{
					   var found=0;
					   for( z in temp.xAxis['categories']){
					      if(temp.xAxis['categories'][z]==resp[k].values[j].label)
						     found=1;
					     console.log("resp xAxis"+temp.xAxis['categories'][0]);

						 }
						 if(found==0)
						   temp.xAxis['categories'].push(resp[k].values[j].label);
						 }

						 data.push(resp[k].values[j].value);



						 }

						 temp.series.push({"name":resp[k].key,"data":data});
					   }
					   $scope.chartOptionsThirdHalf[$scope.thirdindex]=temp;
					 console.log("chartOptionssecondHalf"+JSON.stringify($scope.chartOptionsThirdHalf));




					  temp=[];

		}

		else if(templateList[i].ChartType=="Pie"){
		console.log("inside pie");
		var temp = angular.copy($scope.highchartsPie);
					   temp.title['text']=templateList[i].Title;
					   var data=[];
					  for(k in resp){





						 data.push({"name":resp[k].Status,"y":resp[k].Count});


						 }


						 temp.series[0].data=angular.copy(data);

					   $scope.chartOptionsThirdHalf[$scope.thirdindex]=temp;
					 console.log("chartOptionssecondHalf"+JSON.stringify($scope.chartOptionssecondHalf));




					  temp=[];

		}



		else if(templateList[i].ChartType=="Doughnut"){
		console.log("inside Doughnut");
		var temp = angular.copy($scope.highchartsDonut);
					   temp.title['text']=templateList[i].Title;
					   var data=[];
					  for(k in resp){





						 data.push({"name":resp[k].Status,"y":resp[k].Count});


						 }


						 temp.series[0].data=angular.copy(data);

					   $scope.chartOptionsThirdHalf[$scope.thirdindex]=temp;
					 console.log("chartOptionssecondHalf"+JSON.stringify($scope.chartOptionssecondHalf));




					  temp=[];

		}

		else if(templateList[i].ChartType=="Line"){

		console.log("inside Line");
		var temp = angular.copy($scope.highchartsLine);
					   temp.title['text']=templateList[i].Title;
					   var data=[];
					  for(k in resp){


					  if(k==0 && templateList[i].Multi_Axis==true){
             //console.log("spline111"+templateList[i].Multi_Axis);
             temp.yAxis[0].opposite="true";
             data.push({"type":"spline","name":resp[k].key,"yAxis": 1,"data":resp[k].values});
             
             }
             else{
             
              temp.yAxis[1].opposite="false";
              
             data.push({"type":"spline","name":resp[k].key,"yAxis": 2,"data":resp[k].values});}
						 }


						 //data.push({"type":"","name":resp[k].key,"data":resp[k].values});





						 temp.series=angular.copy(data);

					   $scope.chartOptionsThirdHalf[$scope.thirdindex]=temp;
					 console.log("chartOptionssecondHalf"+JSON.stringify($scope.chartOptionssecondHalf));




					  temp=[];
		}











        ++i;
		++$scope.thirdindex
        getDataThirdHalf(i, length, templateList,actualength);
      }).error(function(resp){
	  //$scope.dataSetSecondHalf[$scope.index] = null;
		console.log(JSON.stringify(resp)+"resp"+templateList[i].Title+$scope.thirdindex);
        ++i;
		++$scope.thirdindex
        getDataThirdHalf(i, length, templateList,actualength);
	  });

    }
  }








	$scope.moveUp = function(){
			if($scope.singleSelect1 && $scope.singleSelect1.length==1){
				var index = $scope.singleSelectdata.indexOf($scope.singleSelect1[0]);
				var tomoveup, tomovedown;
					if(index>0){
						tomoveup = $scope.singleSelectdata[index];
						tomovedown = $scope.singleSelectdata[index-1];
						$scope.singleSelectdata[index] = tomovedown;
						$scope.singleSelectdata[index-1] = tomoveup;
					}
			}
		};

		$scope.moveDown = function(){
			if($scope.singleSelect1 && $scope.singleSelect1.length==1){
			var index = $scope.singleSelectdata.indexOf($scope.singleSelect1[0]);
			var tomoveup, tomovedown;
				if(index<$scope.singleSelectdata.length-1){
					tomoveup = $scope.singleSelectdata[index+1];
					tomovedown = $scope.singleSelectdata[index];
					$scope.singleSelectdata[index+1] = tomovedown;
					$scope.singleSelectdata[index] = tomoveup;
				}
			}

		};

		$scope.example13data = [];
        $scope.dbTemplates = [];
        $scope.singleSelectdata=[];
        $scope.devices = [
			{"name":"Desktop","width":1100,"height":600},
            {"name":"Nexus 5", "width": 386, "height": 600},
            {"name":"iPhone 5", "width": 350, "height": 600},
            {"name":"laptop", "width": 1000, "height": 600},
            {"name":"iPad", "width": 720, "height": 600}
        ];

		$scope.selectedDevice = $scope.devices[0];
        var loaddbdetails = function(){
			console.log("Inside loaddbdetails ");
        var example13data=[];
        $http.get('/dashboard/widgets/').success(function(data){
            for(i in data){
                example13data.push(data[i].instance.Title);
            };
        $scope.example13data = example13data;
        $scope.newtemplatename=null;
        });
        $http.get('/dashboard/templates/').success(function(data){
            var dbTemplates=[];
            for(i in data){
                dbTemplates.push(data[i].instance.templatename);
            };
            $scope.dbTemplates = dbTemplates;
        });
		}

        loaddbdetails();

        $scope.loadDBTemplate = function(){
            console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
            $http.get('/dashboard/templatedetails/'+$scope.seleted_db_template).success(function(data){
                var dbTemplates=[];
				console.log("SAVED TEMPLATE",dbTemplates);
                for(i in data){
                    dbTemplates.push(data[i].Title);
                };
                $scope.singleSelectdata = dbTemplates;
                $scope.origSingleSelectdata = angular.copy($scope.singleSelectdata);
				console.log("SCOPE",$scope.origSingleSelectdata)
                var example13data=[];
                $http.get('/dashboard/widgets/').success(function(data){
                    for(i in data){
                        example13data.push(data[i].instance.Title);
                    };
                    $scope.example13data = example13data;

                    var temp = $scope.singleSelectdata;
                    for (k in temp){
                        for(j in $scope.example13data){
                            if($scope.example13data[j]==temp[k]) $scope.example13data.splice(j,1);
                        };
                    };
                });
            });
        }

        $scope.firstButton = function(){
            console.log("button----->"+$scope.singleSelect);
			var temp= $scope.singleSelect;
            for (k in temp){
				if($scope.singleSelectdata != null)
                $scope.singleSelectdata.push(temp[k]);
				else
				$scope.singleSelectdata = 	$scope.singleSelect;
				console.log("select data",$scope.singleSelectdata);
			};
            var temp2=$scope.example13data;
                for (k in temp){
                    for(j in $scope.example13data){
                          if($scope.example13data[j]==temp[k]){
                          console.log("deleted exampledata"+$scope.example13data[j]);
                         // delete $scope.example13data[j];
                          $scope.example13data.splice(j, 1);

                          };
                          console.log("deleted ---"+temp[k]);
                    };
                };

                for (k in $scope.example13data){
                    console.log($scope.example13data);
                };
            $scope.singleSelect = "";
			$scope.origSingleSelectdata = angular.copy($scope.singleSelectdata);
        };

        $scope.secondButton = function() {
            console.log("button2----->"+$scope.singleSelect1);
            var temp= $scope.singleSelect1;
            for (k in temp){
                console.log(temp[k]+"----------push");
                $scope.example13data.push(temp[k]);
            }


            var temp2=$scope.singleSelectdata;
            for (k in temp){
                for(j in $scope.singleSelectdata){
                  if($scope.singleSelectdata[j]==temp[k]){
                  console.log("deleted exampledata"+$scope.singleSelectdata[j]);
                  $scope.singleSelectdata.splice(j, 1);
                  };

                  console.log("deleted ---"+temp[k]);
                };
            };

            for (k in $scope.singleSelectdata){
                    console.log(temp2[k]);
            };

            $scope.singleSelect1 = "";
				$scope.origSingleSelectdata = angular.copy($scope.singleSelectdata);
        };

        $scope.savedbtemplate = function(){
            var jsondata = {};
            jsondata.templatename = $scope.seleted_db_template;
           //jsondata.widgets = $scope.singleSelectdata + indexArray ;
			jsondata.widgets = $scope.singleSelectdata;
            //var indexArray = [];
			//for(var i=0,j=$scope.singleSelectdata.length;i<j;i++){
			//indexArray.push( $scope.origSingleSelectdata.indexOf($scope.singleSelectdata[i]));}
            $http.post('/dashboard/templatesave/', jsondata).success(function(data,header){
				   console.log("SAVE STATUS",header);
                   console.log("SAVED");
            });
			//console.log("JSON_____________",indexArray);
        }

        $scope.createdbtemplate = function(){

            console.log("inside createdbtemplate "+$scope.newtemplatename+" "+$scope.singleSelectdata);
            var jsondata = {};
            jsondata.templatename = $scope.newtemplatename;
            jsondata.widgets = $scope.singleSelectdata;

            $http.post('/dashboard/templatecreate/', jsondata).success(function(data){
				console.log("created");
				loaddbdetails();
				$scope.dashboardLinks.push($scope.newtemplatename);
            });
        }

        $scope.deletedbtemplate = function(){
			console.log("inside deletedbtemplate "+$scope.seleted_db_template);
            $http.delete('/dashboard/remove/'+ $scope.seleted_db_template).success(function(data){
                   console.log("deleted");
                   loaddbdetails();
            });
        }
		$scope.cleardata = function(){
            console.log("Inside Clear Data");
            loaddbdetails();
        } 
        $scope.newButton = function(){
         $route.reload();
        }

        $scope.exampleData = [
                {
                    key: "Damaged",
                    y: 5
                },
                {
                    key: "Delayed",
                    y: 2
                },
                {
                    key: "Not correct",
                    y: 9
                }
            ];

        $scope.xFunction = function(){
            return function(d) {
            return d.key;
            };
        }
        $scope.yFunction = function(){
			return function(d) {
            return d.y;
            };
        }

  $scope.firstslides = [

            {"label": [{
                    key: "Completed",
                    y: 5
                },
                {
                    key: "Error",
                    y: 2
                },
                {
                    key: "Docking",
                    y: 9
                },
                {
                    key: "Inprogress",
                    y: 9
                }
            ]},
            {"label": [{
                    key: "Completed",
                    y: 50
                },
                {
                    key: "Error",
                    y: 20
                },
                {
                    key: "Inprogress",
                    y: 30
                }
            ]},
            {"label": [{
                    key: "Completed",
                    y: 22
                },
                {
                    key: "Error",
                    y: 56
                },
                {
                    key: "InProgress",
                    y: 44
                }
            ]},
            {"label": [{
                    key: "Completed",
                    y: 52
                },
                {
                    key: "Error",
                    y: 16
                },
                {
                    key: "InProgress",
                    y: 45
                }
            ]},

  ];

  $scope.secondslides = [

            {"label": [{
                    key: "Completed",
                    y: 52
                },
                {
                    key: "Error",
                    y: 16
                },
                {
                    key: "InProgress",
                    y: 45
                }
            ]},
            {"label": [{
                    key: "Completed",
                    y: 50
                },
                {
                    key: "Error",
                    y: 22
                },
                {
                    key: "InProgress",
                    y: 54
                }
            ]},
            {"label": [{
                    key: "Completed",
                    y: 12
                },
                {
                    key: "Error",
                    y: 29
                },
                {
                    key: "InProgress",
                    y: 67
                }
            ]},
            {"label": [{
                    key: "Completed",
                    y: 55
                },
                {
                    key: "Error",
                    y: 23
                },
                {
                    key: "InProgress",
                    y: 99
                }
            ]},
            {"label": [{
                    key: "Completed",
                    y: 58
                },
                {
                    key: "Error",
                    y: 23
                },
                {
                    key: "InProgress",
                    y: 95
                }
            ]},
            {"label": [{
                    key: "Completed",
                    y: 55
                },
                {
                    key: "Error",
                    y: 23
                },
                {
                    key: "InProgress",
                    y: 99
                }
            ]},

  ];

  $scope.cummulativeData = [

               {"label": [ {key: "Out Of Stock Items",
                values: [ [ 1083297600000 , -2.974623048543] , [ 1085976000000 , -1.7740300785979] , [ 1088568000000 , 4.4681318138177] , [ 1091246400000 , 7.0242541001353] , [ 1093924800000 , 7.5709603667586] , [ 1096516800000 , 20.612245065736] , [ 1099195200000 , 21.698065237316] , [ 1101790800000 , 40.501189458018] , [ 1104469200000 , 50.464679413194] , [ 1107147600000 , 48.917421973355] , [ 1109566800000 , 63.750936549160] , [ 1112245200000 , 59.072499126460] , [ 1114833600000 , 43.373158880492] , [ 1117512000000 , 54.490918947556] , [ 1120104000000 , 56.661178852079] , [ 1122782400000 , 73.450103545496] , [ 1125460800000 , 71.714526354907] , [ 1128052800000 , 85.221664349607] , [ 1130734800000 , 77.769261392481] , [ 1133326800000 , 95.966528716500] , [ 1136005200000 , 107.59132116397] , [ 1138683600000 , 127.25740096723] , [ 1141102800000 , 122.13917498830] , [ 1143781200000 , 126.53657279774] , [ 1146369600000 , 132.39300992970] , [ 1149048000000 , 120.11238242904] , [ 1151640000000 , 118.41408917750] , [ 1154318400000 , 107.92918924621] , [ 1156996800000 , 110.28057249569] , [ 1159588800000 , 117.20485334692] , [ 1162270800000 , 141.33556756948] , [ 1164862800000 , 159.59452727893] , [ 1167541200000 , 167.09801853304] , [ 1170219600000 , 185.46849659215] , [ 1172638800000 , 184.82474099990] , [ 1175313600000 , 195.63155213887] , [ 1177905600000 , 207.40597044171] , [ 1180584000000 , 230.55966698196] , [ 1183176000000 , 239.55649035292] , [ 1185854400000 , 241.35915085208] , [ 1188532800000 , 239.89428956243] , [ 1191124800000 , 260.47781917715] , [ 1193803200000 , 276.39457482225] , [ 1196398800000 , 258.66530682672] , [ 1199077200000 , 250.98846121893] , [ 1201755600000 , 226.89902618127] , [ 1204261200000 , 227.29009273807] , [ 1206936000000 , 218.66476654350] , [ 1209528000000 , 232.46605902918] , [ 1212206400000 , 253.25667081117] , [ 1214798400000 , 235.82505363925] , [ 1217476800000 , 229.70112774254] , [ 1220155200000 , 225.18472705952] , [ 1222747200000 , 189.13661746552] , [ 1225425600000 , 149.46533007301] , [ 1228021200000 , 131.00340772114] , [ 1230699600000 , 135.18341728866] , [ 1233378000000 , 109.15296887173] , [ 1235797200000 , 84.614772549760] , [ 1238472000000 , 100.60810015326] , [ 1241064000000 , 141.50134895610] , [ 1243742400000 , 142.50405083675] , [ 1246334400000 , 139.81192372672] , [ 1249012800000 , 177.78205544583] , [ 1251691200000 , 194.73691933074] , [ 1254283200000 , 209.00838460225] , [ 1256961600000 , 198.19855877420] , [ 1259557200000 , 222.37102417812] , [ 1262235600000 , 234.24581081250] , [ 1264914000000 , 228.26087689346] , [ 1267333200000 , 248.81895126250] , [ 1270008000000 , 270.57301075186] , [ 1272600000000 , 292.64604322550] , [ 1275278400000 , 265.94088520518] , [ 1277870400000 , 237.82887467569] , [ 1280548800000 , 265.55973314204] , [ 1283227200000 , 248.30877330928] , [ 1285819200000 , 278.14870066912] , [ 1288497600000 , 292.69260960288] , [ 1291093200000 , 300.84263809599] , [ 1293771600000 , 326.17253914628] , [ 1296450000000 , 337.69335966505] , [ 1298869200000 , 339.73260965121] , [ 1301544000000 , 346.87865120765] , [ 1304136000000 , 347.92991526628] , [ 1306814400000 , 342.04627502669] , [ 1309406400000 , 333.45386231233] , [ 1312084800000 , 323.15034181243] , [ 1314763200000 , 295.66126882331] , [ 1317355200000 , 251.48014579253] , [ 1320033600000 , 295.15424257905] , [ 1322629200000 , 294.54766764397] , [ 1325307600000 , 295.72906119051] , [ 1327986000000 , 325.73351347613] , [ 1330491600000 , 340.16106061186] , [ 1333166400000 , 345.15514071490] , [ 1335758400000 , 337.10259395679] , [ 1338436800000 , 318.68216333837] , [ 1341028800000 , 317.03683945246] , [ 1343707200000 , 318.53549659997] , [ 1346385600000 , 332.85381464104] , [ 1348977600000 , 337.36534373477] , [ 1351656000000 , 350.27872156161] , [ 1354251600000 , 349.45128876100]]
                ,
                mean: 250
            }]},
             {"label": [{
                key: "Out Of Stock Items",
                values: [ [ 1083297600000 , -2.974623048543] , [ 1085976000000 , -1.7740300785979] , [ 1088568000000 , 4.4681318138177] , [ 1091246400000 , 7.0242541001353] , [ 1093924800000 , 7.5709603667586] , [ 1096516800000 , 20.612245065736] , [ 1099195200000 , 21.698065237316] , [ 1101790800000 , 40.501189458018] , [ 1104469200000 , 50.464679413194] , [ 1107147600000 , 48.917421973355] , [ 1109566800000 , 63.750936549160] , [ 1112245200000 , 59.072499126460] , [ 1114833600000 , 43.373158880492] , [ 1117512000000 , 54.490918947556] , [ 1120104000000 , 56.661178852079] , [ 1122782400000 , 73.450103545496] , [ 1125460800000 , 71.714526354907] , [ 1128052800000 , 85.221664349607] , [ 1130734800000 , 77.769261392481] , [ 1133326800000 , 95.966528716500] , [ 1136005200000 , 107.59132116397] , [ 1138683600000 , 127.25740096723] , [ 1141102800000 , 122.13917498830] , [ 1143781200000 , 126.53657279774] , [ 1146369600000 , 132.39300992970] , [ 1149048000000 , 120.11238242904] , [ 1151640000000 , 118.41408917750] , [ 1154318400000 , 107.92918924621] , [ 1156996800000 , 110.28057249569] , [ 1159588800000 , 117.20485334692] , [ 1162270800000 , 141.33556756948] , [ 1164862800000 , 159.59452727893] , [ 1167541200000 , 167.09801853304] , [ 1170219600000 , 185.46849659215] , [ 1172638800000 , 184.82474099990] , [ 1175313600000 , 195.63155213887] , [ 1177905600000 , 207.40597044171] , [ 1180584000000 , 230.55966698196] , [ 1183176000000 , 239.55649035292] , [ 1185854400000 , 241.35915085208] , [ 1188532800000 , 239.89428956243] , [ 1191124800000 , 260.47781917715] , [ 1193803200000 , 276.39457482225] , [ 1196398800000 , 258.66530682672] , [ 1199077200000 , 250.98846121893] , [ 1201755600000 , 226.89902618127] , [ 1204261200000 , 227.29009273807] , [ 1206936000000 , 218.66476654350] , [ 1209528000000 , 232.46605902918] , [ 1212206400000 , 253.25667081117] , [ 1214798400000 , 235.82505363925] , [ 1217476800000 , 229.70112774254] , [ 1220155200000 , 225.18472705952] , [ 1222747200000 , 189.13661746552] , [ 1225425600000 , 149.46533007301] , [ 1228021200000 , 131.00340772114] , [ 1230699600000 , 135.18341728866] , [ 1233378000000 , 109.15296887173] , [ 1235797200000 , 84.614772549760] , [ 1238472000000 , 100.60810015326] , [ 1241064000000 , 141.50134895610] , [ 1243742400000 , 142.50405083675] , [ 1246334400000 , 139.81192372672] , [ 1249012800000 , 177.78205544583] , [ 1251691200000 , 194.73691933074] , [ 1254283200000 , 209.00838460225] , [ 1256961600000 , 198.19855877420] , [ 1259557200000 , 222.37102417812] , [ 1262235600000 , 234.24581081250] , [ 1264914000000 , 228.26087689346] , [ 1267333200000 , 248.81895126250] , [ 1270008000000 , 270.57301075186] , [ 1272600000000 , 292.64604322550] , [ 1275278400000 , 265.94088520518] , [ 1277870400000 , 237.82887467569] , [ 1280548800000 , 265.55973314204] , [ 1283227200000 , 248.30877330928] , [ 1285819200000 , 278.14870066912] , [ 1288497600000 , 292.69260960288] , [ 1291093200000 , 300.84263809599] , [ 1293771600000 , 326.17253914628] , [ 1296450000000 , 337.69335966505] , [ 1298869200000 , 339.73260965121] , [ 1301544000000 , 346.87865120765] , [ 1304136000000 , 347.92991526628] , [ 1306814400000 , 342.04627502669] , [ 1309406400000 , 333.45386231233] , [ 1312084800000 , 323.15034181243] , [ 1314763200000 , 295.66126882331] , [ 1317355200000 , 251.48014579253] , [ 1320033600000 , 295.15424257905] , [ 1322629200000 , 294.54766764397] , [ 1325307600000 , 295.72906119051] , [ 1327986000000 , 325.73351347613] , [ 1330491600000 , 340.16106061186] , [ 1333166400000 , 345.15514071490] , [ 1335758400000 , 337.10259395679] , [ 1338436800000 , 318.68216333837] , [ 1341028800000 , 317.03683945246] , [ 1343707200000 , 318.53549659997] , [ 1346385600000 , 332.85381464104] , [ 1348977600000 , 337.36534373477] , [ 1351656000000 , 350.27872156161] , [ 1354251600000 , 349.45128876100]]
                ,
                mean: 300
            }]}

     ];

  $scope.xAxisTickFormatFunction = function(){
         return function(d)
             {
                return d3.time.format('%b')(new Date(d))

                };

     }

		$scope.yAxisTickFormatFunction = function(){
			return function(d)
				{
					return d3.format(',.1%')(d);

                };
     }
		$scope.averageCummulative = function(){
			return function(d) { return d.mean/100; };

		}

		$scope.xCummulativeFunction = function(){
				return function(d){ return d[0]; };
            }
        $scope.yCummulativeFunction = function(){
                return function(d){ return d[1]/100; };
            }

		$scope.xAxisTickFormatAreaChart=function(){
			return function(d){
			return d3.time.format('%x')(new Date(d));};
		}

		$scope.yAxisTickFormatAreaChart=function(){
			return function(d){
			return d3.format(',.2f')(d);};
		}

		$scope.xAreaFunction = function(){
				return function(d){return d[0];}
            }
        $scope.yAreaFunction = function(){
                return function(d){return d[1];}
            }

		$scope.areachart=[
			{
                "key" : "North America" ,
                "values" : [ [ 1025409600000 , 23.041422681023] , [ 1028088000000 , 19.854291255832] , [ 1030766400000 , 21.02286281168] , [ 1033358400000 , 22.093608385173] , [ 1036040400000 , 25.108079299458] , [ 1038632400000 , 26.982389242348] , [ 1041310800000 , 19.828984957662] , [ 1043989200000 , 19.914055036294] , [ 1046408400000 , 19.436150539916] , [ 1049086800000 , 21.558650338602] , [ 1051675200000 , 24.395594061773] , [ 1054353600000 , 24.747089309384] , [ 1056945600000 , 23.491755498807] , [ 1059624000000 , 23.376634878164] , [ 1062302400000 , 24.581223154533] , [ 1064894400000 , 24.922476843538] , [ 1067576400000 , 27.357712939042] , [ 1070168400000 , 26.503020572593] , [ 1072846800000 , 26.658901244878] , [ 1075525200000 , 27.065704156445] , [ 1078030800000 , 28.735320452588] , [ 1080709200000 , 31.572277846319] , [ 1083297600000 , 30.932161503638] , [ 1085976000000 , 31.627029785554] , [ 1088568000000 , 28.728743674232] , [ 1091246400000 , 26.858365172675] , [ 1093924800000 , 27.279922830032] , [ 1096516800000 , 34.408301211324] , [ 1099195200000 , 34.794362930439] , [ 1101790800000 , 35.609978198951] , [ 1104469200000 , 33.574394968037] , [ 1107147600000 , 31.979405070598] , [ 1109566800000 , 31.19009040297] , [ 1112245200000 , 31.083933968994] , [ 1114833600000 , 29.668971113185] , [ 1117512000000 , 31.490638014379] , [ 1120104000000 , 31.818617451128] , [ 1122782400000 , 32.960314008183] , [ 1125460800000 , 31.313383196209] , [ 1128052800000 , 33.125486081852] , [ 1130734800000 , 32.791805509149] , [ 1133326800000 , 33.506038030366] , [ 1136005200000 , 26.96501697216] , [ 1138683600000 , 27.38478809681] , [ 1141102800000 , 27.371377218209] , [ 1143781200000 , 26.309915460827] , [ 1146369600000 , 26.425199957518] , [ 1149048000000 , 26.823411519396] , [ 1151640000000 , 23.850443591587] , [ 1154318400000 , 23.158355444054] , [ 1156996800000 , 22.998689393695] , [ 1159588800000 , 27.9771285113] , [ 1162270800000 , 29.073672469719] , [ 1164862800000 , 28.587640408904] , [ 1167541200000 , 22.788453687637] , [ 1170219600000 , 22.429199073597] , [ 1172638800000 , 22.324103271052] , [ 1175313600000 , 17.558388444187] , [ 1177905600000 , 16.769518096208] , [ 1180584000000 , 16.214738201301] , [ 1183176000000 , 18.729632971229] , [ 1185854400000 , 18.814523318847] , [ 1188532800000 , 19.789986451358] , [ 1191124800000 , 17.070049054933] , [ 1193803200000 , 16.121349575716] , [ 1196398800000 , 15.141659430091] , [ 1199077200000 , 17.175388025297] , [ 1201755600000 , 17.286592443522] , [ 1204261200000 , 16.323141626568] , [ 1206936000000 , 19.231263773952] , [ 1209528000000 , 18.446256391095] , [ 1212206400000 , 17.822632399764] , [ 1214798400000 , 15.53936647598] , [ 1217476800000 , 15.255131790217] , [ 1220155200000 , 15.660963922592] , [ 1222747200000 , 13.254482273698] , [ 1225425600000 , 11.920796202299] , [ 1228021200000 , 12.122809090924] , [ 1230699600000 , 15.691026271393] , [ 1233378000000 , 14.720881635107] , [ 1235797200000 , 15.387939360044] , [ 1238472000000 , 13.765436672228] , [ 1241064000000 , 14.631445864799] , [ 1243742400000 , 14.292446536221] , [ 1246334400000 , 16.170071367017] , [ 1249012800000 , 15.948135554337] , [ 1251691200000 , 16.612872685134] , [ 1254283200000 , 18.778338719091] , [ 1256961600000 , 16.756026065421] , [ 1259557200000 , 19.385804443146] , [ 1262235600000 , 22.950590240168] , [ 1264914000000 , 23.61159018141] , [ 1267333200000 , 25.708586989581] , [ 1270008000000 , 26.883915999885] , [ 1272600000000 , 25.893486687065] , [ 1275278400000 , 24.678914263176] , [ 1277870400000 , 25.937275793024] , [ 1280548800000 , 29.461381693838] , [ 1283227200000 , 27.357322961861] , [ 1285819200000 , 29.057235285673] , [ 1288497600000 , 28.549434189386] , [ 1291093200000 , 28.506352379724] , [ 1293771600000 , 29.449241421598] , [ 1296450000000 , 25.796838168807] , [ 1298869200000 , 28.740145449188] , [ 1301544000000 , 22.091744141872] , [ 1304136000000 , 25.07966254541] , [ 1306814400000 , 23.674906973064] , [ 1309406400000 , 23.418002742929] , [ 1312084800000 , 23.24364413887] , [ 1314763200000 , 31.591854066817] , [ 1317355200000 , 31.497112374114] , [ 1320033600000 , 26.67238082043] , [ 1322629200000 , 27.297080015495] , [ 1325307600000 , 20.174315530051] , [ 1327986000000 , 19.631084213898] , [ 1330491600000 , 20.366462219461] , [ 1333166400000 , 19.284784434185] , [ 1335758400000 , 19.157810257624]]
            }
		];

		$scope.donutFunction = function(){
		console.log("donut");
		console.log($scope.index+"-----------------------index");
            if (index==0)
                return "false";
                else
                return "true";
            console.log(index+"-----------------------index");
        };

		$scope.pieoptions = {
            chart: {
                type: 'pieChart',
                title: true,

                height: 200,
                width: 400,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
               pieLabelsOutside: true,
               pie: {
               growOnHover: true
               },

               showLegend: false,
               labelSunbeamLayout: true,
               tooltips: false,
            margin: {left:30,top:0,botttom:0,right:100}

            },
            title: {
                enable: true,
                text: 'ASN Status',
                css:
                {
                color: '#A94442',
                fontWeight: 'bold'

                }
                }
        };


         $scope.donutoptions = {
            chart: {
                type: 'pieChart',
                title: true,

                height: 200,
                width: 400,
                x: function(d){return d.key;},
                y: function(d){return d.y;},
                showLabels: true,
               pieLabelsOutside: true,
               pie: {
               growOnHover: true
               },
               donut: true,
            donutRatio: 0.25,
            noData: 'Data aint here',
            donutLabelsOutside: 'true',
               showLegend: false,
               labelSunbeamLayout: true,
               tooltips: false,
            margin: {left:30,top:0,botttom:0,right:100}

            },
            title: {
                enable: true,
                text: 'ASN Status',
                css:
                {
                color: '#A94442',
                fontWeight: 'bold'

                }
                }
        };

		$scope.cummulativeoptions = {
            chart: {
                type: 'cumulativeLineChart',
                height:300,
				width:400,
                margin : {
                    top: 50,
                    right: 0,
                    bottom: 20,
                    left: 40
                },
                x: function(d){ return d[0]; },
                y: function(d){ console.log("yaxis-"+d[1]*100);return d[1]/100; },
                average: function(d) { return d.mean/100; },
                tooltips: false,
            axisLabelDistance: 50,
            showControls: false,
                staggerLabels: true,
            showXAxis: true,
            showYAxis: true,
            color: ['chocolate','cornflowerblue','crimson','darkorchid'],


            showLegend: false,
                title: true,
                duration: 300,
                useInteractiveGuideline: true,
                clipVoronoi: false,

                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
								return d;

                    },
                    showMaxMin: false,
                    staggerLabels: false
                },

                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format(',.1%')(d)
                    },

                }
            },
            title: {
                enable: true,
                text: 'ASN Status',
                css:
                {
                color: 'midnightblue',
                fontWeight: 'bold'

                }
                }
        };

		 $scope.cummulativeoptions1 = {
            chart: {
                type: 'cumulativeLineChart',


                x: function(d){ return d[0]; },
                y: function(d){ console.log("yaxis-"+d[1]*100);return d[1]/100; },
                average: function(d) { return d.mean/100; },

            axisLabelDistance: 50,
            tooltips: false,
			showControls: false,
                staggerLabels: true,
            showXAxis: true,
            showYAxis: true,
            color: ['chocolate','cornflowerblue','crimson','darkorchid'],


            showLegend: false,
                title: true,
                duration: 300,
                useInteractiveGuideline: true,
                clipVoronoi: false,

                xAxis: {
                    axisLabel: 'X Axis',
                    tickFormat: function(d) {
					   return d;
                    },
                    showMaxMin: false,
                    staggerLabels: false
                },

                yAxis: {
                    axisLabel: 'Y Axis',
                    tickFormat: function(d){
                        return d3.format(',.1%')(d)
                    },

                }
            },
            title: {
                enable: true,
                text: 'ASN Status',
                css:
                {
                color: 'midnightblue',
                fontWeight: 'bold'

                }
                }
        };




         $scope.piedata = [
            {
                key: "One",
                y: 5
            },
            {
                key: "Two",
                y: 2
            },
            {
                key: "Three",
                y: 9
            },
            {
                key: "Four",
                y: 7
            },
            {
                key: "Five",
                y: 4
            },
            {
                key: "Six",
                y: 3
            },
            {
                key: "Seven",
                y: .5
            }
        ];
		$scope.options = {
            chart: {
                type: 'sparklinePlus',
                title: true,
                height: 200,
                id:'label23',

                x: function(d, i){return i;},
                xTickFormat: function(d) {
                    return d3.time.format('%x')(new Date($scope.data[d].x))
                },
                duration: 250
            },
            title: {
                enable: true,
                text: 'ASN Status',
                css:
                {
                color: '#A94442',
                fontWeight: 'bold'

                }
                }

        };

        $scope.data = volatileChart(130.0, 0.02);
        function sine() {
            var sin = [];
            var now =+new Date();

            for (var i = 0; i < 100; i++) {
                sin.push({x: now + i * 1000 * 60 * 60 * 24, y: Math.sin(i/10)});
            }

            return sin;
        }

        function volatileChart(startPrice, volatility, numPoints) {
            var rval =  [];
            var now =+new Date();
            numPoints = numPoints || 100;
            for(var i = 1; i < numPoints; i++) {

                rval.push({x: now + i * 1000 * 60 * 60 * 24, y: startPrice});
                var rnd = Math.random();
                var changePct = 2 * volatility * rnd;
                if ( changePct > volatility) {
                    changePct -= (2*volatility);
                }
                startPrice = startPrice + startPrice * changePct;
            }
            return rval;
        }


		$('.carousel[data-type="multi"] .item').each(function(){
			var next = $(this).next();
			if (!next.length) {
			next = $(this).siblings(':first');
			}
			next.children(':first-child').clone().appendTo($(this));

			for (var i=0;i<2;i++) {
			next=next.next();
			if (!next.length) {
			next = $(this).siblings(':first');
			}

			next.children(':first-child').clone().appendTo($(this));
			}
		});

		}

function OrderLineController($scope, $timeout, $http, $window,Warehouseservices) {
		$scope.loadOrderLines = function (){
			console.log("Inside loadOrderLines ...");
			$scope.salesorderitem = Warehouseservices.retrieve_item_rows();
			console.log("order lines "+$scope.salesorderitem);
		}
		$scope.loadOrderLines();
}

function DashboardViewerController($scope, $timeout, $http, $window,Warehouseservices){
		$scope.viewer = '';
		try{
		$scope.viewer = $window.location.search.replace("?", '').split("&")[0].split("=")[1].split(",");
		}catch(e){}
}

function AlertController($scope,$window,Warehouseservices,$http){

	$http.get('/warehouse/names').success(function(data) {
            $scope.warehousemaster = data;
            $scope.facilities =[];
            for (item in data){
                var wh_id_name = data[item].instance.Warehouse_ID + "-"+data[item].instance.Warehouse_Name;
                 $scope.facilities.push(wh_id_name);
            };
            console.log($scope.facilities);
    });

    $scope.complete1=function(){
        $scope.facilityname = $('#facility_name').val();
        $( "#facility_name" ).autocomplete({
          source: $scope.facilities,
		  select: function (event, ui) {
                $scope.facilityname = ui.item.value;
				console.log("facilityname"+$scope.facilityname);
            }
        });
    };
	$scope.alertdata = {
            alertOptions: [
              {id:1 , name: 'Critical'},
              {id:2 , name: 'Medium'},
              {id:3 , name: 'Low'}

            ]
         };
	$scope.alertstatus = {
            alertStatusOptions: [
              {id:1 , name: 'Sales Order'},
              {id:2 , name: 'Inventory'},
              {id:3 , name: 'PO'},
			  {id:4,name: 'ASN'},
			  {id:5,name:'Picking'},
			  {id:6,name:'DOC Scheduling'},
			  {id:7,name:'Putaway'},
			  {id:8,name:'Receiving'},
			  {id:9,name:'Shipping'},
			  {id:10,name:'Packing'},
			  {id:11,name:'VAS'}

            ]
         };

		var ackarray=[];
		$scope.ackpush = function(){

			ackarray.push($scope.alertcheck);
		}
		console.log("ACKARRAY",ackarray);

        /*$scope.alertAck = function(){
            var jsondata = {};

            for(var i=0, j=$scope.alertitems.length;i<j;i++){
                if($scope.alertitems[i].alertcheck == 'YES'){
                    jsondata = {"Alert_ID":$scope.alertitems[i].Alert_Id};
					console.log("ACK JSON",jsondata);

                    $http.post('/alert/true', jsondata).success(function(data,header){
                           console.log(" ACK SAVED- A&N");
						   console.log("Header",header);
                    }).error(function(data,header){
						console.log("Header error",header);
					});
                }

            }

        }*/
		$scope.alertAck = function(){
            var jsondata = {};


            var updateTimeout = null;
            function updateAlerts(){
                $scope.getAlertsData(null);
            }

            for(var i=0, j=$scope.alertitems.length;i<j;i++){
                if($scope.alertitems[i].alertcheck == 'YES'){
                    jsondata = {"Alert_ID":$scope.alertitems[i].Alert_Id};
					console.log("ACK JSON",jsondata);
                    $http.post('/alert/true', jsondata).success(function(data,header){
                           console.log(" ACK SAVED- A&N");
					console.log("Header",header);
                           if(updateTimeout) { clearTimeout(updateTimeout); }
                           updateTimeout = setTimeout(updateAlerts, 1000);
                    }).error(function(data,header){
					console.log("Header error",header);
                           if(updateTimeout) { clearTimeout(updateTimeout); }
                           updateTimeout = setTimeout(updateAlerts, 1000);
});
                }

            }
}

		$scope.alertType = function(item,val){
			$window.location.href = "/#/"+item+"?orderid"+"="+val;
			console.log("Service",$window.location.href);
		}

		$scope.showalert = function(ack){
			if(ack == "true"){
				return false;
			}
				return true;

		}

		$scope.getAlertsData = function(evnt){
			if(evnt == null || evnt.keyCode==9){
			var facility_name = $scope.facilityname;  if (facility_name == "") facility_name=null;
			if (facility_name!=null) facility_name=facility_name.substring(0,5);
			var alert_id = $scope.alertid;if (alert_id == "") alert_id=null;
			var alert_type = $scope.alertSelect;
			var filter_option = $scope.singleSelect;
			var value = $scope.filtervalue; if(value =="") value=null;
			var func = $scope.alertStatus;

			if(facility_name==undefined && alert_id==undefined && alert_type==undefined && filter_option==undefined
			&& value==undefined &&func==undefined ){
            $scope.alertFilterFormEmpty = true;
			console.log("Filter form needs to be filled")
            return;
			}
			else {
				$scope.alertFilterFormEmpty = false;
			}
			console.log("URL "+'/alert/'+facility_name+'/'+func+'/'+alert_id+'/'+alert_type);
			$http.get('/alert/'+facility_name+'/'+func+'/'+alert_id+'/'+alert_type).success(function(data) {
         	$scope.alertitems=data;
			console.log("DATA ALERT"+JSON.stringify(data));
		});
    };

	}
}
