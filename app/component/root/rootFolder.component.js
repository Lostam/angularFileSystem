"use strict";
var appModule_1 = require("../../common/appModule");
var rootController = (function () {
    function rootController() {
        console.log(">>>>>>", this.filesystem);
    }
    return rootController;
}());
exports.rootController = rootController;
appModule_1.appModule.component("rootFolder", {
    templateUrl: "app/component/root/rootFolder.template.html",
    controller: rootController,
    bindings: {
        filesystem: "<",
    }
});
//# sourceMappingURL=rootFolder.component.js.map