//HelloCanvas.js
var VSHADER_SORCE = 
    'attribute vec4 a_Position;\n'+
    'void main(){\n'+
        'gl_Position = a_Position;\n'+
        '}\n';
var FSHADER_SORCE = 
    'void main(){\n'+
        'gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n'+
        '}\n';

function main(){
    var canvas = document.getElementById('WebGL');
    var gl = getWebGLContext(canvas);
    if(!gl){
        console.log('failed to get that the rendering context for WebGL');
        return;
    }

    if(!initShaders(gl,VSHADER_SORCE,FSHADER_SORCE)){
        console.log('faied to initialze shaders');
        return;
    }

    var n = initVertexBuffers(gl);
    if(n<0){
        console.log('Failed to set the positions of the vertices');
        return;
    }

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLE_FAN,0,n);
    
}

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        -0.5,0.5,-0.5,-0.5,0.5,-0.5,0.5,0.5
    ]);

    var n =4;

    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer){
        console.log('Failed to create the buffer object');
        return-1;
    }

    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if(a_Position<0){
        console.log('failed to get the storage location of a_Position');
        return-1;
    }
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}
