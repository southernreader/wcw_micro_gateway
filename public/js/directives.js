
var directives = angular.module('directives', ['ui.bootstrap','nvd3ChartDirectives']);
directives.directive('modalDialog', function() {
  return {
    restrict: 'E',
    scope: {
      show: '='
    },
    replace: true, // Replace with the template below
    transclude: true, // we want to insert custom content inside the directive
    link: function(scope, element, attrs) {
      scope.dialogStyle = {};
      if (attrs.width)
        scope.dialogStyle.width = attrs.width;
      if (attrs.height)
        scope.dialogStyle.height = attrs.height;
      scope.hideModal = function() {
        scope.show = false;
      };
    },
    template: '...' // See below
  };
});


/*directives.directive('scrollDiv', function ($document) {
        return {
            restrict: 'A',
            link: function (scope, elm, attrs) {
                elm.bind("click", function (event) {
					 $("#scroll-section").animate({scrollTop: $("#"+attrs.scrollid).position().top+10}, 400, 'swing');
                    });
                }
            };
});

directives.directive('scrollminiDiv', function ($document) {
    return {
        restrict: 'A',
        link: function (scope, elm, attrs) {
            elm.bind("click", function (event) {
				 $("#scrollmini-section").animate({scrollTop: $("#"+attrs.scrollid).position().top+10}, 400, 'swing');
                });
            }
        };
});

/*directives.directive('bsDropdown', function ($compile) {
    return {
        restrict: 'E',
        scope: {
            items: '=dropdownData',
            doSelect: '&selectVal',
            selectedItem: '=preselectedItem'
        },
        link: function (scope, element, attrs) {
            var html = '';
            switch (attrs.menuType) {
                case "button":
                    html += '<div class="btn-group"><button class="btn button-label btn-info">SelectFromButton</button><button class="btn btn-info dropdown-toggle" data-toggle="dropdown"><span class="caret"></span></button>';
                    break;
                default:
                    html += '<div class="dropdown"><a class="dropdown-toggle" role="button" data-toggle="dropdown"  href="javascript:;">Dropdown<b class="caret"></b></a>';
                    break;
            }
            html += '<ul class="dropdown-menu"><li ng-repeat="item in items"><a tabindex="-1" data-ng-click="selectVal(item)">{{item.name}}</a></li></ul></div>';
            element.append($compile(html)(scope));
            for (var i = 0; i < scope.items.length; i++) {
                if (scope.items[i].id === scope.selectedItem) {
                    scope.bSelectedItem = scope.items[i];
                    break;
                }
            }
            scope.selectVal = function (item) {
                switch (attrs.menuType) {
                    case "button":
                        $('button.button-label', element).html(item.name);
                        break;
                    default:
                        $('a.dropdown-toggle', element).html('<b class="caret"></b> ' + item.name);
                        break;
                }
                scope.doSelect({
                    selectedVal: item.id
                });
            };
            scope.selectVal(scope.bSelectedItem);
        }
    };
});
*/

directives.directive('ngMouseWheelUp', function() {
        return function(scope, element, attrs) {
            element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {
                   
                        // cross-browser wheel delta
                        var event = window.event || event; // old IE support
                        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
                
                        if(delta > 0) {
                            scope.$apply(function(){
                                scope.$eval(attrs.ngMouseWheelUp);
                            });
                        
                            // for IE
                            event.returnValue = false;
                            // for Chrome and Firefox
                            if(event.preventDefault) {
                                event.preventDefault();                        
                            }

                        }
            });
        };
});

directives.directive('ngMouseWheelDown', function() {
        return function(scope, element, attrs) {
            element.bind("DOMMouseScroll mousewheel onmousewheel", function(event) {
                   
                        // cross-browser wheel delta
                        var event = window.event || event; // old IE support
                        var delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
                
                        if(delta < 0) {
                            scope.$apply(function(){
                                scope.$eval(attrs.ngMouseWheelDown);
                            });
                        
                            // for IE
                            event.returnValue = false;
                            // for Chrome and Firefox
                            if(event.preventDefault)  {
                                event.preventDefault();
                            }

                        }
            });
        };
});

directives.directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
        console.log('iElement', iElement);
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});



/*angular.module('MyModule', []).directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});*/



/*angular.module('MyApp', []).directive('autoComplete', function($timeout) {
    return function(scope, iElement, iAttrs) {
            iElement.autocomplete({
                source: scope[iAttrs.uiItems],
                select: function() {
                    $timeout(function() {
                      iElement.trigger('input');
                    }, 0);
                }
            });
    };
});*/