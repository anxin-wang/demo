<?php
session_start();
require_once('phpmailer/class.phpmailer.php');

$SMTPSERVER='';
$SMTPPORT='';
$SMTPUSER='';
$SMTPPASSWORD='';
$ADMINEMAIL='';
$ADMINNAME='';

$from = $_POST['email'];
$fullName= $_POST['from'];
$subject= $_POST['subject'];
$message= $_POST['message'];
$cc = $_POST['cc'];
$anonymous = $_POST['anonymous'];
$attachment = $_POST['attachment'];
$_SESSION['ctform'] = array(); // re-initialize the form session data
 $errors = array();  // initialize empty error array
// Only try to validate the captcha if the form has no errors
    // This is especially important for ajax calls
$captcha  = $_POST['code'];
if (sizeof($errors) == 0) {
    require_once dirname(__FILE__) . '/securimage/securimage.php';
		$securimage = new Securimage();    
     if ($securimage->check($captcha) == false) {
		$errors['captcha_error'] = 'Incorrect security code entered<br />';
	}
	 //echo 'Incorrect security code entered<br />';
}

if (sizeof($errors) == 0) {
  echo smtpmailer($from,$fullName,$subject,$message,$anonymous,$attachment);  
}
else
{
	echo $errors['captcha_error'];
}
function smtpmailer($from, $from_name, $subject, $body,$anonymous,$attachment) { 
global $SMTPSERVER,$SMTPPORT,$SMTPUSER,$SMTPPASSWORD,$ADMINEMAIL,$ADMINNAME;
global $cc;
	global $error;
	readMailSettings();	
	$to = $ADMINEMAIL;
	$mail = new PHPMailer();  // create a new object
	$mail->IsSMTP(); // enable SMTP
	$mail->IsMail();//enable email through php mail();
	//$mail->SMTPDebug = 0;  // debugging: 1 = errors and messages, 2 = messages only
	//$mail->SMTPAuth = true;  // authentication enabled
	//$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for Gmail
	//$mail->Host = $SMTPSERVER;
	//$mail->Port = $SMTPPORT; 
	//$mail->Username = $SMTPUSER;
	//$mail->Password = $SMTPPASSWORD;   

    $mail->IsHTML(true);
    if($anonymous == 'true')
    {
        $from= $to;
        $from_name = 'Anonymous';
    }
	$mail->SetFrom($from, $from_name);      
	$body .= "Is Anonymous: " . $anonymous;
    $mail->Subject = $subject;
	$mail->Body = $body;
	$mail->AddAddress($to);
    $attachmentFailed = false;
    $attachmentPath = "uploads"."/".$attachment;
    if(!empty($attachment))
    {       
        chmod("uploads",0777);
        if(file_exists($attachmentPath))
            $mail->AddAttachment($attachmentPath, $attachment);
        else
        {
            echo "Attachement failed";
            $attachmentFailed = true;
        }
    }
    if(!$attachmentFailed)
    {
	    if(!empty($cc))
		    $mail->AddCC($from);
	    if(!$mail->Send()) {
          if(!empty($attachment))
		     //echo  'Mail attachment error: '.$mail->ErrorInfo; 
             echo "Unable to attach your file at the moment, please try again later.";
          else
             return false;
      
	    } else {
		
            if(!empty($attachment))
                unlink($attachmentPath);
            
            return true;
	    }
    }
}
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
?>
