"use strict";

//--------------------------FileSystem class--------------------------//
export class FileSystem {
    filesystem = [];
    rootFolder;
    lastId;
    uiSelf;

    constructor(self) {
        this.rootFolder = new Folder("root", 0);
        this.filesystem.push(this.rootFolder);
        this.lastId = 1;
        this.readFromLocalStorage();
        this.uiSelf = self;
    }

    getFileSystem () {
        return this.filesystem;
    };

    addFolder (name, parentId) {
        let parent = this.getItem(parentId);
        if (parent) {
            if (!(parent.isChildExist(name))) {
                let folder = new Folder(name, this.lastId);
                parent.addChild(folder);
                this.lastId++;
                return true;
            }
            return false
        }
        return false;
    };

    addFile (name, parentId, content) {
        let parent = this.getItem(parentId);
        if (parent) {
            if (!(parent.isChildExist(name))) {
                let file = new File(name, this.lastId, content);
                parent.addChild(file);
                this.lastId++;
                return true;
            }
            return false
        }
        return false
    };

    reName (id, newName) {
        let item = this.getItem(id);
        if (item) {
            let parent = this.getParentById(id, this.filesystem,this.filesystem[0]);
            if (!(parent.isChildExist(newName))) {
                item.setName(newName);
                return true;
            }
            return false;
        }
        console.log("item does no exist");
        return false
    };

    openFile (id) {
        let item = this.getItem(id);
        if (item) {
            return item.getContent();
        }
        return false
    };

    deleteItem (id) {
        let parent = this.getParentById(id, this.filesystem,this.filesystem[0]);
        if (parent) {
            parent.deleteChild(id);
        }
    };

    getIdByPath (path) {
        const getPathArrayFromPathString = path => {
            if (path.endsWith("/")) {
                path = path.substring(0, path.length - 1);
            }
            return path.split("/");
        };
        const findIdInTree =(items, fatherId) => {
            if (pathArray.length) {
                let pathName = pathArray.shift();
                for (let item of items) {
                    if (item.getName() == pathName) {
                        if (pathArray.length == 0) {
                            if (item.getType() == "file") {
                                this.uiSelf.switchCase(item.getId(), "open");
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
        let pathArray = getPathArrayFromPathString(path);
        return findIdInTree(this.filesystem,-1);

    };

    getPathById (id) {
        let currentPathArray = [];
        let currentPath = "";
        findAncestryName(id, this.filesystem);
        currentPathArray.reverse();
        currentPathArray.forEach(function (item) {
            currentPath = currentPath.concat(item, "/");
        });
        return currentPath;
        function findAncestryName(index, items) {
            for (let item of items) {
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

    getItem (identifier) {
        if ((typeof identifier) == "string") {

        }
        if ((typeof identifier) == "number") {
            let res = this.getItemById(identifier, this.filesystem);
            return res;
        }
        if ((typeof identifier) == "undefined") {

        }
    };

    getItemById (id, items) {
        for (let item of items) {
            if (item) {
                if (item.getId() == id) {
                    return item;
                }
                if (item.getType() == "folder" && item.children.length > 0) {

                    let res = this.getItemById(id, item.children);
                    if (res) {
                        return res;
                    }
                }
            }
        }
    };

    getParentIdById (id) {
        let parent = this.getParentById(id, this.filesystem,this.filesystem[0]);
        return parent.getId();
    };

    getParentById (id, items, parent) {
        for (let item of items) {
            if (item) {
                if (item.getId() == id) {
                    return parent;
                }
                if (item.getType() == "folder" && item.children.length > 0) {

                    let res = this.getParentById(id, item.children, item);
                    if (res) {
                        return res;
                    }
                }
            }
        }
    };

    readFromLocalStorage () {
        let flattenedFileSystem
        if (localStorage.getItem("My Flattened FileSystem")) {
            flattenedFileSystem = JSON.parse(localStorage.getItem("My Flattened FileSystem"));
            let unFlattenedFileSystem = [];
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
            for (let item of flattenedFileSystem) {
                if (item.type == "folder" && item.father == unFlattenedFileSystem.id) {
                    unFlattenedFileSystem.children
                        .push(new Folder(item.name, item.id));
                    let lastFlattnenedIndex = unFlattenedFileSystem.children.length - 1;
                    fileSystemUnFlattenerFunction(unFlattenedFileSystem.children[lastFlattnenedIndex])
                }
                else if (item.type == "file" && item.father == unFlattenedFileSystem.id) {
                    unFlattenedFileSystem.children.push(new File(item.name, item.id, item.content));
                }
            }
        }
    };

    saveToLocalStorage () {
        let flattenedFileSystem = [];
        let flattenedFileSystemString;
        fileSystemflattenerFunction(this.filesystem, -1);
        flattenedFileSystemString = JSON.stringify(flattenedFileSystem);
        localStorage.setItem("My Flattened FileSystem", flattenedFileSystemString);
        localStorage.setItem("Last Id", this.lastId);
        function fileSystemflattenerFunction(items, fatherId) {
            for (let item of items) {
                if (item.getType() == "folder") {
                    flattenedFileSystem.push({
                        id: item.getId()
                        , name: item.getName()
                        , type: "folder"
                        ,  father: fatherId
                    });
                    fileSystemflattenerFunction(item.getChildren(), item.getId());
                }
                else if (item.getType() == "file") {
                    flattenedFileSystem.push({
                        id: item.getId()
                        , name: item.getName()
                        , content: item.getContent()
                        , type: "file"
                        , father: fatherId
                    })
                }
            }
        }
    };
}
//----------------------------Folder class--------------------//
class Folder {
    name;
    id;
    children = [];

    constructor (name,id) {
        this.name = name;
        this.id = parseInt(id);
    }

    deleteChild (id) {
        for (let i = 0; i < this.children.length; i++) {
            if (this.children[i].getId() == id) {
                this.children.splice(i, 1);
                alert("File was deleted");
                return true;
            }
        }
        alert("item was not found");
        return false;
    };

    setName (name) {
        this.name = name;
    };

    addChild (item/*Folder||File*/) {
        this.children.push(item);
    };

    getId () {
        return this.id;
    };

    getName () {
        return this.name;
    };

    getType () {
        return "folder";
    };

    getChildren () {
        return this.children;
    };

    isChildExist (name) {
        for (let item of this.children) {
            if (item.getName() == name) {
                return true;
            }
        }
        return false;
    };
}
//--------------------------File class--------------------------//
class File {
    name;
    id;
    content;

    constructor (name,id,content){
        this.name = name;
        this.id = parseInt(id);
        this.content = content;
    }

    setName (newName) {
        this.name = newName;
    };

    setContent (newContent) {
        this.content = newContent;
    };

    getContent () {
        return this.content;
    };

    getName () {
        return this.name;
    };

    getType () {
        return "file";
    };

    getId () {
        return this.id;
    };
}
//--------------------------History class--------------------------//
class History {
    currentFolder;
    backwardHistory = [];
    forwardHistory = [];
    uiSelf;

    constructor(self) {
        this.currentFolder = -1;
        this.uiSelf = self;
    }

    setCurrentFolder(id) {
        this.currentFolder = id;
        if (this.backwardHistory[this.backwardHistory.length - 1] == this.currentFolder) {
            this.backwardHistory.pop();
        }
    };

    getCurrentFolder() {
        return this.currentFolder;
    };

    goBack() {
        let goTo = this.backwardHistory.pop();
        this.forwardHistory.push(this.currentFolder);
        this.currentFolder = goTo;
        this.uiSelf.toggleForwardState(true);
        if (this.backwardHistory.length == 0) {
            this.uiSelf.toggleBackwardState(false);
        }
        return goTo;
    };

    goForward() {
        let goTo = this.forwardHistory.pop();
        this.backwardHistory.push(this.currentFolder);
        this.currentFolder = goTo;
        this.uiSelf.toggleBackwardState(true);
        if (this.forwardHistory.length == 0) {
            this.uiSelf.toggleForwardState(false);
        }
        return goTo;

    };

    emptyForward() {
        this.forwardHistory = [];
        this.uiSelf.toggleForwardState(false);
    };

    addToHistory(id) {
        if (this.currentFolder != id) {
            this.backwardHistory.push(this.currentFolder);
            this.currentFolder = id;
            this.uiSelf.toggleBackwardState(true);
            this.emptyForward();
        }
    };

    removeFromHistory(id) {
        for (let i = 0; i < this.backwardHistory.length; i++) {
            if (this.backwardHistory[i] == id) {
                this.backwardHistory.splice(i, 1);
                i--;
            }
        }
        this.removeDuplicate("backward");
        for (let i = 0; i < this.forwardHistory.length; i++) {
            if (this.forwardHistory[i] == id) {
                this.forwardHistory.splice(i, 1);
                i--;
            }
        }
        this.removeDuplicate("forward");
    };

    removeDuplicate(string) {
        if (string == "backward") {
            for (let i = 1; i < this.backwardHistory.length; i++) {
                if (this.backwardHistory[i] == this.backwardHistory[i - 1]) {
                    this.backwardHistory.splice(i, 1);
                    i--;
                }
            }
        }
        else if (string == "forward") {
            for (let i = 1; i < this.forwardHistory.length; i++) {
                if (this.forwardHistory[i] == this.forwardHistory[i - 1]) {
                    this.forwardHistory.splice(i, 1);
                    i--;
                }
            }
        }
    };
}










