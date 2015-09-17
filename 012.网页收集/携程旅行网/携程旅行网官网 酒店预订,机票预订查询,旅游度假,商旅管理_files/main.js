var configurationsPath = "configuration/",
    thirdPartyPath = "third-party/",
    originalPath = "original/",
    modulesPath = "modules/",
    helpersPath = "helper/",
    toolsPath = "tool/";

require.config({
    //baseUrl: 'SideBarSrc/',
    baseUrl: 'http://webresource.c-ctrip.com/ResCRMOnline/R2/Sidebar.Online/SideBarSrc/',

    shim: {
        cQuery: {
            exports: 'cQuery'
        },
        store: {
            exports: 'store'
        },
        mt: {
            exports: 'mt'
        },
        customConsole: {
            exports: 'customConsole'
        }
    },
    paths: {

        //configs
        'defaultCfg': configurationsPath + "defaultConfig",
        'mainCtrlCfg': configurationsPath + "mainControlConfig",

        //third-party
        'cQuery': thirdPartyPath + "cQuery",
        'store': thirdPartyPath + "store",
        'mt': thirdPartyPath + "mootools",
        'customConsole': thirdPartyPath + "console",

        //original
        'sideBar': originalPath + "sideBar",
        'animate': originalPath + "animate",
        'definition': originalPath + "definition",
        'access': originalPath + "access",
        'engine': originalPath + "engine",

        //tool
        'myImplementTool': toolsPath + "myImplementTool",
        'myHistoryTool': toolsPath + "myHistoryTool",
        'myFavoriteTool': toolsPath + "myFavoriteTool",
        'scanTool': toolsPath + "scanTool",
        'feedbackTool': toolsPath + "feedbackTool",
        'liveChatTool': toolsPath + "liveChatTool",
        'returnTopTool': toolsPath + "returnTopTool",
        'adTool': toolsPath + "adTool",
        'loggingTool': toolsPath + "loggingTool",
        'myCtripTool': toolsPath + "myCtripTool",

        //helper
        'webConsole': helpersPath + "webConsole",
        'expansion': helpersPath + "expansion",
        'verification': helpersPath + "verification",
        'communication': helpersPath + "communication",
        'dynLoad': helpersPath + "dynamicLoading",
        'cookie': helpersPath + "cookie",
        'jsHelper': helpersPath + "jsHelper",
        'route': helpersPath + "route"

    },
    waitSeconds: 15
});
require(['store', 'mt', "expansion", 'sideBar', 'communication', 'route'],
    function (store, mt, expansion, sideBar, communication, route) {
        console.log("Loading Completed!");

        window.COSB.sideBar = sideBar;

        window.COSB.hostName = route;

        //执行暂缓执行项
        $LAB.runQueue();
    });

