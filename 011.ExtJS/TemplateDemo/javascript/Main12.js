Ext
		.onReady(function() {

			Ext.BLANK_IMAGE_URL = 'pic/s.gif';
			Ext.QuickTips.init();
			Ext.lib.Ajax.defaultPostHeader += ";charset=utf-8";
			var d1 = [ {
				id : 'department',
				text : '部门管理',
				leaf : true
			}, {
				id : 'company',
				text : '部门管理',
				leaf : true
			}, {
				id : 'permissions',
				text : '权限管理',
				children : [ {
					id : 'permission',
					text : '权限管理',
					leaf : true
				}, {
					id : 'permissionType',
					text : '权限类别',
					leaf : true
				}]
			}];
			var d0 = [ {
				id : 'docRec',
				text : '接收公文',
				leaf : true
			}, {
				id : 'docSend',
				text : '发送公文',
				leaf : true
			}, {
				id : 'docManage',
				text : '公文管理',
				leaf : true
			}];

			var d = [ {
				title : '我的办公桌',
				data : d0
			}, {
				title : '主数据管理',
				data : d1
			}]

			var head = new Ext.Panel( {
				region : 'north',
				border : false,
				html : '<div style="background:url(pic/main1.gif) repeat-x; height:78px;"></div>',
				height : 80
			});
			var foot = new Ext.Panel( {
				region : 'south',
				html : '<div style="background:url(pic/main2.gif) repeat-x; height:33px; ">'
						+ '<div style="float:left;font:normal 12px tahoma, arial, sans-serif, 宋体;margin:10px 0 0 10px;">'
						+ 'Power By:	<span style="color:blue">彭仁夔</span> &nbsp;</div>'
						+ '<div	style="float:right;margin:10px;font:normal 12px tahoma, arial, sans-serif, 宋体;" >'
						+ '版权所有：<a href="http://www.morik.com">www.morik.com</a></div>'
						+ '</div>',
				height : 35
			});
			var leftmenu = new Ext.Panel( {
				region : 'west',
				html : '<div>导航菜单</div>',
				width : 200
			});
			var mainTab = new Ext.Panel( {
				region : 'center',
				html : '<div>主内容部分</div>'
			});
			// var leftmenu = new Morik.Office.LeftMenu();
			var leftmenu = new Morik.Office.TabBoxTree( {
				data : d
			});

			 var mainTab = new Morik.Office.MainingPanel();
			 leftmenu.on("nodeClick", function(nodeAttr) {
			 mainTab.loadTab(nodeAttr);
			 });
			var viewport = new Ext.Viewport( {
				layout : 'border',
				style : 'border:#024459 2px solid;',
				items : [head, foot, leftmenu, mainTab// 初始标签页
				]
			});

		});