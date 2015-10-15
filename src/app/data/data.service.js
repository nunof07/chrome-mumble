angular
	.module('app.data')
	.service('dataService', dataService);

dataService.$inject = ['$http', 'xmlService', 'transformer', 'Server'];
function dataService($http, xmlService, transformer, Server) {
	this.getData = getData;
	
	////////////////
	
	function getData(uri) {
		return $http.get(uri)
					.then(getDataComplete);

		function getDataComplete(response) {
			if (xmlService.isXmlResponse(response)) {
				var json = xmlService.xmlStringToJson(response.data);
				
				return transformer.transform(json, Server.fromXmlFormat);
			} else {
				return transformer.transform(response.data, Server.fromJsonFormat);
			}
		}
	}
}