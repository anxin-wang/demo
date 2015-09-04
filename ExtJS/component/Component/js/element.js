Ext.onReady(function(){
	Ext.get('addClassOnClick').addClassOnClick('red');
	Ext.get('addClassOnFocus').addClassOnFocus('highlightbackground');
	Ext.get('addClassOnOver').addClassOnOver('highlightbackground');
//	Ext.get('addKeyMap').addKeyMap({
//        key: "abc",
//        fn: function(){ alert('a, b or c was pressed'); }
//    });
//	var map = new Ext.KeyMap("addKeyMap", [
//    {
//        key: [10,13],
//        fn: function(){ alert("Return was pressed"); }
//    }, {
//        key: "abc",
//        fn: function(){ alert('a, b or c was pressed'); }
//    }, {
//        key: "\t",
//        ctrl:true,
//        shift:true,
//        fn: function(){ alert('Control + shift + tab was pressed.'); }
//    }
//]);
	Ext.get('addKeyMap').addKeyListener(
        "abc",
        function(){ alert('a, b or c was pressed'); }
    );
	Ext.get('alignTo').addListener('click',function(){Ext.get('alignA').alignTo('alignB','tl?',[-20, 0],true)});
	Ext.get('anchorTo').addListener('click',function(){Ext.get('alignA').anchorTo('alignB','tr?',[-20, 0],true,10,function(){console.log('aaa')})});
	Ext.get('appendChild').on('click',function(){Ext.fly('parent').appendChild('child');});
	Ext.get('appendTo').on('click',function(){Ext.fly('parent').appendTo('child');});
	Ext.get('applyStyles').on('click',function(){Ext.fly('parent').applyStyles('width:150px;height:150px;background:blue;');});
	Ext.get('setStyle1').on('click',function(){Ext.fly('parent').setStyle('background','green');});
	Ext.get('setStyle2').on('click',function(){Ext.fly('parent').setStyle({
		width:'150px',
		height:'150px',
		background:'blue'
	});});
	//动画不起作用了
	Ext.get('setStyle3').on('click',function(){Ext.fly('parent').setStyle('background','green',true);});
	Ext.get('autoHeight').on('click',function(){Ext.fly('parent').autoHeight(true);});
	//默认x-box
	//Ext.get('boxWrap').on('click',function(){Ext.fly('parent').boxWrap();});
	//自定义class
	Ext.get('boxWrap').on('click',function(){Ext.fly('parent').boxWrap().addClass("x-box-blue");});	
	
	//默认浏览器的中央
	Ext.get('center').on('click',function(){Ext.fly('parent').center();});	
	//Ext.get('center').on('click',function(){Ext.fly('parent').center('child');});	
//	Ext.get('setOpacity').on('click',function(){Ext.fly('parent').setOpacity(.5);});
//	Ext.get('setOpacity').on('click',function(){Ext.fly('parent').setOpacity(.5,true);});
	Ext.get('setOpacity').on('click',function(){Ext.fly('parent').setOpacity(.5,{duration:2});});	
	Ext.get('clearOpacity').on('click',function(){Ext.fly('parent').clearOpacity();});	
	Ext.get('getPositioning').on('click',function(){console.log(Ext.fly('parent').getPositioning());});
	Ext.get('setPositioning').on('click',function(){Ext.fly('parent').setPositioning({
		bottom:'auto',
		top:'100',
		left:'30',
		right:'auto',
		position:'absolute'
	});});
	Ext.get('clearPositioning').on('click',function(){console.log(Ext.fly('parent').clearPositioning('position'));});
	Ext.get('clip').on('click',function(){Ext.fly('parent').clip();});
	Ext.get('unClip').on('click',function(){Ext.fly('parent').unclip();});
	Ext.get('contains').on('click',function(){console.log(Ext.fly('parent').contains('child'));});
	Ext.get('unselectable').on('click',function(){Ext.fly('alignA').unselectable();});
	Ext.get('mask').on('click',function(){Ext.get('alignA').mask();});
	Ext.get('unmask').on('click',function(){Ext.fly('alignA').unmask();});
	Ext.get('toggle').on('click',function(){Ext.fly('alignA').toggle();});
	Ext.get('show').on('click',function(){Ext.fly('alignA').show();});
	//update
	Ext.select('.viewdetail-recipients-viewall b').item(0).update(sum + ' Total');

})
