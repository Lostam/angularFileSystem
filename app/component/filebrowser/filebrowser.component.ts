import {appModule} from "../../common/appModule";
import {FileSystemService} from "../../Services/filesystem.service";
export class FilebrowserController {

    filesystem:any;
    posX:string;
    posY:string;
    contextMenuToggle:boolean;
    contextMenuPosition:string;

    constructor(private $rootScope : any) {
        this.filesystem = new FileSystemService(this);
        this.contextMenuToggle = false;
        this.posX = "0px";
        this.posY = "0px";
        this.contextMenuPosition = "{top : this.posX ; left: this.posY}";
        this.rightClickListener();
    }

    turnContextOff(){
        this.contextMenuToggle = false;
    }

    rightClickListener () {
        this.$rootScope.$on('rightClick',(scope,event) =>{
            this.posX = (event.pageX).toString()+"px";
            this.posY = (event.pageY).toString()+"px";
            this.contextMenuToggle = true;
        });
    }
}

appModule.component("filebrowser",{
    templateUrl: "app/component/filebrowser/filebrowser.template.html",
    controller : FilebrowserController,
});
