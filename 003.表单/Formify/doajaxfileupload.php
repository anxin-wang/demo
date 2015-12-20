<?php
	$error = "";
	$msg = "";
	$fileElementName = 'attachment';
    chmod("uploads",0777);
	if(!empty($_FILES[$fileElementName]['error']))
	{
		switch($_FILES[$fileElementName]['error'])
		{

			case '1':
				$error = 'The uploaded file exceeds the upload_max_filesize directive in php.ini';
				break;
			case '2':
				$error = 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form';
				break;
			case '3':
				$error = 'The uploaded file was only partially uploaded';
				break;
			case '4':
				$error = 'No file was uploaded.';
				break;

			case '6':
				$error = 'Missing a temporary folder';
				break;
			case '7':
				$error = 'Failed to write file to disk';
				break;
			case '8':
				$error = 'File upload stopped by extension';
				break;
			case '999':
			default:
				$error = 'No error code avaiable';
		}
	}elseif(empty($_FILES['attachment']['tmp_name']) || $_FILES['attachment']['tmp_name'] == 'none')
	{
		$error = 'No file was uploaded..';
	}else 
	{	
			if (file_exists("uploads/" . $_FILES["attachment"]["name"]))
			{
				//echo $_FILES["attachment"]["name"] . " already exists. ";
                @unlink("uploads"."/".$_FILES["attachment"]["name"]);
			}
			                 
                  $msg = $_FILES["attachment"]["name"];
				  move_uploaded_file($_FILES["attachment"]["tmp_name"],
				  "uploads/" . $_FILES["attachment"]["name"]);
			
			
	}		
	echo "{";
	echo				"error: '" . $error . "',\n";
	echo				"attachment: '" . $msg . "'\n";
	echo "}";
?>