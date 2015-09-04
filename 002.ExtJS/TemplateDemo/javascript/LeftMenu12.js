Ext.ns("Morik", "Morik.Office", "Morik.Util", "Morik.Office.Department");

Morik.Office.TabBoxTree = Ext.extend(Ext.Panel, {
	region : 'west',
	split : true,
	autoHide : false,
	width : 200,
	minWidth : 100,
	layout : 'accordion',
	title : '我的办公系统',
	collapsible : true,
	layoutConfig : {
		animate : true
	},
	defaults : {
		border : false
	},
	initComponent : function() {
		this.addEvents('nodeClick');
		this._trees = [];
		if (this.data && Ext.type(this.data) == 'array') {
			var d = this.data;
			for (var i = 0;i < d.length; i++) {
				var p = new Ext.Panel(d[i]);
				var t = new Ext.tree.TreePanel(Ext.apply( {
					root : new Ext.tree.AsyncTreeNode( {
						text : 'hide',
						expanded : true,
						children : d[i].data
					}),
					border : false,
					rootVisible : false					
				}, this.treeConfig || {}));
				p.add(t);
				this._trees[i] = t;
				this.add(p);
			}
		}
	},
	initEvents : function() {
		Morik.Office.TabBoxTree.superclass.initEvents.call(this);
		this.initTreeEvent(this._trees);
	},
	initTreeEvent : function(arr) {
		for (var i = 0;i < arr.length; i++) {
			arr[i].on( {
				'click' : function(node, event) {
					if (node && node.isLeaf()) {
						event.stopEvent();
						this.fireEvent('nodeClick', node.attributes);
					}
				},
				scope : this
			});
		}
	}
});