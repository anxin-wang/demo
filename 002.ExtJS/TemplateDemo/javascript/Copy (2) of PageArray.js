/*
 * EXT 3.0版本
 */
Ext.data.ArrayProxy = function(d, fn) {
	Ext.data.ArrayProxy.superclass.constructor.call(this, d);
	if (fn)
		this.fn = fn;
	else
		this.fn = function(params, data) {
			var d = params.limit ? data.slice(params.start, params.start
					+ params.limit) : data;
			d.totalsize = data.length;
			return d;
		};
};
Ext.extend(Ext.data.ArrayProxy, Ext.data.MemoryProxy, {
	request : function(action, rs, params, reader, callback, scope, options) {
		params = params || {};
		if ((action == Ext.data.Api.READ) ? this.fireEvent("before" + action,
				this, params, options) : this.fireEvent("beforewrite", this,
				action, params, options) !== false) {
			this.doRequest(action, null, params, reader, null, callback, scope,
					options);
			// this.doRequest.apply(this, arguments);
		} else {
			callback.call(scope || this, null, arg, false);
		}
	},
	doRequest : function(action, rs, params, reader, writer, callback, scope,
			arg) {
		params = params || {};
		var result;
		try {
			var d = this.fn(params, this.data);
			result = reader.readRecords(d);
		} catch (e) {
			this.fireEvent("loadexception", this, arg, null, e);
			callback.call(scope, null, arg, false);
			return;
		}
		callback.call(scope, result, arg, true);
	}
});

Ext.data.PageArrayReader = Ext.extend(Ext.data.ArrayReader, {
	readRecords : function(o) {
		var d = Ext.data.PageArrayReader.superclass.readRecords.call(this, o);
		if (o.totalsize)
			d.totalRecords = o.totalsize;
		return d;
	}
});



/*
Ext.override(Ext.PagingToolbar, {
	bind : function(store) {
		store = Ext.StoreMgr.lookup(store);
		store.on("beforeload", this.beforeLoad, this);
		store.on("load", this.onLoad, this);
		store.on("loadexception", this.onLoadError, this);
		store.on("datachanged", this.refresh, this);
		store.on("add", this.updateInfo, this);
		store.on("remove", this.updateInfo, this);
		store.on("remove", this.updateInfo, this);
		// datachanged、add、remove、clear
		this.store = store;
	},
	refresh : function(ds) {
		this.store = ds;
		// var data=t.data;
		if (this.rendered) {
			var d = this.getFilterPageData(), ap = d.activePage, ps = d.pages;
			if (this.afterTextEl && this.afterTextEl.el)
				this.afterTextEl.el.innerHTML = String.format(
						this.afterPageText, d.pages);
			this.field.dom.value = ap;
			this.first.setDisabled(ap == 1);
			this.prev.setDisabled(ap == 1);
			this.next.setDisabled(ap == ps);
			this.last.setDisabled(ap == ps);
			this.updateInfo();
		}
	},
	getFilterPageData : function() {
		var total = this.store.getCount();
		return {
			total : total,
			activePage : Math.ceil((this.cursor + this.pageSize)
					/ this.pageSize),
			pages : total < this.pageSize ? 1 : Math
					.ceil(total / this.pageSize)
		};
	}
})
*/