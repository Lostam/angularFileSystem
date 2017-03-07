import {appModule} from "../../common/appModule";

export class TreeController {
    private showState: boolean;

    constructor(private $rootScope) {
        this.showState = false;
    }

    clickOnItemHandle(event) {
        event.stopPropagation();
        if (event.which == 1) {
            this.toggleChild();
        }
        else if (event.which == 3) {
            this.showContextMenu(event);
        }
    }

    toggleChild() {
        this.showState = !this.showState;
    }

    openContent(event:any,items:Array<Object>) {
        if (event.which == 1) {
            event.stopPropagation();
            this.showState = true;
            this.$rootScope.$broadcast("showContent", items);
        }
    }

    showContextMenu(event) {
        this.$rootScope.$broadcast('rightClick',event);
    }
}

appModule.component("tree",{
    templateUrl: "app/component/tree/tree.template.html",
    controller: TreeController,
    bindings: {
        folder : '<'
    }
});