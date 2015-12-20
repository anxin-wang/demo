/**
 * Created by Administrator on 2015/12/8.
 */
var oDragWrap = document.body;

//拖进
oDragWrap.addEventListener('dragenter', function(e) {
    e.preventDefault();
}, false);

//拖离
oDragWrap.addEventListener('dragleave', function(e) {
    dragleaveHandler(e);
}, false);

//拖来拖去 , 一定要注意dragover事件一定要清除默认事件
//不然会无法触发后面的drop事件
oDragWrap.addEventListener('dragover', function(e) {
    e.preventDefault();
}, false);

//扔
oDragWrap.addEventListener('drop', function(e) {
    dropHandler(e);
}, false);

var dropHandler = function(e) {
    e.preventDefault();

    var fileList = e.dataTransfer.files;　　//获取文件列表
    var img = document.createElement('img');

    //检测是否是拖拽文件到页面的操作
    if (fileList.length == 0) {return;};

    //检测文件是不是图片
    if (fileList[0].type.indexOf('image') === -1) {return;}

    if (window.URL.createObjectURL) {
        //FF4+
        img.src = window.URL.createObjectURL(fileList[0]);
    } else if (window.webkitURL.createObjectURL) {
        //Chrome8+
        img.src = window.webkitURL.createObjectURL(fileList[0]);
    } else {
        //实例化file reader对象
        var reader = new FileReader();

        reader.onload = function(e) {
            img.src = this.result;
            oDragWrap.appendChild(img);
        }
        reader.readAsDataURL(fileList[0]);
    }
}

var xhr = new XMLHttpRequest();
var url = 'http://upload.renren.com/......';
var boundary = '-----------------------' + new Date().getTime();
var fileName = file.name;

xhr.open("post", url, true);
xhr.setRequestHeader('Content-Type', 'multipart/form-data; boundary=' + boundary);

if (window.FormData) {
    //Chrome12+
    var formData = new FormData();
    formData.append('file', file);
    formData.append('hostid', userId);
    formData.append('requestToken', t);

    data = formData;
} else if (file.getAsBinary) {
    //FireFox 3.6+
    data = "--" +
        boundary +
        crlf +
        "Content-Disposition: form-data; " +
        "name=\"" +
        'file' +
        "\"; " +
        "filename=\"" +
        unescape(encodeURIComponent(file.name)) +
        "\"" +
        crlf +
        "Content-Type: image/jpeg" +
        crlf +
        crlf +
        file.getAsBinary() +
        crlf +
        "--" +
        boundary +
        crlf +
        "Content-Disposition: form-data; " +
        "name=\"hostid\"" +
        crlf +
        crlf +
        userId +
        crlf +
        "--" +
        boundary +
        crlf +
        "Content-Disposition: form-data; " +
        "name=\"requestToken\"" +
        crlf +
        crlf +
        t +
        crlf +
        "--" +
        boundary +
        '--';
}

xhr.send(data);