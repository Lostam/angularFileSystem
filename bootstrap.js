"use strict";
var angular = require("angular");
var filebrowser_component_1 = require("./app/component/filebrowser/filebrowser.component");
var appModule_1 = require("./app/common/appModule");
var rootFolder_component_1 = require("./app/component/root/rootFolder.component");
var tree_component_1 = require("./app/component/tree/tree.component");
var content_component_1 = require("./app/component/content/content.component");
appModule_1.appModule;
filebrowser_component_1.FilebrowserController;
rootFolder_component_1.rootController;
tree_component_1.TreeController;
content_component_1.ContentController;
angular.bootstrap(document, ['myApp']);
//# sourceMappingURL=bootstrap.js.map