jQuery(document).ready(function() {
    var redom=Math.floor(Math.random()*3);
    var path = "";
    if(redom==0){
        path ="/js/jing.js";
    } if(redom==1){
        path ="/js/xin.js";
    }if(redom==2){
        path ="/js/heng.js";
    }
    var head = document.getElementsByTagName('head')[0];
    var script = document.createElement('script');
    script.src = path;
    script.type = 'text/javascript';
    head.appendChild(script);
   });
