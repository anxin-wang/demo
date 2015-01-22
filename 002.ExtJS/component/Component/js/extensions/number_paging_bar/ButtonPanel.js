Ext.namespace("Ext.ux");
Ext.ux.ButtonPanel = Ext.extend(Ext.Panel, {
	layout : 'column',
	defaultType : 'button',
	buttonAlign:'right',
	baseCls : 'x-plain',
	cls : 'btn-panel',
	
	menu : undefined,
	split : false,
	width:150,

	

	initComponent : function() {
	var num = this.num;
	var pb = this.pb;
		this.items = [ {
			xtype : 'box',
			autoEl : {
				tag : 'h3',
				style : "padding:15px 0 3px;"
			}			
		}, {
			text:'prev',
			listeners : {
				'click' : function() {
//					var prevpage=pb.getPageData().activePage-1;
//					if(prevpage>0){
//						pb.changePage(prevpage);
//					}
					pb.movePrevious(); 
				}
			}

		} ];
		
		for ( var i = 0; i < num; i++) {
			this.items.push( {
				text : i + 1,
				menu : this.menu,
				enableToggle : this.enableToggle,
				split : this.split,
				arrowAlign : this.arrowAlign,
				listeners : {
					'click' : function() {
						pb.changePage(this.text);
					}
				}
			});
		}
		this.items.push({
			text: 'next',
			listeners: {
				'click': function(){
					var nextpage=pb.getPageData().activePage + 1;
					if(nextpage<=pb.getPageData().pages){
//						pb.changePage(nextpage);
						pb.moveNext();
					}
                    
					
				}
				
			}
		});
		Ext.ux.ButtonPanel.superclass.initComponent.call(this);
	}

// constructor: function(num){
		// var items = [ //put item here
		// {
		// xtype: 'box',
		// autoEl: {
		// tag: 'h3',
		// style: "padding:15px 0 3px;"
		// },
		// colspan: 3
		// }];
		// // apply test configs
		// for (var i = 0; i < num; i++) {
		// items.push({
		// text: i + 1,
		// menu: this.menu,
		// enableToggle: this.enableToggle,
		// split: this.split,
		// arrowAlign: this.arrowAlign
		// });
		// }
		// ButtonPanel.superclass.constructor.call(this, {
		// items: items
		// });
		// }
		});
