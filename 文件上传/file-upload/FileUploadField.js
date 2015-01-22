/*!
 * Ext JS Library 3.2.2
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
var isbindListeners=false;
var interval;
var uploadFinish=false;
Ext.ns('Ext.ux.form');

/**
 * @class Ext.ux.form.FileUploadField
 * @extends Ext.form.TextField
 * Creates a file upload field.
 * @xtype fileuploadfield
 */
Ext.ux.form.FileUploadField = Ext.extend(Ext.form.TextField,  {
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
        Ext.ux.form.FileUploadField.superclass.initComponent.call(this);

        this.addEvents(
            /**
             * @event fileselected
             * Fires when the underlying file input field's value has changed from the user
             * selecting a new file from the system file selection dialog.
             * @param {Ext.ux.form.FileUploadField} this
             * @param {String} value The file value returned by the underlying file input field
             */
            'fileselected'
        );
    },

    // private
    onRender : function(ct, position){
        Ext.ux.form.FileUploadField.superclass.onRender.call(this, ct, position);

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
    
    bindListeners: function(){
		var form=this.form;
		var params=this.params;
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
				//var i=0;
				//var sum=2;
				//show messagebox,start inteval
				if(!isbindListeners){
					isbindListeners=true;
					Ext.Ajax.on('beforerequest', function(conn,options ){	
					    var progress_key=hiddenInput.dom.value;
						if(options.params.data==params){
							uploadFinish=false;
							//var t=setTimeout(function(){
								Ext.MessageBox.show({
								title: 'Please wait',
								msg: 'Uploading your file...',
								progressText: '',
								width:300,
								progress:true,
								closable:false
							});						
						  // },100);
								var time=0;
								var nowPercent=0;
								interval=setInterval(function(){
								time++;
								if(nowPercent==1){
									clearInterval(interval);
									return;
								}
								if(uploadFinish){
									clearInterval(interval);
									return;
								}else{
							   		Ext.Ajax.request({
										url:'../api/extjs',
										params:{
											data: Ext.encode({
			                                            className: 'Class_Internal_List_UploadList',
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
												nowPercent=percent;
												if(uploadFinish||resp_text.data.per==100||nowPercent==1){
													clearInterval(interval);
												}else{
													Ext.MessageBox.updateProgress(percent,Math.round(100*percent)+'% completed');
												}
											}else{
												nowPercent=nowPercent+(Math.round(5*Math.random()))/100
												if(nowPercent>1){
													nowPercent=1
												}
												Ext.MessageBox.updateProgress(nowPercent,Math.round(100*nowPercent)+'% completed');
											}
											
										}		
									})									
								}

								},50);
						
						   
						}
					}, this);
				}

				//submit file
				
       			Ext.Ajax.request({
          			url: '../api/extjs',
          			method:'POST',
					params: {
                            data: params
           			},
          			form:Ext.getCmp(form).getForm().el.dom,
          			isUpload:true,
          			headers:'text/html',  
          			success: function(response) {
           				uploadFinish=true;
						clearInterval(interval);
						Ext.MessageBox.updateProgress(1,100+'% completed');
						fileInput.dom.value="";
						var resp_text = Ext.decode(responseHandle(response));						
						if(resp_text.success){
							if(Ext.isEmpty(resp_text.data.reason)){
								Ext.MessageBox.show({
						           title: 'Success',
						           msg: 'File Upload Successful!',
						           buttons: Ext.MessageBox.OK,
						           icon: Ext.MessageBox.INFO
						       });
						   		t.hiddenValue=resp_text.data;
							}else{
								Ext.MessageBox.show({
						           title: 'Error',
						           msg: resp_text.data.reason,
						           buttons: Ext.MessageBox.OK,
						           icon: Ext.MessageBox.ERROR
						       });
							   t.hiddenValue='';								
							} 
//								if(resp_text.data.reason=='format error'){
//								Ext.MessageBox.show({
//						           title: 'Error',
//						           msg: 'File was not formatted correctly. Please use CSV file format.',
//						           buttons: Ext.MessageBox.OK,
//						           icon: Ext.MessageBox.ERROR
//						       });
//							   t.hiddenValue='';							  
//							}else if(resp_text.data.reason=='size error'){
//								Ext.MessageBox.show({
//						           title: 'Error',
//						           msg: 'File was too large. Please upload file which fi.',
//						           buttons: Ext.MessageBox.OK,
//						           icon: Ext.MessageBox.ERROR
//						       });
//							   t.hiddenValue='';							    
//							}		
						}else{
							Ext.MessageBox.show({
					           title: 'Error',
					           msg: 'File was not formatted correctly. Please use CSV file format.',
					           buttons: Ext.MessageBox.OK,
					           icon: Ext.MessageBox.ERROR
					       });
						}
          			},
          			failure: function(response) {
             			console.log('server-side failure with status code ' + response.status);
          			}
       			});
                var v = this.fileInput.dom.value;				
                this.setValue(v);
                this.fireEvent('fileselected', this, v);
				    
            }
        }); 
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
    reset : function(){
        this.fileInput.remove();
		this.createHiddenInput();
        this.createFileInput();		
        this.bindListeners();
        Ext.ux.form.FileUploadField.superclass.reset.call(this);
    },

    // private
    getFileInputId: function(){
        return this.id + '-file';
    },

    // private
    onResize : function(w, h){
        Ext.ux.form.FileUploadField.superclass.onResize.call(this, w, h);

        this.wrap.setWidth(w);

        if(!this.buttonOnly){
            var w = this.wrap.getWidth() - this.button.getEl().getWidth() - this.buttonOffset;
            this.el.setWidth(w);
        }
    },

    // private
    onDestroy: function(){
        Ext.ux.form.FileUploadField.superclass.onDestroy.call(this);
        Ext.destroy(this.fileInput, this.button, this.wrap);
    },
    
    onDisable: function(){
        Ext.ux.form.FileUploadField.superclass.onDisable.call(this);
        this.doDisable(true);
    },
    
    onEnable: function(){
        Ext.ux.form.FileUploadField.superclass.onEnable.call(this);
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

Ext.reg('fileuploadfield', Ext.ux.form.FileUploadField);

// backwards compat
Ext.form.FileUploadField = Ext.ux.form.FileUploadField;
