;(function()
{
	var defaults=
	{
		method:'post',
		action:'upload_file.php',
		success:function(data){}
	};
	$.fn.y_upload=function(setting)
	{
		return this.each(function()
		{
			var opt=$.extend({},defaults,setting);
			var $u=$(this);
			var t=Date.parse(new Date()).toString();

			var i='<iframe id="id-'+t+'" src="javascript:false" name="name-'+t+'" style="display:none;">'
			+'</iframe>';

			var f='<form action="'+opt.action+'" method="'+opt.method+'" enctype="multipart/form-data" target="name-'+t+'" style="display:none;">'
			+'</form>';

			var $i = $(i).appendTo(document.body);
			var $f = $(f).appendTo(document.body);
			$u.clone().insertAfter($u);
			$u.appendTo($f).removeAttr('id').removeAttr('class');
			$('<input type="submit" name="submit" value="Submit" />').appendTo($f);

			$f.submit(function()
			{
				$i.load(function()
				{
					var data=$i.contents().find('body').html().toString();
					console.log(data);
					opt.success(data);
					// var json=eval('json='+data);
					//opt.success(json);
					$i.remove();
					$f.remove();
				});
			});

			$f.find('input:submit').trigger('click');
		});
	};
	return $(this);
})(jQuery);
//调用
$(function()
{
	$(document).on('change','#file',function()
	{
		$(this).y_upload(
		{
			success:function(json)//上传成功后的函数，这里只支持json格式
			{
				
				$("#message").html('上传的文件是：'+json);
				// if(json.data==0)
				// {
					// //$wrap.html('<img src="'+json.info+'">');
				// }
				// else
				// {
					// $wrap.html('上传失败！');
				// }
			}
		});
	});
});