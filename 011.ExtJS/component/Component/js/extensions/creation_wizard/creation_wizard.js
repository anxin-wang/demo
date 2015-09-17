/**

 * @(#) creation_wizard.js

 * $Id: creation_wizard.js 309 2010-08-04 09:39:08Z swang $
 * Copyright 2010 © Marketbright, Inc. All Rights Reserved.
 */

CreationWizard = Ext.extend(Ext.TabPanel, {
    activeTab: 0,
	frame:false,
	cls:'creation-wizard-tab-bg',
	baseCls:'creation-wizard-tab-panel',
    initComponent: function() {		
        this.items = [
            {
                xtype: 'panel',
				tabCls:'creation-wizard-tab-first creation-wizard-tab-step1',
                title: 'CAMPAIGN DETAILS'			
			}				
            ,
            {
                xtype: 'panel',
				tabCls:'creation-wizard-tab creation-wizard-tab-step2',
                title: 'CONTACTS'
            },
            {
                xtype: 'panel',
				tabCls:'creation-wizard-tab creation-wizard-tab-step3',
                title: 'EMAIL CONTENT'
            },
            {
                xtype: 'panel',
				tabCls:'creation-wizard-tab creation-wizard-tab-step4',
                title: 'TESTING'
            },
            {
                xtype: 'panel',
				tabCls:'creation-wizard-tab creation-wizard-tab-step5',
                title: 'DELIVERY'
            }
        ];
        CreationWizard.superclass.initComponent.call(this);
    }
});
