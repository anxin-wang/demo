CreationWizardHeader = Ext.extend(Ext.Panel, {
    layout: 'column',
	border:false,
    autoHeight: true,
    initComponent: function() {
		var url=this.headerurl;
		var text=this.headertext;
		var win;
        this.items = [
            {
                xtype: 'displayfield',
				value: '',
				cls:'creation_wizard_header_title'
            },
            {
                xtype: 'displayfield',
				value:'',
				cls:'creation_wizard_header_link'
            }
//			,{
//				xtype:'button',
//				text:'what&acute;s this?',
//				listeners:{
//					'click':function(){
//						if(url!=undefined){
//							//if(!win){
//								win=new Ext.Window({
//									id:'help-window',
//									layout:'fit',
//									width:500,
//									height:300,									
//									ctCls:'help-window-wrap'								
//								});							
//							//}
//							win.show(this);
//							Ext.get('help-window').load("aaaa");
//						}
//						
//					}
//				}
//			}
			
        ];
		
		if(text!=undefined)
		{
			Ext.apply(this.items[0], {
							value: text
		});
		}
		
		if(url!=undefined){
			Ext.apply(this.items[1], {
							value: '<a href="'+url+'">what&acute;s this?</a>'
		});
		}
		
		
       	CreationWizardHeader.superclass.initComponent.call(this);
    }
});
