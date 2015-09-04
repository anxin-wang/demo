Thumbnail_Preview = Ext.extend(Ext.Panel, {
	border:false,
    width: 400,
    height: 250,
    layout: 'hbox',
	id:'thumbnailpreview',
	sum:0,
	current_thumbnail:0,
	thumbnails:[],	
	setThumbnail:function(thumbnail_arr){
		this.thumbnails=thumbnail_arr;
	},
    initComponent: function() {	
	    var parent=Ext.getCmp('thumbnailpreview');
        this.items = [
            {
                xtype: 'button',
                text: 'prev',
				id:'thumbnailpreview-prev',
				cls:'btn thumbnail-preview-prev-btn',
				listeners:{
					'click':function(){						
						if (parent.current_thumbnail > 0) {
							parent.current_thumbnail--;		
							if(parent.current_thumbnail==0){
							this.disable();
							}else{
								Ext.getCmp('thumbnailpreview-next').enable();
							}			
							Ext.getCmp('thumbnail-image').setValue('<a href="' + parent.thumbnails[parent.current_thumbnail].preview_url + '"><img src="' + parent.thumbnails[parent.current_thumbnail].img_src + '" alt="' + parent.thumbnails[parent.current_thumbnail].img_alt + '"/> </a>')
						}
						else{
							//TODO:提示错误信息，已经是第一幅图片了
						}
					}
				}
            },
            {
                xtype: 'displayfield',
				id:'thumbnail-image',
				width:150,
                value: 'aaa'
            },
            {
                xtype: 'button',
                text: 'next',
				cls:'btn thumbnail-preview-next-btn',
				id:'thumbnailpreview-next',
				listeners:{
					'click':function(){						
						if (parent.current_thumbnail < parent.sum) {
							parent.current_thumbnail++;		
							if(parent.current_thumbnail==(parent.sum-1)){
								this.disable();
							}else{
								Ext.getCmp('thumbnailpreview-prev').enable();
							}				
							Ext.getCmp('thumbnail-image').setValue('<a href="' + parent.thumbnails[parent.current_thumbnail].preview_url + '"><img src="' + parent.thumbnails[parent.current_thumbnail].img_src + '" alt="' + parent.thumbnails[parent.current_thumbnail].img_alt + '"/> </a>')
						}
						else{
							//TODO:提示错误信息，已经是最后一幅图片了
						}
					}
				}
            }
        ];
        Thumbnail_Preview.superclass.initComponent.call(this);
    }
});
