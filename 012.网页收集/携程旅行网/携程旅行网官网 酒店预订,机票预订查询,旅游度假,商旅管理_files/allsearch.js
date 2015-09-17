
var _search_page_id = ''; //申请一个pageid，
var _objAllSearchPageId = document.getElementById("page_id");
var _objAllSearchResult = document.getElementById("_allSearchResult");     //div.id = _allSearchResult
var _objAllSearchKeyword = document.getElementById("_allSearchKeyword");   //text.id = _allSearchKeyword

var _temp_only_mark_the_frist = 0;

var _last_click_hotel_id_from_search;
var _allSearchKeywordValue = "";
var _allSearchRequestTimeStamp = "";
var _tempInputValue = "";
var curIndex = 0;
var outerFormIsShit = 'FALSE';
var _search_placeHolder = "目的地/酒店/景点/关键字";
var _promotion_url = '';
 // $.mod.load('notice', '1.0', function(){
 //    $("#_allSearchKeyword").regMod("notice", "1.0", {
 //        name: "allSearchKeyword",
 //        tips: _search_placeHolder,
 //        selClass: "inputSel"
 //    }, false);
      
 //}); 

if (_objAllSearchKeyword.parentNode.getAttribute('class') == 'cui_search') {
    _objAllSearchKeyword.insertAdjacentHTML("beforeBegin", "<form action='http://www.ctrip.com' method='GET' target='_blank' name='test' id='_search_for_enter'/>");

    if (document.getElementById("_search_for_enter") != null) {
        outerFormIsShit = 'FALSE';
        document.getElementById("_search_for_enter").appendChild(_objAllSearchKeyword);
        document.getElementById("_search_for_enter").appendChild(document.getElementById("search_button_global"));
        //  document.getElementById("_search_for_enter").innerHTML += ("<div style='display:none' id='_justfor_form_get_submit'></div>");
        document.getElementById("_search_for_enter").insertAdjacentHTML('beforeEnd', "<div style='display:none' id='_justfor_form_get_submit'></div>");
    } else {
        outerFormIsShit = 'TRUE';
    }

}

var _objSearchFormForEnter = document.getElementById("_search_for_enter");
var _objSearchFormGetSubmit = document.getElementById("_justfor_form_get_submit");

_get_set_search_placeholder();

//<input id="_allSearchKeyword" onkeydown="_allSearchEnterIn(this,event);" onkeyup="_callMCtripData(this.value,event);" onfocus="_historyResultDiv();" placeholder="目的地/酒店/景点/关键字" autocomplete="off"/>
//<input id="_allSearchKeyword" onkeydown="_allSearchEnterIn(this,event);" onkeyup="_callMCtripData(this.value,event);" onfocus="_historyResultDiv();" type="text" style="color: gray;" autocomplete="off" />




//一开始load的时候处理一下定制的placeholder~~~要接口，顺便处理显示赋值
//对选中着色，检查有没有hovercss吧
function _mIn(ob) {

    _mOut();
    $(ob).addClass("hover");
    //  $(ob).firstChild.addClass("hover");
}



//对离开转为正常
function _mOut() {  //close 
    $(_objAllSearchResult).find('*').removeClass("hover");
}



function _get_set_search_placeholder() {

    var httpRequest = null;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        if (_navigatorMSIE() == 1 && window.XDomainRequest) {
            httpRequest = new XDomainRequest();
        } else {
            httpRequest = new XMLHttpRequest();
        }
    } else {// code for IE6, IE5
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }

	//生产
    var uri = "http://m.ctrip.com/restapi/QRWService/search?source=globalonline&action=tip";
    //Uat环境
    //var uri = "http://10.2.25.24:8140/QRWService/search?source=globalonline&action=tip";
   
    httpRequest.open("GET", uri, true);
    httpRequest.send(null);

    httpRequest.onload = function () {

       var jsons = httpRequest.responseText;
     //   var jsons = 'www|+|http://www.ctrip.com';

        if (jsons.indexOf('|+|') > 0) {
            _search_placeHolder = jsons.split('|+|')[0];
            _promotion_url = jsons.split('|+|')[1];
        } else {
            _search_placeHolder = jsons;
        }
        
        if ('placeholder' in _objAllSearchKeyword) {
            _objAllSearchKeyword.placeholder = _search_placeHolder;
        } else {
            _objAllSearchKeyword.value = _search_placeHolder;
            _objAllSearchKeyword.style.color = 'gray';
            //$.mod.load('notice', '1.0', function () {
            //    $("#_allSearchKeyword").regMod("notice", "1.0", {
            //        name: "allSearchKeyword",
            //        tips: _search_placeHolder,
            //        selClass: "inputSel"
            //    }, false);

            //});
        }
    }

    httpRequest.onerror = function () {

        var jsons = httpRequest.responseText;
        var status = httpRequest.status ;
    //    console.log("222222222222222222222222222222222222222"+status);

        if ('placeholder' in _objAllSearchKeyword) {
            _objAllSearchKeyword.placeholder = _search_placeHolder;
        } else {
            _objAllSearchKeyword.value = _search_placeHolder;
            _objAllSearchKeyword.style.color = 'gray';
            //$.mod.load('notice', '1.0', function () {
            //    $("#_allSearchKeyword").regMod("notice", "1.0", {
            //        name: "allSearchKeyword",
            //        tips: _search_placeHolder,
            //        selClass: "inputSel"
            //    }, false);

            //});
        }
    }

}

//选择最近一次的选择，通过return一个id
function _get_last_choice() {

    var newID;
    if ($('#borwsing_list .borwsing_hotel') && $('#borwsing_list .borwsing_hotel').length > 0) {
        var lastURL = $('#borwsing_list .borwsing_hotel')[0].firstChild.getAttribute('href');
        newID = lastURL.split('.html')[0].split('/').pop();

    }

    return newID || "0";
}


//attention!!!!!!!!!注意一下关于
//得到hover组件
function _getHover() {
    var m = 0;
    var aContentList = _objAllSearchResult.childNodes;
    if ($(aContentList[0]).text() == "历史搜索：" || $(aContentList[0]).text() == "无匹配的产品，您可以搜索：") {
        m = 1;
    } else {
        if (_objAllSearchResult.children.length == 0) {
            m = 1;
        } else {
            var inLIST = _objAllSearchResult.childNodes[0].childNodes;
            for (var innn = 0; innn < inLIST.length; innn++) {

                if (inLIST[innn].classList) {
                    if (inLIST[innn].classList.contains("hover")) {
                        return "0." + innn;
                    }
                } else {
                    if (inLIST[innn].className.indexOf("hover") != -1) {
                        return "0." + innn;
                    }
                }
            }
        }
    }


    for (; m < aContentList.length; m++) {

        if (aContentList[m].classList) {
            if (aContentList[m].classList.contains("hover")) {
                return m;
            }
        } else {
            if (!aContentList[m].className) {
                continue;
            }
            if (aContentList[m].className.indexOf("hover") != -1) {
                return m;
            }
        }
    }
    return -1;
}


function _getHoverIndex() {
    var m = 1;
    var aContentList = _objAllSearchResult.childNodes;
    if (!_objAllSearchResult.children.length) {
        return -2;
    }
    for (; m < aContentList.length; m++) {
        if (aContentList[m].classList) {
            if (aContentList[m].classList.contains("hover")) {
                return m;
            }
        } else {
            if (aContentList[m].className.indexOf("hover") != -1) {
                return m;
            }
        }
    }
    return -1;
}



//实际列表项数量（除去div和X）
function _getRealEleCount() {
    var list = _objAllSearchResult.childNodes;
    var len = list.length;
    if (list[len - 1].classList) {
        if (list[len - 1].classList.contains('search_close')) {
            return len - 2;
        } else {
            return len - 1;
        }
    } else {
        if (list[len - 1].className.indexOf('search_close') >= 0) {
            return len - 2;
        } else {
            return len - 1;
        }
    }
}


//跟onfocus事件响应重合了吧~~~所以产生了两次请求

//_objAllSearchKeyword.onclick = function (e) {
//    var keyword = _objAllSearchKeyword.value;
//    if (keyword == null || keyword.length == 0) {
//        _historyResultDiv();
//        return;
//    }
//    _drawOut(keyword)
//}


//点击搜索层外部就隐藏
document.onclick = function (e) {
    try {
        var ele = e ? e.target : window.event.srcElement;
        if (ele.id != '_allSearchResult' && ele.id != '_allSearchKeyword') {

            //  这里加处理！记录退回的时候的关键字
            //////////////////////////////////////////////////////////////////////////////////////////////
            //  _objAllSearchKeyword.value = "目的地/景点/关键字";
            _objAllSearchResult.style.display = "none";
            if (_objAllSearchKeyword.value == "" && !('placeholder' in _objAllSearchKeyword)) {
             _objAllSearchKeyword.value = _search_placeHolder;
            _objAllSearchKeyword.style.color = 'gray';
            }


            if (_temp_only_mark_the_frist == 1) {
                _temp_only_mark_the_frist = 0;
                window['__bfi'].push(['_tracklog', "WWW_SEARCH_AUTOCOMPLET_US", "searchType=LF&inputkeyword=\"" + _objAllSearchKeyword.value + "\""]);
            }
        }
    }
    catch (e) { }
};

//type转换
function _conversType(orType) { //hotel flight train vacation destination ticket tuan gs food 
    var type = orType;
    switch (orType) {
        case 'hotelbrand':
        case 'hotellist':
        case 'zone':
        case 'zonehotel':
        case 'hotel':
        case 'locationhotel':
        case 'poihotel':
        case 'channelhotel':
        case 'channelhotelsearch':
            type = 'hotel'; break;
        case 'travellist':
        case 'channeltravelsearch':
        case 'channeltravel':
        case 'channel_travel_group':
        case 'channel_travel_free':
		case 'sighthotel':
            type = 'vacation'; break;
        case 'ticket':
        case 'tickets':
        case 'channelticket':
        case 'channelticketsearch':
            type = 'ticket'; break;
        case 'intlairport':
        case 'channelplanesearch':
        case 'channelplane':
        case 'airporthotel':
        case 'flight':
        case 'airport':
            type = 'flight'; break;
        case 'metrostation':
        case 'railwaystation':
        case 'trainhotel':
        case 'channeltrainsearch':
        case 'channeltrain':
        case 'train':
            type = 'train'; break;
        case 'sight':
        case 'attractions':
            type = 'destination'; break;
        case 'fun':
		case 'play':
		case 'entertainment':
            type = 'play'; break;
        case 'shop':
		case 'shopping':
            type = 'shopping'; break;
        case 'channelgroup':
        case 'channeltuan':
        case 'channeltuansearch':
        case 'channelgroupsearch':
        case 'tuan':
            type = 'tuan'; break;
        case 'food':
            type = 'food'; break;
        case 'district':
        case 'hotdistrict':
        case 'location':
        case 'channelother':
            type = 'location'; break;
        case 'gs':
        case 'channelgs':
        case 'channelgssearch':
            type = 'gs'; break;

    }

    return 'ico_' + type;
}


//搜索button响应---如果有历史记录，走历史记录，如果没有历史记录那就不走历史记录---再次修改成form提交事件
document.getElementById("search_button_global").onclick = function (e) {
    //这个埋点单独处理一下
    //if ((_objAllSearchKeyword.value == '' || _objAllSearchKeyword.value == _search_placeHolder) && _promotion_url != '') {
    //    window.open(_promotion_url);
    //}

    if ('placeholder' in _objAllSearchKeyword) {
        if (_objAllSearchKeyword.value == '' && _promotion_url != '') {
            window.open(_promotion_url);
            return;
        }
    } else {
        if ((_objAllSearchKeyword.value == _search_placeHolder || _objAllSearchKeyword.value == '') && _promotion_url != '') {
            window.open(_promotion_url);
            return;
        }
    }


    var curr = 0;
    var pointKey = "";
    if ($(_objAllSearchResult.childNodes[0]).text().indexOf('无匹配的产品') >= 0) {
        pointKey = _objAllSearchResult.childNodes[1];
        pointKey.click();
        return;
    }
    if (_objAllSearchResult.childNodes[0].hasChildNodes()) {
        pointKey = _objAllSearchResult.childNodes[0].childNodes[0];
    } else {
        pointKey = _objAllSearchResult.childNodes[1];
    }
    pointKey.click();
}


//键盘事件响应：回车，上线键盘，输入内容的差异~~~~需要确认上下键的效果
function _allSearchEnterIn(obj, evt) {
    try {
        var evt = evt ? evt : (window.event ? window.event : null); //兼容IE和FF
        if (_objAllSearchKeyword.style.color == 'gray') {
            _objAllSearchKeyword.style.color = 'black'
        }


        if (evt.keyCode == 13) {

            if ($('#_allSearchResult').html() == '') {
                evt.preventDefault && evt.preventDefault();
                evt.stopPropagation && evt.stopPropagation();
                evt.returnValue = false;
                return;
            }

            var curr = _getHover();
            if (curr < 0) {
                if ($('#_search_history_upper').find('*').length != 0) {
                    curr = 0.0;
                } else {
                    curr = 1;
                }

                if ($(_objAllSearchResult).firstChild().text().indexOf('无匹配的产品') >= 0 || $(_objAllSearchResult).firstChild().text().indexOf('历史搜索') >= 0) {
                    curr = 1;
                }
            }
            var ob = "";
            if (curr < 1) {
                ob = $('#_search_history_upper')[0].children[10 * curr];
            } else {
                ob = _objAllSearchResult.childNodes[curr];
            }

            var word = $(ob).attr('word') || $(ob).attr('keyword');
            var dis = $(ob).attr('district') || $(ob).attr('dis');
            var url = $(ob).attr('url');
            var type = $(ob).attr('type');
            var func = $(ob).attr('onclick');
            var classname = $(ob).attr('class');

            if (func == "_delhistoryHref()") {

                evt.preventDefault && evt.preventDefault();
                evt.stopPropagation && evt.stopPropagation();
                evt.returnValue = false;
                _delhistoryHref();
                return;
            }



            if (url != null && url != '' && outerFormIsShit != 'TRUE') {

                var innerInputs = "";
                var host = url;
                if (url.indexOf("?") != -1) {
                    host = url.split("?")[0];
                    var conf = url.split("?")[1];
                    var confArr = conf.split("&");

                    for (var i = 0; i < confArr.length ; i++) {
                        var left = confArr[i].split("=")[0];
                        var right = confArr[i].split("=")[1];
                        innerInputs += "<input type='hidden' name =" + left + "  value=" + right + " />";
                    }
                }
                if (func == "_historyHref(this)") {
                    host += '#ctm_ref=www_hp_his_lst';

                    //innerInputs += "<input type='hidden' name ='#ctm_ref'  value='www_hp_his_lst' />";
                }
                if (func == "_dumpHref(this)") {
                    //  innerInputs += "<input type='hidden' name ='#ctm_ref'  value='www_hp_bs_lst' />";
                    host += '#ctm_ref=www_hp_bs_lst';
                }
                if (func == "_otherSearchHref(this)") {
                    //  innerInputs += "<input type='hidden' name ='\#ctm_ref'  value='www_hp_bs_lst' />";
                    host += '#ctm_ref=www_hp_bs_lst';
                }

                if (url && word) {
                    _addCookie(_allSearchHtmlEncode(word), dis || ' ', url);
                    if (type == 'hotel') {
                        _last_click_hotel_id_from_search = url.split('.html')[0].split('/').pop();
                    }
                }


                _objSearchFormGetSubmit.innerHTML = innerInputs;
                _objSearchFormForEnter.setAttribute('action', host);


                evt.returnValue = true;
            } else {
                evt.preventDefault && evt.preventDefault();
                evt.stopPropagation && evt.stopPropagation();
                evt.returnValue = false;
                return;
            }


            if (func == "_historyHref(this)") {

                //window['__bfi'].push(['_tracklog', "WWW_SEARCH_AUTOCOMPLET_US", "searchType=BS&AutoType=his&Yindex=" +
                // (_getHover() * 10 + 1) + "&keyword=\"" + ob.getAttribute('word') + "\"&inputkeyword=\"" + _objAllSearchKeyword.value + "\""]);
                window['__bfi'].push(['_tracklog', "WWW_SEARCH_AUTOCOMPLET_US", "searchType=HIS&keyword=\"" + word + "\""]);

            } else {
                window['__bfi'].push(['_tracklog', "WWW_SEARCH_AUTOCOMPLET_US", "searchType=BS&AutoType=" + ob.getAttribute('type') + "&Yindex=" +
                _getHover() + "&keyword=\"" + ob.getAttribute('word') + "\"&inputkeyword=\"" + _objAllSearchKeyword.value + "\""]);


                //这里可以埋点
                var docList = document.getElementById('_allSearchResult').childNodes;
                if (docList && docList.length == 3 &&
                   docList[0].getAttribute('type') == 'channeltravelsearch' &&
                 docList[2].getAttribute('type') == 'gs'
                   ) {
                    if (type == 'channeltravelsearch') {
                        window['__bfi'].push(['_tracklog', "WWW_SEARCH_AUTOCOMPLET_US_1", "searchType=TR&AutoType=" + ob.getAttribute('type') + "&Yindex=" +
                       _getHover() + "&keyword=\"" + ob.getAttribute('word') + "\"&inputkeyword=\"" + _objAllSearchKeyword.value + "\""]);

                    } else if (type == 'gs') {
                        window['__bfi'].push(['_tracklog', "WWW_SEARCH_AUTOCOMPLET_US_1", "searchType=GS&AutoType=" + ob.getAttribute('type') + "&Yindex=" +
                       _getHover() + "&keyword=\"" + ob.getAttribute('word') + "\"&inputkeyword=\"" + _objAllSearchKeyword.value + "\""]);

                    } else {
                    }
                }
            }



        }
        if (evt.keyCode == 38) {  //上下键怎么处理~~就是加hover，怎么做？！
            var curr = _getHover();
            var aContentList = _objAllSearchResult.childNodes;
            if ($(aContentList[0]).text() == "历史搜索：" || $(aContentList[0]).text() == "无匹配的产品，您可以搜索：") { //这个方式太丑了！找个方法规避一下！
                if (curr < 0) {
                    _mIn(aContentList[1]);
                    var v = aContentList[1].getAttribute('word');
                    if (v) {
                        _objAllSearchKeyword.value = v;
                    }
                }

                if (curr > 1) {
                    _mIn(aContentList[curr - 1]);
                    var v = aContentList[curr - 1].getAttribute('word');
                    if (v) {
                        _objAllSearchKeyword.value = v;
                    }
                }
            }
            else {
                if (curr < 0) {
                    var hoverob = aContentList[0];
                    if (hoverob.className == "search_list_history") {
                        hoverob = aContentList[0].firstChild;
                    }

                    _mIn(hoverob);
                    var v = hoverob.getAttribute('word') || hoverob.getAttribute('keyword');
                    if (v) {
                        _objAllSearchKeyword.value = v;
                    }
                }

                if (curr > 1) {
                    _mIn(aContentList[curr - 1]);
                    var v = aContentList[curr - 1].getAttribute('word');
                    if (v) {
                        _objAllSearchKeyword.value = v;
                    }
                }

                if (curr == 1) {
                    var tempDo = aContentList[0];
                    if (tempDo.hasChildNodes()) {
                        _mIn(tempDo.lastChild);
                        var v = tempDo.lastChild.getAttribute('keyword');
                        if (v) {
                            _objAllSearchKeyword.value = v;
                        }
                    }
                }

                if (curr < 1 && curr >= 0) {
                    var tempDo = aContentList[0];
                    var historyList = tempDo.childNodes;
                    var realCurr = 10 * curr;
                    if (realCurr > 0) {
                        var realP = historyList[realCurr - 1]
                        _mIn(realP);
                        var v = realP.getAttribute('keyword');
                        if (v) {
                            _objAllSearchKeyword.value = v;
                        }
                    }

                }
            }



        }
        if (evt.keyCode == 40) {
            var curr = _getHover();
            var aContentList = _objAllSearchResult.childNodes;
            var tempPo = 0;
            if ($(aContentList[0]).text() == "历史搜索：" || $(aContentList[0]).text() == "无匹配的产品，您可以搜索：") {

                if (curr < 0 || curr == _getRealEleCount()) {
                    _mIn(aContentList[1]);
                    var v = aContentList[1].getAttribute('word');
                    if (v) {
                        _objAllSearchKeyword.value = v;
                    }
                }

                if (curr >= 1 && curr < _getRealEleCount()) {
                    _mIn(aContentList[curr + 1]);
                    var v = aContentList[curr + 1].getAttribute('word');
                    if (v) {
                        _objAllSearchKeyword.value = v;
                    }
                }
            }
            else {
                if (curr < 0 || curr == _getRealEleCount()) {
                    if (!aContentList[0].hasChildNodes()) {
                        _mIn(aContentList[1]);
                        var v = aContentList[1].getAttribute('word');
                        if (v) {
                            _objAllSearchKeyword.value = v;
                        }
                    } else {
                        var historyList = aContentList[0].childNodes;
                        _mIn(historyList[0]);
                        var v = historyList[0].getAttribute('keyword');
                        if (v) {
                            _objAllSearchKeyword.value = v;
                        }
                    }
                }

                if (curr >= 1 && curr < _getRealEleCount()) {
                    _mIn(aContentList[curr + 1]);
                    var v = aContentList[curr + 1].getAttribute('word');
                    if (v) {
                        _objAllSearchKeyword.value = v;
                    }
                }

                if (curr >= 0 && curr < 1) {
                    var realCurr = 10 * curr;
                    if (realCurr == aContentList[0].children.length - 1) {
                        _mIn(aContentList[1]);
                        var v = aContentList[1].getAttribute('word');
                        if (v) {
                            _objAllSearchKeyword.value = v;
                        }
                    } else {
                        var innList = aContentList[0].childNodes;
                        _mIn(innList[realCurr + 1]);
                        var v = innList[realCurr + 1].getAttribute('keyword');
                        if (v) {
                            _objAllSearchKeyword.value = v;
                        }

                    }

                }
            }


        }

    }
    catch (e) { }
}

//html字串转义
function _allSearchHtmlEncode(text) {
    try {
        return text.replace(/&/g, '&amp').replace(/\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\+/g, '＋');
    }
    catch (e) { return ""; }
}


//判断是否IE，是否需要？！？！
function _navigatorMSIE() {
    userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("msie") >= 0) {
        return 1;
    }
    return 0;
}



//数据调用
function _callMCtripData(obj, evt) {

    try {
        var evt = evt ? evt : (window.event ? window.event : null); //兼容IE和FF
        if (evt.keyCode == 13 || evt.keyCode == 38 || evt.keyCode == 40) {
            return;
        }
    }
    catch (e) { }
    var keyword = obj;
    if (keyword == null || keyword.length == 0 || keyword.trim() == '') {
        _historyResultDiv();
        return;
    }
    _drawOut(keyword)
}


//抽象出一个公共的函数，专门用来跟后台打交道吧~~！！！！！
//服务于 三个：placeholder、热词  和 autocomplete
function _getServerMessage() {


}



//获取即时响应的autocomplete数据
//加一个逻辑！！！获取最新一次点击的
function _drawOut(keyword) {

    var httpRequest = null;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        if (_navigatorMSIE() == 1 && window.XDomainRequest) {
            httpRequest = new XDomainRequest();
        } else {
            httpRequest = new XMLHttpRequest();
        }
    } else {// code for IE6, IE5
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    //var uri = "http://10.2.25.24:8140/QRWService/search?source=globalonline&action=autocomplete&contentType=json&keyword=";
	//生产环境
	var uri = "http://m.ctrip.com/restapi/QRWService/search?source=globalonline&action=autocomplete&contentType=json&keyword=";
	//Uat环境
	//var uri = "http://10.2.25.24:8140/QRWService/search?source=globalonline&action=autocomplete&keyword=";

    uri += encodeURIComponent(_objAllSearchKeyword.value);
	//uri += _objAllSearchKeyword.value;
    var lastHotelId = _last_click_hotel_id_from_search || _get_last_choice();

    if (lastHotelId != 0) {
        uri += ("&hotelid=" + lastHotelId);
    }

    uri += "&t=" + (new Date()).valueOf();
    httpRequest.open("GET", uri, true);
    httpRequest.send(null);

    httpRequest.onload = function () {

      var jsons = httpRequest.responseText;
		
		//var jsons  = '{"head":{"auth":null,"errcode":0},"data":[{"word":"九寨沟","type":"hotdistrict","districtname":"阿坝","url":"http://you.ctrip.com/lvyou/jiuzhaigou25.html"},{"word":"九寨沟的全部酒店","type":"sighthotel","districtname":"九寨沟","url":"http://hotels.ctrip.com/hotel/jiuzhaigou91"},{"word":"九寨沟的全部旅游产品","type":"channeltravelsearch","districtname":"九寨沟","url":"http://vacations.ctrip.com/handler/search/do?keyword=%BE%C5%D5%AF%B9%B5"},{"word":"成都+九寨沟+黄龙6日跟团游(4钻)","type":"channel_travel_group","districtname":"926元/人起","url":"http://vacations.ctrip.com/grouptravel/p1619974s2.html"},{"word":"成都+九寨沟4-15日自由行","type":"channel_travel_free","districtname":"2515元起","url":"http://vacations.ctrip.com/freetravel/p22349s2.html"},{"word":"九寨沟风景区","type":"sight","districtname":"九寨沟排名前十","url":"http://you.ctrip.com/sight/jiuzhaigou25/77380.html"},{"word":"日则沟","type":"sight","districtname":"九寨沟","url":"http://you.ctrip.com/sight/jiuzhaigou25/2675.html"},{"word":"五花海","type":"sight","districtname":"九寨沟排名前十","url":"http://you.ctrip.com/sight/jiuzhaigou25/55329.html"},{"word":"五彩池","type":"sight","districtname":"九寨沟排名前十","url":"http://you.ctrip.com/sight/jiuzhaigou25/55425.html"},{"word":"树正沟","type":"sight","districtname":"九寨沟","url":"http://you.ctrip.com/sight/jiuzhaigou25/2674.html"},{"word":"镜海","type":"sight","districtname":"九寨沟","url":"http://you.ctrip.com/sight/jiuzhaigou25/55313.html"},{"word":"诺日朗瀑布","type":"sight","districtname":"九寨沟","url":"http://you.ctrip.com/sight/jiuzhaigou25/55308.html"},{"word":"长海","type":"sight","districtname":"九寨沟","url":"http://you.ctrip.com/sight/jiuzhaigou25/55427.html"},{"word":"熊猫海","type":"sight","districtname":"九寨沟","url":"http://you.ctrip.com/sight/jiuzhaigou25/55346.html"}]}';
        var node;
        if (typeof (JSON) == 'undefined') {
            node = eval("(" + jsons + ")");
        } else {
            node = JSON.parse(jsons);
        }

        if (node !== null && node.data !== null && node.data.length > 0) {
            _renderResult(keyword, node.data);
        } else {
            if (keyword !== '') {
                _renderNoResultDiv(keyword);
            } else {
                _historyResultDiv();
            }
        }
    };

}


//填充有内容浮层数据-----------新加对酒店的处理，一定多加注意！！！！

function _renderResult(keyword, rList) {
    var history_div_content = "";

    var cookie = _readCookie();
    if (cookie != null) {
        var cookies = cookie.split("#&&");
    } else {
        var cookies = new Array();
    }

    for (var c = cookies.length - 1; c >= 0; c--) {
        var r = cookies[c].split("#==");
        var rs = r[0].split("#--");

        var shortWord = rs[0];

        if (keyword.length > 1 && shortWord.indexOf(keyword) == 0) {
            //    console.log(shortWord + "11111111" + keyword);
            if (rs[1] == ' ') {
                history_div_content += '<a href="javascript:void(0);" url=' + r[1] + ' onClick="_historyHref(this)" keyword="' + rs[0] + '" dis=\"' + rs[1] + '\" onmouseenter=\"_mIn(this)\" onmouseleave=\"_mOut()\"><span class="first_item"><i class="ico_history"></i><strong>' + shortWord + '</strong></span></a>';
            } else {
                history_div_content += '<a href="javascript:void(0);" url=' + r[1] + ' onClick="_historyHref(this)" keyword="' + rs[0] + '" dis=\"' + rs[1] + '\" onmouseenter=\"_mIn(this)\" onmouseleave=\"_mOut()\"><span class="first_item"><i class="ico_history"></i><strong>' + shortWord + '</strong>,<span>' + rs[1] + '</span></span></a>';
            }

        }
    }

    var html = "";
    if (history_div_content != "") {
        html = '<div class="search_list_history" id="_search_history_upper" style="display:block;">' + history_div_content + '</div>';
    } else {
        html = '<div class="search_list_history" id="_search_history_upper" style="display:none;">' + history_div_content + '</div>';
    }


    for (var i = 0 ; i < rList.length ; i++) {
        var ll = rList[i];
        var dis = ll.districtname;
        if (!dis) {
            dis = ' ';
        }
        var tempWord = _allSearchHtmlEncode(ll.word);
        var displaytype = _conversType(ll.type);
        if (tempWord == "客栈" || tempWord == "民宿" || tempWord == "途家公寓" || tempWord == "租房" || tempWord == "公寓") {
            displaytype = 'ico_hotel';
        }

        if (tempWord == '更多城市') {
            continue;
        }
        if (tempWord == '携程宝' || tempWord == '礼品卡' || tempWord == '程涨宝' || tempWord == '任我游' || tempWord == '任我行' || tempWord == '任我住') {
            html += '<a href="javascript:void(0);" url=\"' + ll.url + '\"  word="' + tempWord + '" district=\"' + dis + '\"  type =' + ll.type + ' onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()">' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span>  ' + ll.districtname + '</span></a>';
        } else if (ll.type == 'hotel' || ll.type == 'sighthotel') {
            var starPic = "";
            if (ll.startype == "s" || ll.startype == "S") {
                starPic = "star";
            } else {
                starPic = "diamond";
            }
            switch (ll.star) {
                case '1.0':
                    starPic += "01"; break;
                case '2.0':
                    starPic += "02"; break;
                case '3.0':
                    starPic += "03"; break;
                case '4.0':
                    starPic += "04"; break;
                case '5.0':
                    starPic += "05"; break;
                case '6.0':
                    starPic += "06"; break;
                case '0.5':
                    starPic += "01_half"; break;
                case '1.5':
                    starPic += "02_half"; break;
                case '2.5':
                    starPic += "03_half"; break;
                case '3.5':
                    starPic += "04_half"; break;
                case '4.5':
                    starPic += "05_half"; break;
                case '5.5':
                    starPic += "06_half"; break;
                default:
                    starPic += "00";;
            }

            //if (ll.costlowerpercent && ll.costlowerpercent >= 10 && ll.costlowerpercent <= 50) {
            //    html += '<div class="search_list_hotel" title=\"' + tempWord + ' , ' + (ll.zonename || dis) + '\" url=\"' + ll.url + '\" word="' + tempWord + '" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="ico_hotel"></i><p class="search_hotel_name" >' + tempWord + '<span>' + (ll.zonename || dis) + '</span></p><span class="search_hotel_grade cui_' + starPic + '"></span><span class="search_hotel_price"><dfn>￥</dfn>' + ll.limitprice + '起</span> <span class="search_hotel_notes">比附近同级低<span>' + ll.costlowerpercent + '%</span></span> </div>'
            //} else {
            //    html += '<div class="search_list_hotel" title=\"' + tempWord + ' , ' + (ll.zonename || dis) + '\" url=\"' + ll.url + '\" word="' + tempWord + '" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="ico_hotel"></i><p class="search_hotel_name" >' + tempWord + '<span>' + (ll.zonename || dis) + '</span></p><span class="search_hotel_grade cui_' + starPic + '"></span><span class="search_hotel_price"><dfn>￥</dfn>' + ll.limitprice + '起</span> </span> </div>'
            //}


            var priceDescription = ' <span class="search_hotel_price"><dfn>￥</dfn>' + ll.limitprice + '起</span>';
            if (ll.limitprice == undefined || ll.limitprice == null || ll.limitprice == 0 || ll.limitprice == "0.0") {
                priceDescription = ' <span class="search_hotel_price">实时计价</span>'
            }

            var title = tempWord;
            if (ll.zonename || dis != ' ')
                title += (' , ' + (ll.zonename || dis));
				
			//sighthotel类型样式规避方案，框架提供css样式，此方案作废start	
			//var sighthotelHightStyle = "";
		    //if( ll.type == 'sighthotel'){
				//sighthotelHightStyle = 'style="height:20px;text-overflow:ellipsis"';
			//}else{
				//sighthotelHightStyle = '';
			//}
			//end

            if (starPic.indexOf("00") != -1) {
                if (ll.costlowerpercent && ll.costlowerpercent >= 10 && ll.costlowerpercent <= 50) {
					if (ll.type == 'sighthotel') {
						html += '<div class="search_list_vacation" title=\"' + title + '\" url=\"' + ll.url + '\" word="' + tempWord + '" type=\"'+ll.type+'\" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="' + displaytype + '"></i><p class="search_hotel_name" >' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span> ' + (ll.zonename || dis) + '</span></p><span class="search_hotel_grade cui_' + starPic + '"></span>' + priceDescription + ' <span class="search_hotel_notes">比附近同级低<span>' + ll.costlowerpercent + '%</span></span> </div>'
					}else{
						html += '<div class="search_list_hotel" title=\"' + title + '\" url=\"' + ll.url + '\" word="' + tempWord + '" type=\"'+ll.type+'\" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="' + displaytype + '"></i><p class="search_hotel_name" >' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span> ' + (ll.zonename || dis) + '</span></p><span class="search_hotel_grade cui_' + starPic + '"></span>' + priceDescription + ' <span class="search_hotel_notes">比附近同级低<span>' + ll.costlowerpercent + '%</span></span> </div>'
					}
                    //html += '<div class="search_list_hotel" '+sighthotelHightStyle+' title=\"' + title + '\" url=\"' + ll.url + '\" word="' + tempWord + '" type=\"'+ll.type+'\" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="' + displaytype + '"></i><p class="search_hotel_name" >' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span> ' + (ll.zonename || dis) + '</span></p><span class="search_hotel_grade cui_' + starPic + '"></span>' + priceDescription + ' <span class="search_hotel_notes">比附近同级低<span>' + ll.costlowerpercent + '%</span></span> </div>'
                } else {
					if (ll.type == 'sighthotel') {
						html += '<div class="search_list_vacation" title=\"' + title + '\" url=\"' + ll.url + '\" word="' + tempWord + ' "type=\"'+ll.type+'\" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="' + displaytype + '"></i><p class="search_hotel_name" >' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span> ' + (ll.zonename || dis) + '</span></p>' + priceDescription + '</span> </div>'
					}else{
						html += '<div class="search_list_hotel" title=\"' + title + '\" url=\"' + ll.url + '\" word="' + tempWord + ' "type=\"'+ll.type+'\" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="' + displaytype + '"></i><p class="search_hotel_name" >' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span> ' + (ll.zonename || dis) + '</span></p>' + priceDescription + '</span> </div>'
					}
                    //html += '<div class="search_list_hotel" '+sighthotelHightStyle+' title=\"' + title + '\" url=\"' + ll.url + '\" word="' + tempWord + ' "type=\"'+ll.type+'\" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="' + displaytype + '"></i><p class="search_hotel_name" >' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span> ' + (ll.zonename || dis) + '</span></p>' + priceDescription + '</span> </div>'
                }
            } else {
                if (ll.costlowerpercent && ll.costlowerpercent >= 10 && ll.costlowerpercent <= 50) {
                    //html += '<div class="search_list_hotel" '+sighthotelHightStyle+' title=\"' + title + '\" url=\"' + ll.url + '\" word="' + tempWord + '" type=\"'+ll.type+'\" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="' + displaytype + '"></i><p class="search_hotel_name" >' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span> ' + (ll.zonename || dis) + '</span></p><span class="search_hotel_grade cui_' + starPic + '"></span>' + priceDescription + '  <span class="search_hotel_notes">比附近同级低<span>' + ll.costlowerpercent + '%</span></span> </div>'
					if(ll.type == 'sighthotel'){
						html += '<div class="search_list_vacation" title=\"' + title + '\" url=\"' + ll.url + '\" word="' + tempWord + '" type=\"'+ll.type+'\" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="' + displaytype + '"></i><p class="search_hotel_name" >' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span> ' + (ll.zonename || dis) + '</span></p><span class="search_hotel_grade cui_' + starPic + '"></span>' + priceDescription + '  <span class="search_hotel_notes">比附近同级低<span>' + ll.costlowerpercent + '%</span></span> </div>'
					}else{
						html += '<div class="search_list_hotel" title=\"' + title + '\" url=\"' + ll.url + '\" word="' + tempWord + '" type=\"'+ll.type+'\" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="' + displaytype + '"></i><p class="search_hotel_name" >' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span> ' + (ll.zonename || dis) + '</span></p><span class="search_hotel_grade cui_' + starPic + '"></span>' + priceDescription + '  <span class="search_hotel_notes">比附近同级低<span>' + ll.costlowerpercent + '%</span></span> </div>'
					}
                } else {
                    //html += '<div class="search_list_hotel" '+sighthotelHightStyle+' title=\"' + title + '\" url=\"' + ll.url + '\" word="' + tempWord + '" type=\"'+ll.type+'\" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="' + displaytype + '"></i><p class="search_hotel_name" >' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span> ' + (ll.zonename || dis) + '</span></p><span class="search_hotel_grade cui_' + starPic + '"></span>' + priceDescription + '  </span> </div>'
                    if(ll.type == 'sighthotel'){
						html += '<div class="search_list_vacation" title=\"' + title + '\" url=\"' + ll.url + '\" word="' + tempWord + '" type=\"'+ll.type+'\" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="' + displaytype + '"></i><p class="search_hotel_name" >' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span> ' + (ll.zonename || dis) + '</span></p><span class="search_hotel_grade cui_' + starPic + '"></span>' + priceDescription + '  </span> </div>'
					}else{
						html += '<div class="search_list_hotel" title=\"' + title + '\" url=\"' + ll.url + '\" word="' + tempWord + '" type=\"'+ll.type+'\" district=\"' + (ll.zonename || dis) + '\" onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()" > <i class="' + displaytype + '"></i><p class="search_hotel_name" >' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span> ' + (ll.zonename || dis) + '</span></p><span class="search_hotel_grade cui_' + starPic + '"></span>' + priceDescription + '  </span> </div>'
					}
					
					//      html += '<a href="javascript:void(0);" url=\"' + ll.url + '\"  word="' + tempWord + '" district=\"' + dis + '\"  type =' + ll.type + ' onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()"><i class="' + displaytype + '"></i>' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span>  ' + ll.districtname + '</span></a>';

                }
            }

        } else {
            html += '<a href="javascript:void(0);" url=\"' + ll.url + '\"  word="' + tempWord + '" district=\"' + dis + '\"  type =' + ll.type + ' onclick="_dumpHref(this)" onmouseenter="_mIn(this)" onmouseleave="_mOut()"><i class="' + displaytype + '"></i>' + ll.word.split(keyword).join("<strong>" + keyword + "</strong>") + '<span>  ' + ll.districtname + '</span></a>';
        }
    }
    html += '<a class="search_close" onclick="this.parentNode.style.display=\'none\'">×</a>';
    _objAllSearchResult.innerHTML = html;
    _objAllSearchResult.style.display = "block";
}



//页面跳转前，逻辑处理,存cookie，还有 新酒店的咋办？！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
function _dumpHref(ob) {

    var word = ob.getAttribute('word');
    var dis = ob.getAttribute('district') || ' ';
    var url = ob.getAttribute('url');
    var type = ob.getAttribute('type');
    var classname = ob.getAttribute('class');

    //////////////////////////////////////////////////////////////////////////////////////////////////////
    _addCookie(_allSearchHtmlEncode(word), dis, url);//怎么放cookie~~~首字在哪里？？！
    if (type == 'hotel') {
        _last_click_hotel_id_from_search = url.split('.html')[0].split('/').pop();
    }

    //这里可以埋点
    window.open(url + '#ctm_ref=www_hp_bs_lst');


    if (classname == 'search_list_history') {

        window['__bfi'].push(['_tracklog', "WWW_SEARCH_AUTOCOMPLET_US", "searchType=BS&AutoType=his&Yindex=" +
         (_getHover() * 10 + 1) + "&keyword=\"" + ob.getAttribute('word') + "\"&inputkeyword=\"" + _objAllSearchKeyword.value + "\""]);

    } else {
        window['__bfi'].push(['_tracklog', "WWW_SEARCH_AUTOCOMPLET_US", "searchType=BS&AutoType=" + ob.getAttribute('type') + "&Yindex=" +
       _getHover() + "&keyword=\"" + ob.getAttribute('word') + "\"&inputkeyword=\"" + _objAllSearchKeyword.value + "\""]);
    }


}


//阻止工作
function _doNothing(evt) {
    var evt = evt ? evt : (window.event ? window.event : null); //兼容IE和FF
    evt.preventDefault && evt.preventDefault();          //
    evt.stopPropagation && evt.stopPropagation();
    evt.returnValue = false;
}

//填充无结果数据
function _renderNoResultDiv(keyword) {
    var l = _getCityId();
    var city = _getCityId() || '2';
    var encodeKeyword = encodeURIComponent(_allSearchHtmlEncode(keyword));
    var html = "<div onclick=\"_doNothing(event)\">无匹配的产品，您可以搜索：</div>" +
             "<a href=\"javascript:void(0);\" url=\"http://you.ctrip.com/Searchsite/?query=" + encodeKeyword + "\" onclick=\"_otherSearchHref(this)\"  onmouseenter=\"_mIn(this)\"  onmouseleave=\"_mOut()\"><i class=\"ico_gs\"></i>“" + keyword + "”相关的攻略</a>" +
              "<a href=\"javascript:void(0);\" url=\"http://hotels.ctrip.com/hotel/sz" + city + "/k1" + encodeKeyword + "\"  onclick=\"_otherSearchHref(this)\" onmouseenter=\"_mIn(this)\"  onmouseleave=\"_mOut()\"><i class=\"ico_hotel\"></i>“" + keyword + "”相关的酒店</a>" +
              "<a href=\"javascript:void(0);\" url=\"http://vacations.ctrip.com/whole-2B126-U-" + city + "/?searchValue=" + encodeKeyword + "&searchText=" + encodeKeyword + "\" onclick=\"_otherSearchHref(this)\"  onmouseenter=\"_mIn(this)\" onmouseleave=\"_mOut()\" ><i class=\"ico_vacation\"></i>“" + keyword + "”相关的旅游产品</a>" +
              "<a href=\"javascript:void(0);\" url=\"http://piao.ctrip.com/piao.html?keyword=" + encodeKeyword + "\" onclick=\"_otherSearchHref(this)\"  onmouseenter=\"_mIn(this)\" ><i class=\"ico_ticket\" onmouseleave=\"_mOut()\"></i>“" + keyword + "”相关的门票</a>" +
              "<a href=\"javascript:void(0);\" url=\"http://tuan.ctrip.com/group/city_" + city + "/hotelname_" + encodeKeyword + "/k_" + encodeKeyword + "/\" onclick=\"_otherSearchHref(this)\"  onmouseenter=\"_mIn(this)\" onmouseleave=\"_mOut()\"><i class=\"ico_tuan\"></i>“" + keyword + "”相关的团购</a>" +
              "<a class=\"search_close\" onclick=\"this.parentNode.style.display=\"none\";_objAllSearchResult.style.display = \"none\";\">×</a>";
    _objAllSearchResult.innerHTML = html;
    //_objAllSearchKeyword.value = keyword;
    _objAllSearchResult.style.display = "block";
}

//获得城市id---这个也不对！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
function _getCityId() {
    var httpRequest = null;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        if (_navigatorMSIE() == 1 && window.XDomainRequest) {
            httpRequest = new XDomainRequest();
        } else {
            httpRequest = new XMLHttpRequest();
        }
    } else {// code for IE6, IE5
        httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
    }
    var uri = "http://m.ctrip.com/restapi/QRWService/search?action=cityname";
    httpRequest.open("GET", uri, true);
    httpRequest.send(null);

    httpRequest.onload = function () {
        var jsons = httpRequest.responseText;
        var node;
        if (typeof (JSON) == 'undefined') {
            node = eval("(" + jsons + ")");
        } else {
            node = JSON.parse(jsons);
        }

        var cityId = node.data.cityid;
        return cityId;
    }
}

//写cookie~~cookie的使用方法
function _addCookie(keyword, distinct, url) {

    keyword = _allSearchHtmlEncode(keyword);
    var thisCookieKey = keyword + "#--" + distinct;
    var thisCookie = keyword + "#--" + distinct + "#==" + url;

    var cookie = _readCookie();
    if (cookie != null) {
        var cookies = cookie.split("#&&");
    } else {
        var cookies = new Array();
    }

    for (var c = 0; c < cookies.length; c++) {
        var cookieKey = cookies[c].split("#==");
        if (cookieKey.length > 1) {
            if (cookieKey[0] == thisCookieKey) {
                return;
            }
        }
    }

    if (cookies.length == 5) {
        cookies.shift();
    }
    cookies.push(thisCookie);

    var result = cookies.join("#&&");
    var str = "SearchHistoryWord" + "=" + escape(result);
    var date = new Date();
    var ms = 30 * 24 * 3600 * 1000;
    date.setTime(date.getTime() + ms);
    str += "; expires=" + date.toGMTString();

    document.cookie = str;
}

//读取cookie
function _readCookie() {

    var all = document.cookie;
    if (all == "") {
        return null;
    }
    var list = all.split("; ");
    for (var i = 0; i < list.length; i++) {
        var cips = list[i].split("=");
        var name = cips[0];
        var value = cips[1];
        if (name == "SearchHistoryWord") {
            var result = unescape(value);
            if (result != null) {
                return result;
            }
        }
    }
    return null;
}

function _delhistoryHref() {
    var cookie = _readCookie();
    try {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = "SearchHistoryWord=a; expires=" + date.toGMTString();

        if (_objSearchFormForEnter) {
            _objSearchFormForEnter.setAttribute('action', 'http://www.ctrip.com');
        }


        //  !!!!!!!!!!!!!!!!!!!!!!!!!!!

    } catch (ev) {

    } finally {
        _historyResultDiv();
        return false;
    }

}

//删除单条cookie------暂时不用的
function _deleteCookie(e) {
    // alert(this);
    var cookie = _readCookie();
    var kword = e.currentTarget.parentElement.getAttribute('keyword');
    var kdis = e.currentTarget.parentElement.getAttribute('dis');
    var word = kword + '#--' + kdis;
    try {
        if (cookie != null) {
            var cookies = cookie.split("#&&");
            for (var c = 0; c < cookies.length; c++) {
                var cookieKey = cookies[c].split("#==");
                if (cookieKey[0] == word) {
                    cookies.splice(c, 1);
                }
            }

            if (cookies.length != 0) {
                var result = cookies.join("#&&");
                var str = "SearchHistoryWord=" + escape(result);
                var date = new Date();
                var ms = 30 * 24 * 3600 * 1000;
                date.setTime(date.getTime() + ms);
                str += "; expires=" + date.toGMTString();
                document.cookie = str;
            } else {
                var date = new Date();
                date.setTime(date.getTime() - 10000);
                document.cookie = "SearchHistoryWord=a; expires=" + date.toGMTString();
            }
        }
    } catch (ev) {
        // alert(1234);
    } finally {
        cookie = _readCookie();
        if (cookie == null) {
            _hideHistory();
        } else {
            var cookies = cookie.split("#&&");
            if (cookies.length == 0) {
                _hideHistory();
            }
        }

        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
        _historyResultDiv();
        return false;
    }


}

//隐藏历史
function _hideHistory() {
    _objAllSearchResult.style.display = "none";
}

//点击历史跳转
function _historyHref(ob) {

    window.open(ob.getAttribute('url') + '#ctm_ref=www_hp_his_lst');
    window['__bfi'].push(['_tracklog', "WWW_SEARCH_AUTOCOMPLET_US", "searchType=HIS&keyword=\"" + ob.getAttribute('keyword') + "\""]);
}

//点击热词跳转
function _hotHref(ob) {
    window.open(ob.getAttribute('url'));
    window['__bfi'].push(['_tracklog', "WWW_SEARCH_AUTOCOMPLET_US", "searchType=HOT&keyword=\"" + ob.getAttribute('keyword') + "\""]);
    //埋点
}

//点击在其他频道搜索的响应
function _otherSearchHref(ob) {
    var word = $(ob).text();
    var dis = ob.getAttribute('district') || ' ';
    var url = ob.getAttribute('url');
    // var type = ob.getAttribute('type');
    var channel = word.slice(-2);
    if (channel == '产品') {
        channel = '旅游';
    }
    _addCookie(word, dis, url);
    window.open(url + '#ctm_ref=www_hp_bs_lst');
    window['__bfi'].push(['_tracklog', "WWW_SEARCH_AUTOCOMPLET_US", "searchType=NR&keyword=\"" + channel + "\"&inputkeyword=\"" + _objAllSearchKeyword.value + "\""]);
}

//画历史。
function _historyResultDiv() {
    // alert(_objAllSearchKeyword.value（）);
    _temp_only_mark_the_frist = 1;
    if (_objAllSearchKeyword.value && _objAllSearchKeyword.value.trim() != '' && _objAllSearchKeyword.value != _search_placeHolder) {
        _drawOut(_objAllSearchKeyword.value);
        return;
    }
    var html = '';
    var cookie = _readCookie();
    if (cookie != null) {
        var cookies = cookie.split("#&&");
        html += '<div  onclick=\"_doNothing(event)\">历史搜索：</div>';
        for (var c = cookies.length - 1; c >= 0; c--) {
            var r = cookies[c].split("#==");
            var rs = r[0].split("#--");
            var shortWord = rs[0];
            html += '<a class= "history_link " href="javascript:void(0);" url=' + r[1] + ' onClick="_historyHref(this)" keyword="' + rs[0] + '" dis=\"' + rs[1] + '\" onmouseenter=\"_mIn(this)\" onmouseleave=\"_mOut()\">' + shortWord + '<span>  ' + rs[1] + '</span></a>';
        }
        html += '<a class= "history_link " href="javascript:void(0);"  onClick="_delhistoryHref()" onmouseenter=\"_mIn(this)\" onmouseleave=\"_mOut()\"><span> 清除历史搜索记录 </span></a>';
    }

    if (html != '') {
        _objAllSearchResult.innerHTML = html;
        _objAllSearchResult.style.display = "block";
    } else {
        _objAllSearchResult.innerHTML = html;
        _objAllSearchResult.style.display = "none";
    }
    _objAllSearchKeyword.value = "";
    window['__bfi'].push(['_tracklog', "WWW_SEARCH_AUTOCOMPLET_US", "searchType=FO&inputkeyword=\"noinputstatus\""]);
}

