var SIPUcommon = (function (SIPUcommon, $, undefined) {

	var DEBUGER = {
		LAYOUT: {
			STATUS: false,
			KEYEVENT: function (e) {
				if (e.which == 83 && e.shiftKey === true && e.ctrlKey === true) {
					return true;
				} else {
					return false;
				}
			}
		},
		EVENT: {
			STATUS: false,
			KEYEVENT: function (e) {
				if (e.which == 65 && e.shiftKey === true && e.ctrlKey === true) {
					return true;
				} else {
					return false;
				}
			}
		},
		ADDELEMENT: '<q sipu-common="" style="padding : 0; margin : 0 auto; position: absolute; border : 1px dotted red; float: right; font-size:3px; text-align:right; clear:both"></q>',
		ATTRNAME: "sipu-common"

	};

	SIPUcommon.showLayout = function (bool) {
		var i;
		if (bool) {
			var node = document.body.getElementsByTagName("*");
			for (i = 0; i < node.length; i++) {
				if (node[i].innerHTML.length > 0) {
					node[i].innerHTML = DEBUGER.ADDELEMENT + node[i].innerHTML;
				}
			}
			return (function () {
				var node = document.body.getElementsByTagName("*");
				for (i = 0; i < node.length; i++) {
					if (node[i].hasAttribute(DEBUGER.ATTRNAME)) {
						node[i].innerHTML = "ID:" + node[i].parentNode.getAttribute('id') + "	CLASS:" + node[i].parentNode.getAttribute('class');
						node[i].style.width = (node[i].parentNode.offsetWidth - 2).toString() + "px";
						node[i].style.height = (node[i].parentNode.offsetHeight - 2).toString() + "px";
					}
				}
			})();
		} else {
			var el = document.body.getElementsByTagName("*");
			for (i = 0; i < el.length; i++) {
				if (el[i].hasAttribute(DEBUGER.ATTRNAME)) {
					el[i].parentNode.removeChild(el[i]);
				}
			}
		}
	};

	SIPUcommon.showEvent = function (bool) {
		var node = document.body.getElementsByTagName("*");
		var nodeevent;
		if (bool) {
			$.each(node, function (i) {
				node[i].addEventListener("mouseover", function () {
					nodeevent = $._data(node[i], "events");
					if (nodeevent !== undefined) {
						$.each(nodeevent, function (i, ev) {
							$.each(ev, function (j, e) {
								console.log(ev[j]);
								console.log(e.handler);
								if (e.handler !== undefined && e.handler.toString().length > 0) {
									console.log(e.handler);
								}
							});
						});
					}
				}, false);
			});
		} else {
			$.each(node, function (i) {
				nodeevent = $._data(node[i], "events");
				if (nodeevent !== undefined) {
					$.each(nodeevent, function (i, ev) {
						$.each(ev, function (j, e) {
							console.log(e.handler);
							if (e.handler !== undefined && e.handler.toString().length > 0) {
								console.log(e.handler);
							}
						});
					});
				}
			});
		}
	};

	SIPUcommon.showDetail = function (bool) {
		var node = document.body.getElementsByTagName("*");
		var str = '';
		if (bool) {
			$.each(node, function (i) {
				$(this).click(function (e) {
					if (e.ctrlKey) {
						$(this).each(function () {
							str = '';
							$.each(this.attributes, function () {
								// this.attributes is not a plain object, but an array
								// of attribute nodes, which contain both the name and value
								if (this.specified) {
									str = str + this.name + ' :"' + this.value + '"" \n';
								}
							});
							str = str + css($(this));
							console.log($(this).attr());
							//alert(str);
						});
					}
				});
			});
		}
	};



	SIPUcommon.rundebuger = function () {
		document.onkeydown = function (e) {
			if (DEBUGER.LAYOUT.KEYEVENT(e)) {
				if (DEBUGER.LAYOUT.STATUS) {
					DEBUGER.LAYOUT.STATUS = false;
					console.log("DEBUGER is Stop!");
				} else {
					DEBUGER.LAYOUT.STATUS = true;
					console.log("DEBUGER is Run!");
				}
				SIPUcommon.showLayout(DEBUGER.LAYOUT.STATUS);
			}
			if (DEBUGER.EVENT.KEYEVENT(e)) {
				if (DEBUGER.EVENT.STATUS) {
					DEBUGER.EVENT.STATUS = false;
					console.log("EVENT Hide!");
				} else {
					DEBUGER.EVENT.STATUS = true;
					console.log("EVENT Show!");
				}
				SIPUcommon.showEvent(DEBUGER.EVENT.STATUS);
			}
		};
	};

	SIPUcommon.run = function () {
		this.rundebuger();
	};
	return SIPUcommon;
})(window.SIPUcommon || {}, jQuery);
SIPUcommon.run();
