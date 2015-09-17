Ext.BLANK_IMAGE_URL = 'resources/images/s.gif';
var image_galary_store_sort = 'date';
var image_galary_subType = 'All';
/*
 * Ext.XTemplate definition[start]
 */
var image_galary_tpl = new Ext.XTemplate('<tpl for=".">', '<div class="thumb-wrap" id="{id}">', '<a href="#"><span>{shortName}</span><img src="{screenshot}" alt="{shortName}"/></a><div class="deck"><span class="x-u"><a class="x" her="#">x</a><a class="arrow" her="#">download</a></span><a class="view" her="#">View</a><a class="update" her="#">Update</a><a class="edit" her="#">Edit</a></div>', '</div>', '</tpl>', '<div class="x-clear"></div>');

var param_getTemplateLibraryImages = Ext.encode({
    className: 'Class_Internal_Email_Content',
    methodName: 'getTemplateList',
    params: {
        name: '',
        subType: image_galary_subType,
        sortBy: image_galary_store_sort,
        start: 0,
        limit: 6
    }
});
var image_galary_store = new Ext.data.JsonStore({
    url: 'api/extjs/index.php',
    baseParams: {
        data: param_getTemplateLibraryImages
    },
    totalProperty: 'total',
    root: 'data',
    fields: ['id',
    {
        name: 'shortName',
        mapping: 'name'
    }, 'screenshot'],
	listeners: {
		'load': function(){
			try {
			if(image_galary_store.getTotalCount())
				Ext.get('ux-paging-toolbar').show();
			else
				Ext.get('ux-paging-toolbar').hide();
			} catch(e){}
		}
	}
});
var image_galary_subtype_store = new Ext.data.JsonStore({
    url: 'api/extjs/index.php',
    baseParams: {
        data: Ext.encode({
            className: 'Class_Internal_Email_Content',
            methodName: 'getSubType'
        })
    },
    totalProperty: 'total',
    root: 'data',
    fields: ['subType']
});
image_galary_subtype_store.load();
image_galary_store.load();
var template_subtype_listview = new Ext.list.ListView({
    store: image_galary_subtype_store,
    multiSelect: false,
    singleSelect: true,
    cls: 'create-from-template-list',
    selectedClass: 'create-from-template-list-selected',
    emptyText: 'No folder',
    reserveScrollOffset: true,
    columns: [{
        dataIndex: 'subType'
    }],
    listeners: {
        'selectionchange': function (view, nodes) {
            choosetemplatelibrarytype = 0;
            var subType_o = view.getSelectedRecords()[0].get("subType");
            image_galary_subType = subType_o.substring(0, subType_o.indexOf('('));
            image_galary_keyword = '';
            Ext.getCmp('template-search-textfield').setValue('');
            Ext.getCmp('templatelibrary-choose-title').setValue('<p class="displayfield-folder">' + image_galary_subType + '</p>');
            param_getTemplateLibraryImages = Ext.encode({
                className: 'Class_Internal_Email_Content',
                methodName: 'getTemplateList',
                params: {
                    name: image_galary_keyword,
                    subType: image_galary_subType,
                    sortBy: image_galary_store_sort,
                    start: 0,
                    limit: 6
                }
            });
            image_galary_store.setBaseParam('data', param_getTemplateLibraryImages);
            image_galary_store.load();
            //Ext.get('templatelibrary-url-link').removeClass('focus')
            //Ext.get('templatelibrary-zip-link').removeClass('focus')
            //Ext.get('templatelibrary-pasteincode-link').removeClass('focus')
            Ext.get('templatelibrary-choose').removeClass('hide');
            //Ext.get('templatelibrary-url').addClass('hide');
            Ext.get('templatelibrary-zip').addClass('hide');
        }
    }
});

// set up the folder tree
var tree = new Ext.tree.TreePanel({
	 // tree
	 animate:false,
	 store: image_galary_subtype_store,
	 enableDD:false,
	 containerScroll: false,
	 rootVisible:false,
	 // layout
	 region:'west',
	 //width:200,
	 //split:true,
	 // panel
	 //title:'Emails',
	 autoScroll:false
	 //tbar: tb,
	 //margins: '5 0 5 5'
});

var root = new Ext.tree.TreeNode({
	text: 'Albums',
	allowDrag:false,
	allowDrop:false
});
tree.setRootNode(root);

var templatelibrarydataview = new Ext.DataView({
    autoHeight: true,
    cls: 'template_galary_screenshot',
    itemSelector: 'div.thumb-wrap',
    store: image_galary_store,
	emptyText: '<strong>There are no templates in this folder</strong>',
    tpl: image_galary_tpl,
    singleSelect: true,
    selectedClass: 'focus',
    listeners: {
        'click': function (t, index, node, e) {
            e.preventDefault();
            asset_ID_template = node.id;
        }
    }
});
/*
 * template library [start]
 */
TemplateLibraryImageGalary = Ext.extend(Ext.Panel, {
    cls: 'templatelibraryimagegalary-cls',
    border: false,
    initComponent: function () {
        this.items = [{
            xtype: 'panel',
            width: 695,
            border: false
        }, {
            xtype: 'panel',
            id: 'templatelibrary-choose',
            width: 734,
            border: false,
            items: [{
				xtype:"button",
				cls:"btn btn-email-list-new",
				text:"Create New"
			}, {
                xtype: 'displayfield',
                id: 'templatelibrary-choose-title',
                value: '<p class="displayfield-folder"><span class="img">My Templates</span></p>',
                padding: '40px 0 0 0'
            }, {
                xtype: 'panel',
                border: false,
                layout: 'column',
                cls: 'displayfield-panel',
                height: 44,
                width: 726,
                items: [{
                    xtype: 'panel',
                    cls: 'templatelibrary-search-bar',
                    width: 240,
                    height: 50,
                    layout: 'column',
                    border: false,
                    items: [{
                        xtype: 'textfield',
                        id: 'template-search-textfield',
                        height: 21,
                        width: 205,
                        emptyText: 'Search',
                        cls: 'templatelibrary-search-bar-textfield'
                    }, {
                        xtype: 'button',
                        text: 'Search',
                        cls: 'btn btn-templatelibrary-search',
                        listeners: {
                            'click': function () {
                                image_galary_keyword = Ext.getCmp('template-search-textfield').getValue();
                                param_getTemplateLibraryImages = Ext.encode({
                                    className: 'Class_Internal_Email_Content',
                                    methodName: 'getTemplateList',
                                    params: {
                                        name: image_galary_keyword,
                                        subType: image_galary_subType,
                                        sortBy: image_galary_store_sort,
                                        start: 0,
                                        limit: 6
                                    }
                                });
                                image_galary_store.setBaseParam('data', param_getTemplateLibraryImages);
                                console.log(image_galary_store);
                                image_galary_store.load();
                            }
                        }
                    }]
                }, {
                    xtype: 'displayfield',
					id: 'sortby-section',
                    value: '<span class="displayfield-span">Sort By:</span><select class="displayfield-select" name="tpl_order_by" id="orderby"><option value="date">Date</option><option value="name">Name</option></select>',
                    listeners: {
                        'afterrender': function(){
                            var converted = new Ext.form.ComboBox({
								editable: false,
								triggerAction: 'all',
								transform:'orderby',
								width:85,
								forceSelection:true
							});
							converted.on({
                                'change': function () {
                                    image_galary_store_sort = this.options[this.selectedIndex].value;
                                    param_getTemplateLibraryImages = Ext.encode({
                                        className: 'Class_Internal_Email_Content',
                                        methodName: 'getTemplateList',
                                        params: {
                                            name: image_galary_keyword,
                                            subType: image_galary_subType,
                                            sortBy: image_galary_store_sort,
                                            start: 0,
                                            limit: 6
                                        }
                                    });
                                    image_galary_store.setBaseParam('data', param_getTemplateLibraryImages);
                                    image_galary_store.load();
                                }
                            });
                        }
                    }
                }, {
                    xtype: 'displayfield',
					id: 'searchby-tag-section',
                    value: '<span id="search-by-span" class="displayfield-span">Search by <a id="tag-cloud-link" href="#">Tag</a></span><select class="displayfield-select" name="move_to_folder" id="moveto_combo"><option value="">Move to</option><option value="folder_name">Folder Name</option><option value="folder_name">Folder Name</option><option value="folder_name">Folder Name</option><option value="folder_name">Folder Name</option><option value="folder_name">Folder Name</option></select>',
                    listeners: {
                        'afterrender': function(){
                            var converted = new Ext.form.ComboBox({
								editable: false,
								triggerAction: 'all',
								transform:'moveto_combo',
								width:85,
								forceSelection:true
							});
							converted.on({
                                'change': function () {
                                    image_galary_store_sort = this.options[this.selectedIndex].value;
                                    param_getTemplateLibraryImages = Ext.encode({
                                        className: 'Class_Internal_Email_Content',
                                        methodName: 'getTemplateList',
                                        params: {
                                            name: image_galary_keyword,
                                            subType: image_galary_subType,
                                            sortBy: image_galary_store_sort,
                                            start: 0,
                                            limit: 6
                                        }
                                    });
                                    image_galary_store.setBaseParam('data', param_getTemplateLibraryImages);
                                    image_galary_store.load();
                                }
                            });
							
							new Ext.ToolTip({
								target: 'tag-cloud-link',
								anchor: 'top',
								//anchorPosition: {left:50,top:0},
								anchorOffset: 250,
								width: 500,
								trackMouse: true,
								anchorToTarget:true,
        						//defaultAlign: 'b-t',
								autoHide: false,
								closable: true,
								draggable:true,
								//autoWidth: true,
								html: '<a href="#">tag</a> <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a> <br /> <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  <a href="#">tag</a>  '
							});
                        }
                    }
                }]
            }, {
                xtype: 'panel',
                border: false,
                id: 'template_library_image_galary',
                items: [templatelibrarydataview],
                bbar: new Ext.PagingToolbar({
                    cls: 'ux-paging-toolbar',
					id: 'ux-paging-toolbar',
                    pageSize: 6,
                    store: image_galary_store,
                    grid_id: 'template_library_image_galary',
                    displayInfo: true,
                    displayMsg: 'Displaying topics {0} - {1} of {2}',
                    emptyMsg: "No topics to display",
                    plugins: [new Ext.ux.plugin.PagingToolbarResizer({
                        options: [5, 10, 15, 20, 25],
                        prependCombo: true
                    })]
                })
            }]
        }, {
            xtype: 'panel',
            id: 'templatelibrary-zip',
            border: false,
            cls: 'hide',
            padding: '30px 0 0 0',
            items: [{
                xtype: 'form',
                border: false,
                fileUpload: true,
                autoHeight: true,
                id: 'zipuploadform',
                cls: 'zip-upload-form',
                labelWidth: 120,
                defaults: {
                    allowBlank: false,
                    msgTarget: 'mbside',
                    labelStyle: 'color:#000;font-family: Arial, Helvetica, sans-serif;text-align: right;margin-right: 25px;display:block;'
                },
                items: [{
                    xtype: 'textfield',
                    id: 'zipfileuploadname',
                    name: 'name',
                    width: 400,
                    fieldLabel: '<span class="required">*</span>Template Name'
                }, {
                    xtype: 'combo',
                    editable: false,
                    selectOnFocus: true,
                    id: 'zipfileuploadfolder',
                    name: 'folder',
                    width: 400,
                    fieldLabel: '<span class="required">*</span>Folder',
                    store: new Ext.data.JsonStore({
                        url: 'api/extjs/index.php',
                        baseParams: {
                            data: Ext.encode({
                                className: 'Class_Internal_Email_Content',
                                methodName: 'getTemplateType'
                            })
                        },
                        root: 'data',
                        fields: [{
                            name: 'value',
                            mapping: 'value'
                        }, {
                            name: 'name',
                            mapping: 'name'
                        }],
                        sortInfo: {
                            field: 'name',
                            direction: 'ASC'
                        }
                    }),
                    mode: 'remote',
                    triggerAction: 'all',
                    valueField: 'value',
                    displayField: 'name'
                }, {
                    xtype: 'textfield',
                    id: 'zipfileuploadtags',
                    name: 'name',
                    width: 400,
                    fieldLabel: 'Tags'
                }, {
                    // Use the default, automatic layout to distribute the controls evenly
                    // across a single row
                    xtype: 'radiogroup',
                    fieldLabel: 'How to create it?',
                    items: [{
                        boxLabel: 'Import from Zip File',
                        name: 'how'
                    }, {
                        boxLabel: 'Paste in Code',
                        name: 'how',
                        checked: true
                    }, {
                        boxLabel: '<span class="blue">Have one custom designed </span> <span class="grey">(new window)</span>',
                        name: 'how'
                    } ]
                } ]
            }, {
                xtype: 'displayfield',
                cls: 'zipupload-help',
                value: '<table><tr><td style="vertical-align:sub;"><img alt="space" width="20px" height="32px" src="resources/images/space.png"  class="uploadlist-help-icon"></td>' + '<td>' + '<p class="zipupload-help-title">Tips for uploading a zip file</p>' + '<div class="zipupload-help-list"><ul>' + '<li>A zip file named [your theme name].zip</li>' + '<li>A  file called index.html or index.dwt</li>' + '<li>All image files associated with your template</li>' + '<li>All files must be in the root directory or your zip archive. Any files in a subdirectory will not be imported</li>' + '</ul></div>' + '<p class="zipupload-help-pic"><img alt="space" width="464px" height="97px" src="resources/images/template_zipload_file_help.png"></p>' + '<p class="zipupload-help-example">Example zip file</p>' + '</td></tr></table>'
            }]
        }];
        TemplateLibraryImageGalary.superclass.initComponent.call(this);
    }
});
TemplateLibrary = Ext.extend(Ext.Panel, {
    padding: '0',
    autoHeight: true,
    border: false,
    layout: 'column',
    initComponent: function () {
        this.items = [{
            xtype: 'panel',
            cls: 'template-library-sidebar',
            border: false,
            height: 663,
            width: 194,
            items: [{
                xtype: 'panel',
                border: false,
                selectable: true,
                collapsible: true,
                title: '<a class="add" id="add-new-template-folder" href="#">Add</a>Emails',
                cls: 'create-from-template-cls emails',
                items: template_subtype_listview,
				//tree, 
				//template_subtype_listview,
				'afterrender': function(){
					Ext.get('add-new-template-folder').on({
						'click': function(){
							var node = root.appendChild(new Ext.tree.TreeNode({
								text:'Album ' + (++newIndex),
								cls:'album-node',
								allowDrag:false
							}));
							tree.getSelectionModel().select(node);
							setTimeout(function(){
								ge.editNode = node;
								ge.startEdit(node.ui.textNode);
							}, 10);
						}
					});
				}
            }, {
                xtype: 'panel',
                border: false,
                title: 'Image Library',
                cls: 'create-from-template-cls import-create-cls'
            }, {
                xtype: 'panel',
                border: false,
                iconCls: 'free-template-icon',
                cls: 'create-from-template-cls banner',
                html: '<a href="http://store.marketbright.com/design" target="_blank"><img src="resources/images/banner-icon.png" /></a>'
            }]
        },
        new TemplateLibraryImageGalary()];
        TemplateLibrary.superclass.initComponent.call(this);
    }
});
Library = Ext.extend(Ext.Panel, {
    baseCls: 'library',
    autoHeight: true,
    frame: false,
    initComponent: function () {
        var parent = this;
        this.items = [new TemplateLibrary()];
        Library.superclass.initComponent.call(this);
    }
});