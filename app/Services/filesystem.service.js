"use strict";
var appModule_1 = require("../common/appModule");
//--------------------------FileSystemService class--------------------------//
var FileSystemService = (function () {
    function FileSystemService(self) {
        this.filesystem = [];
        this.rootFolder = new Folder("root", 0);
        this.filesystem.push(this.rootFolder);
        this.lastId = 1;
        this.readFromLocalStorage();
        this.uiSelf = self;
    }
    FileSystemService.prototype.getFileSystem = function () {
        return this.filesystem;
    };
    ;
    FileSystemService.prototype.getItem = function (identifier) {
        if ((typeof identifier) == "string") {
        }
        if ((typeof identifier) == "number") {
            var res = this.getItemById(identifier, this.filesystem);
            return res;
        }
        if ((typeof identifier) == "undefined") {
        }
    };
    ;
    FileSystemService.prototype.getItemById = function (id, items) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (item) {
                if (item.getId() == id) {
                    return item;
                }
                if (item.getType() == "folder" && item.children.length > 0) {
                    var res = this.getItemById(id, item.children);
                    if (res) {
                        return res;
                    }
                }
            }
        }
    };
    ;
    FileSystemService.prototype.getParentIdById = function (id) {
        var parent = this.getParentById(id, this.filesystem, this.filesystem[0]);
        return parent.getId();
    };
    ;
    FileSystemService.prototype.getParentById = function (id, items, parent) {
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var item = items_2[_i];
            if (item) {
                if (item.getId() == id) {
                    return parent;
                }
                if (item.getType() == "folder" && item.children.length > 0) {
                    var res = this.getParentById(id, item.children, item);
                    if (res) {
                        return res;
                    }
                }
            }
        }
    };
    ;
    FileSystemService.prototype.readFromLocalStorage = function () {
        var flattenedFileSystem;
        if (localStorage.getItem("My Flattened FileSystem")) {
            flattenedFileSystem = JSON.parse(localStorage.getItem("My Flattened FileSystem"));
            var unFlattenedFileSystem = [];
            unFlattenedFileSystem.push(new Folder("root", 0));
            flattenedFileSystem.shift();
            fileSystemUnFlattenerFunction(unFlattenedFileSystem[0]);
            this.filesystem = unFlattenedFileSystem.slice();
            this.lastId = localStorage.getItem("Last Id");
        }
        else {
            this.saveToLocalStorage();
        }
        function fileSystemUnFlattenerFunction(unFlattenedFileSystem) {
            for (var _i = 0, flattenedFileSystem_1 = flattenedFileSystem; _i < flattenedFileSystem_1.length; _i++) {
                var item = flattenedFileSystem_1[_i];
                if (item.type == "folder" && item.father == unFlattenedFileSystem.id) {
                    unFlattenedFileSystem.children
                        .push(new Folder(item.name, item.id));
                    var lastFlattnenedIndex = unFlattenedFileSystem.children.length - 1;
                    fileSystemUnFlattenerFunction(unFlattenedFileSystem.children[lastFlattnenedIndex]);
                }
                else if (item.type == "file" && item.father == unFlattenedFileSystem.id) {
                    unFlattenedFileSystem.children.push(new File(item.name, item.id, item.content));
                }
            }
        }
    };
    ;
    FileSystemService.prototype.saveToLocalStorage = function () {
        var flattenedFileSystem = [];
        var flattenedFileSystemString;
        fileSystemflattenerFunction(this.filesystem, -1);
        flattenedFileSystemString = JSON.stringify(flattenedFileSystem);
        localStorage.setItem("My Flattened FileSystem", flattenedFileSystemString);
        localStorage.setItem("Last Id", this.lastId);
        function fileSystemflattenerFunction(items, fatherId) {
            for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
                var item = items_3[_i];
                if (item.getType() == "folder") {
                    flattenedFileSystem.push({
                        id: item.getId(),
                        name: item.getName(),
                        type: "folder",
                        father: fatherId
                    });
                    fileSystemflattenerFunction(item.getChildren(), item.getId());
                }
                else if (item.getType() == "file") {
                    flattenedFileSystem.push({
                        id: item.getId(),
                        name: item.getName(),
                        content: item.getContent(),
                        type: "file",
                        father: fatherId
                    });
                }
            }
        }
    };
    ;
    return FileSystemService;
}());
exports.FileSystemService = FileSystemService;
//----------------------------Folder class--------------------//
var Folder = (function () {
    function Folder(name, id) {
        this.children = [];
        this.name = name;
        this.id = parseInt(id);
    }
    Folder.prototype.deleteChild = function (id) {
        for (var i = 0; i < this.children.length; i++) {
            if (this.children[i].getId() == id) {
                this.children.splice(i, 1);
                alert("File was deleted");
                return true;
            }
        }
        alert("item was not found");
        return false;
    };
    ;
    Folder.prototype.setName = function (name) {
        this.name = name;
    };
    ;
    Folder.prototype.addChild = function (item /*Folder||File*/) {
        this.children.push(item);
    };
    ;
    Folder.prototype.getId = function () {
        return this.id;
    };
    ;
    Folder.prototype.getName = function () {
        return this.name;
    };
    ;
    Folder.prototype.getType = function () {
        return "folder";
    };
    ;
    Folder.prototype.getChildren = function () {
        return this.children;
    };
    ;
    Folder.prototype.isChildExist = function (name) {
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var item = _a[_i];
            if (item.getName() == name) {
                return true;
            }
        }
        return false;
    };
    ;
    return Folder;
}());
//--------------------------File class--------------------------//
var File = (function () {
    function File(name, id, content) {
        this.name = name;
        this.id = parseInt(id);
        this.content = content;
    }
    File.prototype.setName = function (newName) {
        this.name = newName;
    };
    ;
    File.prototype.setContent = function (newContent) {
        this.content = newContent;
    };
    ;
    File.prototype.getContent = function () {
        return this.content;
    };
    ;
    File.prototype.getName = function () {
        return this.name;
    };
    ;
    File.prototype.getType = function () {
        return "file";
    };
    ;
    File.prototype.getId = function () {
        return this.id;
    };
    ;
    return File;
}());
//--------------------------History class--------------------------//
var History = (function () {
    function History(self) {
        this.backwardHistory = [];
        this.forwardHistory = [];
        this.currentFolder = -1;
        this.uiSelf = self;
    }
    History.prototype.setCurrentFolder = function (id) {
        this.currentFolder = id;
        if (this.backwardHistory[this.backwardHistory.length - 1] == this.currentFolder) {
            this.backwardHistory.pop();
        }
    };
    ;
    History.prototype.getCurrentFolder = function () {
        return this.currentFolder;
    };
    ;
    History.prototype.goBack = function () {
        var goTo = this.backwardHistory.pop();
        this.forwardHistory.push(this.currentFolder);
        this.currentFolder = goTo;
        this.uiSelf.toggleForwardState(true);
        if (this.backwardHistory.length == 0) {
            this.uiSelf.toggleBackwardState(false);
        }
        return goTo;
    };
    ;
    History.prototype.goForward = function () {
        var goTo = this.forwardHistory.pop();
        this.backwardHistory.push(this.currentFolder);
        this.currentFolder = goTo;
        this.uiSelf.toggleBackwardState(true);
        if (this.forwardHistory.length == 0) {
            this.uiSelf.toggleForwardState(false);
        }
        return goTo;
    };
    ;
    History.prototype.emptyForward = function () {
        this.forwardHistory = [];
        this.uiSelf.toggleForwardState(false);
    };
    ;
    History.prototype.addToHistory = function (id) {
        if (this.currentFolder != id) {
            this.backwardHistory.push(this.currentFolder);
            this.currentFolder = id;
            this.uiSelf.toggleBackwardState(true);
            this.emptyForward();
        }
    };
    ;
    History.prototype.removeFromHistory = function (id) {
        for (var i = 0; i < this.backwardHistory.length; i++) {
            if (this.backwardHistory[i] == id) {
                this.backwardHistory.splice(i, 1);
                i--;
            }
        }
        this.removeDuplicate("backward");
        for (var i = 0; i < this.forwardHistory.length; i++) {
            if (this.forwardHistory[i] == id) {
                this.forwardHistory.splice(i, 1);
                i--;
            }
        }
        this.removeDuplicate("forward");
    };
    ;
    History.prototype.removeDuplicate = function (string) {
        if (string == "backward") {
            for (var i = 1; i < this.backwardHistory.length; i++) {
                if (this.backwardHistory[i] == this.backwardHistory[i - 1]) {
                    this.backwardHistory.splice(i, 1);
                    i--;
                }
            }
        }
        else if (string == "forward") {
            for (var i = 1; i < this.forwardHistory.length; i++) {
                if (this.forwardHistory[i] == this.forwardHistory[i - 1]) {
                    this.forwardHistory.splice(i, 1);
                    i--;
                }
            }
        }
    };
    ;
    return History;
}());
appModule_1.appModule.service("fileSystemService", FileSystemService);
//# sourceMappingURL=filesystem.service.js.map