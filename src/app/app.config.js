angular
	.module('app')
	.config(config);

config.$inject = ['$compileProvider'];
function config($compileProvider) {
	$compileProvider.debugInfoEnabled(false);
}
