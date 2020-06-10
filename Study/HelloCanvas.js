//HelloCanvas.js
var VSHADER_SORCE =
    'attribute vec4 a_Position;\n'+
    'void main(){\n'+
        'gl_Position = a_Position;\n'+
        'gl_PointSize = 10.0;\n'+
        '}\n';
var FSHADER_SORCE = 
    'precision mediump float;\n'+
    'uniform vec4 u_FragColor;\n'+
    'void main(){\n'+
        'gl_FragColor = u_FragColor;\n'+
        '}\n';

function main(){
    var canvas = document.getElementById("WebGL");
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('failed to get that the rendering context for WebGL');
        return;
    }

    if(!initShaders(gl,VSHADER_SORCE,FSHADER_SORCE)){
        console.log('failed to initialze shaders');
        return;
    }

    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if(a_Position<0){
        console.log('failed to get the storage location of a_Position');
        return;
    }

    var u_FragColor = gl.getUniformLocation(gl.program,'u_FragColor');
    if(u_FragColor<0){
        console.log('failed to get the storage location of u_FragColor');
        return;
    }



    canvas.onmousedown = function(ev){
        click(ev,gl,canvas,a_Position,u_FragColor);
    }

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var g_points = [];
    var g_colors = [];
    function click(ev,gl,canvas,a_Position,u_FragColor){
        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect();
        x = ((x-rect.left)-canvas.height/2)/(canvas.height/2);
        y = (canvas.width/2-(y-rect.top))/(canvas.width/2);
        g_points.push([x,y]);
        if(x>=0.0 && y>=0.0){
            g_colors.push([1.0,0.0,0.0,1.0]);
        }else if(x<0.0 && y<0.0){
            g_colors.push([0.0,1.0,0.0,1.0]);
        }else{
            g_colors.push([0.0,0.0,1.0,1.0]);
        }
        gl.clear(gl.COLOR_BUFFER_BIT);
        for(var i = 0 ; i < g_points.length; i++){
            var xy = g_points[i];
            var rgba = g_colors[i];
            gl.vertexAttrib3f(a_Position,xy[0],xy[1],0.0);
            gl.uniform4f(u_FragColor,rgba[0],rgba[1],rgba[2],rgba[3]);
            gl.drawArrays(gl.POINTS,0,1);  
        }
    }
}