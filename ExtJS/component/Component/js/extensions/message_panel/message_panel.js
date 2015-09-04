Message_Panel = Ext.extend(Ext.Panel, {   
    width: 900,
    height: 80,
	border:false,
    initComponent: function() {
		var message_panel_type=this.type;
		switch(message_panel_type){
			case 'success':
				this.items = [
	            {
	                xtype: 'displayfield',
	                value: '<p>'+this.value+'</p>',				
	            	cls: 'message-panel-success'
					
	            }];
				break;
			case 'fail':
				this.items = [
	            {
	                xtype: 'displayfield',
	                value: '<p>'+this.value+'</p>',				
	            	cls: 'message-panel-fail'
	            }];
				break;			
			default:
				this.items = [
		            {
		                xtype: 'displayfield',
		                value: '<p>'+this.value+'</p>',				
		            	cls: 'message-panel-fail'
		            }];
				break;
		}
        
        Message_Panel.superclass.initComponent.call(this);
    },
	listeners:{
		'afterrender':function(){
		//'afterlayout':function(){
			var el=this.getEl();
			var t=this;			
				el.fadeIn({
					easing:'easeIn',
					duration:1,										
					callback:function(){						
					el.fadeOut({
						easing:'easeIn',
						duration:3,
						callback: function(){
							t.destroy();
						}
					});
				}
				}); 
		}
	}
});