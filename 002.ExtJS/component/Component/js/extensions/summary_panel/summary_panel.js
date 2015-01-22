Summary_Panel = Ext.extend(Ext.Panel, {    
    panelTitle: '',
    border: false,
    id: 'emailview_summary',	
    bodyItems: [],
    hasFootButton: true,
    footButtons: [],
    initComponent: function(){
        var parent = Ext.getCmp('emailview_summary');		
        if (parent.hasFootButton) {
            this.items = [{
                xtype: 'displayfield',
                cls: parent.panelTitleCls,
                value: parent.panelTitle
            }, {
                xtype: 'panel',
                width: 260,
                cls: 'summary-body',
                border: false,
                items: parent.bodyItems
            }, {
                xtype: 'panel',
                layout: 'column',
                defaults: {
                    xtype: 'button'
                },
                border: false,
                items: parent.footButtons
            }];
        }
        else {
            this.items = [{
                xtype: 'displayfield',
                cls: parent.panelTitleCls,
                value: parent.panelTitle
            }, {
                xtype: 'panel',
                width: 260,
                cls: 'summary-body',
                border: false,
                items: parent.bodyItems
            }];
        }
        
        Summary_Panel.superclass.initComponent.call(this);
    }
});
Summary_Panel_Draft = Ext.extend(Summary_Panel, {
	cls:'emailview_summary',
    panelTitle: '<span >Steps Completed</span>' + '<span class="displayfield-title-draft-small">3 of 5 complete</span>',
    panelTitleCls: 'displayfield-title-draft',
    bodyItems: [],
    hasFootButton: false,
    initComponent: function(){
        for (var i = 0; i < this.stepCompleteStatic.length; i++) {
            //if completed
            if (this.stepCompleteStatic[i]) {
                this.bodyItems.push({
                    xtype: 'displayfield',
                    cls: 'displayfield-body-draft-completed',
                    value: 'Done'
                })
            }
            else {
                this.bodyItems.push({
                    xtype: 'displayfield',
                    cls: 'displayfield-body-draft-notcompleted',
                    value: 'Not Done'
                })
            }
            
        }
        Summary_Panel_Draft.superclass.initComponent.call(this);
    }
    
});
Summary_Panel_Schedule = Ext.extend(Summary_Panel, {
	cls:'emailview_summary',
    panelTitle: 'Email Schedule for Delivery',
    panelTitleCls: 'displayfield-title-schedule',
    bodyItems: [],
    hasFootButton: true,
    footButtons: [],
    initComponent: function(){
        var schedule_time = this.schedule_time;
        var recipients_amount = this.recipients_amount;
        this.bodyItems.push({
            xtype: 'displayfield',
            cls: 'displayfield-body-schedule',
            value: '<p class="displayfield-body-schedule-schedule_time">' + schedule_time + '</p><p class="displayfield-body-schedule-recipients_amount">To ' + recipients_amount + ' recipients</p>',
            height: 72
        });
        this.footButtons.push({
            text: 'cancel button',
            cls: 'btn cancel-send-btn'
        })
        Summary_Panel_Schedule.superclass.initComponent.call(this);
    }
});
Summary_Panel_Suspended = Ext.extend(Summary_Panel, {
	cls:'emailview_summary',
    panelTitle: 'Email Schedule for Delivery',
    panelTitleCls: 'displayfield-title-schedule',
    bodyItems: [],
    hasFootButton: true,
    footButtons: [],
    initComponent: function(){
        var sent_email_amout = this.sent_email_amout;
        var total_email = this.total_email;
        this.bodyItems.push({
            xtype: 'displayfield',
            cls: 'displayfield-body-schedule',
            value: '<p class="displayfield-body-schedule-schedule_time">Email Sending is Suspended</p><p class="displayfield-body-schedule-recipients_amount">' + sent_email_amout + ' of ' + total_email + ' emails have been sent</p>',
            height: 72
        });
        this.footButtons.push({
            text: 'cancel',
            cls: 'btn cancel-btn'
        });
        this.footButtons.push({
            text: 'resume',
            cls: 'btn resume-btn'
        });
        Summary_Panel_Suspended.superclass.initComponent.call(this);
    }
});
Summary_Panel_Sending = Ext.extend(Summary_Panel, {
	cls:'emailview_summary_sending_sent',
    panelTitle: '<p><span>Live Email Stats</span><span><a href="#">view full report</a></span></p>',
    panelTitleCls: 'displayfield-title-sending',
    bodyItems: [],
    hasFootButton: true,
    footButtons: [],
    initComponent: function(){       
		var total= this.total;
		var opened= this.opened;
		var openPercent= this.openPercent;
		var clicked= this.clicked;
		var clickedPercent= this.clickedPercent;
		var visited=this.visited;
		var visitedPercent= this.visitedPercent;
		var registers= this.registers;
		var registersPercent= this.registersPercent;
		var conversions= this.conversions;
		var conversionsPercent= this.conversionsPercent;		
        this.bodyItems.push({
            xtype: 'panel',
			border:false,
			cls:'panel-body-sending',
            items: [{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<p><span class="displayfield-body-sending-left">'+total+'</span><span class="displayfield-body-sending-right">Total emails sent</span></p>'
            },
			{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<p><span class="displayfield-body-sending-left">'+openPercent+'</span><span class="displayfield-body-sending-right">(' + opened + ' people) opened</span></p>'
            },{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<p><span class="displayfield-body-sending-left">'+clickedPercent+'</span><span class="displayfield-body-sending-right">(' + clicked + ' people) clicked</span></p>'
            },{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<p><span class="displayfield-body-sending-left">'+visitedPercent+'</span><span class="displayfield-body-sending-right">(' + visited + ' people) visited</span></p>'
            },{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<p><span class="displayfield-body-sending-left">'+registersPercent+'</span><span class="displayfield-body-sending-right">(' + registers + ' people) registers</span></p>'
            },{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<p><span class="displayfield-body-sending-left">'+conversionsPercent+'</span><span class="displayfield-body-sending-right">(' + conversions + ' people) conversations</span></p>'
            }]
        });
        this.footButtons.push({
            text: 'cancel',
            cls: 'btn cancel-btn'
        });
        this.footButtons.push({
            text: 'suspend',
            cls: 'btn suspend-btn'
        });
        Summary_Panel_Sending.superclass.initComponent.call(this);
    }
});
Summary_Panel_Sent = Ext.extend(Summary_Panel, {
    cls:'emailview_summary_sending_sent',
    panelTitle: '<p><span>Email Stats</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span><a href="#">view full report</a><span></p>',
    panelTitleCls: 'displayfield-title-sending',
    bodyItems: [],
    hasFootButton: false,
    initComponent: function(){       
		var total= this.total;
		var opened= this.opened;
		var openPercent= this.openPercent;
		var clicked= this.clicked;
		var clickedPercent= this.clickedPercent;
		var visited=this.visited;
		var visitedPercent= this.visitedPercent;
		var registers= this.registers;
		var registersPercent= this.registersPercent;
		var conversions= this.conversions;
		var conversionsPercent= this.conversionsPercent;	
		var splittest=this.splittest;
		var winner=this.winner;			
        this.bodyItems.push({
            xtype: 'panel',
			border:false,
			cls:'panel-body-sending',
            items: [{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<p><span class="displayfield-body-sending-left">'+total+'</span><span class="displayfield-body-sending-right">Total emails sent</span></p>'
            },
			{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<p><span class="displayfield-body-sending-left">'+openPercent+'</span><span class="displayfield-body-sending-right">(' + opened + ' people) opened</span></p>'
            },{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<p><span class="displayfield-body-sending-left">'+clickedPercent+'</span><span class="displayfield-body-sending-right">(' + clicked + ' people) clicked</span></p>'
            },{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<p><span class="displayfield-body-sending-left">'+visitedPercent+'</span><span class="displayfield-body-sending-right">(' + visited + ' people) visited</span></p>'
            },{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<p><span class="displayfield-body-sending-left">'+registersPercent+'</span><span class="displayfield-body-sending-right">(' + registers + ' people) registers</span></p>'
            },{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<p><span class="displayfield-body-sending-left">'+conversionsPercent+'</span><span class="displayfield-body-sending-right">(' + conversions + ' people) conversations</span></p>'
            }]
        });
		if(splittest){
			this.bodyItems.push(
				{
                xtype: 'displayfield',
                cls: 'displayfield-body-sending',
                value: '<div class="displayfield-body-sent-winner">Version '+winner+' is the split-test winner</div>'
            })
		}
		 Summary_Panel_Sending.superclass.initComponent.call(this);
    }
    
});
