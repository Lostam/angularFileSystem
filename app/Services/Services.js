"use strict";
//--------------------------FileSystem class--------------------------//
var FileSystem = (function () {
    function FileSystem(self) {
        this.filesystem = [];
        this.rootFolder = new Folder("root", 0);
        this.filesystem.push(this.rootFolder);
        this.lastId = 1;
        this.readFromLocalStorage();
        this.uiSelf = self;
    }
    FileSystem.prototype.getFileSystem = function () {
        return this.filesystem;
    };
    ;
    FileSystem.prototype.addFolder = function (name, parentId) {
        var parent = this.getItem(parentId);
        if (parent) {
            if (!(parent.isChildExist(name))) {
                var folder = new Folder(name, this.lastId);
                parent.addChild(folder);
                this.lastId++;
                return true;
            }
            return false;
        }
        return false;
    };
    ;
    FileSystem.prototype.addFile = function (name, parentId, content) {
        var parent = this.getItem(parentId);
        if (parent) {
            if (!(parent.isChildExist(name))) {
                var file = new File(name, this.lastId, content);
                parent.addChild(file);
                this.lastId++;
                return true;
            }
            return false;
        }
        return false;
    };
    ;
    FileSystem.prototype.reName = function (id, newName) {
        var item = this.getItem(id);
        if (item) {
            var parent_1 = this.getParentById(id, this.filesystem, this.filesystem[0]);
            if (!(parent_1.isChildExist(newName))) {
                item.setName(newName);
                return true;
            }
            return false;
        }
        console.log("item does no exist");
        return false;
    };
    ;
    FileSystem.prototype.openFile = function (id) {
        var item = this.getItem(id);
        if (item) {
            return item.getContent();
        }
        return false;
    };
    ;
    FileSystem.prototype.deleteItem = function (id) {
        var parent = this.getParentById(id, this.filesystem, this.filesystem[0]);
        if (parent) {
            parent.deleteChild(id);
        }
    };
    ;
    FileSystem.prototype.getIdByPath = function (path) {
        var _this = this;
        var getPathArrayFromPathString = function (path) {
            if (path.endsWith("/")) {
                path = path.substring(0, path.length - 1);
            }
            return path.split("/");
        };
        var findIdInTree = function (items, fatherId) {
            if (pathArray.length) {
                var pathName = pathArray.shift();
                for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                    var item = items_1[_i];
                    if (item.getName() == pathName) {
                        if (pathArray.length == 0) {
                            if (item.getType() == "file") {
                                _this.uiSelf.switchCase(item.getId(), "open");
                            }
                            return (item.getType() == "file") ? fatherId : item.getId();
                        }
                        return findIdInTree(item.getChildren(), item.getId());
                    }
                }
                alert("<<<<<<<<WRONG PATH>>>>>>>>");
                return false;
            }
        };
        var pathArray = getPathArrayFromPathString(path);
        return findIdInTree(this.filesystem, -1);
    };
    ;
    FileSystem.prototype.getPathById = function (id) {
        var currentPathArray = [];
        var currentPath = "";
        findAncestryName(id, this.filesystem);
        currentPathArray.reverse();
        currentPathArray.forEach(function (item) {
            currentPath = currentPath.concat(item, "/");
        });
        return currentPath;
        function findAncestryName(index, items) {
            for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
                var item = items_2[_i];
                if (item.getType() == "folder") {
                    if (findAncestryName(index, item.getChildren())) {
                        currentPathArray.push(item.getName());
                        return true;
                    }
                }
                if (item.getId() == index) {
                    currentPathArray.push(item.getName());
                    return true;
                }
            }
        }
    };
    ;
    FileSystem.prototype.getItem = function (identifier) {
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
    FileSystem.prototype.getItemById = function (id, items) {
        for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
            var item = items_3[_i];
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
    FileSystem.prototype.getParentIdById = function (id) {
        var parent = this.getParentById(id, this.filesystem, this.filesystem[0]);
        return parent.getId();
    };
    ;
    FileSystem.prototype.getParentById = function (id, items, parent) {
        for (var _i = 0, items_4 = items; _i < items_4.length; _i++) {
            var item = items_4[_i];
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
    FileSystem.prototype.readFromLocalStorage = function () {
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
    FileSystem.prototype.saveToLocalStorage = function () {
        var flattenedFileSystem = [];
        var flattenedFileSystemString;
        fileSystemflattenerFunction(this.filesystem, -1);
        flattenedFileSystemString = JSON.stringify(flattenedFileSystem);
        localStorage.setItem("My Flattened FileSystem", flattenedFileSystemString);
        localStorage.setItem("Last Id", this.lastId);
        function fileSystemflattenerFunction(items, fatherId) {
            for (var _i = 0, items_5 = items; _i < items_5.length; _i++) {
                var item = items_5[_i];
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
    return FileSystem;
}());
exports.FileSystem = FileSystem;
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
//# sourceMappingURL=Services.js.map