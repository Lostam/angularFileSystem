export class ContentController {

    children:Array<Object>;

    constructor(private $rootScope) {
        this.children = [];
        this.showChildrenListener ();
    }

    showContextMenu(event:any) {
        this.$rootScope.$broadcast('rightClick',event);
    }

    showChildrenListener (){
        this.$rootScope.$on("showContent" ,(event:any,children:Array<Object>) => {
            this.children = children;
        });
    }
}

import {appModule} from "../../common/appModule";
appModule.component('content',{
    templateUrl : "app/component/content/content.template.html",
    controller: ContentController
});