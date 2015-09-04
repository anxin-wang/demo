/**
 * @class Ext.tree.DefaultSelectionModel
 * @extends Ext.util.Observable The default single selection for a TreePanel.
 */
Ext.TabSelectionModel = function(config) {

	this.selNode = null;
	this.selTab = null;
	this.addEvents("selectionchange", "beforeselect");
	Ext.apply(this, config);
	Ext.tree.DefaultSelectionModel.superclass.constructor.call(this);
};

Ext.extend(Ext.TabSelectionModel, Ext.util.Observable, {
	init : function(tree) {
		this.tree = tree;
		Ext.getBody().on("keydown", this.onKeyDown, this);
		tree.on("click", this.onNodeClick, this);
	},

	onNodeClick : function(node, e) {
		this.select(node);
	},

	/**
	 * Select a node.
	 * 
	 * @param {TreeNode}
	 *            node The node to select
	 * @return {TreeNode} The selected node
	 */
	select : function(node) {
		var last = this.selNode;
		if (last != node
				&& this.fireEvent('beforeselect', this, node, last) !== false) {
			if (last) {
				last.ui.onSelectedChange(false);
			}
			this.selNode = node;
			// this.selTab = this.tree.tabPanel;
		node.ui.onSelectedChange(true);
		this.fireEvent("selectionchange", this, node, last);
	}
	return node;
},

unselect : function(node) {
	if (this.selNode == node) {
		this.clearSelections();
	}
},
clearSelections : function() {
	var n = this.selNode;
	if (n) {
		n.ui.onSelectedChange(false);
		this.selNode = null;
		this.fireEvent("selectionchange", this, null);
	}
	return n;
},

getSelectedNode : function() {
	return this.selNode;
},

isSelected : function(node) {
	return this.selNode == node;
},
selectPrevious : function() {
	// alert('aa');
		var s = this.selNode || this.lastSelNode;
		if (!s) {
			return null;
		}
		// alert('aa');
		var ps = s.previousSibling;
		if (ps) {
			// alert('aa1');
			if (!ps.isExpanded() || ps.childNodes.length < 1) {
				return this.select(ps);
			} else {
				var lc = ps.lastChild;
				while (lc && lc.isExpanded() && lc.childNodes.length > 0) {
					lc = lc.lastChild;
				}
				return this.select(lc);
			}
		} else if (s.parentNode
				&& (this.tree.rootVisible || !s.parentNode.isRoot)) {
			// alert('aa2');
			return this.select(s.parentNode);
		} else if (s.parentNode && s.parentNode.isRoot
				&& !s.getOwnerTree().rootVisible && !s.previousSibling
				&& !this.tabhead) {
			// alert('aa3');
			this.tree.tabPanel.collapse(true);			
			this.tabhead = true;

		} else if (this.tabhead === true) {
			// alert('aa4');
			// if (this.selTab && !this.selNode)
			var pretree = s.getOwnerTree().tabItems
					.get((s.getOwnerTree().tabNum - 1)
							% s.getOwnerTree().tabItems.length);
			if (pretree)
				pretree.expand(true);
			
		}

		return null;
	},

	/**
	 * Selects the node above the selected node in the tree, intelligently
	 * walking the nodes
	 * 
	 * @return TreeNode The new selection
	 */
	selectNext : function() {
		// alert('aa');

		var s = this.selNode || this.lastSelNode;
		if (!s) {
			return null;
		}
		if (s.firstChild && s.isExpanded()) {
			// alert('aa2');
			return this.select(s.firstChild);
		} else if (s.nextSibling) {
			// alert('aa3');
			return this.select(s.nextSibling);
		} else if (s.parentNode) {
			var newS = null;
			s.parentNode.bubble(function() {
				if (this.nextSibling) {
					// alert('aa4');
					newS = this.getOwnerTree().selModel
							.select(this.nextSibling);
					return false;
				} else {
					// alert('aa5');
					this.getOwnerTree().tabPanel.collapse(true);

					var len = this.getOwnerTree().tabItems.length;
					var tabnub = this.getOwnerTree().tabNum;
					var is1 = this.getOwnerTree().tabItems;
					var nexttree = is1.get((tabnub + 1) % (len));
					nexttree.expand(true);
				}
			});
			return newS;
		}
		return null;
	},

	onKeyDown : function(e) {
		// alert('xx');
		var s = this.selNode || this.lastSelNode;
		// undesirable, but required
		var sm = this;
		if (!s) {
			return;
		}
		var k = e.getKey();
		switch (k) {
			case e.DOWN :
				e.stopEvent();
				this.selectNext();
				break;
			case e.UP :
				// alert('aa');
				e.stopEvent();
				this.selectPrevious();
				break;
			case e.RIGHT :
				e.preventDefault();
				if (s.hasChildNodes()) {
					if (!s.isExpanded()) {
						s.expand();
					} else if (s.firstChild) {
						this.select(s.firstChild, e);
					}
				}
				break;
			case e.LEFT :
				e.preventDefault();
				if (s.hasChildNodes() && s.isExpanded()) {
					s.collapse();
				} else if (s.parentNode
						&& (this.tree.rootVisible || s.parentNode != this.tree
								.getRootNode())) {
					this.select(s.parentNode, e);
				}
				break;
		};
	}
});
