import {appModule} from "../../common/appModule";
import {FileSystem} from "../../Services/Services";
export class FilebrowserController {
    filesystem;

    constructor() {
        this.filesystem = new FileSystem (this);
        console.log(">>>>>>>>>>",this.filesystem);
        // this.filesystem = [
        //     {
        //         id: 0, name: "root-folder", children: [
        //         {
        //             id: 1, name: "folder1", children: [
        //             {id: 4, name: "file2", content: "yes", type: "file"}
        //         ], type: "folder"
        //         },
        //         {
        //             id: 2, name: "folder2", children: [], type: "folder"
        //         },
        //         {
        //             id: 3, name: "file1", content: 'this', type: "file"
        //         }
        //     ], type: "folder"
        //     }
        // ];
    };
}

 const filebrowser =  appModule.component("filebrowser",{
    templateUrl: "app/component/filebrowser/filebrowser.template.html",
    controller : FilebrowserController,
});
