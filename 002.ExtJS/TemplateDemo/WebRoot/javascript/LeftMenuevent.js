Ext.ns("Morik", "Morik.Office", "Morik.Util", "Morik.Office.Department");
Morik.Office.LeftMenu = function(config) {
	var d = Ext.apply( {
		width : 200,
		split : true,
		region : 'west',
		defaults : {
			border : false
		},
		layoutConfig : {
			animate : true
		}
	}, config || {});

	config = Ext.apply(d, {
		layout : 'accordion',
		collapsible : true
	});

	Morik.Office.LeftMenu.superclass.constructor.call(this, config);
	for (var i = 0;i < this.trees.length; i++) {
		this.add( {
			title : this.trees[i].getRootNode().text,
			items : [this.trees[i]]
		});
	}
	this.addEvents('nodeClick');

}

Ext.extend(Morik.Office.LeftMenu, Ext.Panel, {
	initTreeEvent : function() {
		if (!this.items)
			return;
		var click = function(node, event) {
			if (node && node.isLeaf()) {
				 event.stopEvent();
				this.fireEvent('nodeClick', node.attributes);
			}
		};
		for (var i = 0;i < this.items.length; i++) {
			var t = this.items.itemAt(i).items.itemAt(0);
			t ? t.on('click', click, this) : "";
		}
	},
	initEvents : function() {
		// scope
		// render sequence
		// focus

		Morik.Office.LeftMenu.superclass.initEvents.call(this);
		this.initTabNext();
		this.initTreeEvent();
		this.initkeyNav();

	},
	// getKeyMap : function() {
	// if (!this.keyMap) {
	// this.keyMap = new Ext.KeyMap(Ext.getBody(), this.keys);
	// }
	// return this.keyMap;
	// },
	initkeyNav : function() {
		for (var i = 0;i < this.items.length; i++) {
			var p = this.items.itemAt(i);
			var t = this.items.itemAt(i).items.itemAt(0);
			t.tabPanel = this.items.itemAt(i);
			t.tabNum = i;
			t.tabItems = this.items;		
			t.selModel = new Ext.TabSelectionModel();
		}
	},
	initTabNext : function() {
		if (this.tabKey) {
			var t = Ext.applyIf(this.tabKey, {
				fn : this.toggleNext,
				scope : this
			// 要注意，一定要指定scope
					});
			new Ext.KeyMap(Ext.getBody(), [t]);
		}
	},
	toggleNext : function() {
		var len = this.items.length;
		for (var i = 0;i < len; i++) {
			var c = this.items.get(i);
			if (!c.collapsed) {
				c.collapse(true);
				this.items.get((i + 1) % len).expand(true);
				this.items.get((i + 1) % len).el.focus();
				break;
			}
		}
	}
})
