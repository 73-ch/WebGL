var c;
var q = new qtnIV();
var qt = q.identity(q.create());
var z = 20.0;
function mouseMove(e){
    var cw = c.width;
    var ch = c.height;
    var wh = 1 / Math.sqrt(cw * cw + ch * ch);
    var x = e.clientX - c.offsetLeft - cw * 0.5;
    var y = e.clientY - c.offsetTop - ch * 0.5;
    var sq = Math.sqrt(x * x + y * y);
    var r = sq * 2.0 * Math.PI * wh;
    if(sq != 1){
        sq = 1 / sq;
        x *= sq;
        y *= sq;
    }
    q.rotate(r, [y, x, 0.0], qt);
}
window.onload = function(){
	c = document.getElementById('canvas');
	var gl = c.getContext('webgl');
	if(!gl){
		alert('webgl not supported!');
		return;
	}
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.BLEND);
	gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);

	c.addEventListener('mousemove', mouseMove, true);

	var vertexSource = document.getElementById('vs').textContent,
			fragmentSource = document.getElementById('fs').textContent,
			programs = shaderProgram(vertexSource, fragmentSource);
	var attLocation = [];
	attLocation[0] = gl.getAttribLocation(programs, 'position');
	attLocation[1] = gl.getAttribLocation(programs, 'color');
	var attStride = [];
	attStride[0] = 3;
	attStride[1] = 4;

	var cubeSide = 10;
	var cubeData = cubeLattice(cubeSide, [0.3, 1.0, 1.0, 0.3], 6),
			vPositionBuffer = generateVBO(cubeData.p),
			vColorBuffer = generateVBO(cubeData.c),
			boxVboList = [vPositionBuffer, vColorBuffer],
			boxIndexBuffer = generateIBO(cubeData.i);

	var junior_cube = cube(2, [0.2 ,0.2, 0.4, 0.5]),
			j_position_bugger = generateVBO(junior_cube.p),
			j_color_buffer = generateVBO(junior_cube.c),
			j_vbo_list = [j_position_bugger, j_color_buffer],
			j_index_buffer = generateIBO(junior_cube.i);


	var uniLocation = [];
	uniLocation.mvpMatrix = gl.getUniformLocation(programs, 'mvpMatrix');

	var m = new matIV();
	var mMatrix = m.identity(m.create());
	var vMatrix = m.identity(m.create());
	var pMatrix = m.identity(m.create());
	var vpMatrix = m.identity(m.create());
	var mvpMatrix = m.identity(m.create());
	var qMatrix = m.identity(m.create());

	var cameraPosition = [0.0, 0.0, z],
			centerPoint = [0.0, 0.0, 0.0],
			cameraUp = [0.0, 1.0, 0.0];

	var fovy = 45;
	var near = 0.5;
	var far = 100.0;

	var count = 0,
			cameraX = 0,
			cameraY = 0,
			cameraZ = 0;

	var trans = [],
			ran,
			vel_num = [],
			box_num = 10;

	for(var i = 0; i < box_num; i++){
		trans[i] = [0, 0, 0];
		ran = Math.random() * 6 - 3;
		vel_num[i] = (ran + ran / Math.abs(ran))>>0;
	}

	render();

	function render(){
		c.height = window.innerHeight;
		c.width = window.innerWidth;
		gl.viewport(0.0, 0.0, c.width, c.height);
		var aspect = c.width / c.height;
		var radians = (count % 360) * Math.PI / 180;
		m.perspective(fovy, aspect, near, far, pMatrix);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		m.lookAt(cameraPosition, centerPoint, cameraUp, vMatrix);
		m.multiply(pMatrix, vMatrix, vpMatrix);
		q.toMatIV(qt, qMatrix);

		setAttribute(boxVboList, attLocation, attStride, boxIndexBuffer);

		m.identity(mMatrix);
		m.multiply(mMatrix, qMatrix, mMatrix);
		m.multiply(vpMatrix, mMatrix, mvpMatrix);

		gl.uniformMatrix4fv(uniLocation.mvpMatrix, false, mvpMatrix);

		gl.drawElements(gl.LINES, cubeData.i.length, gl.UNSIGNED_SHORT, 0);

		setAttribute(j_vbo_list, attLocation, attStride, j_index_buffer);

		for(var i = 0; i < box_num; i++){
			if(count % 50 == 0){
				for (var g = 0; g < 3; g++) {
					trans[i][g] = Math.round(trans[i][g]);
				};
				ran = Math.random() * 6 - 3;
				num = (ran + ran / Math.abs(ran))>>0;
				if(Math.abs(trans[i][Math.abs(num) - 1] + 2.0 * num / Math.abs(num)) <= 4){
					vel_num[i] = num;
				}else{
					vel_num[i] = 0.0;
				}
			}

			if(vel_num[i] != 0.0){
				trans[i][Math.abs(vel_num[i]) - 1] += vel_num[i] / Math.abs(vel_num[i]) * 0.04;
			};

			if(Math.floor(count % 25) != Math.floor(Math.random() * 10)) {
				m.identity(mMatrix);
				m.multiply(mMatrix, qMatrix, mMatrix);
				m.translate(mMatrix, trans[i], mMatrix);
				m.multiply(vpMatrix, mMatrix, mvpMatrix);
				gl.uniformMatrix4fv(uniLocation.mvpMatrix, false, mvpMatrix);
				gl.drawElements(gl.TRIANGLES, junior_cube.i.length, gl.UNSIGNED_SHORT, 0);
			};
		}

		gl.flush();
		requestAnimationFrame(render);

		count++;
	};

	function shaderProgram(vertexSource, fragmentSource){
		var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
		gl.shaderSource(vertexShader, vertexSource);
		gl.compileShader(vertexShader);
		if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
			alert(gl.getShaderInfoLog(vertexShader) + "in vertexShader");
			return null;
		}
		gl.shaderSource(fragmentShader, fragmentSource);
		gl.compileShader(fragmentShader);
		if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
			alert(gl.getShaderInfoLog(fragmentShader) + "in fragmentShader");
			return null;
		}
		var program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);
		gl.linkProgram(program);
		if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
			alert(gl.getProgramInfoLog(program));
			return null;
		}
		gl.useProgram(program);
		return program;
	}

	function generateVBO(data){
		var vbo = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ARRAY_BUFFER, null);
		return vbo;
	}

	function generateIBO(data){
		var ibo = gl.createBuffer();
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		return ibo;
	}

	function setAttribute(vbo, attL, attS, ibo){
		for(var i in vbo){
			gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);
			gl.enableVertexAttribArray(attL[i]);
			gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
		}
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
	}
};

