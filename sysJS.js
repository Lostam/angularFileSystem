SystemJS.config({
    packages: {
        app: {
            defaultExtension: "js"
        }
    },
    map: {
        "angular": "node_modules/angular/angular.js"
    },
    meta: {
        "angular": {
            format: "global"
        }
    }
});
SystemJS.import("bootstrap.js");