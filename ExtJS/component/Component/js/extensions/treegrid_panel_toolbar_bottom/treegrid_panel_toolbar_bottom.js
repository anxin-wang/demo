TreegridPanelToolbarBottom = Ext.extend(Ext.Panel, {
    title: '',
    border:false,

	initComponent: function() {
		this.items=[{
				xtype: 'panel',
                title: '',
                cls:'treegrid-panel-toolbar-bottom',
				items:[				
					new uxPaking({
						totalData:400,
    					pageData:20,
    					showItem:5							
					})					
				],
                border: false
                }]
        TreegridPanelToolbarBottom.superclass.initComponent.call(this);
    }
});
