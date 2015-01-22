/*!
 * Ext JS Library 3.2.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
/**
 * @class Ext.ux.tree.TreeGridNodeUI
 * @extends Ext.tree.TreeNodeUI
 */
Ext.ux.tree.TreeGridNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    isTreeGridNodeUI: true,

    renderElements : function(n, a, targetNode, bulkRender){
        var t = n.getOwnerTree(),
            cols = t.columns,
            c = cols[0],
            i, buf, len;
		
        this.indentMarkup = n.parentNode ? n.parentNode.ui.getChildIndent() : '';

        buf = [
             '<tbody class="x-tree-node">',
                '<tr ext:tree-node-id="', n.id ,'" class="x-tree-node-el x-tree-node-leaf ', a.cls, '">',
                    '<td class="x-treegrid-col">',
                        '<span class="x-tree-node-indent">', this.indentMarkup, "</span>",
						
                        '<img src="', this.emptyIcon, '" class="x-tree-ec-icon x-tree-elbow">',
//                        '<input type="checkbox" class="x-tree-node-cb">',
						'<img src="', a.icon || this.emptyIcon, '" class="x-tree-node-icon', (a.icon ? " x-tree-node-inline-icon" : ""), (a.iconCls ? " "+a.iconCls : ""), '" unselectable="on">',
                        
						'<a hidefocus="on" class="x-tree-node-anchor" href="', a.href ? a.href : '#', '" tabIndex="1" ',
                            a.hrefTarget ? ' target="'+a.hrefTarget+'"' : '', '>',
                        '<span unselectable="on">', (c.tpl ? c.tpl.apply(a) : a[c.dataIndex] || c.text), '</span></a>',
                    '</td>'
        ];

        for(i = 1, len = cols.length; i < len; i++){
            c = cols[i];
            buf.push(
                    '<td class="x-treegrid-col ', (c.cls ? c.cls : ''), '">',
                        '<div unselectable="on" class="x-treegrid-text"', (c.align ? ' style="text-align: ' + c.align + ';"' : ''), '>',
                            (c.tpl ? c.tpl.apply(a) : a[c.dataIndex]),
                        '</div>',
                    '</td>'
            );
        }

        buf.push(
            '</tr><tr class="x-tree-node-ct"><td colspan="', cols.length, '">',
            '<table class="x-treegrid-node-ct-table" cellpadding="0" cellspacing="0" style="table-layout: fixed; display: none; width: ', t.innerCt.getWidth() ,'px;"><colgroup>'
        );
        for(i = 0, len = cols.length; i<len; i++) {
            buf.push('<col style="width: ', (cols[i].hidden ? 0 : cols[i].width) ,'px;" />');
        }
        buf.push('</colgroup></table></td></tr></tbody>');
		
        if(bulkRender !== true && n.nextSibling && n.nextSibling.ui.getEl()){
			
            this.wrap = Ext.DomHelper.insertHtml("beforeBegin", n.nextSibling.ui.getEl(), buf.join(''));
			
        }else{
            this.wrap = Ext.DomHelper.insertHtml("beforeEnd", targetNode, buf.join(''));

			
        }

        this.elNode = this.wrap.childNodes[0];
        this.ctNode = this.wrap.childNodes[1].firstChild.firstChild;
        var cs = this.elNode.firstChild.childNodes;
        this.indentNode = cs[0];
        this.ecNode = cs[1];
        this.iconNode = cs[2];
        this.anchor = cs[3];
        this.textNode = cs[3].firstChild;
		Ext.select('img.task-folder',true).each(function(){
			
			if(!this.prev('input')){
				Ext.DomHelper.insertBefore(this,{tag:'input type="checkbox"',cls:'x-tree-node-cb'});
			}
			
		})
		Ext.select('img.x-tree-node-icon',true).each(function(){
			if(!this.prev('input')){
				Ext.DomHelper.insertBefore(this,{tag:'input type="checkbox"',cls:'x-tree-node-cb'});
			}
			
		})
		Ext.select('input.x-tree-node-cb',true).each(function(){
			this.on('click',function(){
				
				if(this.dom.checked)
				{
					
					//console.dir(this.parent().parent().next().select('input.x-tree-node-cb',true));
					//alert(this.parent().parent().next().select('input.x-tree-node-cb',true).getCount());
					this.parent().parent().next().select('input.x-tree-node-cb',true).each(function(){this.dom.checked=true;});
				}
				else{
					this.parent().parent().next().select('input.x-tree-node-cb',true).each(function(){this.dom.checked=false;});
				}
				
			});
		Ext.select('tr.x-tree-node-el',true).each(function(){
			this.hover(function(){
			        if(Ext.get(this).select('div.operationLinkPanel').getCount()==0){
						Ext.DomHelper.append(Ext.get(this).last(), {
						tag: 'div',
						cls: 'operationLinkPanel'
						//html: '<span>&nbsp;</span><a href="http://www.baidu.com" target="_blank" class="operationLinkButton"><img src="edit.GIF" ext:qtip="edit"/></a><span>&nbsp;</span><a href="#" class="operationLinkButton"><img src="clone.GIF" ext:qtip="clone"/></a><span>&nbsp;</span><a href="#" class="operationLinkButton"><img src="delete.GIF" ext:qtip="delete"/></a>'
						})
					}						
			
			},function(){
				Ext.get(this).select('div.operationLinkPanel',true).remove();
			})
		});
			
		})

    },

    // private
    animExpand : function(cb){
		//var wo=Ext.get(this.ctNode).parent().parent().prev().select('input.x-tree-node-cb').item(0).dom;
		//console.log(wo);
		
			
        this.ctNode.style.display = "";
		if(Ext.get(this.ctNode).parent().parent().prev().select('input.x-tree-node-cb').item(0).dom.checked){
			Ext.get(this.ctNode).select('input.x-tree-node-cb',true).each(function(){this.dom.checked=true});
			}
			else{
			Ext.get(this.ctNode).select('input.x-tree-node-cb',true).each(function(){this.dom.checked=false});	
				}
        Ext.ux.tree.TreeGridNodeUI.superclass.animExpand.call(this, cb);
    }
});



Ext.ux.tree.TreeGridRootNodeUI = Ext.extend(Ext.tree.TreeNodeUI, {
    isTreeGridNodeUI: true,

    // private
    render : function(){
        if(!this.rendered){
            this.wrap = this.ctNode = this.node.ownerTree.innerCt.dom;
            this.node.expanded = true;
        }

        if(Ext.isWebKit) {
            // weird table-layout: fixed issue in webkit
            var ct = this.ctNode;
            ct.style.tableLayout = null;
            (function() {
                ct.style.tableLayout = 'fixed';
            }).defer(1);
        }
    },

    destroy : function(){
        if(this.elNode){
            Ext.dd.Registry.unregister(this.elNode.id);
        }
        delete this.node;
    },

    collapse : Ext.emptyFn,
    expand : Ext.emptyFn
});