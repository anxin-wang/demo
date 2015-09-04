SliderBar = Ext.extend(Ext.slider.SingleSlider, {
    minValue: 0,
    maxValue: 100,
    width: 885,	
	increment: 1,
	keyIncrement:1,
	id:'slider-bar',
	cls:'slider-bar',
	plugins:new Ext.slider.Tip({
		id:'slider-tip',		
        getText: function(thumb){
            return String.format('<b>{0}% selected</b>', thumb.value);
        }
    }),
    initComponent: function() {		
        SliderBar.superclass.initComponent.call(this);		
    },
	listeners:{
		'afterrender':function(){
			Ext.DomHelper.insertHtml('afterBegin',Ext.get('slider-bar').dom,'<div id="slider-selected" class="slider-selected-bg"></div>');
		},
		'change':function(thumb){	
		Ext.get('slider-selected').setWidth(this.thumbs[0].value/100*878);
		//console.log(this.thumbs[0].value);	
		}
	}
});
