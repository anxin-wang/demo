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
	doRequest : function(action, rs, params, reader, callback, scope, arg) {
		params = params || {};
		var result;
		try {
			switch (action) {
				case Ext.data.Api.actions.create :
					this.fireEvent("create", this, action, rs, params, arg);
					break;
				case Ext.data.Api.actions.read :
					var d = this.fn(params, this.data);
					result = reader.readRecords(d);
					break;
				case Ext.data.Api.actions.update :
					this.fireEvent("update", this, action, rs, params, arg);
					break;
				case Ext.data.Api.actions.destroy :
					this.fireEvent("destroy", this, action, rs, params, arg);
					break;
			}

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
