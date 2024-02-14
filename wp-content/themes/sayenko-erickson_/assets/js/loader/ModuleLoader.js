class ModuleLoader {
	constructor(modules) {
		this.modules = modules;
	}

	init() {
		const modules = this.modules;
		Object.keys(modules).forEach(function(key) {
			modules[key].init();
		});
	}
}

export default ModuleLoader;
