NumberPager=Ext.extend(Object,{
	width:300,
	defaultText    : 'Loading...',
	constructor : function(config) {
	if (config) {
		Ext.apply(this, config);
	}
},
//public
init : function (parent) {
	//parent=progressbar
	if(parent.displayInfo){
		this.parent = parent;
		//useless sentence
		//var ind  = parent.items.indexOf(parent.displayItem);	
		//parent.inputItem:default textfield inputItem
		var idx = parent.items.indexOf(parent.inputItem);
		console.log("idx"+idx);
		console.log(parent.inputItem);
        Ext.each(parent.items.getRange(idx - 4, idx + 6), function(c){
            c.hide();
        });					
		Ext.apply(parent, this.parentOverrides);	
	}	  
},
// private, overriddes
parentOverrides  : {
	// private
	// This method updates the information via the progress bar.
	updateInfo : function(){

		if(this.displayItem){
			this.remove(this.displayItem, true);
			this.numberpager = new Ext.ux.ButtonPanel({num:this.getPageData().pages,pb:this});	
			this.displayItem = this.numberpager;
			this.add(this.displayItem);			
			this.doLayout();
			
			//Click事件要写在ButtonPanel里面，因为是里面的按钮点击后触发事件，而不是ButtonPanel这个控件
			//this.numberpager.on('click', this.handleProgressBarClick, this);
	           
			
//			var count = this.store.getCount(),				
//			    pgData = this.getPageData(),				    
//			    pageNum = this.readPage(pgData),				    
//			    msg = count == 0 ?
//				this.emptyMsg :
//				String.format(
//					this.displayMsg,
//					this.cursor+1, this.cursor+count, this.store.getTotalCount()
//				);
//			    console.log(this);	
//			    console.log(pgData);
//			    console.log(pageNum);
//			    console.log(count);
//			pageNum = pgData.activePage; 	
//			
//			var pct	= pageNum / pgData.pages;	
//			
			//this.displayItem.updateProgress(pct, msg, this.animate || this.defaultAnimConfig);
		}
	}
}
});