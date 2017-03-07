import * as angular from "angular";
import {FilebrowserController} from "./app/component/filebrowser/filebrowser.component";
import {appModule} from "./app/common/appModule";
import {TreeController} from "./app/component/tree/tree.component";
import {ContentController} from "./app/component/content/content.component";
import {ContextMenuController} from "./app/component/contextMenu/contextMenu.component";
import {FileSystemService} from "./app/Services/filesystem.service";

appModule;
FileSystemService;
ContextMenuController
FilebrowserController;
ContentController;
TreeController;

angular.bootstrap(document,['myApp']);