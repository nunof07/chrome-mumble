angular
	.module('app.core')
	.factory('badgeService', badgeService);

badgeService.$inject = ['$window'];
function badgeService($window) {
	var service = {
		setText: setText
	};

	return service;
	
	////////////////
	
	function setText(value) {
		$window.chrome.browserAction.setBadgeText({text: value});
	}
}
