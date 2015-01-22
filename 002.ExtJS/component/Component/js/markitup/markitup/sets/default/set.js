// ----------------------------------------------------------------------------
// markItUp!
// ----------------------------------------------------------------------------
// Copyright (C) 2008 Jay Salvat
// http://markitup.jaysalvat.com/
// ----------------------------------------------------------------------------
// Html tags
// http://en.wikipedia.org/wiki/html
// ----------------------------------------------------------------------------
// Basic set. Feel free to add more tags
// ----------------------------------------------------------------------------
mySettings = {
    onShiftEnter:    {keepDefault:false, replaceWith:'<br />\n'},
    onCtrlEnter:    {keepDefault:false, openWith:'\n<p>', closeWith:'</p>\n'},
    onTab:            {keepDefault:false, openWith:'     '},
    markupSet: [
        {name:'Heading 1', key:'1', openWith:'<h1(!( class="[![Class]!]")!)>', closeWith:'</h1>', placeHolder:'' },
        {name:'Heading 2', key:'2', openWith:'<h2(!( class="[![Class]!]")!)>', closeWith:'</h2>', placeHolder:'' },
        {name:'Heading 3', key:'3', openWith:'<h3(!( class="[![Class]!]")!)>', closeWith:'</h3>', placeHolder:'Your title here...' },
        {name:'Heading 4', key:'4', openWith:'<h4(!( class="[![Class]!]")!)>', closeWith:'</h4>', placeHolder:'Your title here...' },
        {name:'Heading 5', key:'5', openWith:'<h5(!( class="[![Class]!]")!)>', closeWith:'</h5>', placeHolder:'Your title here...' },
        {name:'Heading 6', key:'6', openWith:'<h6(!( class="[![Class]!]")!)>', closeWith:'</h6>', placeHolder:'Your title here...' },
        {name:'Paragraph', openWith:'<p(!( class="[![Class]!]")!)>', closeWith:'</p>' },
        {separator:'---------------' },
        {name:'Bold', key:'B', openWith:'(!(<strong>|!|<b>)!)', closeWith:'(!(</strong>|!|</b>)!)' },
        {name:'Italic', key:'I', openWith:'(!(<em>|!|<i>)!)', closeWith:'(!(</em>|!|</i>)!)' },
        {name:'Stroke through', key:'S', openWith:'<del>', closeWith:'</del>' },
        {separator:'---------------' },
        {name:'Ul', openWith:'<ul>\n', closeWith:'</ul>\n' },
        {name:'Ol', openWith:'<ol>\n', closeWith:'</ol>\n' },
        {name:'Li', openWith:'<li>', closeWith:'</li>' },
        {separator:'---------------' },
        {name:'Picture', key:'P', replaceWith:'<img src="[![Source:!:http://]!]" alt="[![Alternative text]!]" />' },
        {name:'Link', key:'L', openWith:'<a href="[![Link:!:http://]!]"(!( title="[![Title]!]")!)>', closeWith:'</a>', placeHolder:'Your text to link...' },
        {name:'Table generator', 
         className:'tablegenerator', 
         placeholder:"Your text here...",
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
        },
        {separator:'---------------' },
        {name:'Clean', className:'clean', replaceWith:function(markitup) { return markitup.selection.replace(/<(.*?)>/g, "") } },
        {name:'Select & Copy', className:'select_copy', beforeInsert:function(markitup) { miu.selectCopyAll(markitup) } },
        {name:'Find & Replace', className:'find_replace'}
        
    ]
}

// mIu nameSpace to avoid conflict.
miu = {
        selectCopyAll: function(markitup) {
             if ($.browser.msie) {
                    markitup.textarea.focus();
                    markitup.textarea.select();
          document.execCommand('Copy', false, null);
       } else {
          alert('Not support in this browser for security reason! Please use Ctrl+A, Ctrl+C' +"! \n(Apple+A, Apple+C" + " in Mac Machine)!" );
       }
        },
        
    tidyRepair: function(markItUp) {
        var tidy;
        if (markItUp.selection !== "") {
            $.ajax({
                async:   false,
                type:    "POST",
                url:     markItUp.root+"utils/htmltidy/repair.php",
                data:    "selection="+encodeURIComponent(markItUp.selection),
                success:function(content) {
                    tidy = content;    
                }
            });
        } else {
            $.ajax({
                async:   true,
                type:    "POST",
                url:     markItUp.root+"utils/htmltidy/repair.php",
                data:    "data="+encodeURIComponent(markItUp.textarea.value),
                success:function(content) {
                    tidy = content;    
                    markItUp.textarea.value = tidy;
                }
            });
        }    
        return tidy;
    },
    
    tidyReport: function(markItUp) {
        $.ajax({
            async:    false,
            type:     "POST",
            url:      markItUp.root+"utils/htmltidy/report.php",
            data:     "data="+encodeURIComponent(markItUp.textarea.value),
            success:function(content) {
                win = window.open("", "htmlTidyReport","width=600, height=400, resizable=yes, scrollbars=yes");
                win.document.open();
                win.document.write(content);
                win.document.close();
                win.focus();
            }
        });
    }
}
