angular
	.module('app.core')
	.factory('logger', logger);

logger.$inject = ['$log'];
function logger($log) {
	var service = {
		error: $log.error,
		info: $log.info,
		success: $log.info,
		warning: $log.warning,
		debug: $log.debug,
		log: $log.log
	};

	return service;
}
