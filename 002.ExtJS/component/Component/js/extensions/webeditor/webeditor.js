tinymce.create('tinymce.plugins.ExamplePlugin', {
    createControl: function(n, cm){
        switch (n) {
            case 'personalize':
                var mlb = cm.createListBox('personalize', {
                    title: '--Personalize--',
                    onselect: function(v){
                        tinyMCE.activeEditor.execCommand('mceInsertContent', false, v);
                    }
                });
                // Add some values to the list box
                mlb.add('[name]', '[name]');
                mlb.add('[address]', '[address]');
                mlb.add('[email]', '[email]');
                // Return the new listbox instance
                return mlb;
            case 'changetemplate':
                var changetemplate = cm.createButton('changetemplate', {
                    title: 'Change template',
                    onclick: function(){
                    
                    }
                });
                return changetemplate;
            case 'previewinbrowser':
                var previewinbrowser = cm.createButton('previewinbrowser', {
                    title: 'Preview in browser',
                    onclick: function(){
                        myWindow = window.open();
                        var header = "<html><head></head><body>";
                        var footer = "</body></html>";
                        myWindow.document.write(header + content + footer);
                    }
                });
                return previewinbrowser;
            case 'unsubscribetag':
                var unsubscribetag = cm.createButton('unsubscribetag', {
                    title: 'Unsubscribe tag',
                    onclick: function(){
                        var win = new Ext.Window({
                            height: 300,
                            width: 200
                        });
                        win.show(this);
                    }
                });
                return unsubscribetag;
            case 'pullfromhtml':
                var pullfromhtml = cm.createButton('pullfromhtml', {
                    title: 'Pull from HTML',
                    onclick: function(){
                    //function
                    //switch icon
                    }
                });
                return pullfromhtml;
            case 'wraptext':
                var wraptext = cm.createButton('wraptext', {
                    title: 'Wrap Text',
                    onclick: function(){
                    console.log(Ext.get('webeditor-textversion_ifr'));
                    }
                });
                return wraptext;
        }
        return null;
    }
});

// Register plugin with a short name
tinymce.PluginManager.add('customplugin', tinymce.plugins.ExamplePlugin);
//--------------------------------------------tiny plugin create end----------------------------------------------------//
var content = "";
var rangetext = "";
WebEditor = Ext.extend(Ext.TabPanel, {
    activeTab: 0,
    autoWidth: true,
    autoHeight: true,
    initComponent: function(){
        this.items = [{
            xtype: 'panel',
            title: 'Preview',
			autoHeight:true,
            items: [{
                xtype: 'textarea',
                id: 'webeditor-preview',
                width: 900,
                height: 549,
                cls: 'mcePreview'
            }],
            listeners: {
                'activate': function(){
                    if (!tinyMCE.get('webeditor-preview')) {
                        //init everytime will add new span with the latest content,but it isn't visible
                        tinyMCE.init({
                            mode: "textareas",
                            theme: "advanced",
                            plugins: "-customplugin",
                            theme_advanced_buttons1: "changetemplate,previewinbrowser",
                            theme_advanced_buttons2: "",
                            theme_advanced_buttons3: "",
                            theme_advanced_toolbar_location: "top",
                            theme_advanced_toolbar_align: "left",
                            editor_selector: "mcePreview",
                            init_instance_callback: function(inst){
                                tinymce.editors[inst.editorId].setContent(content, {
                                    format: 'html'
                                });
                                $('#webeditor-preview_toolbar1 .mceToolbarStart span').html("The actual view will vary depending on the email client")
                            }
                        });
                    }
                    else {
                        tinymce.editors['webeditor-preview'].setContent(content, {
                            format: 'html'
                        });
                    }
                    
                    
                },
                'deactivate': function(){
                    content = tinymce.editors['webeditor-preview'].getContent();
                }
            }
        }, {
            xtype: 'panel',
            autoWidth: true,
            autoHeight: true,
            title: 'Edit',
            items: [{
                xtype: 'textarea',
                id: 'webeditor-edit',
                width: 900,
                autoHeight: true,
                cls: 'mceEdit'
            }],
            listeners: {
                'activate': function(){
                    if (!tinyMCE.get('webeditor-edit')) {
                        tinyMCE.init({
                            mode: "textareas",
                            theme: "advanced",
                            plugins: "save,searchreplace,paste,advhr,table,spellchecker,-customplugin",
                            theme_advanced_buttons1: "save,pasteword,|,undo,redo,|,search,cut,copy,paste,|,image,link,unlink,anchor,charmap,advhr,changetemplate,previewinbrowser",
                            theme_advanced_buttons2: "tablecontrols,|,forecolor,backcolor,spellchecker",
                            theme_advanced_buttons3: "fontselect,fontsizeselect,personalize,unsubscribetag,|,bold,italic,underline,justifyleft,justifycenter,justifyright,bullist,numlist,indent,outdent,removeformat",
                            theme_advanced_toolbar_location: "top",
                            theme_advanced_toolbar_align: "left",
                            theme_advanced_statusbar_location: "bottom",
                            editor_selector: "mceEdit",
                            theme_advanced_font_sizes: "10pt=10px,12pt=12px,14pt=14px,16pt=16px,18pt=18px,20pt=20px,24pt=24px,30pt=30px,36pt=36px",
                            init_instance_callback: function(inst){
                                tinymce.editors[inst.editorId].setContent(content);
                            }
                        });
                    }
                    else {
                        tinymce.editors['webeditor-edit'].setContent(content, {
                            format: 'html',
                            no_events: true
                        });
                    }
                    
                },
                'deactivate': function(){
                    content = tinymce.editors['webeditor-edit'].getContent();
                    
                }
            }
        }, {
            xtype: 'panel',
            title: 'Code View',
            autoHeight: true,
            items: [{
                xtype: 'displayfield',
                value: '<textarea id="webeditor-codeview" cols="80" rows="20">abcdeabcde</textarea>'
            
            }],
            listeners: {
                'activate': function(){
                    if (Ext.get('markItUpWebeditor-codeview') == null) {
                        $('#webeditor-codeview').markItUp(codeview_setting);
                        $('li.find_replace a').attr({
                            'id': 'find_and_replace_window'
                        });
                        $("#find_and_replace_window").fancybox({
                            'titleShow': false,
                            'href': '#inline1'//selectedOpts.href will be set value
                        });
                    }
                    
                    //$('li.find_replace a').attr({'id':'find_and_replace_window','href':'#inline1'});
                    /*because if the 'href' is added by javascript in ie,the obj.href='#inline1'(jquery.fancybox-1.31.js 542)
                     (obj.nodeName && (/^(?:javascript|#)/i).test(obj.href) is true
                     but selectedOpts.href=null
                     if it is <a href='#inline1'>,the obj.href="localhost/#inline1"
                     (obj.nodeName && (/^(?:javascript|#)/i).test(obj.href) is false
                     */
                }
            }
        }, {
            xtype: 'panel',
            title: 'Text Version',
			autoHeight:true,
            items: [{
                xtype: 'textarea',
                id: 'webeditor-textversion',
                width: 870,
                height: 549,
                cls: 'mceTextVersion'
            }],
            listeners: {
                'activate': function(){
                    if (!tinyMCE.get('webeditor-textversion')) {
                        tinyMCE.init({
                            mode: "textareas",
                            theme: "advanced",
                            plugins: "-customplugin",
                            theme_advanced_buttons1: "pullfromhtml,wraptext,personalize,unsubscribetag",
                            theme_advanced_buttons2: "",
                            theme_advanced_buttons3: "",
                            theme_advanced_toolbar_location: "top",
                            theme_advanced_toolbar_align: "left",
                            editor_selector: "mceTextVersion",
                            init_instance_callback: function(inst){
                                tinymce.editors[inst.editorId].setContent('<p id="paragragh" style="word-wrap:break-word;width:100%;">pppp</p></div>');
                                document.getElementById('webeditor-textversion_ifr').contentWindow.document.body.style.backgroundColor="transparent";
								//document.getElementById('webeditor-textversion_ifr').contentWindow.document.getElementById('paragragh').style.width=600;
							   //console.log()
                            }
                        });
                        
                    }
                }
                
            }
        }];
        WebEditor.superclass.initComponent.call(this);
    }
});

/*
 MarkItUp Editor configuration
 */
codeview_setting = {
    onShiftEnter: {
        keepDefault: false,
        replaceWith: '<br />\n'
    },
    onCtrlEnter: {
        keepDefault: false,
        openWith: '\n<p>',
        closeWith: '</p>\n'
    },
    onTab: {
        keepDefault: false,
        openWith: '     '
    },
    markupSet: [{
        name: 'Heading 1',
        key: '1',
        openWith: '<h1(!( class="[![Class]!]")!)>',
        closeWith: '</h1>',
        placeHolder: 'Your title here...'
    }, {
        name: 'Heading 2',
        key: '2',
        openWith: '<h2(!( class="[![Class]!]")!)>',
        closeWith: '</h2>',
        placeHolder: 'Your title here...'
    }, {
        name: 'Heading 3',
        key: '3',
        openWith: '<h3(!( class="[![Class]!]")!)>',
        closeWith: '</h3>',
        placeHolder: 'Your title here...'
    }, {
        name: 'Heading 4',
        key: '4',
        openWith: '<h4(!( class="[![Class]!]")!)>',
        closeWith: '</h4>',
        placeHolder: 'Your title here...'
    }, {
        name: 'Heading 5',
        key: '5',
        openWith: '<h5(!( class="[![Class]!]")!)>',
        closeWith: '</h5>',
        placeHolder: 'Your title here...'
    }, {
        name: 'Heading 6',
        key: '6',
        openWith: '<h6(!( class="[![Class]!]")!)>',
        closeWith: '</h6>',
        placeHolder: 'Your title here...'
    }, {
        name: 'Paragraph',
        openWith: '<p(!( class="[![Class]!]")!)>',
        closeWith: '</p>'
    }, {
        separator: '---------------'
    }, {
        name: 'Bold',
        key: 'B',
        openWith: '(!(<strong>|!|<b>)!)',
        closeWith: '(!(</strong>|!|</b>)!)'
    }, {
        name: 'Italic',
        key: 'I',
        openWith: '(!(<em>|!|<i>)!)',
        closeWith: '(!(</em>|!|</i>)!)'
    }, {
        name: 'Stroke through',
        key: 'S',
        openWith: '<del>',
        closeWith: '</del>'
    }, {
        separator: '---------------'
    }, {
        name: 'Ul',
        openWith: '<ul>\n',
        closeWith: '</ul>\n'
    }, {
        name: 'Ol',
        openWith: '<ol>\n',
        closeWith: '</ol>\n'
    }, {
        name: 'Li',
        openWith: '<li>',
        closeWith: '</li>'
    }, {
        separator: '---------------'
    }, {
        name: 'Picture',
        key: 'P',
        replaceWith: '<img src="[![Source:!:http://]!]" alt="[![Alternative text]!]" />'
    }, {
        name: 'Link',
        key: 'L',
        openWith: '<a href="[![Link:!:http://]!]"(!( title="[![Title]!]")!)>',
        closeWith: '</a>',
        placeHolder: 'Your text to link...'
    }, {
        name: 'Table generator',
        className: 'tablegenerator',
        placeholder: "Your text here...",
        replaceWith: function(markItUp){
            cols = prompt("How many cols?");
            rows = prompt("How many rows?");
            html = "<table>\n";
            if (markItUp.altKey) {
                html += " <tr>\n";
                for (c = 0; c < cols; c++) {
                    html += "! [![TH" + (c + 1) + " text:]!]\n";
                }
                html += " </tr>\n";
            }
            for (r = 0; r < rows; r++) {
                html += " <tr>\n";
                for (c = 0; c < cols; c++) {
                    html += "  <td>" + (markItUp.placeholder || "") + "</td>\n";
                }
                html += " </tr>\n";
            }
            html += "</table>\n";
            return html;
        }
    }, {
        separator: '---------------'
    }, {
        name: 'Clean',
        className: 'clean',
        replaceWith: function(markitup){
            return markitup.selection.replace(/<(.*?)>/g, "")
        }
    }, {
        name: 'Select & Copy',
        className: 'select_copy',
        beforeInsert: function(markitup){
            miu.selectCopyAll(markitup)
        }
    }, {
        name: 'Find & Replace',
        className: 'find_replace'
    }]
}

// mIu nameSpace to avoid conflict.
miu = {
    selectCopyAll: function(markitup){
        if ($.browser.msie) {
            markitup.textarea.focus();
            markitup.textarea.select();
            document.execCommand('Copy', false, null);
        }
        else {
            alert('Not support in this browser for security reason! Please use Ctrl+A, Ctrl+C' + "! \n(Apple+A, Apple+C" + " in Mac Machine)!");
        }
    },
    
    tidyRepair: function(markItUp){
        var tidy;
        if (markItUp.selection !== "") {
            $.ajax({
                async: false,
                type: "POST",
                url: markItUp.root + "utils/htmltidy/repair.php",
                data: "selection=" + encodeURIComponent(markItUp.selection),
                success: function(content){
                    tidy = content;
                }
            });
        }
        else {
            $.ajax({
                async: true,
                type: "POST",
                url: markItUp.root + "utils/htmltidy/repair.php",
                data: "data=" + encodeURIComponent(markItUp.textarea.value),
                success: function(content){
                    tidy = content;
                    markItUp.textarea.value = tidy;
                }
            });
        }
        return tidy;
    },
    
    tidyReport: function(markItUp){
        $.ajax({
            async: false,
            type: "POST",
            url: markItUp.root + "utils/htmltidy/report.php",
            data: "data=" + encodeURIComponent(markItUp.textarea.value),
            success: function(content){
                win = window.open("", "htmlTidyReport", "width=600, height=400, resizable=yes, scrollbars=yes");
                win.document.open();
                win.document.write(content);
                win.document.close();
                win.focus();
            }
        });
    }
}

/*

 */


