var SIPUcss = (function(SIPUcss, $, undefined) {
  "use strict";
  //master function
  var CSS = {};
  var CSSclass = {};
  var CSSId = {};
  var NODEclass = {};
  var NODEId = {};
  var NotUseCssId = [];
  var NotUseCssClass = [];

  function nodeIdObj(obj) {
    var node = document.getElementsByTagName("*");
    for (var i = 0; i < node.length; i++) {
      if (node[i].hasAttribute("id") || node[i].getAttribute('id') !== null) {
        obj[node[i].getAttribute('id')] = true;
      }
    }
  }

  function getCSS() {
    CSS = document.styleSheets;
    $.each(CSS, function(i, CSSStyleSheet) {
      $.each(CSSStyleSheet.cssRules, function(a, CSSStyleRule) {
        if (CSSStyleRule.selectorText) {
          $.each(CSSStyleRule.selectorText.split(','), function(j, selectorTextItem) {
            if (selectorTextItem.split('')[0] === "#") {
              CSSId[selectorTextItem.split('').slice(1, selectorTextItem.split('').length).join('')] = true;
            }
            if (selectorTextItem.split('')[0] === ".") {
              CSSclass[selectorTextItem] = true;
            }
          });
        }
      });
    });
  }

  function checkCss() {
    nodeIdObj(NODEId);
    $.each(CSSId, function(i, o) {
      if (!NODEId[i]) {
        NotUseCssId.push(i);
      }
    });

    $.each(CSSclass, function(i, o) {
      if ($(o).length === 0) {
        NotUseCssClass.push(i);
      }
    });

    if (NotUseCssClass.length > 0) {
      alert("Not Using Css(class) See the console array");
      console.log(NotUseCssClass);
    }
    if (NotUseCssId.length > 0) {
      alert("Not Using Css(Id) See the console array");
      console.log(NotUseCssId);
    }
  }
  SIPUcss.init = function() {
		getCSS();
		checkCss();
  };
  return SIPUcss;
})(window.SIPUcss || {}, jQuery);
SIPUcss.init();
