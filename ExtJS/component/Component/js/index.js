Ext.onReady(function(){

	var creationwizard=new CreationWizard({

		renderTo:'creationwizard'
		
	});
	var creationwizardstepbtn=new CreationWizardStepBtn({
		additems:['canel','draft','save','back','next','send_immediately','send_schedule'],
		renderTo:'creationwizardstepbtn'
	});
	var creationwizardheader=new CreationWizardHeader({
		renderTo:'creationwizardheader',
		headerurl:'#',
		headertext:'Create splite-test email campaign'
		
	});

	var templatelibrary=new TemplateLibrary({
		renderTo:'templatelibrary'
	});

	var sliderbar=new SliderBar({
		renderTo:'sliderbar'
		
	});
	var thumbnail_preview=new Thumbnail_Preview({
		renderTo:'thumbnail_preview',
		sum:3,
		thumbnails:[{
			preview_url:'http://static0.urbandictionary.com/images/logo.gif?1286573987',
			img_src:'http://static0.urbandictionary.com/images/logo.gif?1286573987',
			img_alt:'urban'
		},{
			preview_url:'http://image-7.verycd.com/c1863a343ba856e0d82295bb6d4fdf45123284/thumb.jpg',
			img_src:'http://image-7.verycd.com/c1863a343ba856e0d82295bb6d4fdf45123284/thumb.jpg',
			img_alt:'STAR DRIVER'
		},{
			preview_url:'http://image-2.verycd.com/77f7125c5204ba07bc672262ddac83d684834/post-304485-1189609900.jpg',
			img_src:'http://image-2.verycd.com/77f7125c5204ba07bc672262ddac83d684834/post-304485-1189609900.jpg',
			img_alt:'Kodomo No Zikan'
		}]
	})
	var summary_panel_draft=new Summary_Panel_Draft({
		renderTo:'summary_panel_draft',
		stepCompleteStatic:[true,false,true,false,true]
	});
//	var summary_panel_schedule=new Summary_Panel_Schedule({
//		renderTo:'summary_panel_schedule',
//		schedule_time:'16:00',
//		recipients_amount:'15,000'
//	});
	var summary_panel_suspended=new Summary_Panel_Suspended({
		renderTo:'summary_panel_suspended',
		sent_email_amout:'3',
		total_email:'10'
	});
	var summary_panel_sending=new Summary_Panel_Sending({
		renderTo:'summary_panel_sending',
		total:770, 
		opened:60, 
		openPercent:'6.6%', 
		clicked:70, 
		clickedPercent:'7.6%', 
		visited:80, 
		visitedPercent:'8.6%',  
		registers:90, 
		registersPercent:'9.6%', 
		conversions:100, 
		conversionsPercent:'16.6%'
	});
	var summary_panel_sent=new Summary_Panel_Sent({
		renderTo:'summary_panel_sent',
		total:770, 
		opened:60, 
		openPercent:'6.6%', 
		clicked:70, 
		clickedPercent:'7.6%', 
		visited:80, 
		visitedPercent:'8.6%',  
		registers:90, 
		registersPercent:'9.6%', 
		conversions:100, 
		conversionsPercent:'16.6%',
		splittest:true,
		winner:'A'
	});
	var viewdetailmissingpanel=new ViewDetail_MissingPanel({
		renderTo:'viewdetail-missing-panel',
		text:'Completed'
	});
		var viewdetaildetailspanel=new ViewDetail_DetailsPanel({
		renderTo:'viewdetail-details-panel',
		emailName:'Adv Lead Scoring-Customer',
		campaignType:'New Standalone',
		description:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
		campaignOwner:'Brett Ryckman'
	});
		var viewdetailrecipientspanel=new ViewDetail_RecipientsPanel({
		renderTo:'viewdetail-recipients-panel',
		recipientsData:[[345,'Califormina CEO\'s','list'],
				[125,'Califormina CFOs','segment']],
		totalContacts:470		
	});
//		var viewdetaildeliverypanel=new ViewDetail_DeliveryPanel({
//		renderTo:'viewdetail-delivery-panel',
//		versionNumber:4,
//		sentPercentage:'20%',
//		sentContacts:50,
//		remainderPercentage:'80%',
//		remainderContacts:150,
//		testLength:6,
//		deliveryDate:'07/01/2010',
//		deliveryTime:'5:30PM'
//	});
	var viewdetaildeliverypanel=new ViewDetail_DeliveryPanel({
		renderTo:'viewdetail-delivery-panel',
		split_test:false,
		deliveryDate:'07/01/2010',
		deliveryTime:'5:30PM'
	});
	var viewdetail_panelheader=new ViewDetail_PanelHeader({
		renderTo:'viewdetail-panel-header',
		headerText:'Email Detail',
		headerBtnText:'Add More Recipient'
	})
var store1=new Ext.data.SimpleStore({
			data:[['A,10% off promotion email,Created  7/1/2010 11:34am EST','Now is your chance to get 15% off pricing','B Daddy','Bdaddy@yahoo.com'],
			['B,10% off promotion email,Created  7/1/2010 11:34am EST','Now is your chance to get 15% off pricing','B Daddy','Bdaddy@yahoo.com'],
			['C,10% off promotion email,Created  7/1/2010 11:34am EST','Now is your chance to get 15% off pricing','B Daddy','Bdaddy@yahoo.com'],
			['D,10% off promotion email,Created  7/1/2010 11:34am EST','Now is your chance to get 15% off pricing','B Daddy','Bdaddy@yahoo.com']],
			fields:['pages','subject','fromname','fromemail']
});
var store2=new Ext.data.SimpleStore({
	data:[['A,10% off promotion email,Created  7/1/2010 11:34am EST','Complete','345,6.6','345,6.6','345,6.6','345,6.6','345,6.6'],
	['B,10% off promotion email,Created  7/1/2010 11:34am EST','Complete','345,6.6','345,6.6','345,6.6','345,6.6','345,6.6'],
	['C,10% off promotion email,Created  7/1/2010 11:34am EST','Complete','345,6.6','345,6.6','345,6.6','345,6.6','345,6.6'],
	['D,10% off promotion email,Created  7/1/2010 11:34am EST','Complete','345,6.6','345,6.6','345,6.6','345,6.6','345,6.6']],
	fields:['pages','status','opened','linkclicked','visitors','registrations','conversionrate']
});
	
	var viewdetaildraftcontentpanel=new ViewDetail_DraftContentPanel({
		renderTo:'viewdetail-draftcontent-panel',
		store:store1
	});
	var viewdetailschedulecontentpanel=new ViewDetail_ScheduleContentPanel({
		renderTo:'viewdetail-schedulecontent-panel',
		store:store2,
		time:'6 Hour and 30 minutes'
	});
	var viewdetailcompletedcontentpanel=new ViewDetail_CompletedContentPanel({
		renderTo:'viewdetail-completedcontent-panel',
		store:store2,
		date:'7/21/2010'
	});


	viewdetailschedulecontentpanel.getSelectionModel().selectFirstRow();
		viewdetailschedulecontentpanel.getSelectionModel().on('rowselect',function(){
		//console.log(this.grid.getGridEl());
		console.log(this.grid.getEl().select(".x-grid3-row-first"));
	});
	//console.log(Ext.get('viewdetail-schedulecontent-panel').select('.x-grid3-row-first').first());

	//console.log(viewdetailschedulecontentpanel.getSelectionModel().getSelected());
	//console.log(Ext.get('viewdetail-schedulecontent-panel').select('.x-grid3-row').first());
	//.insertHtml('beforebegin', '<p>aaaa</p>');
	
	
//var recipientsStore=new Ext.data.SimpleStore({
//			data:[[345,'Califormina CEO\'s','list'],
//				[125,'Califormina CFOs','segment']],
//			fields:['recipientnumber','listname','listtype']
//		});
var message_panel_success=new Message_Panel({
	renderTo:'message_panel_success',
	type:'success',
	value:'Success!'
});
var message_panel_fail=new Message_Panel({
	renderTo:'message_panel_fail',	
	type:'fail',
	value:'Fail!'
});
var tabpanel=new Ext.TabPanel({
	renderTo:'historydemo',	
	height:200,
	items:[{
		xtype:'panel',
		id:'panela',
		title:'A',
		height:200,
		items:[{
			xtype:'displayfield',
			value:'aa'
		}]
	},{
		xtype:'panel',
		title:'B',
		id:'panelb',
		height:200,
		items:[{
			xtype:'displayfield',
			value:'bb'
		}]
	}],
	listeners:{
		'afterrender':function(){
			Ext.get('historydemo').select('li[id$="panela"] a').item(1).dom.href="#panela";
			Ext.get('historydemo').select('li[id$="panelb"] a').item(1).dom.href="#panelb";
		}
	}
})
var hideIframe={	   	
   		tag:'form',
   		id:'history-form',
   		cls:'x-hidden',
   		children: [{
   			tag:'div',
   			children:[{
   				tag:'input',
   				id:'x-history-field',
   				type:'hidden'
   			},{
   				tag:'iframe',
   				id:'x-history-frame'  			
   			}]
   		}]
   }
Ext.DomHelper.append(Ext.getBody(),hideIframe);	
Ext.History.init(); 
Ext.History.on(
{
	'change':function(token){}})
})