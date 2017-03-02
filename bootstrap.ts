import * as angular from "angular";
import {FilebrowserController} from "./app/component/filebrowser/filebrowser.component";
import {appModule} from "./app/common/appModule";
import {rootController} from "./app/component/root/rootFolder.component";
import {TreeController} from "./app/component/tree/tree.component";
import {ContentController} from "./app/component/content/content.component";

appModule;
FilebrowserController;
rootController;
TreeController;
ContentController;

angular.bootstrap(document,['myApp']);