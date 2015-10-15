angular
	.module('app.data')
	.factory('storage', storage);

storage.$inject = ['$q', '$window'];
function storage($q, $window) {
	var service = {
		local: {
			get: localGet,
			set: localSet
		},
		sync: {
			get: syncGet,
			set: syncSet
		},
		addListener: addListener,
		removeListener: removeListener,
	};

	return service;
	
	////////////////
	
	function localGet(key) {
		return getFromStorage($window.chrome.storage.local, key);
	}
	
	function localSet(key, value) {
		return setInStorage($window.chrome.storage.local, key, value);
	}
	
	function syncGet(key) {
		return getFromStorage($window.chrome.storage.sync, key);
	}
	
	function syncSet(key, value) {
		return setInStorage($window.chrome.storage.sync, key, value);
	}
	
	function getFromStorage(storage, key) {
		return $q(getFromStorageFn);
		
		function getFromStorageFn(resolve, reject) {
			storage.get(key, function (value) {
				resolve(value[key]);
			});
		}
	}
	
	function setInStorage(storage, key, value) {
		return $q(setInStorageFn);
		
		function setInStorageFn(resolve, reject) {
			var data = {};
			data[key] = value;
			storage.set(data, function () {
				resolve(value);
			});
		}
	}
	
	function addListener(listener) {
		$window.chrome.storage.onChanged.addListener(listener);
	}
	
	function removeListener(listener) {
		$window.chrome.storage.onChanged.removeListener(listener);
	}
}
