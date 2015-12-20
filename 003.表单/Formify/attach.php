<?php
require("class.phpmailer.php");
//Variables Declaration
$name = "the Submitter";
$email_subject = "Feed Back";
$Email_msg ="A visitor submitted the following :\n";
$Email_to = "you@yourSite.com"; // the one that recieves the email
$email_from = "someone@someone.net";
$dir = "uploads/$filename";
chmod("uploads",0777);
$attachments = array();

checkType();

//------Check TYPE------\\	
function checkType() {	
	while(list($key,$value) = each($_FILES[attachment][type])){
		strtolower($value);
		if($value != "image/jpeg" AND  $value != "image/pjpeg" AND $value != "") {
			exit('Sorry , current format is <b>'.($value).'</b> ,only Jpeg or jpg are allowed.') ;
		}
	}
	
	checkSize();
	
	
}
//-------END OF Check TYPE--------\\



//---CheckSizeFunction ---\\
function checkSize(){
	global $result, $MV	,$errors,$BackLink;
	while(list($key,$value) = each($_FILES[attachment][size]))
	   {
	   	$maxSize = 5000000;
				if(!empty($value)){
					if ($value > $maxSize) {
						echo"Sorry this is a very big file .. max file size is $maxSize Bytes = 5 MB";
						exit();
					}
					else {
					$result =  "File size is ok :)<br>";
					
					}
		
		}
		
	  }	
		uploadFile();
	
}
//-------END OF Check Size--------\\





//==============upload File Function============\\

function uploadFile() {
	global $attachments;
	while(list($key,$value) = each($_FILES[attachment][name]))
				{
					
					if(!empty($value))
					{
							$filename = $value;
							array_push($attachments, $filename);
							$dir = "uploads/$filename";
							chmod("uploads",0777);
					         $success = copy($_FILES[attachment][tmp_name][$key], $dir);
					}
								
				}
										    
					           if ($success) {
								echo " Files Uploaded Successfully<BR>";
								SendIt();
	
									}else {
											exit("Sorry the server was unable to upload the files...");
										}
										
}
						
					

				
			

//======================================================================== PHP Mailer With ATtachment Func ===============================\\
function readMailSettings()
{
	global $SMTPSERVER,$SMTPPORT,$SMTPUSER,$SMTPPASSWORD,$ADMINEMAIL,$ADMINNAME;
	
	$file  = fopen('mail.config','r');
	while(!feof($file))
	{
		$setting = explode(':',fgets($file));
		//print_r($setting);	
		switch($setting[0])
		{
			case 'SMTPSERVER':
				$SMPTSERVER = $setting[1];
				break;
			case 'SMTPPORT':
				$SMTPPORT = $setting[1];
				break;
			case 'SMTPUSER':
				$SMPTUSER = $setting[1];
				break;
			case 'SMTPPASSWORD':
				$SMTPPASSWORD  = $setting[1];
				break;
			case 'ADMINEMAIL':
				$ADMINEMAIL = $setting[1];			
				break;
			case 'ADMINNAME':
				$ADMINNAME = $setting[1];
				break;			
		}	
	}
}
function SendIt() {
	

		global $attachments,$name,$Email_to,$Email_msg,$email_subject,$email_from;
		
		$mail = new PHPMailer();
		
		
		$mail->IsSMTP();// send via SMTP
		$mail->Host     = "localhost"; // SMTP servers
		$mail->SMTPAuth = false; // turn on/off SMTP authentication
		
		$mail->From     = $email_from;
		$mail->FromName = $name;
		$mail->AddAddress($Email_to); 
		$mail->AddReplyTo($email_from);
		$mail->WordWrap = 50;// set word wrap
	
			foreach($attachments as $key => $value) {  //loop the Attachments to be added ...
			$mail->AddAttachment("uploads"."/".$value);
		}
		$mail->Body = $Email_msg."Name : ".$name."\n";
								
		$mail->IsHTML(false);// send as HTML
		$mail->Subject  =  $email_subject;
		if(!$mail->Send())
		{
		   echo "Message was not sent <p>";
		   echo "Mailer Error: " . $mail->ErrorInfo;
		   exit;
		}
		
		echo "Message has been sent";
		// after mail is sent with attachments , delete the images on server ...
		foreach($attachments as $key => $value) {//remove the uploaded files ..
				unlink("uploads"."/".$value);
								}
		
	
}
	


?>
