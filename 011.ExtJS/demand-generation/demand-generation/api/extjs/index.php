<?php
header('content-type: application/json');
if(isset($_POST)){

$data = json_decode(stripslashes($_POST['data']));
$method = $data->methodName;

	switch($method){
	case 'showTestEmailQueue':
		$r = '{"success":false}';
		break;

	case 'getTemplateList':
		$subtype = $data->params->subType;
		if($subtype == 'Empty folder '){
			$r = '{"success":true,"total":"0","data":[]}';
		} else 
		$r = '{"success":true,"total":"12","data":[{"id":"000GbJ8000eI040001","name":"Template name that is lon..","subType":"Company templates","screenshot":"resources\/images\/template-1.png"},{"id":"000GbJ8000eT040001","name":"generic-right-sidebar","subType":"Company templates","screenshot":"resources\/images\/template-2.png"},{"id":"000GbJ8000ed040001","name":"generic-single-column","subType":"Company templates","screenshot":"resources\/images\/template-3.png"},{"id":"000GbJ80012v040001","name":"template-1-left-sidebar","subType":"Company templates","screenshot":"resources\/images\/template-4.png"},{"id":"000GbJ80015_040001","name":"template-2-single-column","subType":"Company templates","screenshot":"resources\/images\/template-5.png"},{"id":"000GbJ80015i040001","name":"template-4-left-sidebar","subType":"Company templates","screenshot":"resources\/images\/template-6.png"},{"id":"000GbJ8000eI040001","name":"Template name that is lon..","subType":"Company templates","screenshot":"resources\/images\/template-1.png"},{"id":"000GbJ8000eT040001","name":"generic-right-sidebar","subType":"Company templates","screenshot":"resources\/images\/template-2.png"},{"id":"000GbJ8000ed040001","name":"generic-single-column","subType":"Company templates","screenshot":"resources\/images\/template-3.png"},{"id":"000GbJ80012v040001","name":"template-1-left-sidebar","subType":"Company templates","screenshot":"resources\/images\/template-4.png"},{"id":"000GbJ80015_040001","name":"template-2-single-column","subType":"Company templates","screenshot":"resources\/images\/template-5.png"},{"id":"000GbJ80015i040001","name":"template-4-left-sidebar","subType":"Company templates","screenshot":"resources\/images\/template-6.png"}]}';
		break;
		
	case 'getSubType':
		$r = '{"success":true,"data":[{"subType":"Pre-built Templates  (12)"},{"subType":"Tenant Created folder (14)"},{"subType":"Tenant folder (13)"},{"subType":"Empty folder (0)"},{"subType":"Tenant folder (29)"},{"subType":"Folder with a really long name just (0)"}]}';
		break;

	case 'saveActivity':
		$r = '{"success":true,"data":{"campaignId":"000RkDx00GoP060014","uid":"000RkDx00GoQ010014"}}';
		break;
		
	case 'prePopulation':
		$r = '{"success":true,"data":{"activity":{"normal":{"emailName":"we","description":"","type":"HTML & Plain-Text","campaignId":"000RkDx00JwL060014","campaignName":"we","owner":"Brett Ryckman","language":"English (United States)","division":"01BQ9lN0006a0J0001","group":"01BQ9lN0000A0I0001","startDate":"2011\/03\/16 00:00:00","endDate":"2011\/05\/16 23:59:59"}},"id":"000RkDx000bT0K0014","tenantId":"68","lobId":{"defaultValue":"01BQ9lN0000A0I0001","arr":[{"name":"mktb","value":"01BQ9lN0000A0I0001"},{"name":"public","value":"01BQ9lN0000B0I0001"},{"name":"Admin","value":"01BQ9lN0000C0I0001"},{"name":"business-objects","value":"01BQ9lN0000D0I0001"},{"name":"marketing","value":"01BQ9lN0000E0I0001"}]},"orgId":{"defaultValue":"01BQ9lN0006a0J0001","arr":[{"name":"MOD111","value":"01BQ9lN0006a0J0001"},{"name":"Asia1","value":"01BQ9lN0006b0J0002"},{"name":"Asia2","value":"01BQ9lN0006c0J0003"},{"name":"Asia3","value":"01BQ9lN0006d0J0004"},{"name":"Asia4","value":"01BQ9lN0006e0J0005"}]},"language":{"defaultValue":"English (United States)","arr":[{"name":"English (United States)","value":"English (United States)"},{"name":"Chinese (China)","value":"Chinese (China)"}]},"name":"Brett Ryckman","assetId":[]}}';
		break;

	default:
		$r = '{"success":true}';
		break;
	}
	
	echo $r;
}
?>