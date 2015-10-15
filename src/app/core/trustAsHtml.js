angular
	.module('app.core')
	.filter('trustAsHtml', trustAsHtml);

trustAsHtml.$inject = ['$sce'];
function trustAsHtml($sce) {
	return $sce.trustAsHtml;
}
