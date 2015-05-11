var SIPUcommon = (function(SIPUcommon, $, undefined) {
	var Set = {
		Value : {

		} 
		,Node : {

		}
		,DataSet : {

		}
	};
	Object.prototype.getType = function () {
		var Obj = {
			Value : ""
			,Type : ""
			,StructValue : ""
		};	

		Obj.Type = this.constructor.name;
		Obj.Value = this.valueOf();
		Obj.StructValue = this;
		if (Obj.Type === "Function") {
			Obj.Value = this.apply();
		}
		if (arguments[0] === "log") {
			console.log(Obj.Type);
			console.log(Obj.Value);
			console.log(Obj.StructValue);
			console.log();
		}
		return Obj;
	}
	Object.prototype.getNode = function () {
		var Obj = {
			CssName : ""
			,NodeName : ""
		};	
		if (this.constructor.name === "String") {
			if (this.valueOf().split("#").length > 1 || this.valueOf().split(".").length > 1 ) {
				Obj.NodeName = this.valueOf().replace("#","").replace("."," ");
				if (Obj.NodeName[0] === " ") { Obj.NodeName[0] = ""; }
				Obj.NodeName = Obj.NodeName.concat();
				Obj.CssName = this.valueOf();
			} else {
				Obj.NodeName = this.valueOf();
				console.log();
				if ($(".".concat(this.replace(" ","."))).length > 0) {
					Obj.CssName = ".".concat(this.replace(" ","."));
				}
				if ($("#".concat(this)).length > 0) {
					Obj.CssName = "#".concat(this);
				}
			}
		} else {
			Obj = this.valueOf();
			console.log("not Node!");
			console.log(Obj);
		}
		return Obj;
	};
	Object.prototype.getTag = function () {
		var Obj = {
			TagName : ""
		};	
		if (this.constructor.name === "String") {
			if (this.valueOf().split("#").length > 1 || this.valueOf().split(".").length > 1 ) {
				Obj.NodeName = this.valueOf().replace("#","").replace("."," ");
				if (Obj.NodeName[0] === " ") { Obj.NodeName[0] = ""; }
				Obj.NodeName = Obj.NodeName.concat();
				Obj.CssName = this.valueOf();
			} else {
				Obj.NodeName = this.valueOf();
				console.log();
				if ($(".".concat(this.replace(" ","."))).length > 0) {
					Obj.CssName = ".".concat(this.replace(" ","."));
				}
				if ($("#".concat(this)).length > 0) {
					Obj.CssName = "#".concat(this);
				}
			}
		} else {
			Obj = this.valueOf();
			console.log("not Node!");
			console.log(Obj);
		}
		if ( $(Obj.CssName).length < 1 ) {
			Obj = this.valueOf();
			console.log("not Node!");
			console.log(Obj);
		}
		return Obj;
	};
	function getNodeList (AttrName) {
		var temp = [];
		var node = document.body.getElementsByTagName("*");
		$(node).each(function (index) {
			if (node[index].hasAttribute(AttrName)) {
				temp.push(node[index]);
			}
		});
		return temp;
	}


    SIPUcommon.run = function() {
		$(document).ready(function () {

			var node = getNodeList("HK-data");
    		console.log(node);
		});
	};
    return SIPUcommon;
})(window.SIPUcommon || {}, jQuery);

SIPUcommon.run();
			"wefwe".getTag();
