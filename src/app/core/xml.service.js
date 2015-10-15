angular
	.module('app.core')
	.service('xmlService', xmlService);

xmlService.$inject = [];
function xmlService() {
	this.xmlStringToJson = xmlStringToJson;
	this.isXmlResponse = isXmlResponse;
	this.stringToInt = stringToInt;
	this.stringToBool = stringToBool;
	
	////////////////
	
	var x2js = new X2JS({
		attributePrefix: [], /* workaround to remove attribute prefixes */
		arrayAccessFormPaths: [ /* always build arrays for these properties */
			/.*\.channel/,
			/.*\.user/
		]
	});
	
	function xmlStringToJson(xmlString) {
		/* jshint camelcase: false */
		return x2js.xml_str2json(xmlString);
	}
	
	function isXmlResponse(response) {
		if (response) {
			var contentType = response.headers('content-type');
			
			if (contentType) {
				return contentType.search(/\Wxml/i) > -1;
			}
		}
		
		return false;
	}
	
	function stringToInt(value) {
		return parseInt(value || -1, 10);
	}
	
	function stringToBool(value) {
		if (angular.isString(value)) {
			return value.toLowerCase() === 'true';
		}

		return false;
	}
}