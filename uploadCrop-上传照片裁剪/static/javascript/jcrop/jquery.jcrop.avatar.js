;(function(){
    var jcrop_api, boundx, boundy, xsize1, ysize1, xsize2, ysize2, xsize3, ysize3,max_size="250 * 1024";
    var sjcrop = function(){}
    var that = window.sjcrop = new sjcrop();
    var ele_id = '';
    var $preview_dest = $('.preview_dest'); //显示裁切后的图像
    var $preview_src = $('.preview_src'); //显示原始图像
    var $preview_info = $('.preview_info');//显示裁切信息
    sjcrop.prototype.initImage = function(){
        xsize1 = $('.preview_dest').width();
        ysize1 = $('.preview_dest').height();
        // destroy Jcrop if it is existed
        if (typeof jcrop_api != 'undefined') {jcrop_api.destroy();}
        // initialize Jcrop
        $('.preview_src img').Jcrop({
            minSize: [200, 200], // min crop size
            setSelect: [0,0,200,200],
            aspectRatio : 1, // keep aspect ratio 1:1
            bgFade: true, // use fade effect
            bgOpacity: .3, // fade opacity
            onChange: that.updatePreview,
            onSelect: that.updatePreview,
            onRelease: that.clearInfo
        }, function(){
            // use the Jcrop API to get the real image size
            var bounds = this.getBounds();
            boundx = bounds[0];
            boundy = bounds[1];
            // Store the Jcrop API in the jcrop_api variable
            jcrop_api = this;
            // Move the preview into the jcrop container for css positioning
            //$('#preview-pane1').appendTo(jcrop_api.ui.holder);
            $(".crop_n").dblclick(function(){
               $('.preview_src').hide();
               $('.preview_dest').show();
               $('.submit_form').show();
            })
        });
    }
    // convert bytes into friendly format
    sjcrop.prototype.bytesToSize = function(bytes) {
        var sizes = ['Bytes', 'KB', 'MB'];
        if (bytes == 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };
    // check for selected crop region
    sjcrop.prototype.checkForm = function(ele) {
        ele_id = $("#" + ele);
        if (parseInt($('.file_width').val())) return true;
        // $('.file_error').html('Please select a crop region and then press Upload').show();
        console.log('请选择区域然后按上传');
        return false;
    };
    // Create variables (in this scope) to hold the Jcrop API and image size
    sjcrop.prototype.fileSelectHandler = function(ele) {
        ele_id = $("#" + ele);
        var oFile = $('.image_file')[0].files[0];
        var rFilter = /^(image\/jpeg|image\/png|gif\/png)$/i;
        // $('.file_error').hide();
        if (! rFilter.test(oFile.type)) {
            console.log('请选择图片格式的文件(jpg  png and gif)');
            // $('.file_error').html('Please select a valid image file (jpg and png are allowed)').show();
            return;
        }
        // check for file size
        if (oFile.size > 250 * 1024) {
            console.log('文件太大，请选择一个小文件');
            // $('.file_error').html('You have selected too big file, please select a one smaller image file').show();
            return;
        }
        // preview element
        var oImage = $(".preview_src img").get(0);
        var oImageP1 = $(".preview_dest img").get(0);
        // prepare HTML5 FileReader
        var oReader = new FileReader();
            oReader.onload = function(e) {
            // e.target.result contains the DataURL which we can use as a source of the image
            // oImage.src = oImageP1.src = oImageP2.src = oImageP3.src = e.target.result;
            oImage.src = oImageP1.src = e.target.result;
            oImage.onload = function () { // onload event handler
                // display some basic image info
                var sResultFileSize = that.bytesToSize(oFile.size);
                $preview_info.find('.file_size').val(sResultFileSize);
                $preview_info.find('.file_type').val(oFile.type);
                $preview_info.find('.file_dim').val(oImage.naturalWidth + ' x ' + oImage.naturalHeight);
                that.initImage();//初始化图片
            };
        };

        // read selected file as DataURL
        oReader.readAsDataURL(oFile); //转换
    }
    // clear info by cropping (onRelease event handler)
    sjcrop.prototype.clearInfo = function() {
        $preview_info.find('.file_width').val('');
        $preview_info.find('.file_height').val('');
    };
    // update cropping (onRelease event handler)
    sjcrop.prototype.updatePreview=function(c){
        var $px1 = ele_id.find('.x1'),$px2 = ele_id.find('.x2'),$py1 = ele_id.find('.y1'),$py2 = ele_id.find('.y2');
        $px1.val(c.x);
        $py1.val(c.y);
        $px2.val(c.x2);
        $py2.val(c.y2);
        $preview_info.find('.file_width').val(c.w);
        $preview_info.find('.file_height').val(c.h);
        if (parseInt(c.w) > 0){
            var rx = xsize1 / c.w;
            var ry = ysize1 / c.h;
            $('.preview_dest img').css({
                  width: Math.round(rx * boundx) + 'px',
                  height: Math.round(ry * boundy) + 'px',
                  marginLeft: '-' + Math.round(rx * c.x) + 'px',
                  marginTop: '-' + Math.round(ry * c.y) + 'px'
            });
        }
    };
})();







