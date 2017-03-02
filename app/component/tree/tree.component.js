"use strict";
var appModule_1 = require("../../common/appModule");
var TreeController = (function () {
    function TreeController() {
        //console.log(this.filesystem)
    }
    TreeController.prototype.toggleState = function (id) {
        console.log(id);
    };
    TreeController.prototype.print = function () {
        console.log(1);
    };
    TreeController.prototype.handleClick = function (evt) {
        evt.stopPropagation();
        switch (evt.which) {
            case 1:
                console.log(1);
                break;
            case 2:
                console.log(2);
                break;
            case 3:
                console.log(3);
                break;
            default:
                break;
        }
    };
    return TreeController;
}());
exports.TreeController = TreeController;
appModule_1.appModule.component("tree", {
    templateUrl: "app/component/tree/tree.template.html",
    controller: TreeController,
    bindings: {
        filesystem: '<'
    }
});
//# sourceMappingURL=tree.component.js.map