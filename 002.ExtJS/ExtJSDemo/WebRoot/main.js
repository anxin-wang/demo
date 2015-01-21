/**
 * @author Administrator
 */
Ext.onReady(function(){
	var menupanel=new Ext.Panel({
		title:'panel8',
		id:'menupanel',
		height:100,
		hidden:true	
	});
	new Ext.Viewport({
		layout:'border',
		autoScroll:true,		
		items:[
		{
			region:'north',
			title:'panel1',
			id:'panel1',
			layout:'vbox',
			height:200, //数字不要用引号,不然被当成字符串没有效果
			
			items:[
				{			
					xtype:'panel',
					title:'panel6',
					layout:'fit',
					id:'panel6',					
					height:50				
				},
				{		
					xtype:'panel',						
					layout:'fit',
					
					id:'panel7',	
					items:{			
						xtype:'toolbar',
						layout:'hbox',
						title:'menubar',					
						width:500,
						id:'menubar',
						items:[
						{
							xtype:'button',
							text:'button2',
							width:100,
							height:50,
							listeners:{
								"mouseover":function(){
									Ext.getCmp("menupanel").show();
								},
								"mouseout":function(){
									Ext.getCmp("menupanel").hide();
								}
							}
						},
						{
							xtype:'button',
							text:'button1',
							width:100,
							height:50
						}
					],
					//hidden:true,
					//hideParent:true,					
					height:50				
				}
				},
				menupanel
			]
			
		},
		{
			region:'west',
			title:'panel2',
			id:'panel2',
			width:200, //不指定就是默认宽度，比较窄
			collapsible:true			
		},
		{
			region:'east',
			title:'panel3',
			id:'panel3',
			width:200, //不指定就是默认宽度，比较窄
			collapsible:true
		},
		{
			region:'south',
			title:'panel4',
			id:'panel4',
			height:100,
			//collapsible:true
		},
		//其他部分可以没有，center一定要有，不然布局无法渲染
		{
			region:'center',
			title:'panel5',
			id:'panel5',
			autoScroll:true,		
			height:500
		}
		],
		renderTo:Ext.getBody()
	});
});

