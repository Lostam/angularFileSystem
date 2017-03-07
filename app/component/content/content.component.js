"use strict";
var ContentController = (function () {
    function ContentController($rootScope) {
        this.$rootScope = $rootScope;
        this.children = [];
        this.showChildrenListener();
    }
    ContentController.prototype.showContextMenu = function (event) {
        this.$rootScope.$broadcast('rightClick', event);
    };
    ContentController.prototype.showChildrenListener = function () {
        var _this = this;
        this.$rootScope.$on("showContent", function (event, children) {
            _this.children = children;
        });
    };
    return ContentController;
}());
exports.ContentController = ContentController;
var appModule_1 = require("../../common/appModule");
appModule_1.appModule.component('content', {
    templateUrl: "app/component/content/content.template.html",
    controller: ContentController
});
//# sourceMappingURL=content.component.js.map