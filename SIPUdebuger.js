var SIPUcommon = (function (SIPUcommon, $, undefined) {

	var DEBUGER = {
		NONLINE :{
			CHECK : function () {
					if (window.location.protocol === "http:" || window.location.protocol === "https:") {
						return false;
					} else {
						return true;
					}
			}
		},
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

	function logs(val) {
		if (val === undefined) {
			console.log("");
		} else {
			console.log(val);
		}
	}

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
								logs(ev[j]);
								logs(e.handler);
								if (e.handler !== undefined && e.handler.toString().length > 0) {
									logs(e.handler);
								}
							});
						});
					}
				}, false);
			});
		} else {}
	};

	function loggingAttr(nodes, tags) {
		//Dom list ,  tagname list  ex> nodes = document.getElementsByTagName('a'); , tags = ["name","href"]
		if (nodes.length < 1 || tags.length < 1 || nodes === undefined || tags === undefined) {
			return false;
		}
		var str = "";
		var i = 0,
			j = 0;
		for (i = 0; i < nodes.length; i++) {
			for (j = 0; j < tags.length; j++) {
				if (nodes[i].hasAttribute(tags[j])) {
					str = str + tags[j] + " : " + nodes[i].getAttribute(tags[j]) + "		";
				}
				if (str.length > 0) {logs(str);}
			}
			str = "";
		}
		logs();
	}

	function checkHtml() {
			var i = 0;
			if (document.title.length < 1) {
				alert("check your page title!");
			} else {
				logs("title : " + document.title);
			}
			loggingAttr(document.getElementsByTagName('link'), ["rel", "type", "href"]);
			loggingAttr(document.getElementsByTagName('script'), ["src"]);
			loggingAttr(document.getElementsByTagName('meta'), ["name", "content"]);
			loggingAttr(document.getElementsByTagName('meta'), ["property", "content"]);
			loggingAttr(document.getElementsByTagName('a'), ["id", "href"]);
			loggingAttr(document.getElementsByTagName('a'), ["class", "href"]);
			loggingAttr(document.getElementsByTagName('*'), ["data-href"]);
	}

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
		if (DEBUGER.NONLINE.CHECK) {
			checkHtml();
			this.rundebuger();
		}
	};
	return SIPUcommon;
})(window.SIPUcommon || {}, jQuery);
SIPUcommon.run();
