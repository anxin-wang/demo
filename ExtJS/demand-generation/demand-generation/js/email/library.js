Ext.onReady(function(){
	var library = new Library({
		renderTo: 'content',
		id: 'library'
	});
	// live event
	/*
Ext.get('template_library_image_galary').on('mouseover', function(e,target){
		Ext.get(target).first('.deck').animate({bottom: {to: 0}});
	}, this, {
		delegate: 'div.thumb-wrap'
	});
	Ext.get('template_library_image_galary').on('mouseout', function(e,target){
		Ext.get(target).first('.deck').animate({bottom: {to: -42}});
	}, this, {
		delegate: 'div.thumb-wrap'
	});
*/
});

$(function(){
	$('div.thumb-wrap').live('mouseenter', function(){
		$(this).find('.deck').animate({bottom:0});
	}).live('mouseleave', function(){
		$(this).find('.deck').animate({bottom:-42});
	});
});