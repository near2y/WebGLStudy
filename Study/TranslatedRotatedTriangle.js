var VSHADER_SORCE = 
    'attribute vec4 a_Position;\n'+
    'uniform mat4 u_ModelMatrix;\n'+
    'void main(){\n'+
        'gl_Position = u_ModelMatrix * a_Position ;\n'+
    '}\n';

var FSHADER_SORCE = 
    'void main(){\n'+
        'gl_FragColor = vec4(0.0,0.0,1.0,1.0);\n'+
    '}\n';



var ANGLE_STEP = 45.0;

var ANGLE = 90;
var Tx = 0.5,Ty = 0.3,Tz = 0.0;
function main(){
    var canvas = document.getElementById("WebGL");
    var gl = getWebGLContext(canvas);
    if(!gl)return;

    if(!initShaders(gl,VSHADER_SORCE,FSHADER_SORCE))return;

    var n = initVertexBuffers(gl);
    if(n<0)return;

    
    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    var modelMatrix = new Matrix4();
    modelMatrix.setTranslate(Tx,Ty,Tz);
    modelMatrix.rotate(ANGLE,0,0,1);

    var u_ModelMatrix = gl.getUniformLocation(gl.program,"u_ModelMatrix");
    if(u_ModelMatrix<0)return;

    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);


    var currentAngle = 0.0;

    var tick = function(){
        currentAngle = animate(currentAngle);
        draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix);
        requestAnimationFrame(tick);
    }



    tick();
}

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        0.0,0.25,-0.25,-0.25,0.25,-0.25
    ])

    var n = 3;

    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer)return -1;
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program,'a_Position');
    if(a_Position<0)return -1;

    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(a_Position);

    return n;
}

var g_last = Date.now();
function animate(angle){
    var now = Date.now();
    var delta = now - g_last;
    g_last = now;

    var newAngel = angle + (ANGLE_STEP * delta)/1000.0;
    return newAngel;
}

function draw(gl,n,currentAngle,modelMatrix,u_ModelMatrix){
    // modelMatrix.setRotate(currentAngle,0,0,1);
    modelMatrix.setTranslate(currentAngle/200,0,0);
    gl.uniformMatrix4fv(u_ModelMatrix,false,modelMatrix.elements);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES,0,n);
}