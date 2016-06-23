//　save index2.js
// 拡散のみ
// num: 1

var c;
var q = new qtnIV();
var qt = q.identity(q.create());

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
	c.height = window.innerHeight;
	c.width = window.innerWidth;
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

	var cubeSide = 11;
	var cubeData = cubeLine(cubeSide, [0.3, 1.0, 1.0, 1.0]),
			vPositionBuffer = generateVBO(cubeData.p),
			vColorBuffer = generateVBO(cubeData.c),
			boxVboList = [vPositionBuffer, vColorBuffer],
			boxIndexBuffer = generateIBO(cubeData.i);

	var sphereRadius = 0.5,
			sphereDiameter = sphereRadius * 2,
			set = sphereDiameter * 2,
			sideParticles = (cubeSide - sphereDiameter) / sphereDiameter / 2;
			particles = sideParticles * sideParticles * sideParticles,
			sphereData = sphere(16, 16, sphereRadius, [0.2, 0.2, 0.2, 0.5]),
			vPositionBuffer = generateVBO(sphereData.p),
			vColorBuffer = generateVBO(sphereData.c),
			particleVboList = [vPositionBuffer, vColorBuffer];
			particleIndexBuffer = generateIBO(sphereData.i);

	var uniLocation = [];
	uniLocation.mvpMatrix = gl.getUniformLocation(programs, 'mvpMatrix');
	uniLocation.direction = gl.getUniformLocation(programs, 'direction');
	uniLocation.count = gl.getUniformLocation(programs, 'count')

	var m = new matIV();
	var mMatrix = m.identity(m.create());
	var vMatrix = m.identity(m.create());
	var pMatrix = m.identity(m.create());
	var vpMatrix = m.identity(m.create());
	var mvpMatrix = m.identity(m.create());
	var qMatrix = m.identity(m.create());

	var cameraPosition = [0.0, 0.0, 20.0];
	var centerPoint = [0.0, 0.0, 0.0];
	var cameraUp = [0.0, 1.0, 0.0];
	m.lookAt(cameraPosition, centerPoint, cameraUp, vMatrix);

	var fovy = 45;
	var aspect = canvas.width / canvas.height;
	var near = 0.5;
	var far = 1000.0;
	m.perspective(fovy, aspect, near, far, pMatrix);

	m.multiply(pMatrix, vMatrix, vpMatrix);

	var count = 0,
			direction = [];

	for(var d = 0; d < particles; d++){
		direction[d] = [Math.random() * 2 -1, Math.random() * 2 -1, Math.random() * 2 -1];
	};
	render();

	function render(){
		count++;
		var radians = (count % 360) * Math.PI / 180;
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		q.toMatIV(qt, qMatrix);

		setAttribute(boxVboList, attLocation, attStride, boxIndexBuffer);

		m.identity(mMatrix);
		m.multiply(mMatrix, qMatrix, mMatrix);
		m.multiply(vpMatrix, mMatrix, mvpMatrix);

		gl.uniformMatrix4fv(uniLocation.mvpMatrix, false, mvpMatrix);
		gl.uniform3fv(uniLocation.direction, [0.0, 0.0, 0.0]);
		gl.uniform1i(uniLocation.count, 0);

		gl.drawElements(gl.LINES, cubeData.i.length, gl.UNSIGNED_SHORT, 0);

		setAttribute(particleVboList, attLocation, attStride,particleIndexBuffer);

		for (var i = 0; i < particles; i++) {
			var vec = [(i % sideParticles - sideParticles / 2) * set + sphereDiameter,(Math.floor(i / sideParticles) % sideParticles - sideParticles / 2) * set + sphereDiameter,(Math.floor(i / sideParticles / sideParticles) - sideParticles / 2) * set + sphereDiameter];
			m.identity(mMatrix);
			m.multiply(mMatrix, qMatrix, mMatrix);
			m.translate(mMatrix, vec, mMatrix);
			m.multiply(vpMatrix, mMatrix, mvpMatrix);
			gl.uniformMatrix4fv(uniLocation.mvpMatrix, false, mvpMatrix);
			gl.uniform3fv(uniLocation.direction, direction[i]);
			gl.uniform1i(uniLocation.count, count / 10);

			gl.drawElements(gl.TRIANGLES, sphereData.i.length, gl.UNSIGNED_SHORT, 0);
		};

		gl.flush();
		requestAnimationFrame(render);
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
	
	function generateTexture(source){
	
		var img = new Image();

	
		img.onload = function(){
		
			texture = gl.createTexture();

		
			gl.bindTexture(gl.TEXTURE_2D, texture);

		
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

		
			gl.generateMipmap(gl.TEXTURE_2D);

		
			gl.bindTexture(gl.TEXTURE_2D, null);
		};

	
		img.src = source;
	}
};

