angular
	.module('app.server')
	.directive('mumbleServer', mumbleServer);

mumbleServer.$inject = [];
function mumbleServer() {
	var directive = {
        templateUrl: 'app/server/mumble-server.html',
		scope: {
			server: '=',
			refresh: '&',
			settings: '&',
			config: '=',
			message: '='
		}
	};
	
	return directive;
}
