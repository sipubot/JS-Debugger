var SIPUcommon = (function(SIPUcommon, $, undefined) {
	Object.prototype.getType = function () {
		var ObjType = {
			Value : ""
			,Type : ""
			,StructValue : ""
		};

		ObjType.Type = this.constructor.name;
		ObjType.Value = this.valueOf();
		ObjType.StructValue = this;
		if (ObjType.Type === "Function") {
			ObjType.Value = this.apply();
		}
		if (arguments[0] === "log") {
			console.log(ObjType.Type);
			console.log(ObjType.Value);
			console.log(ObjType.StructValue);
			console.log();
		}
		return ObjType;
	};

	String.prototype.getNode = function () {
		var ObjNode = {
			CssName : ""
			,NodeName : ""
		};
		if (this.constructor.name === "String") {
			if (this.valueOf().split("#").length > 1 || this.valueOf().split(".").length > 1 ) {
				ObjNode.NodeName = this.valueOf().replace("#","").replace("."," ");
				if (ObjNode.NodeName[0] === " ") { ObjNode.NodeName[0] = ""; }
				ObjNode.NodeName = ObjNode.NodeName.concat();
				ObjNode.CssName = this.valueOf();
			} else {
				ObjNode.NodeName = this.valueOf();
				console.log();
				if ($(".".concat(this.replace(" ","."))).length > 0) {
					ObjNode.CssName = ".".concat(this.replace(" ","."));
				}
				if ($("#".concat(this)).length > 0) {
					ObjNode.CssName = "#".concat(this);
				}
			}
		} else {
			ObjNode = this.valueOf();
			console.log("not Node!");
			console.log(ObjNode);
		}
		return ObjNode;
	};

	String.prototype.getTag = function () {
		var ObjTag;
		var nodeObj = this.getNode();

		if  (nodeObj.CssName.split("#").length > 1 ) {
			var node = document.getElementById(this.getNode().NodeName);
			ObjTag = node.tagName;
		}
		if  ((this.getNode().CssName).split(".").length > 1 ) {
			ObjTag = document.getElementsByClassName(this.getNode().NodeName)[0].tagName;
		}
		if (arguments[0] === "log") {
			console.log(ObjTag);
		}
		return ObjTag;
	};

	String.prototype.getTrigger = function () {
		var ObjTrigger = {}, node, event, proto, logging = false;
		var nodeObj = this.getNode();
		if (arguments[0] === "log") {logging = true;};
		if  (nodeObj.CssName.split("#").length > 1 ) {
			node = document.getElementById(this.getNode().NodeName);
			event = $._data(node,"events");
		}
		if  ((this.getNode().CssName).split(".").length > 1 ) {
			node = document.getElementsByClassName(this.getNode().NodeName)[0];
			event = $._data(node,"events");
		}
		$.each(event, function (i, ev) {
			$.each(ev, function (j, e) {
				ObjTrigger[i] = [];
				if (logging) {
					console.log(i);
				}
				if  (e.handler != undefined && e.handler.toString().length > 0 ) {
					ObjTrigger[i].push(e.handler.toString());
					if (logging) {
						console.log(e.handler);
					}
				}
			});
		});
		console.log(ObjTrigger);
		return ObjTrigger;
	};

	var DEBUGER = {
		status : false,
		style : {
			addCss : ";border: 1px dotted red;",
			createCss : "border: 1px dotted red;",
			name : ""
		},
		attrName : "sipu-common"
	};

	SIPUcommon.showLayout = function (bool) {
		var node = document.body.getElementsByTagName("*");
		var style, i;
		if (bool) {
			var p = document.createElement("p");
			p.setAttribute("style",DEBUGER.style.name);
			p.setAttribute(DEBUGER.attrName,"");
			for (i = 0; i < node.length ; i++ ) {
				if (node[i].getAttribute("style")) {
					style = node[i].getAttribute("style");
					style = style + DEBUGER.style.addCss;
				} else {
					style = DEBUGER.style.createCss;
				}
				node[i].setAttribute("style", style);
				node[i].appendChild(p);
			}
		} else {
			for (i = 0; i < node.length ; i++ ) {
				if (node[i].getAttribute("style") === DEBUGER.style.createCss) {
					style = "";
				} else {
					style = node[i].getAttribute("style");
					style = style.replace(DEBUGER.style.addCss,"");
				}
				if (node[i].getAttribute(DEBUGER.attrName)) {
						node[i].remove();
				}
				node[i].setAttribute("style", style);
			}
		}
	};
	SIPUcommon.showEvent = function (bool) {

	};

	SIPUcommon.rundebuger = function (v) {
		document.onkeydown = function (e) {
			if(e.which == 83 && e.shiftKey === true && e.ctrlKey === true) {
				if (DEBUGER.status) {
					DEBUGER.status = false;
					console.log("DEBUGER is Stop!");
					SIPUcommon.showLayout(false);
					SIPUcommon.showEvent(false);
				} else {
					DEBUGER.status = true;
					console.log("DEBUGER is Run!");
					SIPUcommon.showLayout(true);
					SIPUcommon.showEvent(true);
				}
			}
		};
	};

  SIPUcommon.run = function() {
		this.rundebuger();
	};
    return SIPUcommon;
})(window.SIPUcommon || {}, jQuery);
SIPUcommon.run();
