"use strict";
var angular = require("angular");
var filebrowser_component_1 = require("./app/component/filebrowser/filebrowser.component");
var appModule_1 = require("./app/common/appModule");
var tree_component_1 = require("./app/component/tree/tree.component");
var content_component_1 = require("./app/component/content/content.component");
var contextMenu_component_1 = require("./app/component/contextMenu/contextMenu.component");
var filesystem_service_1 = require("./app/Services/filesystem.service");
appModule_1.appModule;
filesystem_service_1.FileSystemService;
contextMenu_component_1.ContextMenuController;
filebrowser_component_1.FilebrowserController;
content_component_1.ContentController;
tree_component_1.TreeController;
angular.bootstrap(document, ['myApp']);
//# sourceMappingURL=bootstrap.js.map