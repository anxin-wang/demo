/*!
 * Ext JS Library 3.2.2
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */

//用于只绑定一次Listener，Ext.Ajax.on('beforerequest', 否则当第二次上传文件时，由于没有解绑，所以原来绑上去的函数还在，然后又绑了一次
//其实可以用on之后，un就可以
//var isbindListeners=false;
var interval;
var uploadFinish=false;
var nowPercent=0;
Ext.ns('Ext.ux.form');

/**
 * @class Ext.ux.form.ZipFileUploadField
 * @extends Ext.form.TextField
 * Creates a file upload field.
 * @xtype fileuploadfield
 */
Ext.ux.form.ZipFileUploadField = Ext.extend(Ext.form.TextField,  {
    /**
     * @cfg {String} buttonText The button text to display on the upload button (defaults to
     * 'Browse...').  Note that if you supply a value for {@link #buttonCfg}, the buttonCfg.text
     * value will be used instead if available.
     */
    buttonText: 'Browse...',
    /**
     * @cfg {Boolean} buttonOnly True to display the file upload field as a button with no visible
     * text field (defaults to false).  If true, all inherited TextField members will still be available.
     */
    buttonOnly: false,
    /**
     * @cfg {Number} buttonOffset The number of pixels of space reserved between the button and the text field
     * (defaults to 3).  Note that this only applies if {@link #buttonOnly} = false.
     */
    buttonOffset: 3,
    /**
     * @cfg {Object} buttonCfg A standard {@link Ext.Button} config object.
     */

    // private
    readOnly: true,

    /**
     * @hide
     * @method autoSize
     */
    autoSize: Ext.emptyFn,
	hiddenValue:'',

    // private
    initComponent: function(){
        Ext.ux.form.ZipFileUploadField.superclass.initComponent.call(this);

        this.addEvents(
            /**
             * @event fileselected
             * Fires when the underlying file input field's value has changed from the user
             * selecting a new file from the system file selection dialog.
             * @param {Ext.ux.form.ZipFileUploadField} this
             * @param {String} value The file value returned by the underlying file input field
             */
            'fileselected'
        );
    },

    // private
    onRender : function(ct, position){
        Ext.ux.form.ZipFileUploadField.superclass.onRender.call(this, ct, position);
        this.wrap = this.el.wrap({cls:'x-form-field-wrap x-form-file-wrap'});
        this.el.addClass('x-form-file-text');
        this.el.dom.removeAttribute('name');
		this.createHiddenInput();
        this.createFileInput();
		

        var btnCfg = Ext.applyIf(this.buttonCfg || {}, {
            text: this.buttonText
        });
        this.button = new Ext.Button(Ext.apply(btnCfg, {
            renderTo: this.wrap,
			width:50,
            cls: 'x-form-file-btn' + (btnCfg.iconCls ? ' x-btn-icon' : '')
        }));

        if(this.buttonOnly){
            this.el.hide();
            this.wrap.setWidth(this.button.getEl().getWidth());
        }

        this.bindListeners();
        this.resizeEl = this.positionEl = this.wrap;
    },
    createFileInput : function() {
        this.fileInput = this.wrap.createChild({
            id: this.getFileInputId(),
            name: this.name||this.getId(),
            cls: 'x-form-file',
            tag: 'input',
            type: 'file',
            size: 1
        });
    },
    createHiddenInput:function(){
		this.hiddenInput = this.wrap.createChild({
            id: 'progress_key',
            name: 'APC_UPLOAD_PROGRESS',
            tag: 'input',
            type: 'hidden',
			value:new Date().getTime()
        });
	},
	
	// private
    getFileInputId: function(){
        return this.id + '-file';
    },
    bindListeners: function(){
		var form=this.form;		
		var fileInput=this.fileInput;
		var hiddenInput=this.hiddenInput;
		var t=this;
        this.fileInput.on({
            scope: this,
            mouseenter: function() {
                this.button.addClass(['x-btn-over','x-btn-focus'])
            },
            mouseleave: function(){
                this.button.removeClass(['x-btn-over','x-btn-focus','x-btn-click'])
            },
            mousedown: function(){
                this.button.addClass('x-btn-click')
            },
            mouseup: function(){
                this.button.removeClass(['x-btn-over','x-btn-focus','x-btn-click'])
            },
            change: function(){
	        //1.获取Form数据
            	var submitData = Ext.getCmp('zipuploadform').getForm().getValues();
			//2.如果saveAsTemplate打上勾，即上传的要保存为模板
				if(submitData.saveAsTemplate){
                        //判空
            		if(submitData.name==''){
            			var nameObj=Ext.getCmp('zipfileuploadname');
            			nameObj.markInvalid('This field is required');
            			nameObj.focus();           			
            			return;
            		}
            		if(submitData.folder==''){
            			var folderObj=Ext.getCmp('zipfileuploadfolder');
            			folderObj.markInvalid('This field is required');
            			folderObj.focus();
            			return;
            		}
            		
            	}
            	//构建param
				var params=Ext.encode({
                    		className: 'Class_Internal_Email_Content',
                    		methodName: 'addTemplateByZip',
							params: {
								activityId:activityId,
								activityType:campaigntype,
								assetIdO:asset_ID_o,
								unsubscribe:'',
								textVersionCode:'',
								saveAsTemplate:(submitData.saveAsTemplate)?true:false,
								name:(submitData.saveAsTemplate)?submitData.name:'',
								folder:(submitData.saveAsTemplate)?submitData.folder:''
							}
       					})
				var getUpdateProgress=function(conn,options ){
					 	var progress_key=hiddenInput.dom.value;
						if(Ext.decode(options.params.data).methodName=='addTemplateByZip'){
							//这里把uploadFinish设为false
							uploadFinish=false;
							Ext.MessageBox.show({
								title: 'Please wait',
								msg: 'Uploading your file...',
								progressText: '',
								width:300,
								progress:true,
								closable:false
							});
							//time记次数
							var time=0;							
							interval=setInterval(function(){
								time++;								
								if(nowPercent==1 || uploadFinish){
									clearInterval(interval);
									return;
								}else{
									//获取当前进度
							   		Ext.Ajax.request({
										url:'../api/extjs',
										params:{
											data: Ext.encode({
			                                            className: 'Class_Internal_Email_Content',
			                                            methodName: 'fileUploadStatus',
			                                            params: {
			                                                progress_key: progress_key
			                                            }
			                                        })
										},
										success: function(response){
											var resp_text=Ext.decode(response.responseText);
											if(resp_text.success){												
												var percent=resp_text.data.per/100;
												//设置nowPercent
												nowPercent=percent;
												//resp_text.data.per==100||nowPercent==1这两个能否合并成一个？
												//uploadFinish是必须的，可能已经上传完，uploadFinish已经为true,但进度ajax还没走完，有延后，在传完之后才返回，而且返回的还不是100%，此时进度条如果显示没完成的进度状态就不对了。
												if(uploadFinish||resp_text.data.per==100||nowPercent==1){
													clearInterval(interval);
												}else{
													//设置当前进度
													Ext.MessageBox.updateProgress(percent,Math.round(100*percent)+'% completed');
												}
											}else{	
											        //由于APC总是返回success：false,所以在这里需要做假的进度条，如果上传文件的ajax成功，会将进度更新到100%，这里就不会再起作用
													nowPercent=nowPercent+(Math.round(5*Math.random()))/100
													if(nowPercent>1){
														nowPercent=1
													}
													Ext.MessageBox.updateProgress(nowPercent,Math.round(100*nowPercent)+'% completed');
											}
											
										}		
									})								
								}

							},100);							
						}
					 }


					//beforerequest弹出进度条
				Ext.Ajax.un('beforerequest',getUpdateProgress,this);	
				Ext.Ajax.on('beforerequest',getUpdateProgress,this);				


				//submit file
       			Ext.Ajax.request({
          			url: '../api/extjs',
          			method:'POST',
					params: {
                            data: params
           			},
           			???Ext.getCmp(form)是否可以写成form
          			form:Ext.getCmp(form).getForm().el.dom,
          			isUpload:true,
          			headers:'text/html',
          			success: function(response) {
						//将此flag设为true
           				uploadFinish=true;
						//nowPercent设为1保证在APC返回为success:false时，假的进度条也能显示为100%
						nowPercent=1;
						//清空定时器
						clearInterval(interval);
						Ext.MessageBox.updateProgress(1,100+'% completed');
						//清空File框的内容
						fileInput.dom.value="";
						???responseHandle
						var resp_text = Ext.decode(responseHandle(response));
						if(resp_text.success){
							//如果assetId不等于空，即assetId有值，且报错信息为空,表示上传成功
							if(resp_text.data.assetId!=''&&resp_text.data.message==''){
								//显示上传成功对话框
								Ext.MessageBox.show({
						           title: 'Success',
						           msg: 'File Upload Successful!',
						           buttons: Ext.MessageBox.OK,
						           icon: Ext.MessageBox.INFO,
						           fn: function(btn){
						           	if(btn=='ok'){
										        //给这三个值赋值
						           		  		asset_ID_template = resp_text.data.assetId;
												asset_ID =  resp_text.data.assetId;
            									asset_ID_o =  resp_text.data.assetId;
												???调用switchTemplate
												switchTemplate();   
						           	}
						           }
						       });
							}
							//否则说明出错，提示报错信息
							else{
								Ext.MessageBox.show({
							           title: 'Error',
							           msg: resp_text.data.message,
							           buttons: Ext.MessageBox.OK,
							           icon: Ext.MessageBox.ERROR
					       		});
							}
						}
						//否则说明出错，提示报错信息
						else{
							Ext.MessageBox.show({
					           title: 'Error',
					           msg: 'File was not formatted correctly. Please use .zip file.',
					           buttons: Ext.MessageBox.OK,
					           icon: Ext.MessageBox.ERROR
					       });
						}
          			},
          			failure: function(response) {
          			//否则说明出错，提示报错信息
          				uploadFinish=true;
             			clearInterval(interval);
             			Ext.MessageBox.show({
					           title: 'Error',
					           msg: 'File was not formatted correctly. Please use .zip file.',
					           buttons: Ext.MessageBox.OK,
					           icon: Ext.MessageBox.ERROR
					    });
          			}
       			});

                
                
                
                
                
                
                var v = this.fileInput.dom.value;				
                this.setValue(v);
                this.fireEvent('fileselected', this, v);
				    
            }
        }); 
    },
    
    
    reset : function(){
        this.fileInput.remove();
		this.createHiddenInput();
        this.createFileInput();		
        this.bindListeners();
        Ext.ux.form.ZipFileUploadField.superclass.reset.call(this);
    },

    

    // private
    onResize : function(w, h){
        Ext.ux.form.ZipFileUploadField.superclass.onResize.call(this, w, h);

        this.wrap.setWidth(w);

        if(!this.buttonOnly){
            var w = this.wrap.getWidth() - this.button.getEl().getWidth() - this.buttonOffset;
            this.el.setWidth(w);
        }
    },

    // private
    onDestroy: function(){
        Ext.ux.form.ZipFileUploadField.superclass.onDestroy.call(this);
        Ext.destroy(this.fileInput, this.button, this.wrap);
    },
    
    onDisable: function(){
        Ext.ux.form.ZipFileUploadField.superclass.onDisable.call(this);
        this.doDisable(true);
    },
    
    onEnable: function(){
        Ext.ux.form.ZipFileUploadField.superclass.onEnable.call(this);
        this.doDisable(false);

    },
    
    // private
    doDisable: function(disabled){
        this.fileInput.dom.disabled = disabled;
        this.button.setDisabled(disabled);
    },


    // private
    preFocus : Ext.emptyFn,

    // private
    alignErrorIcon : function(){
        this.errorIcon.alignTo(this.wrap, 'tl-tr', [2, 0]);
    }

});

Ext.reg('zipfileuploadfield', Ext.ux.form.ZipFileUploadField);

// backwards compat
Ext.form.ZipFileUploadField = Ext.ux.form.ZipFileUploadField;
