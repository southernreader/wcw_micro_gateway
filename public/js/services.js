var services = angular.module('Paginationservices', []);
services.factory('Paginator', function() {
	return function(fetchFunction, pageSize) {
		var paginator = {
			hasNextVar: false,
			next: function() {
				if (this.hasNextVar) {
					this.currentOffset += pageSize;
					this._load();
				}
			},
			_load: function() {
				var self = this;
				fetchFunction(this.currentOffset, pageSize, function(items) {
					self.currentPageItems = items.slice(0, pageSize);
					self.hasNextVar = items.length === pageSize;
				});
			},
			hasNext: function() {
				return this.hasNextVar;
			},
			previous: function() {
				if(this.hasPrevious()) {
					this.currentOffset -= pageSize;
					this._load();
				}
			},
			hasPrevious: function() {
				return this.currentOffset !== 0;
			},
			resetOffset: function(){
				this.currentOffset = 0;
				this._load();
			},
			currentPageItems: [],
			currentOffset: 0
		};
		// Load the first page
		paginator._load();
		return paginator;
	};
});

services.factory('socket', function ($rootScope) {
  var socket = io.connect('http://localhost:3000');
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    },
    disconnect: function () {
        socket.disconnect();
    }
  };
});