"use strict";
var appModule_1 = require("../../common/appModule");
var Services_1 = require("../../Services/Services");
var FilebrowserController = (function () {
    function FilebrowserController() {
        this.filesystem = new Services_1.FileSystem(this);
        console.log(">>>>>>>>>>", this.filesystem);
        // this.filesystem = [
        //     {
        //         id: 0, name: "root-folder", children: [
        //         {
        //             id: 1, name: "folder1", children: [
        //             {id: 4, name: "file2", content: "yes", type: "file"}
        //         ], type: "folder"
        //         },
        //         {
        //             id: 2, name: "folder2", children: [], type: "folder"
        //         },
        //         {
        //             id: 3, name: "file1", content: 'this', type: "file"
        //         }
        //     ], type: "folder"
        //     }
        // ];
    }
    ;
    return FilebrowserController;
}());
exports.FilebrowserController = FilebrowserController;
var filebrowser = appModule_1.appModule.component("filebrowser", {
    templateUrl: "app/component/filebrowser/filebrowser.template.html",
    controller: FilebrowserController,
});
//# sourceMappingURL=filebrowser.component.js.map