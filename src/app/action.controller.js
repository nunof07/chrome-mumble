angular
	.module('app')
	.controller('ActionController', ActionController);

ActionController.$inject = ['$window', '$scope', 'storage', 'messageService', 'Config', 'Message'];
function ActionController($window, $scope, storage, messageService, Config, Message) {
	var vm = this;

	vm.config = {};
	vm.message = {};
	vm.server = {};
	vm.refresh = refresh;
	vm.openSettings = openSettings;

	activate();
	
	////////////////

	function activate() {
		storage.addListener(onStorageChanges);
		$scope.$on('$destroy', removeStorageListener);

		return getConfig()
			.then(onConfigResult)
			.then(getData)
			.then(onDataResult)
			.then(getMessage)
			.then(onMessageResult);
	}

	function removeStorageListener() {
		storage.removeListener(onStorageChanges);
	}

	function onStorageChanges(changes, ns) {
		if (ns === 'local') {
			if (changes.hasOwnProperty('data')) {
				onDataResult(changes['data'].newValue);
			}

			if (changes.hasOwnProperty('message')) {
				onMessageResult(changes['message'].newValue);
			}
		} else if (ns === 'sync') {
			if (changes.hasOwnProperty('config')) {
				onConfigResult(changes['config'].newValue);
			}
		}
		$scope.$apply();
	}

	function getConfig() {
		return storage.sync.get('config');
	}

	function onConfigResult(result) {
		vm.config = result || new Config();

		return vm.config;
	}

	function getData() {
		return storage.local.get('data');
	}

	function onDataResult(result) {
		vm.server = result || {};

		return vm.server;
	}

	function getMessage() {
		return storage.local.get('message');
	}

	function onMessageResult(result) {
		vm.message = result || new Message();

		return vm.message;
	}

	function refresh() {
		messageService.sendMessage({ directive: 'refreshData' });
	}

	function openSettings() {
		if ($window.chrome.runtime.openOptionsPage) {
			$window.chrome.runtime.openOptionsPage();
		} else {
			$window.open($window.chrome.runtime.getURL('pages/options.html'));
		}
	}
}