/*
 * File: uxPaking.ui.js
 * Date: Fri Jul 24 2009 11:40:09 GMT+0800 
 * This file was manually exported.
 */

uxPaking = Ext.extend(Ext.form.FormPanel, {
    layout: 'column',
    border: false,
    currentbtn:1,
    currentpage:1,
    cls:'uxpaking',
    initComponent: function() {
    	var totalData=this.totalData;
    	var pageData=this.pageData;
    	var showItem=this.showItem;
    	var totalPages=Math.ceil(totalData/pageData);
    	//the data of combobox
		var combodata=[];
		for(var i=0;i<totalPages;i++){
			combodata.push([i,(i*(pageData)+1)+" to "+((i+1)*pageData)+' of '+totalData])
		}
		
        this.layoutConfig = {
            //pack: 'end'
        };
        this.items = [
            {
                xtype: 'displayfield',
                fieldLabel: 'Label',
                cls:'pakinglabel',
                value:'<p>items 1 to '+pageData+' of '+totalData+'</p>',
                width:450
            },
            {
                xtype: 'button',
                text: 'Prev',
                cls:'btn btn-paking-prev',
                disabled:true,
				disabledClass:'btn-paking-prev-disabled',
				width: 15,
                handler:function(b,e){
	                var uxpakingitem=Ext.select('.uxpaking',true);
	                var uxpakingnext=Ext.select('.btn-paking-next',true);
               		var uxpakingprev=Ext.select('.btn-paking-prev',true);
	                var currentbtn=Ext.getCmp(uxpakingitem.item(0).id).currentbtn;
					var currentpage=Ext.getCmp(uxpakingitem.item(0).id).currentpage;
					uxpakingnext.each(function(){Ext.getCmp(this.id).enable()})
	                if(currentbtn>2){
		                Ext.select('.btn-paking-btn'+currentbtn).removeClass('btn-selected');
		                Ext.select('.btn-paking-btn'+(currentbtn-1)).addClass('btn-selected');
		                uxpakingitem.each(function(){Ext.getCmp(this.id).currentbtn=(currentbtn-1);})
	                }else{
	                	if(currentpage>2){

		                	for(var j=1;j<=showItem;j++)
		                	{
		                	Ext.select('.btn-paking-btn'+j,true).each(function(){
		                	
		                		Ext.getCmp(this.id).setText((currentpage-3+j).toString())
							})
							}
						
	               		}else{
							uxpakingprev.each(function(){Ext.getCmp(this.id).disable()})
                			Ext.select('.btn-paking-btn'+currentbtn).removeClass('btn-selected');
	                		Ext.select('.btn-paking-btn'+(currentbtn-1)).addClass('btn-selected');
	                		uxpakingitem.each(function(){Ext.getCmp(this.id).currentbtn=(currentbtn-1);})

	                
	                	}

	                }
	                uxpakingitem.each(function(){Ext.getCmp(this.id).currentpage=(currentpage-1);})
	                Ext.select('.pakinglabel',true).each(function(){
		                	var label='<p>items '+(pageData*(currentpage-2)+1)+" to "+(pageData*(currentpage-1))+" of "+totalData+'</p>'
		                	Ext.getCmp(this.id).setValue(label)
							})
				}
            }
        ];
       this.items.push({
       			xtype: 'button',
                text: '1',
                cls:'btn btn-paking-btn btn-paking-btn1 btn-selected',
                btnorder:1,
                handler:function(){
						var newpage=Number(this.text);
						var newcurrentbtn=1;
						var uxpakingitem=Ext.select('.uxpaking',true);
						var uxpakingnext=Ext.select('.btn-paking-next',true);
					    var uxpakingprev=Ext.select('.btn-paking-prev',true);
						var currentbtn=Ext.getCmp(uxpakingitem.item(0).id).currentbtn;						
						var currentpage=Ext.getCmp(uxpakingitem.item(0).id).currentpage;
						
							if(newpage==1){
								uxpakingprev.each(function(){Ext.getCmp(this.id).disable()});
							}else{
								for(var j=1;j<=showItem;j++)
						            {
						              	Ext.select('.btn-paking-btn'+j,true).each(function(){
											Ext.getCmp(this.id).setText((newpage+3-showItem+j).toString()											
											)
									})
								}
								newcurrentbtn=2;
							}
						

						Ext.select('.btn-paking-btn'+currentbtn).removeClass('btn-selected');
						Ext.select('.btn-paking-btn'+newcurrentbtn).addClass('btn-selected');
						uxpakingitem.each(function(){Ext.getCmp(this.id).currentbtn=newcurrentbtn})
						uxpakingitem.each(function(){Ext.getCmp(this.id).currentpage=newpage})
						Ext.select('.pakinglabel',true).each(function(){
		                	var label="<p>items "+"1 to "+pageData+" of "+totalData+'</p>';
		                	Ext.getCmp(this.id).setValue(label)
							})
					}
       })
        for(var i=2;i<=showItem;i++){        	
        this.items.push({               
        		xtype: 'button',
                text: i,
                btnorder:i,
                cls:'btn btn-paking-btn btn-paking-btn'+i,
                handler:function(){
						var newpage=Number(this.text);
						var newcurrentbtn=this.btnorder;
						var uxpakingitem=Ext.select('.uxpaking',true);
						var uxpakingnext=Ext.select('.btn-paking-next',true);
					    var uxpakingprev=Ext.select('.btn-paking-prev',true);
						var currentbtn=Ext.getCmp(uxpakingitem.item(0).id).currentbtn;						
						var currentpage=Ext.getCmp(uxpakingitem.item(0).id).currentpage;
						if(newcurrentbtn==showItem){
							if(newpage==20){
								uxpakingnext.each(function(){Ext.getCmp(this.id).disable()});
							}else{
								for(var j=1;j<=showItem;j++)
						            {
						              	Ext.select('.btn-paking-btn'+j,true).each(function(){
											Ext.getCmp(this.id).setText((newpage+1-showItem+j).toString()											
											)
									})
								}
								newcurrentbtn--;
							}
						}else{
								uxpakingnext.each(function(){Ext.getCmp(this.id).enable()})
								uxpakingprev.each(function(){Ext.getCmp(this.id).enable()});
						}	
						

						Ext.select('.btn-paking-btn'+currentbtn).removeClass('btn-selected');
						Ext.select('.btn-paking-btn'+newcurrentbtn).addClass('btn-selected');
						uxpakingitem.each(function(){Ext.getCmp(this.id).currentbtn=newcurrentbtn})
						uxpakingitem.each(function(){Ext.getCmp(this.id).currentpage=newpage})
						Ext.select('.pakinglabel',true).each(function(){
		                	var label="<p>items "+(pageData*(newpage-1)+1)+" to "+(pageData*newpage)+" of "+totalData+'</p>';
		                	Ext.getCmp(this.id).setValue(label)
							})
					}
                
                })
                
       }
       this.items.push({
       			xtype: 'button',
                text: 'Next',
                cls:'btn btn-paking-next',
				disabledClass:'btn-paking-next-disabled',
				width: 15,
                handler:function(b,e){
                var uxpakingitem=Ext.select('.uxpaking',true);
                var uxpakingnext=Ext.select('.btn-paking-next',true);
                var uxpakingprev=Ext.select('.btn-paking-prev',true);
                var currentbtn=Ext.getCmp(uxpakingitem.item(0).id).currentbtn;
				var currentpage=Ext.getCmp(uxpakingitem.item(0).id).currentpage;
				uxpakingprev.each(function(){Ext.getCmp(this.id).enable()})
                if(currentbtn<showItem-1){
	                Ext.select('.btn-paking-btn'+currentbtn).removeClass('btn-selected');
	                Ext.select('.btn-paking-btn'+(currentbtn+1)).addClass('btn-selected');
	                uxpakingitem.each(function(){Ext.getCmp(this.id).currentbtn=(currentbtn+1);})
                }else{
                	if(currentpage<totalPages-1){
	                	for(var j=1;j<=showItem;j++)
	                	{
	                	Ext.select('.btn-paking-btn'+j,true).each(function(){
	                	
	                		Ext.getCmp(this.id).setText((currentpage-3+j).toString())
						})
						}
					
               		}else{
               			uxpakingnext.each(function(){Ext.getCmp(this.id).disable()})
                		Ext.select('.btn-paking-btn'+currentbtn).removeClass('btn-selected');
	                	Ext.select('.btn-paking-btn'+(currentbtn+1)).addClass('btn-selected');
	                	uxpakingitem.each(function(){Ext.getCmp(this.id).currentbtn=(currentbtn+1);})
                
                	}
                }
                uxpakingitem.each(function(){Ext.getCmp(this.id).currentpage=(currentpage+1);})
	            Ext.select('.pakinglabel',true).each(function(){
		                	var label="<p>items "+(pageData*(currentpage)+1)+" to "+(pageData*(currentpage+1))+" of "+totalData+'</p>';
		                	Ext.getCmp(this.id).setValue(label)
							})

                }
       })
       this.items.push({
       			xtype: 'combo',
                fieldLabel: 'Label',
				fieldClass:'combo-paking-fieldclass',
				width:143,
				triggerClass:'combo-paking-triggerclass',
			    typeAhead: true,
			    triggerAction: 'all',
			    lazyRender:true,
			    mode: 'local',
			    store: new Ext.data.ArrayStore({
			        fields: [
			            'value',
			            'page'
			        ],
			        data: combodata
			    }),
			    valueField: 'value',
			    displayField: 'page',
				listWidth:122,
				emptyText:'1 to '+pageData+' of '+totalData
       })
        uxPaking.superclass.initComponent.call(this);
    }
});


