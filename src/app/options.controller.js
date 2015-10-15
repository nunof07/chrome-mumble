angular
	.module('app')
	.controller('OptionsController', OptionsController);
	
OptionsController.$inject = ['storage', 'messageService', 'Config'];
function OptionsController(storage, messageService, Config) {
	var vm = this;
	
	vm.config = {};
	vm.showSuccessMessage = false;
	vm.save = save;
	vm.reset = reset;
	
	activate();

	////////////////
	
	function activate() {
		storage.sync.get('config').then(function (result) {
			vm.config = result || new Config();
		});
	}
	
	function save() {
		vm.showSuccessMessage = false;
		
		return storage.sync.set('config', vm.config).then(function () {
			messageService.sendMessage({directive: 'refreshData'});
			vm.showSuccessMessage = true;
		});
	}
	
	function reset() {
		vm.config = new Config();
		
		return save();
	}
}