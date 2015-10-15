angular
	.module('app.core')
	.service('transformer', transformer);

transformer.$inject = [];
function transformer() {
	this.transform = transform;
	
	////////////////
	
	function transform(data, buildCallback) {
		if (angular.isArray(data)) {
            var models = [];
			
            angular.forEach(data, function (object) {
                models.push(buildCallback(object));
            });
			
            return models;
        } else {
            return buildCallback(data);
        }
	}
}