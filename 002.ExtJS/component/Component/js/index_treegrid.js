Ext.onReady(function(){

	var treeGridPanelTopToolBarObject=new TreeGridPanelTopToolBar({
		renderTo:'tree_grid_panel_top_toolBar'
	})
	var treeGridPanelToolBarObject=new TreeGridPanelToolBar({
		renderTo:'tree_grid_panel_toolbar'
	})
	var treeGridPanelToolBarBottomObject=new TreegridPanelToolbarBottom({
		renderTo:'tree_grid_panel_toolbar_bottom'
	})
	var treeGrid = new Ext.ux.tree.TreeGrid({
        title: '',
        enableDD: true,
		height:270, 
		renderTo:'tree_grid',      
      	columns:[
		{
            header: 'Compaign Name',
            dataIndex: 'campaignname',
            width: 230
        },{
            header: 'Type',
            width: 100,
            dataIndex: 'type',
            align: 'center'
//            sortType: 'asFloat',
//            tpl: new Ext.XTemplate('{duration:this.formatHours}', {
//                formatHours: function(v) {
//                    if(v < 1) {
//                        return Math.round(v * 60) + ' mins';
//                    } else if (Math.floor(v) !== v) {
//                        var min = v - Math.floor(v);
//                        return Math.floor(v) + 'h ' + Math.round(min * 60) + 'm';
//                    } else {
//                        return v + ' hour' + (v === 1 ? '' : 's');
//                    }
//                }
//            })
        },{
            header: 'Status',
            width: 200,
            dataIndex: 'status'
        }
		,{
            header: 'Visitors',
            width: 200,
            dataIndex: 'visitors'
        }
		,{
            header: 'Registrations',
            width: 100,
            dataIndex: 'registrations'
        }
		,{
            header: 'Conv.%',
            width: 150,
            dataIndex: 'conv'
        }
		,{
            header: 'Owner',
            width: 150,
            dataIndex: 'owner'
        }
		,{
            header: 'Created',
            width: 150,
            dataIndex: 'created'
        },
        {
            header: 'Operation',
            width: 150
        }
		],

        dataUrl: 'treegrid-data.json'
    });


})