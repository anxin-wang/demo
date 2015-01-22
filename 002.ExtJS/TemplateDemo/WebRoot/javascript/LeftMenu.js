Ext.ns("Morik", "Morik.Office", "Morik.Util", "Morik.Office.Department");
Ext.TabSel = function(config) {
	Ext.TabSel.superclass.constructor.call(this);
	Ext.apply(this, config);
	this.init();
};
Ext.extend(Ext.TabSel, Ext.tree.DefaultSelectionModel, {
	msg : '',
	init : function(tree) {
		this.tlen = this.tabBox.items.length;
		this.keynav = new Ext.KeyNav(Ext.getBody(), {
			'enter' : this.enter,
			'left' : this.left,
			'right' : this.right,
			'up' : this.up,
			'down' : this.down,
			scope : this
		});

		for (var i = 0;i < this.tlen; i++) {
			this.tabBox.items.itemAt(i).tree.on("click", this.onNodeClick, this);
		}
		new Ext.KeyMap(Ext.getBody(), [{
			key : 'n',
			alt : true,
			fn : function() {
				alert(this.msg);
			},
			scope : this
		}]);
	},
	right : function(e) {
		var s = this.selNode;
		if (!s) {
			return null;
		}
		if (s.hasChildNodes()) {
			if (!s.isExpanded()) {
				s.expand();
			} else if (s.firstChild) {
				this.select(s.firstChild, e);
			}
		}
	},
	left : function(e) {
		var s = this.selNode;
		if (!s) {
			return null;
		}
		if (s.hasChildNodes() && s.isExpanded()) {
			s.collapse();
		} else if (s.parentNode
				&& (this.tree.rootVisible || s.parentNode != this.tree
						.getRootNode())) {
			this.select(s.parentNode, e);
		}
	},
	up : function(e) {
		var s = this.selNode;
		if (!s) {
			return null;
		}
		var ps = s.previousSibling;
		if (ps) {
			if (!ps.isExpanded() || ps.childNodes.length < 1) {
				return this.select(ps);
			} else {
				var lc = ps.lastChild;
				while (lc && lc.isExpanded() && lc.childNodes.length > 0) {
					lc = lc.lastChild;
				}
				return this.select(lc);
			}
		} else if (s.parentNode
				&& (this.tree.rootVisible || !s.parentNode.isRoot)) {
			return this.select(s.parentNode);
		} else if (s.parentNode.isRoot && !this.tree.rootVisible) {
			this.changeTab(-1);
		}

		return null;

	},
	down : function(e) {
		var t = this;
		var s = this.selNode;
		if (!s) {
			return null;
		}
		// alert(s.text);
		if (s.firstChild && s.isExpanded()) {

			return this.select(s.firstChild);
		} else if (s.nextSibling) {
			return this.select(s.nextSibling);
		} else if (s.parentNode) {
			var newS = null;
			s.parentNode.bubble(function() {
				if (this.nextSibling) {
					newS = this.select(this.nextSibling);
					return false;
				} else {
					t.changeTab(1);
				}
			});
			return newS;
		}
		return null;

	},
	changeTab : function(dir) {
		var tb = this.tabBox, tp = this.tabPanel;
		var titems = tb.items, tlen = titems.length;
		if (!tb.ativeTab)
			tb.ativeTab = tp;
		var index = titems.indexOf(tb.ativeTab);
		index = index < 0 ? 0 : index;
		tb.ativeTab = titems.itemAt((index + tlen + dir) % tlen);
		// alert(index);
		tb.ativeTab.on('expand', function() {
			var atree = tb.ativeTab.tree, n;
			if (dir == 1) {
				n = atree.getRootNode().firstChild;
			} else {
				n = atree.getRootNode().lastChild;
				while (n && n.isExpanded() && n.childNodes.length > 0) {
					n = n.lastChild;
				}
			}
			this.select(n);
			tb.items.each(function() {
				if (this != tb.ativeTab) {
					this.collapse(true);
				}
			});
		}, this);
		// this.selNode = null;
		tb.ativeTab.expand(true);
		tb.doLayout();

	},
	enter : function(e) {
		var s = this.selNode;
		if (!s) {
			return null;
		}
		this.tabBox.onNodeClick(s, e);

	},
	select : function(node) {
		this.msg = this.msg + " " + node.text;
		this.tree = node.getOwnerTree();
		this.tabPanel = this.tree.tabPanel;
		return Ext.TabSel.superclass.select.call(this, node);
	}

});

Morik.Office.LeftMenu = function(config) {
	var d = Ext.apply( {	
		width : 180,
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
		for (var i = 0;i < this.items.length; i++) {
			var t = this.items.itemAt(i).items.itemAt(0);
			t ? t.on('click', this.onNodeClick, this) : "";
		}
	},
	onNodeClick : function(node, event) {
		if (node && node.isLeaf()) {
			event.stopEvent();
			this.fireEvent('nodeClick', node.attributes);
		}
	},
	initEvents : function() {
		Morik.Office.LeftMenu.superclass.initEvents.call(this);	
		this.initTabsel();
		this.initTreeEvent();
	},
	initTabsel : function() {
		var th = this;
		var c = this.items;
		for (var i = 0;i < this.items.length; i++) {
			var p = c.itemAt(i);
			var t = p.items.itemAt(0);
			p.tree = t;
			t.tabPanel = p;
			t.beforeMethod('initEvents', function() {
				 this.getSelectionModel().init = function() {
					 };
				}, t);
			var unevent = new function() {
				this.init = function(tree) {
				}
			};
			t.selModel = unevent;
		}
		this.tabsel = new Ext.TabSel( {
			tabBox : this
		});
	}
})
