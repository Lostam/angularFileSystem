import {appModule} from "../../common/appModule";
export class ContextMenuController {

    constructor() {
    }
}



appModule.component("contextmenu",{
    templateUrl: "app/component/contextMenu/contextMenu.template.html",
    controller : ContextMenuController,
    bindings : {
    }
});