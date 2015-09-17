Ext.ns("Morik", "Morik.Office", "Morik.Util", "Morik.Office.Department");
Ext.TabEvent = Ext.extend(Ext.tree.DefaultSelectionModel, {
	init : function(tree) {
		this.tree = tree;
		if (Ext.isIE)
			Ext.override(Ext.tree.TreeNode, {
				preventHScroll : false
			});
		// tree.el.on("keydown", this.onKeyDown, this);
		Ext.getBody().on("keydown", this.onKeyDown, this)
		tree.on("click", this.onNodeClick, this);
	},
	selectNext : function() {
		var t = this;
		var s = this.selNode;
		if (!s) {
			return null;
		}
		this.clearSelections();
		// alert(s.text);
		if (s.firstChild && s.isExpanded()) {
			return this.select(s.firstChild);
		} else if (s.nextSibling) {
			return this.select(s.nextSibling);
		} else if (s.parentNode) {
			var newS = null;
			s.parentNode.bubble(function() {
				if (this.nextSibling) {
					newS = this.getOwnerTree().selModel
							.select(this.nextSibling);
					return false;
				} else {
					var tb = t.tabBox, tp = t.tabPanel;
					var titems = tb.items, tlen = titems.length;
					if (!tb.ativeTab)
						tb.ativeTab = tp;
					var index = titems.indexOf(tb.ativeTab);
					index = index < 0 ? 0 : index;
					tb.ativeTab = titems.itemAt((index + tlen + 1) % tlen);

					tb.ativeTab.on('expand', function() {
						var atree = tb.ativeTab.tree;
						atree.getSelectionModel()
								.select(atree.getRootNode().firstChild);
						tb.items.each(function() {
							if (this != tb.ativeTab) {
								this.collapse(true);
							}
						});
					}, this);
					t.selNode = null;
					tb.ativeTab.expand(true);
					tb.doLayout();

				}
			});
			return newS;
		}
		return null;
	},
	selectPrevious : function() {
		var s = this.selNode || this.lastSelNode;
		if (!s) {
			return null;
		}
		this.clearSelections();
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
			var tb = this.tabBox, tp = this.tabPanel;
			var titems = tb.items, tlen = titems.length;
			if (!tb.ativeTab)
				tb.ativeTab = tp;
			var index = titems.indexOf(tb.ativeTab);
			index = index < 0 ? 0 : index;
			tb.ativeTab = titems.itemAt((index + tlen - 1) % tlen);
			tb.ativeTab.on('expand', function() {
				var atree = tb.ativeTab.tree;
				var lc = atree.getRootNode().lastChild;
				while (lc && lc.isExpanded() && lc.childNodes.length > 0) {
					lc = lc.lastChild;
				}
				atree.getSelectionModel().select(lc);
				tb.items.each(function() {
					if (this != tb.ativeTab) {
						this.collapse(true);
					}
				});
			}, this);
			this.selNode = null;
			tb.ativeTab.expand(true);

			tb.doLayout();
		}
		return null;
	}
});
Morik.Office.LeftMenu = function(config) {
	var d = Ext.apply( {
		width : 200,
		split : true,
		region : 'west',
		defaults : {
			border : false
		},
		layoutConfig : {
		// animate : true
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
		// this.initTabNext();
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
			t.selModel = new Ext.TabEvent( {
				tabBox : this,
				tabPanel : p
			});
			t.beforeMethod('initEvents', function() {
				// this.getSelectionModel().init = function() {
					// };
				}, t);
			var msm = new function() {
				this.init = function(tree) {
				}
			};
			// t.selModel = msm;

	}
	var config = {
		tabbox : this,
		tabs : c,
		activetab : this.items.itemAt(0)
	};
	// this.tabsel = new Ext.TabSel(config);
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
