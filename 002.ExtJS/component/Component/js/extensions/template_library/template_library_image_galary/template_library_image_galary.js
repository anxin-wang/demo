/**
 
 * $HeadURL: https://cake.marketbright.com/s/svn/CAKE/cake_src/public/Component/js/extensions/template_library/template_library_image_galary/template_library_image_galary.js $
 
 * $Id: template_library_image_galary.js 317 2010-08-04 13:24:11Z swang $
 * Copyright 2010 © Marketbright, Inc. All Rights Reserved.
 */
TemplateLibraryImageGalary = Ext.extend(Ext.Panel, {
	cls:'templatelibraryimagegalary-cls',
    border: false,
    initComponent: function() {
        this.items = [
            {
                xtype: 'panel',
				border: false,
				layout: 'column',
				cls:'displayfield-panel',
				height:39,
				width:707,
                items: [
                    {
                        xtype: 'displayfield',
						value:'<span class="displayfield-span">Filter by Catagory:</span><select class="displayfield-select" name=""><option>option1</option><option>option2</option><option>option3</option></select>'
                    },
                    {
                        xtype: 'button',
                        text: 'Go',
						cls:'btn btn-go-black'
                    }
                ]
            },
            {
                xtype: 'panel',
				border: false,
                layout: 'table',
				cls:'template-galary-link',
                layoutConfig: {
                    columns: 3
                },
                items: [
                    {
                        xtype: 'panel',
						border: false,						
						items:[
							{
								xtype: 'displayfield',
								value:'<a href="#"><span>Template name</span><br/><br/><img src="js/extensions/template_library/template_library_image_galary/template1.png"/></a>'
							}
						]
                    },
                    {
                        xtype: 'panel',
						border: false,
						items:[
							{
								xtype: 'displayfield',
								value:'<a href="#"><span>Template name</span><br/><br/><img src="js/extensions/template_library/template_library_image_galary/template2.png"/></a>'
							}
						]
                    },
                    {
                        xtype: 'panel',
						border: false,
						items:[
							{
								xtype: 'displayfield',
								value:'<a href="#"><span>Template name</span><br/><br/><img src="js/extensions/template_library/template_library_image_galary/template3.png"/></a>'
							}
						]
                    },
                    {
                        xtype: 'panel',
						border: false,
						items:[
							{
								xtype: 'displayfield',
								value:'<a href="#"><span>Template name</span><br/><br/><img src="js/extensions/template_library/template_library_image_galary/template4.png"/></a>'
							}
						]
                    },
                    {
                        xtype: 'panel',
						border: false,
						items:[
							{
								xtype: 'displayfield',
								value:'<a href="#"><span>Template name</span><br/><br/><img src="js/extensions/template_library/template_library_image_galary/template5.png"/></a>'
							}
						]
                    },
                    {
                        xtype: 'panel',
						border: false,
						items:[
							{
								xtype: 'displayfield',
								value:'<a href="#"><span>Template name</span><br/><br/><img src="js/extensions/template_library/template_library_image_galary/template6.png"/></a>'
							}
						]
                    }
                ]
            }
        ];
        TemplateLibraryImageGalary.superclass.initComponent.call(this);
    }
});
