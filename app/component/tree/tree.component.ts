import {appModule} from "../../common/appModule";
export class TreeController {
    filesystem;
    constructor() {
        //console.log(this.filesystem)
    }
    toggleState(id) {
        console.log(id);

    }
    print(){
        console.log(1);
    }
    handleClick(evt) {
        evt.stopPropagation()
        switch (evt.which){
            case 1:
                console.log(1);
            break;

            case 2:
                console.log(2);
            break;

            case 3:
                console.log(3);
            break;
            default:
                break;
        }
    }
}




appModule.component("tree",{
    templateUrl: "app/component/tree/tree.template.html",
    controller: TreeController,
    bindings: {
        filesystem : '<'
    }
});