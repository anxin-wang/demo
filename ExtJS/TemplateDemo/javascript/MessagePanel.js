Ext.ns('Ext.ux');
Morik.Office.MessagePanel = function(config) {
	this.pageSize = 20;
	this.createData();
	this.createMSNTemplate();
	this.createView();
	this.createOnline();
	this.createFilter();
	config = Ext.apply( {
		width : 180,
		height : 480,
		defaults : {
			border : false
		},
		items : [this.view],
		tbar : [this.nameFilter, '-', this.online],
		bbar : new Ext.PagingToolbar( {
			pageSize : this.pageSize,
			store : this.ds,
			displayInfo:'显示的内容'
		})
	}, config || {});
	Morik.Office.MessagePanel.superclass.constructor.call(this, config);
	// 应该在page之后
	this.ds.load( {
		params : {
			start : 0,
			limit : 20
		}
	});
}

Ext.extend(Morik.Office.MessagePanel, Ext.Panel, {
	initComponent : function() {
		Morik.Office.MessagePanel.superclass.initComponent.call(this, this);
		this.createMSGTemplate();
		this.tipHide = true;
	},
	createMSGTemplate : function() {
		var str = '<table width="295" height="180" style="font-size:12px;" >'
				+ '<tr> <td height="20" colspan="4"><div align="center"><strong>{name}的个人信息</strong></div></td> </tr>'
				+ ' <tr> <td height="20">&nbsp;公司：</td> <td width="103">{company}</td> <td width="137"  align="center"  colspan="2" rowspan="4"><img src="pic/pch.jpg" alt="ss" width="120" height="82" /></td>  </tr>'
				+ '<tr>  <td height="20">&nbsp;部门：</td>  <td>{department}</td> </tr>'
				+ '<tr> <td height="20">&nbsp;电话：</td> <td>{telphone}</td> </tr>'
				+ '<tr> <td height="20">&nbsp;手机：</td> <td>{mobile}</td> </tr>'
				+ '<tr>  <td colspan="4">&nbsp;个人简介：</td> </tr>'
				+ '<tr>   <td height="48" colspan="4"> &nbsp;&nbsp;该家伙是个疯子，恺人忧天，担心着宇宙的收缩。<br />&nbsp;&nbsp;该家伙是精神病，关注天下，忧心着国家的发展。<br /> &nbsp;&nbsp;该家伙是独行僧。海马行空，行走在时空岁月中。</td> </tr>'
				+ '</table>';
		if (!this.msgTpl) {
			var t = new Ext.XTemplate(str);
			t.compile();
			Morik.Office.MessagePanel.prototype.msgTpl = t;
		}
	},
	createMSNTemplate : function() {
		this.msnTemplate = this.msnTemplate
				|| new Ext.XTemplate(
						'<tpl for=".">',
						'<div class="x-message-div"><img src="{url}"/>&nbsp;<span>{name}</span></div>',
						'</tpl>');
		return this.msnTemplate;
	},
	createView : function() {
		var view = new Ext.DataView( {
			tpl : this.msnTemplate,
			singleSelect : true,
			overClass : 'x-message-div-over',
			itemSelector : 'div.x-message-div',
			store : this.ds,
			prepareData : function(data, i, r) {
				data['url'] = 'pic/msnicon' + data['state'] + '.gif';
				data['company'] = "江西集电有限公司" + i;
				data['department'] = "信息部" + i;
				data['telphone'] = "836407" + i;
				data['mobile'] = "136070082" + i;
				return data;
			},
			listeners : {
				'click' : this.showMsg,
				'mouseleave' : this.hideMsg,
				'contextmenu' : this.onContextMenu,
				scope : this,
				delay : 300
			}
		});
		this.view = view;
		view.onContextMenu = function(e) {
			e.preventDefault();
			var item = e.getTarget(this.itemSelector, this.getTemplateTarget());
			if (item) {
				this
						.fireEvent("contextmenu", this, this.indexOf(item),
								item, e);
			} else {
				this.fireEvent("containercontextmenu", this, e)
			}
		};
		return view;

	},
	createData : function() {
		var reader = new Ext.data.PageArrayReader( {
			fields : [ {
				name : 'name',
				type : 'string'
			}, {
				name : 'url',
				type : 'string'
			}, {
				name : 'state',
				type : 'int'
			}, {
				name : 'company',
				type : 'string'
			}, {
				name : 'department',
				type : 'string'
			}, {
				name : 'telphone',
				type : 'string'
			}, {
				name : 'mobile',
				type : 'string'
			}]
		});

		var data = [['彭仁夔', 'pic/msnicon1.gif', 1],
				['刘婷', 'pic/msnicon2.gif', 2], ['杨妙', 'pic/msnicon1.gif', 1],
				['廖彩彪', 'pic/msnicon1.gif', 1], ['余燕', 'pic/msnicon2.gif', 2],
				['董文辉', 'pic/msnicon1.gif', 1], ['李小华', 'pic/msnicon1.gif', 1],
				['杨敏', 'pic/msnicon1.gif', 1], ['廖彩中', 'pic/msnicon1.gif', 1],
				['余华', 'pic/msnicon2.gif', 2], ['董文辉', 'pic/msnicon1.gif', 1],
				['李小平', 'pic/msnicon1.gif', 1], ['彭仁夔', 'pic/msnicon1.gif', 1],
				['刘婷', 'pic/msnicon2.gif', 2], ['杨妙', 'pic/msnicon1.gif', 1],
				['廖彩彪', 'pic/msnicon1.gif', 1], ['余燕', 'pic/msnicon2.gif', 2],
				['董文辉', 'pic/msnicon1.gif', 1], ['李小华', 'pic/msnicon1.gif', 1],
				['杨敏', 'pic/msnicon1.gif', 1], ['廖彩中', 'pic/msnicon1.gif', 1],
				['余华', 'pic/msnicon2.gif', 2], ['董文辉', 'pic/msnicon1.gif', 1],
				['李小平', 'pic/msnicon1.gif', 1], ['杨妙', 'pic/msnicon1.gif', 1],
				['廖彩彪', 'pic/msnicon1.gif', 1], ['余燕', 'pic/msnicon2.gif', 2],
				['董文辉', 'pic/msnicon1.gif', 1], ['李小华', 'pic/msnicon1.gif', 1],
				['杨敏', 'pic/msnicon1.gif', 1], ['廖彩中', 'pic/msnicon1.gif', 1],
				['余华', 'pic/msnicon2.gif', 2], ['董文辉', 'pic/msnicon1.gif', 1],
				['李小平', 'pic/msnicon1.gif', 1], ['彭仁夔', 'pic/msnicon1.gif', 1],
				['刘婷', 'pic/msnicon2.gif', 2], ['杨妙', 'pic/msnicon1.gif', 1],
				['廖彩彪', 'pic/msnicon1.gif', 1], ['余燕', 'pic/msnicon2.gif', 2],
				['董文辉', 'pic/msnicon1.gif', 1], ['李小华', 'pic/msnicon1.gif', 1],
				['杨敏', 'pic/msnicon1.gif', 1], ['廖彩中', 'pic/msnicon1.gif', 1],
				['余华', 'pic/msnicon2.gif', 2], ['董文辉', 'pic/msnicon1.gif', 1],
				['李小平', 'pic/msnicon1.gif', 1]];

		var proxy = new Ext.data.ArrayProxy(data);
		var ds = new Ext.data.Store( {
			reader : reader,
			proxy : proxy
		});
		this.ds = ds;
	},
	createOnline : function() {
		var t = this;
		this.online = {
			text : '在线人数',
			handler : function() {
				t.ds.filterBy(function(r) {
					var n = r.data['state'];
					if (n == 1)
						return true;
					return false;
				});
			}
		};
	},
	createFilter : function() {
		var t = this;
		var filter = function(text, f) {
			if ((text != f.emptyText) && (text != f.lastValue)) {
				var re = new RegExp('^' + Ext.escapeRe(text), 'i');
				t.ds.filterBy(function(r) {
					var n = r.data['name'];
					if (re.test(n))
						return true;
					return false;
				});
				f.lastValue = text;
			}
		};
		var tfInput = function(f) {
			var f1 = function(e) {
				var text = e.target.value;
				filter(text, f);
			};
			f.el.on('keydown', f1, f, {
				buffer : 20
			});
			Ext.TaskMgr.start( {
				run : function() {
					filter(f.el.dom.value, f);
				},
				interval : 1000
			});
		};
		var tf = new Ext.form.TextField( {
			width : 100,
			emptyText : '输入名字',
			lastValue : "",
			listeners : {
				'render' : tfInput
			}
		});
		this.nameFilter = tf;
	},
	onContextMenu : function(t, i, item, e) {
		if (!this.menu) {
			this.menu = new Ext.menu.Menu( {
				items : [ {
					iconCls : 'context-dog',
					text : '查看资料',
					scope : this,
					listeners : {
						'activate' : function() {
							this.showMsg(t, i, item);
						},
						'deactivate' : function() {
							this.hideMsg();
						},
						scope : this
					}
				}, {
					text : '发起对话',
					iconCls : 'context-cat',
					scope : this,
					handler : function() {
					}
				}, '-', {
					iconCls : 'context-girl',
					text : '发送短消息',
					handler : this.showWindow,
					scope : this
				}]
			});
		}
		this.menu.showAt(e.getXY());
		// e.preventDefault();
	},
	onContextHide : function() {
		if (this.ctxNode) {
			this.ctxNode.ui.removeClass('x-node-ctx');
			this.ctxNode = null;
		}
	},
	hideMsg : function() {
		if (this.tipHide == false) {
			this.list.hide();
			this.tipHide = true;
		}
	},
	showMsg : function(d, i, el, e) {
		if (this.tipHide == true) {
			if (this.list)
				this.list.destroy();
			if (this.list)
				this.list.remove();
			this.list = new Ext.Layer( {
				shadow : true,
				cls : 'x-combo-list',
				constrain : false
			});
			this.msgTpl.overwrite(this.list, d.store.getAt(i).data);
			this.list.show();
			if (e)
				this.list.setXY(e.getXY());
			else {
				var xy = this.menu.getEl().getXY();
				xy[0] = xy[0] + this.menu.getEl().getWidth() + 2;
				xy[1] = xy[1] + 5;
				this.list.setXY(xy);
			}
			this.list.on('mouseout', function() {
				this.list.hide();
			}, this);
			this.tipHide = false;
		}

	}

})
