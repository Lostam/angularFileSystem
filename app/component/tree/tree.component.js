"use strict";
var appModule_1 = require("../../common/appModule");
var TreeController = (function () {
    function TreeController($rootScope) {
        this.$rootScope = $rootScope;
        this.showState = false;
    }
    TreeController.prototype.clickOnItemHandle = function (event) {
        event.stopPropagation();
        if (event.which == 1) {
            this.toggleChild();
        }
        else if (event.which == 3) {
            this.showContextMenu(event);
        }
    };
    TreeController.prototype.toggleChild = function () {
        this.showState = !this.showState;
    };
    TreeController.prototype.openContent = function (event, items) {
        if (event.which == 1) {
            event.stopPropagation();
            this.showState = true;
            this.$rootScope.$broadcast("showContent", items);
        }
    };
    TreeController.prototype.showContextMenu = function (event) {
        this.$rootScope.$broadcast('rightClick', event);
    };
    return TreeController;
}());
exports.TreeController = TreeController;
appModule_1.appModule.component("tree", {
    templateUrl: "app/component/tree/tree.template.html",
    controller: TreeController,
    bindings: {
        folder: '<'
    }
});
//# sourceMappingURL=tree.component.js.map