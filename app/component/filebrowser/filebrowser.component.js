"use strict";
var appModule_1 = require("../../common/appModule");
var filesystem_service_1 = require("../../Services/filesystem.service");
var FilebrowserController = (function () {
    function FilebrowserController($rootScope) {
        this.$rootScope = $rootScope;
        this.filesystem = new filesystem_service_1.FileSystemService(this);
        this.contextMenuToggle = false;
        this.posX = "0px";
        this.posY = "0px";
        this.contextMenuPosition = "{top : this.posX ; left: this.posY}";
        this.rightClickListener();
    }
    FilebrowserController.prototype.turnContextOff = function () {
        this.contextMenuToggle = false;
    };
    FilebrowserController.prototype.rightClickListener = function () {
        var _this = this;
        this.$rootScope.$on('rightClick', function (scope, event) {
            _this.posX = (event.pageX).toString() + "px";
            _this.posY = (event.pageY).toString() + "px";
            _this.contextMenuToggle = true;
        });
    };
    return FilebrowserController;
}());
exports.FilebrowserController = FilebrowserController;
appModule_1.appModule.component("filebrowser", {
    templateUrl: "app/component/filebrowser/filebrowser.template.html",
    controller: FilebrowserController,
});
//# sourceMappingURL=filebrowser.component.js.map