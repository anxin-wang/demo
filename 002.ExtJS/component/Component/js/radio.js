/**
 * @author front end
 */
Ext.onReady(function(){
	var radiopanel=new Ext.Panel{
		renderTo:'radiogroup',
		items:[
		//第一种Checkbox：
		{
			xtype:'fieldset',
			title:'多选',
			autoHeight:true,
			defaultType:'checkbox',
			//为了避免出现前后两个标签，还是把hideLabels设为true比较好，这样左侧的fieldLabel就不会显示出来了
			hideLabels:true,
			items:[
				{
					//boxLabel是复选框和单选框两个控件独有的
					boxLabel:'多选一',checked:true},
				{boxLabel:'多选二'},
				{boxLabel:'多选三'}
				//value的默认值都是on,提交的数据就变成这样checkbox=on&checkbox=on&checkbox=on
				//我们需要使用inputValue来指定这3个复选框的值
//				{
//					//boxLabel是复选框和单选框两个控件独有的
//					boxLabel:'多选一',inputValue:'1',checked:true},
//				{boxLabel:'多选二',inputValue:'2'},
//				{boxLabel:'多选三',inputValue:'3'}
                //再提交的数据就变成这样checkbox=1&checkbox=2&checkbox=3
			]
		}]
	},
	
	{
            xtype: 'fieldset',
            title: 'Individual Checkboxes',
            autoHeight: true,
            defaultType: 'checkbox', // each item will be a checkbox
            items: [{
                xtype: 'textfield',
                name: 'txt-test1',
                fieldLabel: 'Alignment Test'
            }, {
                fieldLabel: 'Favorite Animals',
                boxLabel: 'Dog',
                name: 'fav-animal-dog'
            }, {
                fieldLabel: '',
                labelSeparator: '',
                boxLabel: 'Cat',
                name: 'fav-animal-cat'
            }, {
                checked: true,
                fieldLabel: '',
                labelSeparator: '',
                boxLabel: 'Monkey',
                name: 'fav-animal-monkey'
            }]
        },
		//第一种RadioGroup:
		{
            xtype: 'fieldset',
            title: 'Individual Radios',
            autoHeight: true,
            defaultType: 'radio', // each item will be a radio button
            items: [{
                xtype: 'textfield',
                name: 'txt-test2',
                fieldLabel: 'Alignment Test'
            }, {
                checked: true,
                fieldLabel: 'Favorite Color',
                boxLabel: 'Red',
                name: 'fav-color',
                inputValue: 'red'
            }, {
                fieldLabel: '',
                labelSeparator: '',
                boxLabel: 'Blue',
                name: 'fav-color',
                inputValue: 'blue'
            }, {
                fieldLabel: '',
                labelSeparator: '',
                boxLabel: 'Green',
                name: 'fav-color',
                inputValue: 'green'
            }]
        }
		//第二种 checkbox：
		{
            // Use the default, automatic layout to distribute the controls evenly
            // across a single row
            xtype: 'checkboxgroup',
            fieldLabel: 'Auto Layout',
            items: [
                {boxLabel: 'Item 1', name: 'cb-auto-1'},
                {boxLabel: 'Item 2', name: 'cb-auto-2', checked: true},
                {boxLabel: 'Item 3', name: 'cb-auto-3'},
                {boxLabel: 'Item 4', name: 'cb-auto-4'},
                {boxLabel: 'Item 5', name: 'cb-auto-5'}
            ]
        },
		//第二种radio button
		{
            xtype: 'radiogroup',
            fieldLabel: 'Auto Layout',
            items: [
                {boxLabel: 'Item 1', name: 'rb-auto', inputValue: 1},
                {boxLabel: 'Item 2', name: 'rb-auto', inputValue: 2, checked: true},
                {boxLabel: 'Item 3', name: 'rb-auto', inputValue: 3},
                {boxLabel: 'Item 4', name: 'rb-auto', inputValue: 4},
                {boxLabel: 'Item 5', name: 'rb-auto', inputValue: 5}
            ]
        }


});

