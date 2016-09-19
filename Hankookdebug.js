var SIPUdebugHankook = (function (SIPUdebugHankook, undefined) {
  var METALIST = [
    {key:"property",value:"og:title",exist:false},
    {key:"name",value:"twitter:title",exist:false},
    {key:"property",value:"og:url",exist:false},
    {key:"name",value:"twitter:url",exist:false},
    {key:"property",value:"og:image",exist:false},
    {key:"name",value:"twitter:image:src",exist:false},
    {key:"name",value:"description",exist:false},
    {key:"name",value:"viewport",exist:false}
  ];

  function checkMETA() {
    var head = document.getElementsByTagName('head');
    var meta = head[0].getElementsByTagName('meta');
    METALIST.map(function (item) {
      try {
        for (var i = 0; i < meta.length; i++) {
          if (meta[i].getAttribute(item.key) === item.value) {
            console.log(item.value + " - " + meta[i].getAttribute("content"));
            item.exist = true;
          }
        }
      } catch(e) {
        console.log(e);
      }
    });
    METALIST.map(function (item) {
      if(!item.exist) {
        console.log("can't find meta - " + item.value);
      }
    });

  }

  function checkEVENTNODE() {
    var all = document.getElementsByTagName("*");
    for (var i=0, max=all.length; i < max; i++) {
      if (all[i].getAttribute('sipujs') !== null) {
        console.log(all[i].getAttribute('sipujs'));
      }
    }
  }

  SIPUdebugHankook.run = function () {
    checkMETA();
    checkEVENTNODE();
  };
  return SIPUdebugHankook;
})(window.SIPUdebugHankook || {});
SIPUdebugHankook.run();
