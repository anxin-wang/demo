Ext.onReady(function(){
	var proxy = new Ext.data.HttpProxy({
    url: 'users.json'
});

	var reader = new Ext.data.JsonReader({
    totalProperty: 'total',
    successProperty: 'success',
    idProperty: 'id',
    root: 'data',
    messageProperty: 'message'  // <-- New "messageProperty" meta-data
}, [
    {name: 'id'},
    {name: 'email', allowBlank: false},
    {name: 'first', allowBlank: false},
    {name: 'last', allowBlank: false}
]);

var store = new Ext.data.Store({
    id: 'user',
    //restful: true,     // <-- This Store is RESTful
    proxy: proxy,
    reader: reader,
	//totalProperty: 'total',
    //writer: writer    // <-- plug a DataWriter into the store just as you would a Reader
});
//store.load();
var userColumns =  [
    {header: "ID", width: 40, sortable: true, dataIndex: 'id'},
    {header: "Email", width: 100, sortable: true, dataIndex: 'email', editor: new Ext.form.TextField({})},
    {header: "First", width: 50, sortable: true, dataIndex: 'first', editor: new Ext.form.TextField({})},
    {header: "Last", width: 50, sortable: true, dataIndex: 'last', editor: new Ext.form.TextField({})}
];


    var grid = new Ext.grid.GridPanel({
        width:700,
        height:500,
        title:'ExtJS.com - Browse Forums',
        store: store,
//        trackMouseOver:false,
//        disableSelection:true,
        loadMask: true,

        // grid columns
       columns : userColumns,


        // customize view config
//        viewConfig: {
//            forceFit:true,
//            enableRowBody:true,
//            showPreview:true,
//            getRowClass : function(record, rowIndex, p, store){
//                if(this.showPreview){
//                    p.body = '<p>'+record.data.excerpt+'</p>';
//                    return 'x-grid3-row-expanded';
//                }
//                return 'x-grid3-row-collapsed';
//            }
//        },

        // paging bar on the bottom
        bbar: new Ext.PagingToolbar({
            pageSize: 10,
            store: store,
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display",
            items:[
                '-', {
                pressed: true,
                enableToggle:true,
                text: 'Show Preview',
                cls: 'x-btn-text-icon details',
                toggleHandler: function(btn, pressed){
                    var view = grid.getView();
                    view.showPreview = pressed;
                    view.refresh();
                }
            }]
        })
    });
	grid.render('topic-grid');
	store.load({params:{start:0, limit:10}});
});