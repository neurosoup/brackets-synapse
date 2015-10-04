/*jslint node:true, vars:true, plusplus:true, devel:true, nomen:true, regexp:true, white:true, indent:2, maxerr:50 */
/*global define, $, brackets, Mustache, window, console */
define(function (require, exports, module) {
	"use strict";

	var _ = brackets.getModule("thirdparty/lodash");

	var sleep,
			l;
	var debug = true;

	sleep = function (countBy100ms) {
		var d = new $.Deferred(),
				count = 0;
		if (countBy100ms === 0)
			return $.Deferred().resolve().promise();

		var timer = setInterval(function () {
			count++;
			if (count === countBy100ms) {
				clearInterval(timer);
				d.resolve();
			}
		}, 100);
		return d.promise();
	};

	l = function () {
		var argLength = arguments.length;
		if (argLength > 1) {
			var args = {};
			_.forEach(arguments, function (arg) {
				args.push(arg);
			});
			console.log(args);
		} else {
			console.log(arguments[0]);
		}
	};

	exports.l = l;
	exports.sleep = sleep;
});
