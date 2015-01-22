
/**

 * @(#) template_library.js

 * $Id: template_library.js 336 2010-08-05 16:03:32Z swang $
 * Copyright 2010 © Marketbright, Inc. All Rights Reserved.
 */
var templatelibraryImagegalary= new TemplateLibraryImageGalary();
TemplateLibrary = Ext.extend(Ext.Panel, {
    layout: 'column',
    border: false,
    initComponent: function() {
        this.items = [
            {
                xtype: 'panel',
				cls:'template-library-sidebar',
				border: false,
				height:663,
				width:194,
                items: [
                    {
                        xtype: 'panel',
                        border: false,
                        collapsible: true,
						title:'Create from Template',
						cls:'create-from-template-cls',
						html:'<ul class="create-from-template-list"><li><a href="#">ALL(10)</a></li><li><a href="#">Basic Pack(4)</a></li><li><a href="#">Corporate</a></li><li><a href="#">Basic Pack(4)</a></li><li><a href="#">Corporate</a></li></ul>'
                    },
                    {
                        xtype: 'panel',
                        border: false,                        
						title:'Import/Create',
						cls:'create-from-template-cls import-create-cls',
						html:'<ul class="create-from-template-list" id="aaa"><li><a href="#">Import from URL</a></li><li><a href="#">Import from Zip File</a></li><li><a href="#">Paste in Code</a></li></ul>'
                    	
					},
                    {
                        xtype: 'panel',
                        border: false,                        
						title:'Free Templates',
						iconCls:'free-template-icon',
						cls:'create-from-template-cls',
						html:'<p class="free-template-text">Browse our library of  pre-designed templates</p>'
                    }
                ]
            },
            {
                xtype: 'panel',
                border: false,
                items: [templatelibraryImagegalary]
            }
        ];
		
        TemplateLibrary.superclass.initComponent.call(this);
    }
});
