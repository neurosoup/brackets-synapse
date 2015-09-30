/*jslint node: true, vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50*/
/*global define, location, $, brackets, Mustache, window, appshell*/
define(function (require, exports, module) {
	"use strict";


	var ExtensionUtils = brackets.getModule("utils/ExtensionUtils"),
			AppInit = brackets.getModule("utils/AppInit"),
			NodeDomain = brackets.getModule("utils/NodeDomain"),
			FileSystem = brackets.getModule("filesystem/FileSystem"),
			FileUtils = brackets.getModule("file/FileUtils"),
			CommandManager = brackets.getModule("command/CommandManager"),
			PathManager = require("modules/PathManager"),
			ExtensionDiagnosis = require("modules/ExtensionDiagnosis"),
			Async = brackets.getModule("utils/Async"),
			Menu = require("modules/Menu"),
			Panel = require("modules/Panel"),
			CryptoManager = require("modules/CryptoManager"),
			SettingManager = require("modules/SettingManager"),
			FileTreeView = require("modules/FileTreeView"),
			RemoteManager = require("modules/RemoteManager"),
			FileManager = require("modules/FileManager"),
			PreferenceManager = require("modules/PreferenceManager"),
			Notify = require("modules/Notify"),
			Log = require("modules/Log"),
			Shared = require("modules/Shared");

	var COMMAND_ID = "kohei.synapse.mainPanel";


	var $brackets = {
				get toolbar() {
					return $("#main-toolbar .buttons");
				},
				get projectFilesContainer() {
					return $("#project-files-container");
				},
				get sidebar() {
					return $("#sidebar");
				}
			};

	var setAppIcon = function () {
		var d = new $.Deferred(),
				icon = $("<a>")
				.attr({
					id:"synapse-icon",
					"href": "#",
					"title": "Synapse"
				})
				.addClass("diabled")
				.on("click", Menu.showMainPanel)
				.appendTo($brackets.toolbar);
		return d.resolve().promise();
	};

	AppInit.appReady(function () {
		//Shared.domain = new NodeDomain("synapse", ExtensionUtils.getModulePath(module, "node/SynapseDomain"));
		var domain = new NodeDomain("synapse", ExtensionUtils.getModulePath(module, "node/TestDomain"));
		
		
		var ftp_setting = {
			host: "s2.bitglobe.net",
			port: 21,
			user: "hayashi",
			password: "kohei0730",
		};
		var sftp_setting = {
			host: "s2.bitglobe.net",
			port: 22,
			username: "hayashi",
			privateKeyPath: "D:/Windows/Desktop/id_rsa"
		};
		
		//domain.exec("secureConnect", sftp_setting, "./")
		domain.exec("connect", ftp_setting, "./")
		.then(function (res) {
			console.log(res);
			res.forEach(function (item) {
				
			});
		}, function (err) {
			console.log({ERROR: err});
		});
		
		Menu.setRootMenu();
		
		/*
		var promises = [];
		var p;

		Log.initView()
		.then(function () {
			p = PreferenceManager.init();
			promises.push(p);

			p = ExtensionDiagnosis.init();
			promises.push(p);

			p = SettingManager.init();
			promises.push(p);

			p = Panel.init();
			promises.push(p);

			p = Notify.init();
			promises.push(p);

			p = PathManager.init();
			promises.push(p);

			p = RemoteManager.init();
			promises.push(p);

			p = FileTreeView.init();
			promises.push(p);

			p = FileManager.init();
			promises.push(p);

			p = setAppIcon();
			promises.push(p);

			p = Menu.setRootMenu();
			promises.push(p);

			Async.waitForAll(promises, true)
			.then(function () {
				Log.q("Synapse initialized done.");
			}, function (err) {
				throw new Error(err);
			});
			
		}, function (err) {
			console.error("Initialize Log module failed.");
		});
		*/
	});
});
