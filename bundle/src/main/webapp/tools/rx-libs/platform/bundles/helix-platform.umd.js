(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define('@helix/platform', ['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.helix = global.helix || {}, global.helix.platform = {})));
})(this, (function (exports) { 'use strict';

	var version = '22.1.7';

	/**
	 * Generated bundle index. Do not edit.
	 */

	exports.version = version;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=helix-platform.umd.js.map
