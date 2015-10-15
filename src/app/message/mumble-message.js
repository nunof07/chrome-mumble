angular
	.module('app.message')
	.directive('mumbleMessage', mumbleMessage);

mumbleMessage.$inject = [];
function mumbleMessage() {
	var directive = {
        templateUrl: 'app/message/mumble-message.html',
		link: link,
		scope: {
			message: '='
		}
	};
	
	return directive;
	
	function link(scope, element, attrs) {
		scope.alertClass = function (msgType) {
			switch (msgType) {
				case 'info':
				case 'success':
				case 'warning':
					return 'alert-' + msgType;
				default:
					return 'alert-danger';
			}
		};
	}
}
