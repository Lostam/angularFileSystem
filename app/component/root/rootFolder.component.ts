import {FileSystem} from "../../Services/Services";
import {appModule} from "../../common/appModule";
export class rootController {
    filesystem;
    constructor (){
        console.log (">>>>>>",this.filesystem);
    }
}

appModule.component("rootFolder",{
    templateUrl: "app/component/root/rootFolder.template.html",
    controller : rootController,
    bindings : {
        filesystem : "<",
    }
});