var SIPUcommon = (function (SIPUcommon, $, undefined) {

	var DEBUGER = {
		status: false,
		statusEvent: false,
		addNode: '<q sipu-common="" style="padding : 0; margin : 0 auto; position: absolute; border : 1px dotted red; float: right; font-size:3px; text-align:right; clear:both"></q>',
		attrName: "sipu-common"
	};

	SIPUcommon.showLayout = function (bool) {
		var i;
		if (bool) {
			var node = document.body.getElementsByTagName("*");
			for (i = 0; i < node.length; i++) {
				if (node[i].innerHTML.length > 0) {
					node[i].innerHTML = DEBUGER.addNode + node[i].innerHTML;
				}
			}
			return (function () {
				var node = document.body.getElementsByTagName("*");
				for (i = 0; i < node.length; i++) {
					if (node[i].hasAttribute(DEBUGER.attrName)) {
						node[i].innerHTML = "ID:" + node[i].parentNode.getAttribute('id') + "	CLASS:" + node[i].parentNode.getAttribute('class');
						node[i].style.width = (node[i].parentNode.offsetWidth - 2).toString() + "px";
						node[i].style.height = (node[i].parentNode.offsetHeight - 2).toString() + "px";
					}
				}
			})();
		} else {
			var el = document.body.getElementsByTagName("*");
			for (i = 0; i < el.length; i++) {
				if (el[i].hasAttribute(DEBUGER.attrName)) {
					el[i].parentNode.removeChild(el[i]);
				}
			}
		}
	};

	SIPUcommon.showEvent = function (bool) {
		var node = document.body.getElementsByTagName("*");
		var nodeevent;
		$.each(node, function (i) {
			node[i].addEventListener("mouseover", function () {
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
			}, false);
		});
	};

	SIPUcommon.rundebuger = function (v) {
		document.onkeydown = function (e) {
			if (e.which == 83 && e.shiftKey === true && e.ctrlKey === true) {
				if (DEBUGER.status) {
					DEBUGER.status = false;
					console.log("DEBUGER is Stop!");
				} else {
					DEBUGER.status = true;
					console.log("DEBUGER is Run!");
				}
				SIPUcommon.showLayout(DEBUGER.status);
			}
			if (e.which == 65 && e.shiftKey === true && e.ctrlKey === true) {
				if (DEBUGER.statusEvent) {
					DEBUGER.statusEvent = false;
					console.log("EVENT Hide!");
				} else {
					DEBUGER.statusEvent = true;
					console.log("EVENT Show!");
				}
				SIPUcommon.showEvent(DEBUGER.statusEvent);
			}
		};
	};

	SIPUcommon.run = function () {
		this.rundebuger();
	};
	return SIPUcommon;
})(window.SIPUcommon || {}, jQuery);
SIPUcommon.run();
