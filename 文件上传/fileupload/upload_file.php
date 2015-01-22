<?php
/*
 $_FILES["file"]["name"] - 被上传文件的名称
 $_FILES["file"]["type"] - 被上传文件的类型
 $_FILES["file"]["size"] - 被上传文件的大小，以字节计
 $_FILES["file"]["tmp_name"] - 存储在服务器的文件的临时副本的名称
 $_FILES["file"]["error"] - 由文件上传导致的错误代码
 */
$up_maxsize = "2000000";
//定义上传文件大小,Byte
$up_savepath = "upload_shunzi";
//存储路径,相对于本文件
$up_rename = "._bak";
// //为了安全,重命名名字
// /*做大小判断，更人性化*/
// if ($up_maxsize > 1024)//做大小判断，更人性化
// {
	// if ($up_maxsize > 1048576) {
// 
		// $up_maxsize_notice = substr(($up_maxsize / 1048576), 0, 5) . " Mb";
	// } else {
		// $up_maxsize_notice = substr(($up_maxsize / 1024), 0, 5) . " Kb";
	// }
// } else {
	// $up_maxsize_notice = $up_maxsize . " Byte";
// }
// /*做大小判断，更人性化*/
// 
// if ($_GET['act'] == 11) {
	// /*下面检测文件大小*/
	// $file = $_FILES["file"];
	// if ($up_maxsize < $file["size"])
	// //检查文件大小
	// {
		// echo "<font color='red'>文件太大！</font>";
		// exit ;
	// }
	// /*上面检测文件大小*/
// 
	// /*下面是为上传图片而写*/
	// /*
	 // if ((($_FILES["file"]["type"] == "image/gif")
	 // || ($_FILES["file"]["type"] == "image/jpeg")
	 // || ($_FILES["file"]["type"] == "image/pjpeg"))
	 // && ($_FILES["file"]["size"] < $up_maxsize))
	 // */
	// if (($_FILES["file"]["size"] < $up_maxsize) and ($_FILES["file"]["size"] > 0)) {
		// if ($_FILES["file"]["error"] > 0) {
			// echo "Return Code: " . $_FILES["file"]["error"] . "<br />";
		// } else {
			// echo "文件名及路径:$up_savepath/" . $_FILES["file"]["name"] . "<br />";
			// echo "Type(文件类型): " . $_FILES["file"]["type"] . "<br />";
			// echo "Size(文件大小): " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
			// echo "Temp file(缓存地址): " . $_FILES["file"]["tmp_name"] . "<br />";
// 
			// if (file_exists("$up_savepath/" . $_FILES["file"]["name"] . $up_rename))//这里是不想改变文件名
			// {
				// echo "$up_savepath/" . $_FILES["file"]["name"] . $up_rename . " 已经存在. ";
			// } else {
				// $up_savepath1 = $up_savepath . "/";
				// if (!file_exists($up_savepath1)) {mkdir($up_savepath1);
				// }
				// move_uploaded_file($_FILES["file"]["tmp_name"], "$up_savepath/" . $_FILES["file"]["name"] . $up_rename);
				// echo "Stored in: " . "$up_savepath/" . $_FILES["file"]["name"] . $up_rename;
// 
			// }
		// }
	// } else {
		// echo "文件不能为空,也不能大于 $up_maxsize_notice";
	// }
	// exit ;
// }
echo $_FILES["file"]["name"];
?>