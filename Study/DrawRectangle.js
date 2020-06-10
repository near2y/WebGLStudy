//DrawRectangle.js
function main() {
    var canvas = document.getElementById("example");
    if(!canvas){
        console.log("Failed to retrieve the <canvas> element");
        return;
    }

    var ctx = canvas.getContext("2d");

    ctx.fillStyle = 'rgba(0,0,255,0.1)';
    ctx.fillRect(0,0,canvas.clientWidth,canvas.clientHeight);    

    ctx.fillStyle = 'rgba(255,0,0,1)';
    ctx.fillRect(50,50,100,100);
}