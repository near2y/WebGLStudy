var VSHADER_SORCE = 
    'attribute vec4 a_Position;\n'+
    'uniform mat4 u_xformMatrix;\n'+
    'void main(){\n'+
        'gl_Position = u_xformMatrix * a_Position;'+
    '}\n';

var FSHADER_SORCE =
    'void main(){\n'+
        'gl_FragColor = vec4(1.0,0.0,0.0,1.0);\n'+
    '}\n';


var ANGLE = 80.0;
var Tx = 0.2,Ty=0.40,Tz = 0.0;
var Scale = 1.5;
function main(){
    var canvas = document.getElementById('WebGL');
    var gl = getWebGLContext(canvas);
    if(!gl)return;

    if(!initShaders(gl,VSHADER_SORCE,FSHADER_SORCE))return;

    var n = initVertexBuffers(gl);
    if(n<0)return;

    // var radian = Math.PI * ANGLE/180.0;
    // var cosB = Math.cos(radian);
    // var sinB = Math.sin(radian);

    // var xformMatrix = new Float32Array([
    //     cosB,sinB,0.0,0.0,
    //     -sinB,cosB,0.0,0.0,
    //     0.0,0.0,1.0,0.0,
    //     0.0,0.0,0.0,1.0
    // ])

    var xformMatrix = new Matrix4();
    xformMatrix.rotate(ANGLE,0,1,0);
    // xformMatrix.setTranslate(Tx,Ty,Tz);
    // xformMatrix.setScale(Scale,Scale,Scale);

    // var xformMatrix = new Float32Array([
    //     1.0,0.0,0.0,0.0,
    //     0.0,1.0,0.0,0.0,
    //     0.0,0.0,1.0,0.0,
    //     Tx,Ty,Tz,1.0
    // ])

    // var xformMatrix = new Float32Array([
    //     Scale,0.0,0.0,0.0,
    //     0.0,Scale,0.0,0.0,
    //     0.0,0.0,Scale,0.0,
    //     0.0,0.0,0.0,1.0
    // ])

    var u_xformMatrix = gl.getUniformLocation(gl.program,'u_xformMatrix');
    if(u_xformMatrix<0){
        console.log('failed to get that the storage of u_xformMatix');
        return;
    }

    gl.uniformMatrix4fv(u_xformMatrix,false,xformMatrix.elements);

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.drawArrays(gl.TRIANGLES,0,n);
} 

function initVertexBuffers(gl){
    var vertices = new Float32Array([
        0.0,0.5,-0.5,-0.5,0.5,-0.5
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