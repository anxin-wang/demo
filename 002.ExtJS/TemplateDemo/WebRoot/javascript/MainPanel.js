Ext.ns("Morik", "Morik.Office", "Morik.Util", "Morik.Office.Department");
// Ext.override(Ext.tree.TreeNode,{preventHScroll:false});

Morik.Office.MainingPanel = Ext.extend(Ext.TabPanel, {
	initComponent : function() {
		// 一些初始化工作
		Morik.Office.MainingPanel.superclass.initComponent.call(this);
		this._cache = {};

	},
	loadTab : function(node, succ) {
		var n = this.getComponent(node.id);
		if (n) {
			this.setActiveTab(n);
		} else {
			var c = {
				'id' : node.id,
				'title' : node.text,
				closable : true
			};
			var pn;
			this.getEl().unmask();
			if (succ === false) {
				n = this.add(Ext.apply(c, {
					html : '你还没有实现该页面！'
				}));
			} else {
				var pn = this.findPanel(node, node.id);
			//	alert(node.id);
				if (pn == 'wait') {
					this.getEl().mask("正在载入JS文件!");
					return;
				};
				n = this.add(new pn(c));
			}
			n.show().doLayout();
		}
		if (n.ds)
			n.ds.load(n.initParams);
	},
	 capitalize : function(value){
            return !value ? value : value.charAt(0).toUpperCase() + value.substr(1);
        },
	findPanel : function(node, name) {
		var ret = this._cache[name], t = this;
		if (!ret) {
			var name1 =this.capitalize(name) + 'Panel';
		//	alert(name1);
			var pn = (this.ns ? this.ns : 'Morik.Office') + "." + name1;
			var ret = eval(pn);
		}
		if (!ret) {
			var succ = function(o) {
				if (o.responseText) {
					if (window.execScript)
						window.execScript(o.responseText);
					else
						window.eval(o.responseText);
					t._cache[name] = t.loadTab(node, true);
				}
			};
			var fail = function(o) {
				t.loadTab(node, false);
			};
			Ext.Ajax.request( {
				timeout : 5,
				url : "javascript/" + name1 + ".js",
				success : succ,
				failure : fail
			});
			ret = "wait";
		}
		return ret;
	},
	addPanel : function(name, panel) {
		if (!this._cache)
			this._cache = {};
		this._cache[name] = panel;
	}
});
