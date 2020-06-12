var VSHADER_SORCE = 
    'attribute vec4 a_Position;\n'+
    'attribute float a_PointSize;\n'+
    'void main(){\n'+
        'gl_Position = a_Position;\n'+
        'gl_PointSize = a_PointSize;\n'+
    '}\n';

var FSHADER_SORCE = 
    'void main(){\n'+
        'gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n'+
    '}\n';

function main(){
    var canvas = document.getElementById('WebGL');
    var gl = getWebGLContext(canvas);
    if(!gl)return;

    if(!initShaders(gl,VSHADER_SORCE,FSHADER_SORCE))return;

    var n = initVertexBuffers(gl);
    if(n<0)return;
    
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.POINTS,0,n);

}

function initVertexBuffers(gl){
    var verticesSizes = new Float32Array([
        0.0,0.5,10.0,
        -0.5,-0.5,20.0,
        0.5,-0.5,30,0
    ])

    var n = 3;


    var vertexSizeBuffer = gl.createBuffer();
    if(!vertexSizeBuffer)return -1;
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexSizeBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,verticesSizes,gl.STATIC_DRAW);

    var FSIZE = verticesSizes.BYTES_PER_ELEMENT;

    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if(a_Position<0)return -1;
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,3*FSIZE,0);
    gl.enableVertexAttribArray(a_Position);

    var a_PointSize = gl.getAttribLocation(gl.program,'a_PointSize');
    if(a_PointSize<0)return -1;
    gl.vertexAttribPointer(a_PointSize,1,gl.FLOAT,false,3*FSIZE,2*FSIZE);
    gl.enableVertexAttribArray(a_PointSize);
    return n;
}

