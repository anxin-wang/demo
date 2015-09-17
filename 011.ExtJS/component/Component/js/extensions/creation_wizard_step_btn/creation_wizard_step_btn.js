/**

 * @(#) $Id: creation_wizard_step_btn.js 383 2010-08-06 07:58:30Z swang $

 * $Id: creation_wizard_step_btn.js 383 2010-08-06 07:58:30Z swang $
 * Copyright 2010 � Marketbright, Inc. All Rights Reserved.
 */
CreationWizardStepBtn = Ext.extend(Ext.Panel, {
    border: false,
    layout: 'column',
    initComponent: function(){
    
        /**
         * @property: additems
         * @paramclass: Array
         * @params: 'canel','draft','save','back','next','send_immediately','send_schedule','submit_for_approval'
         * @description: add items following params
         *
         */
        this.items = [];// init items
        var additems = this.additems;
        if (additems != undefined) {
            for (var i in additems) {
                switch (additems[i]) {
                    case 'cancel':
                        this.items.push({
                            xtype: 'button',
                            text: 'Cancel',
                            cls: 'creation-wizard-link-btn creation-wizard-link-btn-others',
                            overCls: 'creation-wizard-link-btn-others-hover',
                            handler: function(){
                            
                            }
                        });
                        break;
                    case 'draft':
                        this.items.push({
                            xtype: 'button',
                            text: 'Save as Draft',
                            cls: 'creation-wizard-link-btn creation-wizard-link-btn-others',
                            overCls: 'creation-wizard-link-btn-others-hover',
                            handler: function(){
                            
                            }
                        })
                        break;
                    case 'save':
                        this.items.push({
                            xtype: 'button',
                            text: 'Save',
                            cls: 'creation-wizard-link-btn creation-wizard-link-btn-others',
                            overCls: 'creation-wizard-link-btn-others-hover',
                            handler: function(){
                            
                            }
                        })
                        break;
                    case 'back':
                        this.items.push({
                            xtype: 'button',
                            text: '< Back',
                            cls: 'creation-wizard-link-btn creation-wizard-link-btn-others',
                            overCls: 'creation-wizard-link-btn-others-hover',
                            handler: function(){
                                var activetab = Ext.getCmp('createwizard').getActiveTab().tabId;
                                if (campaigntype == 1 && activetab == 3) {
                                    Ext.getCmp('createwizard').activate(activetab - 2);
                                }
                                else {
                                    Ext.getCmp('createwizard').activate(activetab - 1);
                                //									if (campaigntype != 1 && activetab == 4) {
                                //										Ext.get('createwizard').select('.creation-wizard-tab-step3').first().addClass('x-tab-strip-active');
                                //									}
                                //									if (campaigntype != 1 && activetab == 2) {
                                //										Ext.get('createwizard').select('.creation-wizard-tab-step3').first().removeClass('x-tab-strip-active');
                                //									}
                                }
                                
                            }
                        })
                        break;
                    case 'next':
                        this.items.push({
                            xtype: 'button',
                            text: 'next',
                            cls: 'creation-wizard-link-btn creation-wizard-link-btn-next',
                            handler: function(){
                                var activetab = Ext.getCmp('createwizard').getActiveTab().tabId;
                                if (campaigntype == 1 && activetab == 1) {
                                    Ext.getCmp('createwizard').activate(activetab + 2);
                                }
                                else {
                                    Ext.getCmp('createwizard').activate(activetab + 1);
                                //									if (campaigntype != 1 && activetab == 2) {
                                //										Ext
                                //												.get('createwizard')
                                //												.select('.creation-wizard-tab-step3')
                                //												.first()
                                //												.addClass('x-tab-strip-active');
                                //									}
                                //									if (campaigntype != 1 && activetab == 3) {
                                //										Ext
                                //												.get('createwizard')
                                //												.select('.creation-wizard-tab-step3')
                                //												.first()
                                //												.removeClass('x-tab-strip-active');
                                //									}
                                }
                                
                            }
                        })
                        break;
                    case 'send_immediately':
                        this.items.push({
                            xtype: 'panel',
                            border: false,
                            items: [{
                                xtype: 'button',
                                text: 'send immediately',
                                cls: 'creation-wizard-link-btn creation-wizard-link-btn-send-immediately'
                            }, {
                                xtype: 'displayfield',
                                cls: 'displayfield-sendimmediately-warn',
                                value: '<p><span class="gray">Clicking this button will</span><br/><span class="orange">immediately start email</span></p>'
                            }]
                        
                        })
                        break;
                    case 'send_schedule':
                        this.items.push({
                            xtype: 'button',
                            text: 'send schedule',
                            cls: 'creation-wizard-link-btn creation-wizard-link-btn-send-schedule'
                        })
                        break;
					case 'submit_for_approval':
                        this.items.push({
                            xtype: 'panel',
                            border: false,
                            items: [{
                                xtype: 'button',
                                text: 'submit for approval',
                                cls: 'creation-wizard-link-btn creation-wizard-link-btn-submit-for-approval'
                            }, {
                                xtype: 'displayfield',
                                cls: 'displayfield-sendimmediately-warn',
                                value: '<p><span class="gray">You email will </span><span class="orange">not be sent</span><span class="gray"> until it <br/>has been approved by your admin</span></p>'
                            }]
                        
                        })
                        break;
                    default:
                        break;
                }
            }
        }
        
        CreationWizardStepBtn.superclass.initComponent.call(this);
    }
});