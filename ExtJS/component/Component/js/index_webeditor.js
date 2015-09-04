Ext.onReady(function(){
    var webeditor = new WebEditor({
        renderTo: 'content'
    });
    $("#menuTab2").click(function(){
        $("#find_table").hide();
        $("#replace_table").show();
        $("#replace").show();
        $("#replace_all").show();
        $("#menuTab2").addClass('selected');
        $("#menuTab1").removeClass('selected');
        patt.lastIndex = 0;
    });
    $("#menuTab1").click(function(){
        $("#replace_table").hide();
        $("#find_table").show();
        $("#replace").hide();
        $("#replace_all").hide();
        $("#menuTab1").addClass('selected');
        $("#menuTab2").removeClass('selected');
        patt.lastIndex = 0;
    })
    var patt = new RegExp();
    var find_field_text = "";
    var replace_field_text = "";
    var find_field_text_patt = "";
    var find_field_text_modifier = "g";
    var textarea_field_selected_range;
    var textarea_field_selected_range_ie;
    //search textarea
    Ext.get('searchWord').on({
        'blur': function(e, t){
            find_field_text = t.value;
            if (find_field_text == "") {
                return;
            }
            find_field_text_patt = find_field_text;
            Ext.get('searchWordR').dom.value = find_field_text;
        }
    })
    Ext.get('searchWordR').on({
        'blur': function(e, t){
            find_field_text = t.value;
            if (find_field_text == "") {
                return;
            }
            find_field_text_patt = find_field_text;
            Ext.get('searchWord').dom.value = find_field_text;
        }
    })
    //replace textarea
    Ext.get('replaceWord').on({
        'blur': function(e, t){
            replace_field_text = t.value;
            
        }
    })
    //close button
    Ext.get('fancybox-close').on({
        'click': function(e, t){
            patt.lastIndex = 0;
        }
    });
    //matchcase checkbox
    Ext.get('matchCase').on({
        'click': function(e, t){
            if (t.checked) {
                Ext.get('matchCaseR').dom.checked = true;
                find_field_text_modifier = "gi";
            }
            else {
                Ext.get('matchCaseR').dom.checked = false;
                find_field_text_modifier = "g";
            }
            
        }
    });
    Ext.get('matchCaseR').on({
        'click': function(e, t){
            if (t.checked) {
                Ext.get('matchCase').dom.checked = true;
                find_field_text_modifier = "gi";
            }
            else {
                Ext.get('matchCase').dom.checked = false;
                find_field_text_modifier = "g";
            }
            
        }
    });
    //wholeword checkbox
    Ext.get('wholeWord').on({
        'click': function(e, t){
            if (t.checked) {
                Ext.get('wholeWordR').dom.checked = true;
                find_field_text_patt = "(\\W|^|\\s)" + find_field_text;
            }
            else {
                Ext.get('wholeWordR').dom.checked = false;
                find_field_text_patt = find_field_text;
            }
            
        }
    });
    Ext.get('wholeWordR').on({
        'click': function(e, t){
            if (t.checked) {
                Ext.get('wholeWord').dom.checked = true;
                find_field_text_patt = "(\\W|^|\\s)" + find_field_text;
            }
            else {
                Ext.get('wholeWord').dom.checked = false;
                find_field_text_patt = find_field_text;
            }
            
        }
    });
    //find button
    Ext.get('find').on({
        'click': function(e, t, o){
            //Find the matched string
            e.stopPropagation();
            if (find_field_text == "") {
                return;
            }
            var old_patt = patt.lastIndex;
            patt.compile(find_field_text_patt, find_field_text_modifier);
            patt.lastIndex = old_patt;
            var textarea_field = Ext.get('webeditor-codeview').dom;
            var textarea_field_text = textarea_field.value;
            var result = patt.exec(textarea_field_text);
            var find_field_text_length = find_field_text.length;
            //select the matched string
            alert(patt.lastIndex)
            if (patt.lastIndex > 0) {
                if (document.selection) {
                    //ie
                    var range = textarea_field.createTextRange();
                    range.collapse(true);
                    range.moveEnd("character", patt.lastIndex);
                    range.moveStart("character", patt.lastIndex - find_field_text_length);
                    range.select();
                    textarea_field_selected_range_ie = range;
                }
                else {
                    //other
                    textarea_field.setSelectionRange(patt.lastIndex - find_field_text_length, patt.lastIndex);
                    textarea_field.focus();
                    textarea_field_selected_range = textarea_field;
                }
            }
            else {
            
                alert("The search item was not found.")
                //patt.lastIndex = 0;
            }
            
        }
    })
    //replace button
    Ext.get('replace').on({
        'click': function(e){
            e.stopPropagation();
            if (document.selection) {
                //ie
                if (textarea_field_selected_range_ie == undefined) {
                    return;
                }
                textarea_field_selected_range_ie.text = replace_field_text;
            }
            else {
                //other
                if (textarea_field_selected_range == undefined) {
                    return;
                }
                var startP = textarea_field_selected_range.selectionStart
                var endP = textarea_field_selected_range.selectionEnd
                var selectiontext_h = textarea_field_selected_range.value.substring(0, startP);
                var selectiontext = textarea_field_selected_range.value.substring(startP, endP);
                var selectiontext_f = textarea_field_selected_range.value.substring(endP);
                selectiontext = replace_field_text;
                textarea_field_selected_range.value = selectiontext_h + selectiontext + selectiontext_f;
                
            }
            var offset = replace_field_text.length - find_field_text.length;
            patt.lastIndex = patt.lastIndex + offset;
        }
    })
    //replaceall button
    Ext.get('replace_all').on({
        'click': function(e){
            if (find_field_text == "") {
                return;
            }
            var replace_items_count;
            patt.lastIndex = 0;
            for (replace_items_count = 0;; replace_items_count++) {
                var old_patt = patt.lastIndex;
                patt.compile(find_field_text_patt, find_field_text_modifier);
                patt.lastIndex = old_patt;
                var textarea_field = Ext.get('webeditor-codeview').dom;
                var textarea_field_text = textarea_field.value;
                var result = patt.exec(textarea_field_text);
				if(patt.lastIndex==0){
					break;
				}
                var find_field_text_length = find_field_text.length;
                //select the matched string
                if (document.selection) {
                    //ie
                    var range = textarea_field.createTextRange();
                    range.collapse(true);
                    range.moveEnd("character", patt.lastIndex);
                    range.moveStart("character", patt.lastIndex - find_field_text_length);
                    //replace
                    range.text = replace_field_text;
                }
                else {
                    //other
                    textarea_field.setSelectionRange(patt.lastIndex - find_field_text_length, patt.lastIndex);
                    var startP = textarea_field.selectionStart
                    var endP = textarea_field.selectionEnd
                    var selectiontext_h = textarea_field.value.substring(0, startP);
                    var selectiontext = textarea_field.value.substring(startP, endP);
                    var selectiontext_f = textarea_field.value.substring(endP);
                    selectiontext = replace_field_text;
                    textarea_field.value = selectiontext_h + selectiontext + selectiontext_f;
                }
            }
            alert(replace_items_count + " replaced");
        }
    })
    //console.log(Ext.get('webeditor-codeview'))
})
