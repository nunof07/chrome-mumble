angular
	.module('app.core')
	.factory('messageService', messageService);

messageService.$inject = ['$window'];
function messageService($window) {
	var service = {
		sendMessage: sendMessage,
		addListener: addListener 
	};

	return service;
	
	////////////////
	
	function sendMessage(value, callback) {
		$window.chrome.runtime.sendMessage(value, callback);
	}
	
	function addListener(listener) {
		$window.chrome.runtime.onMessage.addListener(listener);
	}
}
