angular
	.module('app')
	.controller('BackgroundController', BackgroundController);

BackgroundController.$inject = ['$window', 'refreshService', 'messageService', 'storage', 'Config'];
function BackgroundController($window, refreshService, messageService, storage, Config) {
	var vm = this;

	activate();

	////////////////
	
	function activate() {
		$window.chrome.alarms.onAlarm.addListener(onAlarm);
		$window.chrome.runtime.onInstalled.addListener(onAlarm);
		messageService.addListener(onMessage);
		createAlarm();
	}

	function clearAlarm() {
		$window.chrome.alarms.clear('refresh');
	}

	function createAlarm() {
		storage.sync.get('config').then(onConfig);

		function onConfig(result) {
			var config = result || new Config();

			$window.chrome.alarms.create('refresh', {
				delayInMinutes: config.server.refreshInterval
			});

			return config;
		}
	}

	function onAlarm() {
		return refreshService.refreshData().then(createAlarm);
	}

	function onMessage(request, sender, sendResponse) {
		if (request.directive === 'refreshData') {
			clearAlarm();
			onAlarm();
		}
	}
}