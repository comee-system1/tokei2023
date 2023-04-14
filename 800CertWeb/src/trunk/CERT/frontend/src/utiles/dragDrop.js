 var y;
 var x;

 function drag(target) {
   target.style.position = "absolute";
   target.style.top = "10%";
   target.style.left = "30%";
   target.style.width = "500px";
   target.style.height = "500px";
   target.style.zIndex = "100";

   target.onmousedown = function (e) {
     if (e.target.id == "dragAble") {
       y = e.pageY - this.offsetTop;
       x = e.pageX - this.offsetLeft;
       document.onmousemove = mouseMove;
     }
   };
   document.onmouseup = function () {
     document.onmousemove = null;
   };

   function mouseMove(e) {
     var event = e ? e : window.event;
     target.style.top = event.pageY - y + 'px';

     target.style.left = event.pageX - x + 'px';
   }
 }


 export default {
   drag,
 };