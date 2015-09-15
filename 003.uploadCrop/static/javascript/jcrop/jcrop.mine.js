;(function(){
    var jcrop_api, boundx, boundy, xsize1, ysize1, xsize2, ysize2, xsize3, ysize3;
    var sjcrop = function(){}
    var that = window.sjcrop = new sjcrop();
    var $preview_dest = $('.preview_dest'); //显示裁切后的图像
    var $preview_src = $('.preview_src'); //显示原始图像
    var $preview_info = $('.preview_info');//显示裁切信息
    // Create variables (in this scope) to hold the Jcrop API and image size
    sjcrop.prototype.fileSelectHandler = function() {
        var oFile = $('.image_file')[0].files[0];
        var rFilter = /^(image\/jpeg|image\/png|gif\/png)$/i;
        var oImage = $(".preview_src img").get(0);
        var oImageP1 = $(".preview_dest img").get(0);
        var oReader = new FileReader();
            oReader.onload = function(e) {
            oImage.src = oImageP1.src = e.target.result;
            oImage.onload = function () {
                $('.file_box').hide();
                var sResultFileSize = that.bytesToSize(oFile.size);
                $preview_info.find('.file_size').val(sResultFileSize);
                $preview_info.find('.file_type').val(oFile.type);
                $preview_info.find('.file_dim').val(oImage.naturalWidth + ' x ' + oImage.naturalHeight);
                that.initImage();//初始化图片
            };
        };
        oReader.readAsDataURL(oFile); //转换
    }
    sjcrop.prototype.initImage = function(){
        xsize1 = $('.preview_dest').width();
        ysize1 = $('.preview_dest').height();
        if (typeof jcrop_api != 'undefined') {jcrop_api.destroy();}
        $('.preview_src,.crop_image').show(); //显示裁切按钮
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
            var bounds = this.getBounds();
            boundx = bounds[0];
            boundy = bounds[1];
            jcrop_api = this;
            // $(".crop_n").dblclick(function(){
            //    $('.preview_src').hide();
            //    $('.preview_dest').show();
            //    $('.submit_form').show();
            // });
        });
        //显示裁切后区域
        $(".crop_image").on('click',function(){
           $('.preview_src,.crop_image').hide();
           $('.preview_dest,.submit_form').show();
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
    sjcrop.prototype.checkForm = function() {
        var dest = $('.preview_dest img');
        var options = {'w':$('.file_width').val(),'h':$('.file_height').val()};
        var data = that.getCroppedImageData(options);
        $('#image_canvas').val(data);
        if(data!=""){
            // $(".image_uploadForm").submit();
            window.location.href = data;
            return false;
        }
    };
    
    // clear info by cropping (onRelease event handler)
    sjcrop.prototype.clearInfo = function() {
        $preview_info.find('.file_width').val('');
        $preview_info.find('.file_height').val('');
    };
    // update cropping (onRelease event handler)
    sjcrop.prototype.updatePreview=function(c){
        var $px1 = $('.x1'),$px2 = $('.x2'),$py1 = $('.y1'),$py2 = $('.y2');
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
    sjcrop.prototype.getCroppedImageData = function(exportOptions) {
            var canvas, canvasContext, croppedSize, exportDefaults;
            var imageSrc = $('.preview_src .preview').attr('src');
            var image =  $('.preview_src .preview').get(0);
            var offset = {};
            if (!imageSrc) {
                return null;
            }
            exportDefaults = {
                type: "image/png",
                quality: .75,
                originalSize: false,
                fillBg: "#fff"
            };
            exportOptions = $.extend({}, exportDefaults, exportOptions);
            croppedSize = {
                w: exportOptions.w,
                h: exportOptions.h
            };
            offset = {
                x:exportOptions.x,
                y:exportOptions.y
            };
            canvas = $("<canvas />").attr({
                width: croppedSize.w,
                height: croppedSize.h
            }).get(0);
            canvasContext = canvas.getContext("2d");
            if (exportOptions.type === "image/jpeg") {
                canvasContext.fillStyle = exportOptions.fillBg;
                canvasContext.fillRect(0, 0, canvas.width, canvas.height);
            }
            canvasContext.drawImage(image,$('#x1').val(),$('#y1').val(),croppedSize.w,croppedSize.h,0,0,canvas.width,canvas.height);
            return canvas.toDataURL(exportOptions.type, exportOptions.quality);
        };
})();







