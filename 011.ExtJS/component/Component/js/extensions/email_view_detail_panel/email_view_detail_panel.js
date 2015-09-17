ViewDetail_PanelHeader = Ext.extend(Ext.Panel, {    
    width: 921,
    autoHeight:true,
    layout: 'column',
	border:false,
    initComponent: function() {	
		this.items = [
            {
                xtype: 'displayfield',
                value: this.headerText,
				cls:'viewdetail-panel-header-displayfield'
            }
        ];
	    switch(this.headerBtnText)	{
			case 'Edit':
			this.items.push({
                xtype: 'button',
                value: this.headerText,
				cls:'btn viewdetail-panel-header-btn-edit'
            })
			
			break;
			case 'Add Recipient':
			this.items.push({
                xtype: 'button',
                value: this.headerText,
				cls:'btn viewdetail-panel-header-btn-addRecipient'
            })
			
			break;
			case 'Add Variants':
			this.items.push({
                xtype: 'button',
                value: this.headerText,
				cls:'btn viewdetail-panel-header-btn-addVariants'
            })
			
			break;
			case 'Test Now':
			this.items.push({
                xtype: 'button',
                value: this.headerText,
				cls:'btn viewdetail-panel-header-btn-testNow'
            })			
			break;
			case 'Add More Recipient':
			this.items.push({
                xtype: 'button',
                value: this.headerText,
				cls:'btn viewdetail-panel-header-btn-addmorerecipient'
            })
			break;
		}
        
        ViewDetail_PanelHeader.superclass.initComponent.call(this);
    }
});
ViewDetail_MissingPanel = Ext.extend(Ext.Panel, {
    cls: 'viewdetail-missing-panel',
	
    initComponent: function(){
        value=this.text==undefined?'Missing':this.text;
		cls=value=='Completed'?'viewdetail-missing-panel-displayfield-completed':'viewdetail-missing-panel-displayfield';		
        this.items = [{
            xtype: 'displayfield',
            value: value,
            cls: cls
        }];
        ViewDetail_MissingPanel.superclass.initComponent.call(this);
    }
});

ViewDetail_DetailsPanel = Ext.extend(Ext.Panel, {
    width: 926,
    autoHeight: true,
    border: false,
    cls: 'viewdetail-details-panel',
    initComponent: function(){
        var emailName = this.emailName;
        var campaignType = this.campaignType;
        var description = this.description;
        var campaignOwner = this.campaignOwner;
        var owner = this.owner;
        var language = this.language;
        var division = this.division;
        var group = this.group;
        var startDate = this.startDate;
        var endDate = this.endDate;
        this.items = [{
            xtype: 'panel',
            border: false,
            items: [{
                xtype: 'displayfield',
                value: '<table>' +
                '<tr><td class="viewdetail-details-table-label">Email Name:</td><td class="viewdetail-details-table-field-emailname">' +
                emailName +
                '</td></tr>' +
                '<tr><td class="viewdetail-details-table-label">Campaign Type:</td><td class="viewdetail-details-table-field-common">' +
                campaignType +
                '</td></tr>' +
                '<tr><td class="viewdetail-details-table-label">Description:</td><td class="viewdetail-details-table-field-common">' +
                description +
                '</td></tr>' +
                '<tr><td class="viewdetail-details-table-label">Campaign Owner:</td><td class="viewdetail-details-table-field-common">' +
                campaignOwner +
                '</td></tr>' +
                '</table>'
            }]
        }, {
            xtype: 'panel',
            title: 'Show advance options',
            border: false,
            collapsed: true,
            collapsible: true,
            items: [{
                xtype: 'displayfield',
                value: '<table>' +
                '<tr><td class="viewdetail-details-table-label">Owner:</td><td class="viewdetail-details-table-field-common">' +
                owner +
                '</td></tr>' +
                '<tr><td class="viewdetail-details-table-label">Language:</td><td class="viewdetail-details-table-field-common">' +
                language +
                '</td></tr>' +
                '<tr><td class="viewdetail-details-table-label">Division:</td><td class="viewdetail-details-table-field-common">' +
                division +
                '</td></tr>' +
                '<tr><td class="viewdetail-details-table-label">Group:</td><td class="viewdetail-details-table-field-common">' +
                group +
                '</td></tr>' +
                '<tr><td class="viewdetail-details-table-label">Start Date:</td><td class="viewdetail-details-table-field-common">' +
                startDate +
                '</td></tr>' +
                '<tr><td class="viewdetail-details-table-label">End Date:</td><td class="viewdetail-details-table-field-common">' +
                endDate +
                '</td></tr>' +
                '</table>'
            }]
        }];
        ViewDetail_DetailsPanel.superclass.initComponent.call(this);
    }
});
ViewDetail_RecipientsPanel = Ext.extend(Ext.Panel, {
    width: 926,
    autoHeight: true,
    cls: 'viewdetail-recipients-panel',
    initComponent: function(){
        var recipientsData = this.recipientsData;
        var totalContacts = this.totalContacts;
        this.items = [];
        for (var i = 0; i < recipientsData.length; i++) {
            this.items.push({
                xtype: 'displayfield',
                cls: 'viewdetail-recipients-fields',
                value: '<b>' + recipientsData[i][0] + '</b> contacts from "<span>' + recipientsData[i][1] + '</span>" ' + recipientsData[i][2]
            });
        }
        this.items.push({
            xtype: 'displayfield',
            cls: 'viewdetail-recipients-viewall',
            value: '<b>' + totalContacts + ' Total</b> View All'
        });
        ViewDetail_RecipientsPanel.superclass.initComponent.call(this);
    }
});
ViewDetail_DeliveryPanel = Ext.extend(Ext.Panel, {
    width: 926,
    autoHeight: true,
    border: false,
    cls: 'viewdetail-delivery-panel',
    initComponent: function(){
		if(!this.split_test){
			var deliveryDate = this.deliveryDate;
	        var deliveryTime = this.deliveryTime;
			this.items = [{
            xtype: 'panel',
            border: false,
            items: [{
                xtype: 'displayfield',
                value: '<table>' +                
                '<tr><td class="viewdetail-delivery-table-label">Schedule:</td><td class="viewdetail-delivery-table-field-common">Scheduled for delivery on <b>' +
                deliveryDate +
                '</b> at <b>' +
                deliveryTime +
                '</b> EST<br/><span>Cancel and move back to drafts</span></td></tr>' +
                '</table>'
            }]
        }];
		}else{
			var versionNumber = this.versionNumber;
	        var sentPercentage = this.sentPercentage;
	        var sentContacts = this.sentContacts;
	        var remainderPercentage = this.remainderPercentage;
	        var remainderContacts = this.remainderContacts;
	        var testLength = this.testLength;
	        var deliveryDate = this.deliveryDate;
	        var deliveryTime = this.deliveryTime;
			this.items = [{
            xtype: 'panel',
            border: false,
            items: [{
                xtype: 'displayfield',
                value: '<table>' +
                '<tr><td class="viewdetail-delivery-table-label">Split-Test Size:</td><td class="viewdetail-delivery-table-field-common">' +
                versionNumber +
                ' different email versions sent to ' +
                sentPercentage +
                '(' +
                sentContacts +
                ' contacts).<br/>The winning email will be sent to the remainder' +
                remainderPercentage +
                '(' +
                remainderContacts +
                ' contacts)</td></tr>' +
                '<tr><td class="viewdetail-delivery-table-label">Test Length:</td><td class="viewdetail-delivery-table-field-common">' +
                testLength +
                ' hours</td></tr>' +
                '<tr><td class="viewdetail-delivery-table-label">Schedule:</td><td class="viewdetail-delivery-table-field-common">Scheduled for delivery on <b>' +
                deliveryDate +
                '</b> at <b>' +
                deliveryTime +
                '</b> EST<br/><span>Cancel and move back to drafts</span></td></tr>' +
                '</table>'
            }]
        }];
		}
        

        ViewDetail_DeliveryPanel.superclass.initComponent.call(this);
    }
});
function PagesRenderer(val){
    var values = val.split(',');
    return '<table><tr><td rowspan="2" class="viewdetail-content-panel-firstcol"><p>' + values[0] + '</p></td><td class="viewdetail-content-panel-promotionpercent">' + values[1] + '</td></tr><tr><td class="viewdetail-content-panel-creationdate">' + values[2] + '</td></tr></table>'
    
};
function ToolsRenderer(val){
    return '<a href="#" class="viewdetail-content-panel-grid-edit">edit</a><a href="#" class="viewdetail-content-panel-grid-delete">delete</a>'
}

function PeopleRenderer(val){
    var values = val.split(',');
    return '<p class="">' + values[0] + ' people</p><p class="">' + values[1] + '%</p>'
}
ViewDetail_DraftContentPanel = Ext.extend(Ext.grid.GridPanel, {
    width: 926,
    autoHeight: true,
    id: 'viewDetail_draftContentPanel',
    viewConfig: {
        getRowClass: function(record, rowIndex, p, ds){
            var cls = 'grid-odd-row-bg';
            if (rowIndex % 2 == 1) {
                cls = 'grid-even-row-bg';
            }
            return cls;
        }
    },
    initComponent: function(){
        this.columns = [{
            dataIndex: 'pages',
            header: 'Pages/Variants',
            width: 250,
            menuDisabled: true,
            renderer: PagesRenderer
        }, {
            dataIndex: 'subject',
            header: 'Subject',
            width: 200,
            menuDisabled: true
        
        }, {
            dataIndex: 'fromname',
            header: 'From Name',
            menuDisabled: true,
            width: 150
        }, {
            dataIndex: 'fromemail',
            header: 'From Email',
            menuDisabled: true,
            width: 200
        }, {
            dataIndex: '',
            menuDisabled: true,
            width: 126,
            renderer: ToolsRenderer
        }];
        ViewDetail_DraftContentPanel.superclass.initComponent.call(this);
    }
});
ViewDetail_ScheduleContentPanel = Ext.extend(Ext.grid.GridPanel, {
    width: 926,
    autoHeight: true,
    id: 'viewDetail_scheduleContentPanel',
    viewConfig: {
        getRowClass: function(record, rowIndex, p, ds){
            var cls = 'grid-odd-row-bg';
            if (rowIndex % 2 == 1) {
                cls = 'grid-even-row-bg';
            }
            return cls;
        }
    },
    initComponent: function(){
        this.columns = [{
            dataIndex: 'pages',
            header: 'Pages/Variants',
            width: 220,
            menuDisabled: true,
            renderer: PagesRenderer
        }, {
            dataIndex: 'status',
            header: 'Status',
            width: 80,
            menuDisabled: true
        
        }, {
            dataIndex: 'opened',
            header: 'Opened',
            width: 100,
            menuDisabled: true,
            renderer: PeopleRenderer
        }, {
            dataIndex: 'linkclicked',
            header: 'Link Clicked',
            width: 100,
            menuDisabled: true,
            renderer: PeopleRenderer
        }, {
            dataIndex: 'visitors',
            header: 'Visitors',
            width: 100,
            menuDisabled: true,
            renderer: PeopleRenderer
        }, {
            dataIndex: 'registrations',
            header: 'Registrations',
            menuDisabled: true,
            width: 100,
            renderer: PeopleRenderer
        }, {
            dataIndex: 'conversionrate',
            header: 'Conversion Rate',
            menuDisabled: true,
            width: 150,
            renderer: PeopleRenderer
        }, {
            dataIndex: '',
            menuDisabled: true,
            width: 100,
            renderer: ToolsRenderer
        }];
        ViewDetail_ScheduleContentPanel.superclass.initComponent.call(this);
    },
    listeners: {
        'afterrender': function(){			
			Ext.get('viewDetail_scheduleContentPanel').select('.x-grid3-header').first().insertHtml('afterEnd','<div class="viewdetail-schedulecontent-panel-winner"><p>'+this.time+' until winner selected.</p></div>');                       
        }
    }
});
ViewDetail_CompletedContentPanel = Ext.extend(Ext.grid.GridPanel, {
    width: 926,
    autoHeight: true,
    id: 'viewDetail_completedContentPanel',
    viewConfig: {
        getRowClass: function(record, rowIndex, p, ds){
            var cls = 'grid-odd-row-bg';
			if(rowIndex==0){
				cls='grid-first-row-bg';
			}
            else if (rowIndex % 2 == 1) {
                cls = 'grid-even-row-bg';
            }
            return cls;
        }
    },
    initComponent: function(){
        this.columns = [{
            dataIndex: 'pages',
            header: 'Pages/Variants',
            width: 220,
            menuDisabled: true,
            renderer: PagesRenderer
        }, {
            dataIndex: 'status',
            header: 'Status',
            width: 80,
            menuDisabled: true
        
        }, {
            dataIndex: 'opened',
            header: 'Opened',
            width: 100,
            menuDisabled: true,
            renderer: PeopleRenderer
        }, {
            dataIndex: 'linkclicked',
            header: 'Link Clicked',
            width: 100,
            menuDisabled: true,
            renderer: PeopleRenderer
        }, {
            dataIndex: 'visitors',
            header: 'Visitors',
            width: 100,
            menuDisabled: true,
            renderer: PeopleRenderer
        }, {
            dataIndex: 'registrations',
            header: 'Registrations',
            menuDisabled: true,
            width: 100,
            renderer: PeopleRenderer
        }, {
            dataIndex: 'conversionrate',
            header: 'Conversion Rate',
            menuDisabled: true,
            width: 150,
            renderer: PeopleRenderer
        }, {
            dataIndex: '',
            menuDisabled: true,
            width: 100,
            renderer: ToolsRenderer
        }];
        ViewDetail_CompletedContentPanel.superclass.initComponent.call(this);
    },
    listeners: {
        'afterrender': function(){			
			Ext.get('viewDetail_completedContentPanel').select('.x-grid3-header').first().insertHtml('afterEnd','<div class="viewdetail-completedcontent-panel-winner"><p>Winner as of '+this.date+'</p></div>');                       
        }
    }
});
ViewDetail_NormalContentPanel = Ext.extend(Ext.grid.GridPanel, {
    width: 926,
    autoHeight: true,
    id: 'viewDetail_normalContentPanel',
    viewConfig: {
        getRowClass: function(record, rowIndex, p, ds){
            var cls = 'grid-odd-row-bg';			
            if (rowIndex % 2 == 1) {
                cls = 'grid-even-row-bg';
            }
            return cls;
        }
    },
    initComponent: function(){
        this.columns = [{
            dataIndex: 'pages',
            header: 'Pages/Variants',
            width: 220,
            menuDisabled: true,
            renderer: PagesRenderer
        }, {
            dataIndex: 'status',
            header: 'Status',
            width: 80,
            menuDisabled: true
        
        }, {
            dataIndex: 'opened',
            header: 'Opened',
            width: 100,
            menuDisabled: true,
            renderer: PeopleRenderer
        }, {
            dataIndex: 'linkclicked',
            header: 'Link Clicked',
            width: 100,
            menuDisabled: true,
            renderer: PeopleRenderer
        }, {
            dataIndex: 'visitors',
            header: 'Visitors',
            width: 100,
            menuDisabled: true,
            renderer: PeopleRenderer
        }, {
            dataIndex: 'registrations',
            header: 'Registrations',
            menuDisabled: true,
            width: 100,
            renderer: PeopleRenderer
        }, {
            dataIndex: 'conversionrate',
            header: 'Conversion Rate',
            menuDisabled: true,
            width: 150,
            renderer: PeopleRenderer
        }, {
            dataIndex: '',
            menuDisabled: true,
            width: 100,
            renderer: ToolsRenderer
        }];
        ViewDetail_NormalContentPanel.superclass.initComponent.call(this);
    }
});





