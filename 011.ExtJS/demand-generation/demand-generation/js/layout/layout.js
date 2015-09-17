//TODO Variant
var url=location.href;
var r=/(\w+):\/\/([\w|\d|:|\.|-]+)\/(\S*)/;
var a=url.match(r);
var host=location.protocol+'//'+location.hostname+'/';
var emailpattern = /^(\w+)([\-+.][\w]+)*@(\w[\-\w]*\.){1,5}([A-Za-z]){2,6}$/;
var start=0;
var limit=10;
//footer filed
var footerFiled = new Ext.Template(
	'<div class="footer">', 
		'<div style="float:left;text-align:left;padding-Top:2px;">',
			'<p>Copyright {year} &copy; <a href="http://Marketbright.com" target="_blank" style="font-weight:bold;">Marketbright</a>(version {version}[Sprint 10 QA26]) To read our terms of use, privacy policy and other legal notices, <a href="http://www.marketbright.com/legal/" target="_blank">click here.</a></p>',
			//'<p>Copyright &copy; {year} Marketbright, Inc. All Rights Reserved. [version:{version}] Sprint 10 QA6</p>',
			//'<p><a href="http://trust.marketbright.com" style="margin-left:0px">Privacy Statement</a>&nbsp;|&nbsp;<a href="http://trust.marketbright.com" >Security Statement</a>&nbsp;|&nbsp;<a href="http://trust.marketbright.com">Terms of Use</a></p>',
		'</div>',
		'<div style="float:right;text-align:right;">',
			'<p><img alt="" width="12px" height="16px" src="../../resources/images/space.png" class="footer-idea"/><a href="http://www.marketbright.com/ideas/" target="_blank" style="font-size:11px;">Share Your Ideas</a></p>',
			//'<p><img alt="" width="110px" height="17px" src="../../resources/images/space.png" class="footer-logo"/></p>',

		'</div>',
		'<div class="clear"></div>',
	'</div>', {
    compiled: true, // compile immediately
    disableFormats: true // reduce apply time since no formatting
})
//TODO Function
function inputNavSearchSetCls(){
	if(!$('#inputNavSearch').hasClass('input-nav-search-normal')){	
		$('#inputNavSearch').addClass('input-nav-search-normal');
		Ext.get('inputNavSearch').dom.value='';
	}


}
function inputNavSearchReset(){
	if(Ext.get('inputNavSearch').dom.value==''){
		Ext.get('inputNavSearch').dom.value='search';
		$('#inputNavSearch').removeClass('input-nav-search-normal');
	}
}
function responseHandle(response){
	var reps=response.responseText;
	reps=reps.replace(/^<[\w\W]*>/g,"");
	if(reps.trim()==''){
		reps='{"success":false}';
	}
	return reps;
}

//TODO Class
Ext.promptPanel= function(){
 	var msgCt;
	 function createBox(t, s,boxStatus){
		    var boxIcon
		    boxStatus=boxStatus!=undefined?boxStatus:true;
		    if(boxStatus)
		    {
		    	boxIcon='<div class="x-box-icon success">&nbsp;</div>';
		    }
		    else
		    {
		    	boxIcon='<div class="x-box-icon failure">&nbsp;</div>';
		    }
		    
		 return ['<div class="msg" style="z-index: 999999;">',
		 '<div class="x-box-tl"><div class="x-box-tr"><div class="x-box-tc"></div></div></div>',
		 '<div class="x-box-ml"><div class="x-box-mr"><div class="x-box-mc">'+boxIcon+'<div class="x-box-content"><h3>', t, '</h3>', s, '</div></div></div></div>',
		 '<div class="x-box-bl"><div class="x-box-br"><div class="x-box-bc"></div></div></div>',
		 '</div>'].join('');
	 }
	 return {
		 msg : function(title, format,boxStatus){


			 	try{
			 		var md = Ext.get('msg-div');
			 		if(!Ext.isEmpty(md)){
			 			md.remove();
			 			msgCt=undefined;		 		
			 		}
	
			 	}catch(e){
			 		
			 	}
	
	
				 if(!msgCt){
				 	msgCt = Ext.DomHelper.insertFirst('nav', {id:'msg-div',style:'width:210px;position:absolute;z-index: 999999;'}, true);
				 }
				 msgCt.alignTo(document, 'tr-tr',[-20, 0]);
				 var s = String.format.apply(String, Array.prototype.slice.call(arguments, 1));
				 var m = Ext.DomHelper.append(msgCt, {html:createBox(title, s,boxStatus)}, true);
				 m.slideIn('t').pause(2).ghost("t", {remove:true});		 	


			 
			 
		 },
		
		 init : function(){

		
		 var lb = Ext.get('lib-bar');
		 
		 
		 if(lb){
		 	lb.show();
		 }
		 }
	 };
}();
Ext.onReady(Ext.promptPanel.init, Ext.promptPanel); 
//error or successful message panel
Message_Panel = Ext.extend(Ext.Panel, {   
    autoWidth: true,
    height: 80,
	border:false,
	cls:'message-panel',
	id:'mb-error-messagebox',
	messagePanelMargin:20,
    initComponent: function() {
		var message_panel_type=this.type;
		switch(message_panel_type){
			case 'success':
				this.items = [
	            {
	                xtype: 'displayfield',
	                value: '<p style="margin:0 '+this.messagePanelMargin+'px">'+this.value+'</p>',				
	            	cls: 'message-panel-success'
					
	            }];
				break;
			case 'fail':
				this.items = [
	            {
	                xtype: 'displayfield',
	                value: '<p style="margin:0 '+this.messagePanelMargin+'px">'+this.value+'</p>',				
	            	cls: 'message-panel-fail'
	            }];
				break;			
			default:
				this.items = [
		            {
		                xtype: 'displayfield',
		                value: '<p style="margin:0 '+this.messagePanelMargin+'px">'+this.value+'</p>',				
		            	cls: 'message-panel-fail'
		            }];
				break;
		}
        
        Message_Panel.superclass.initComponent.call(this);
    },
	listeners:{
		'afterrender':function(){
		//'afterlayout':function(){
			var el=this.getEl();
			var t=this;	
				el.show();
		}
	}
});
//add the error message panel
AddErrorMessagePanel=function(elem,msg,cls){
	RemoveErrorMessagePanel();
	var message_panel=new Message_Panel({													
		type:'fail',
		messagePanelMargin:cls!=undefined?cls:20,
		value:msg,
		renderTo:elem
	});
	Ext.getCmp(elem).removeClass('hide');
}
//remove the error message panel
RemoveErrorMessagePanel=function(elem){
	try{
	Ext.getCmp('mb-error-messagebox').destroy();
	Ext.getCmp(elem).addClass('hide');
	}catch(e){}	
}


//Paging Start
ButtonPanel = Ext.extend(Ext.Panel, {
    layout: 'column',
    border: false,
    defaultType: 'button',
    buttonAlign: 'right',
    cls: 'ux-paging',
    menu: undefined,
    split: false,
    width: 150,
    currentPage: 0,
    lastSelectedPage: 0,
    initComponent: function(){
        // gird_id is the component contain of pagingtoolbar
        var grid_id_el = Ext.get(this.grid_id);
        // console.log(grid_id_el)
        var num = this.num;
        var pb = this.pb;
        // the total of the shown buttons
        var indexTotal = this.indexTotal;
        var leftEdge = indexTotal;
        var rightEdge = pb.getPageData().pages - indexTotal + 1;
        var startoffset = 1, endoffset = pb.pageSize; // page start record
        // num,end record num
        this.lastSelectedPage = 1;
        this.currentPage = 1;
        this.cls = this.cls + ' ux-paging-' + this.grid_id;
        this.items = [];
        if (this.pagingMsgLabel) {
            this.items.push({
                xtype: 'label',
                cls: 'paginglabel',
                text: 'item ' + startoffset + ' to ' + endoffset +
                ' of ' +
                pb.getPageData().total
            });
        }
        
        // Prev Button
        this.items.push({
            text: 'prev',
            cls: 'btn btn-paging-prev',
            disabled: true,
            listeners: {
                'click': function(){
                    // set paging label:item {0} to {1} of {2}
                    startoffset = (pb.getPageData().activePage - 1) *
                    pb.pageSize +
                    1;
                    endoffset = pb.getPageData().activePage * pb.pageSize;
                    if (this.pagingMsgLabel) {
                        grid_id_el.select('.paging-label', true).each(function(){
                            Ext.getCmp(this.id).setText('item ' +
                            startoffset +
                            ' to ' +
                            endoffset +
                            ' of ' +
                            pb.getPageData().total)
                        });
                    }
                    // set next button enabled
                    var nextbutton = grid_id_el.select('.btn-paging-next', true);
                    nextbutton.each(function(){
                        if (Ext.getCmp(this.id).disabled) {
                            Ext.getCmp(this.id).enable();
                        }
                    });
                    
                    // move to prev page
                    // this sentence is useless , because the pb.cursor won't
                    // move
                    // pb.movePrevious();
                    var currentPage, lastSelectedPage;
                    grid_id_el.select('.ux-paging', true).each(function(){
                        currentPage = Ext.getCmp(this.id).currentPage;
                    });
                    lastSelectedPage = currentPage;
                    currentPage--;
                    grid_id_el.select('.ux-paging', true).each(function(){
                        Ext.getCmp(this.id).currentPage = currentPage;
                    });
                    if (currentPage > 1) {
                        pb.changePage(currentPage);
                    }
                    // when currentpage=1,disable itself
                    else 
                        if (currentPage == 1) {
                            pb.changePage(currentPage);
                            grid_id_el.select('.btn-paging-prev', true).each(function(){
                                if (!Ext.getCmp(this.id).disabled) {
                                    Ext.getCmp(this.id).disable();
                                }
                            });
                        }
                    // remove the selected css of lastSelectedPage button,add
                    // the selected css to currentPage
                    grid_id_el.select('.paging-btn-' + lastSelectedPage, true).removeClass('x-btn-selected');
                    grid_id_el.select('.paging-btn-' + currentPage, true).addClass('x-btn-selected');
                    // move the number button
                    grid_id_el.select('.ux-paging', true).each(function(){
                        if (currentPage >= 1 && currentPage <= rightEdge) {
                            if (!this.select('.btn-paging-btn.visible:last').first().hasClass('paging-btn-' + leftEdge)) {
                                this.select('.btn-paging-btn.visible:last').replaceClass('visible', 'hide');
                            }
                            this.select('.btn-paging-btn.visible:first').first().prev().replaceClass('hide', 'visible');
                        }
                    })
                }
            }
        
        });
        
        // Number Button
        for (var i = 0; i < num; i++) {
            // if (i < indexTotal) {
            this.items.push({
                text: i + 1,
                menu: this.menu,
                enableToggle: this.enableToggle,
                split: this.split,
                arrowAlign: this.arrowAlign,
                cls: 'btn btn-paging-btn paging-btn-' + (i + 1),
                listeners: {
                    'click': function(t){
                        // set paging label:item {0} to {1} of {2}
                        startoffset = (t.text - 1) * pb.pageSize + 1;
                        endoffset = t.text * pb.pageSize;
                        if (this.pagingMsgLabel) {
                            grid_id_el.select('.paging-label', true).each(function(){
                                Ext.getCmp(this.id).setText('item ' +
                                startoffset +
                                ' to ' +
                                endoffset +
                                ' of ' +
                                pb.getPageData().total)
                            });
                        }
                        // move to page
                        var currentPage, lastSelectedPage;
                        grid_id_el.select('.ux-paging', true).each(function(){
                            currentPage = Ext.getCmp(this.id).currentPage;
                        });
                        // console.log('before:' + currentPage);
                        lastSelectedPage = currentPage;
                        currentPage = this.text;
                        grid_id_el.select('.ux-paging', true).each(function(){
                            Ext.getCmp(this.id).currentPage = currentPage;
                        });
                        // console.log('after:' + currentPage);
                        pb.changePage(currentPage);
                        // enable or disable the prev and next button by number
                        // button
                        if (currentPage == 1) {
                            grid_id_el.select('.btn-paging-prev', true).each(function(){
                                if (!Ext.getCmp(this.id).disabled) {
                                    Ext.getCmp(this.id).disable();
                                }
                            })
                            grid_id_el.select('.btn-paging-next', true).each(function(){
                                if (Ext.getCmp(this.id).disabled) {
                                    Ext.getCmp(this.id).enable();
                                }
                            })
                        }
                        else 
                            if (currentPage == pb.getPageData().pages) {
                                grid_id_el.select('.btn-paging-next', true).each(function(){
                                    if (!Ext.getCmp(this.id).disabled) {
                                        Ext.getCmp(this.id).disable();
                                    }
                                })
                                grid_id_el.select('.btn-paging-prev', true).each(function(){
                                    if (Ext.getCmp(this.id).disabled) {
                                        Ext.getCmp(this.id).enable();
                                    }
                                })
                            }
                            else {
                                grid_id_el.select('.btn-paging-prev', true).each(function(){
                                    if (Ext.getCmp(this.id).disabled) {
                                        Ext.getCmp(this.id).enable();
                                    }
                                })
                                grid_id_el.select('.btn-paging-next', true).each(function(){
                                    if (Ext.getCmp(this.id).disabled) {
                                        Ext.getCmp(this.id).enable();
                                    }
                                })
                            }
                        
                        // remove the selected css of lastSelectedPage
                        // button,add the selected css to currentPage
                        grid_id_el.select('.paging-btn-' + lastSelectedPage, true).removeClass('x-btn-selected');
                        grid_id_el.select('.paging-btn-' + currentPage, true).addClass('x-btn-selected');
                    }
                }
            });
            // if the total of the buttons is greater than the total of the
            // shown buttons,only show one part of these buttons on init
            if (i == 0) {
                // add first button selected CSS on init
                this.items[this.items.length - 1].cls += ' x-btn-selected';
            }
            if (i < indexTotal) {
                this.items[this.items.length - 1].cls += ' visible';
                
            }
            else {
                this.items[this.items.length - 1].cls += ' hide';
            }
        }
        
        // Next Button
        this.items.push({
            text: 'next',
            cls: 'btn btn-paging-next',
            listeners: {
                'click': function(){
                
                    // set paging label:item {0} to {1} of {2}
                    startoffset = pb.getPageData().activePage * pb.pageSize + 1;
                    endoffset = (pb.getPageData().activePage + 1) * pb.pageSize;
                    if (this.pagingMsgLabel) {
                        grid_id_el.select('.paging-label', true).each(function(){
                            Ext.getCmp(this.id).setText('item ' +
                            startoffset +
                            ' to ' +
                            endoffset +
                            ' of ' +
                            pb.getPageData().total)
                        });
                    }
                    // set prev button enabled
                    var prevbutton = grid_id_el.select('.btn-paging-prev', true);
                    prevbutton.each(function(){
                        if (Ext.getCmp(this.id).disabled) {
                            Ext.getCmp(this.id).enable();
                        }
                    })
                    // move to next page
                    var currentPage, lastSelectedPage;
                    grid_id_el.select('.ux-paging', true).each(function(){
                        currentPage = Ext.getCmp(this.id).currentPage;
                    });
                    
                    lastSelectedPage = currentPage;
                    currentPage++;
                    grid_id_el.select('.ux-paging', true).each(function(){
                        Ext.getCmp(this.id).currentPage = currentPage;
                    });
                    
                    if (currentPage < pb.getPageData().pages) {
                        pb.changePage(currentPage);
                    }
                    // when currentpage=total_pages,disable itself
                    else 
                        if (currentPage == pb.getPageData().pages) {
                            pb.changePage(currentPage);
                            grid_id_el.select('.btn-paging-next').each(function(){
                                if (!Ext.getCmp(this.id).disabled) {
                                    Ext.getCmp(this.id).disable();
                                }
                            })
                        // this.disable();
                        }
                    
                    // this sentence is useless , because the pb.cursor won't
                    // move
                    // pb.moveNext();
                    // remove the selected css of lastSelectedPage button,add
                    // the selected css to currentPage
                    
                    grid_id_el.select('.paging-btn-' + lastSelectedPage, true).removeClass('x-btn-selected');
                    grid_id_el.select('.paging-btn-' + currentPage, true).addClass('x-btn-selected');
                    // move the number button
                    grid_id_el.select('.ux-paging', true).each(function(){
                        if (currentPage >= leftEdge &&
                        currentPage <= pb.getPageData().pages) {
                            if (!this.select('.btn-paging-btn.visible:first').first().hasClass('paging-btn-' + rightEdge)) {
                                this.select('.btn-paging-btn.visible:first').first().replaceClass('visible', 'hide');
                            }
                            
                            this.select('.btn-paging-btn.visible:last').first().next().replaceClass('hide', 'visible');
                        }
                    })
                    
                }
            }
        });
        if (this.pagingMsgCombo) {
            this.items.push({
                xtype: 'combo'
            })
        }
        ButtonPanel.superclass.initComponent.call(this);
    }
});
NumberPager = Ext.extend(Object, {
    width: 150,
    defaultText: 'Loading...',
    lasttotal: 0,
    constructor: function(config){
        if (config) {
            Ext.apply(this, config);
        }
    },
    // public
    init: function(parent){
        if (parent.displayInfo) {
            this.parent = parent;
            var idx = parent.items.indexOf(parent.inputItem);
            Ext.each(parent.items.getRange(idx - 4, idx + 6), function(c){
                c.hide();
            });
            Ext.apply(parent, this.parentOverrides);
            
        }
    },
    // private, overriddes
    parentOverrides: {
        // private
        // This method updates the information via the progress bar.
        updateInfo: function(){
            if (this.displayItem) {
                var pagingMsgLabel = (this.pagingMsgLabel == undefined) ? false : this.pagingMsgLabel;
                var pagingMsgCombo = (this.pagingMsgCombo == undefined) ? false : this.pagingMsgCombo;
                
                // when the total is changed,renew the ButtonPanel,else
                // use the original one.
                // [Question]What if the store has changed, but the
                // total is not changed?
                if (this.lasttotal != this.getPageData().total) {
                    this.remove(this.displayItem, true);
                    this.numberpager = new ButtonPanel({
                        num: this.getPageData().pages,
                        pb: this,
                        grid_id: this.grid_id,
                        indexTotal: 6,
                        pagingMsgLabel: pagingMsgLabel,
                        pagingMsgCombo: pagingMsgCombo
                    });
                    
                    this.displayItem = this.numberpager;
                    this.add(this.displayItem);
                    this.doLayout();
                }
                this.lasttotal = this.getPageData().total;
            }
        }
    }
});
//Paging End
//TODO  Achieve
//navigation switch







//var leavethispage=false;
Ext.onReady(function(){
	if(Ext.get('footbg')){
		footerFiled.append('footbg', {
			year:footer.year,
			version:footer.version
		});	
	}
	$(".navbg>li:not(li.btn-nav-search)").hover(
			  function () {
				  $(this).addClass('nav-hover');
			  },
			  function () {
				  $(this).removeClass('nav-hover'); 
			  }
	);
	if(Ext.get('loginOut')){

		Ext.get('loginOut').on({'click':function(e,t,o){
			e.preventDefault();
						
			Ext.Ajax.request({							
			   	url: '../../api/extjs',
			   	params: {
			        data: Ext.encode({
			            className: 'Class_Internal_Admin_Login',
			            methodName: 'logout',
			            params: {}        
			        })
			    },
			    success:function(response){
			    	var resp_text = Ext.decode(response.responseText);
					if(resp_text.success){
						location.href=host+"admin/login";
					}
				}})
		 			
		}})	
		}
//	window.onbeforeunload=function(){
//		//leave this page
//		if(leavethispage){
//			//no return sentence,return true will also popup that dialogue 
//		}else{
//			return 'Email hasn\'t been sent,Do you want to leave this page?';
//		}
//	}
		
})
