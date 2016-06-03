
var directives = angular.module('directives', ['nvd3ChartDirectives']);
directives.directive('slickSlider',function($timeout){
	 return {
	   restrict: 'A',
	   link: function(scope,element,attrs) {
	     $timeout(function() {
	    	 var slicked;	        	         
	         scope.$watch("searchPaginator.currentPageItems",function(newVal,OldVal){
	        	 if (slicked)
	        	 {
	        		 $(element).unslick();
	        		 $(element).slick(scope.$eval(attrs.slickSlider));
	        	 }
	        	 else{
	        		 $(element).slick(scope.$eval(attrs.slickSlider));
	        	 }
	        	 slicked=true;
		     });
	         scope.$watch("gridView",function(newVal,OldVal){
	        	 if (slicked)
	        	 {
	        		 $(element).unslick();
	        		 $(element).slick(scope.$eval(attrs.slickSlider));
	        	 }
	        	 slicked=true;
		     });
	     },100);
	   }
	 }
	}); 
directives.directive('showtab',
	    function () {
	        return {
	            link: function (scope, element, attrs) {
	                element.click(function(e) {
	                    e.preventDefault();
	                    $(element).tab('show');
	                });
	            }
	        };
	    });
