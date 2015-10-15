angular
	.module('app.user')
	.directive('mumbleUser', mumbleUser);

mumbleUser.$inject = [];
function mumbleUser() {
	var directive = {
        templateUrl: 'app/user/mumble-user.html',
		scope: { user: '=' }
	};
	
	return directive;
}
