
var c;
var q = new qtnIV();
var qtx = q.identity(q.create());
var qty = q.identity(q.create());
var qtz = q.identity(q.create());
var center_x = 0.0;
var center_y = 0.0;
var center_z = 0.0;
var z = 20.0;
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

	document.addEventListener('keydown', keyDown, true);

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
	var cubeData = cubeLine(cubeSide, [0.3, 1.0, 1.0, 0.5]),
			vPositionBuffer = generateVBO(cubeData.p),
			vColorBuffer = generateVBO(cubeData.c),
			boxVboList = [vPositionBuffer, vColorBuffer],
			boxIndexBuffer = generateIBO(cubeData.i);

	var lines = 10;
			linePositionBuffer = [],
			lineColorBuffer = [],
			lineIndex = [],
			lineIndexBuffer = [];

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
	var qxMatrix = m.identity(m.create());
	var qyMatrix = m.identity(m.create());
	var qzMatrix = m.identity(m.create());

	var cameraPosition = [0.0, 0.0, z];
	var centerPoint = [center_x, center_y, center_z];  
	var cameraUp = [0.0, 1.0, 0.0];

	var fovy = 45;                            
	var near = 0.5;                           
	var far = 1000.0;                            

	var count = 0,
			cameraX = 0,
			cameraY = 0,
			cameraZ = 0;

	render();

	function render(){
		c.height = window.innerHeight;
		c.width = window.innerWidth;
		gl.viewport(0.0, 0.0, c.width, c.height);
		var aspect = c.width / c.height;
		m.perspective(fovy, aspect, near, far, pMatrix);
		count++;
		var radians = (count % 360) * Math.PI / 180;
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		if(Math.floor((count % 150) / 50) == 0){
			cameraX += Math.PI / 100;
		}else if(Math.floor(count % 150 / 50) == 1){
			cameraY += Math.PI / 100;
		}else if(Math.floor(count % 150 / 50) == 2){
			cameraZ += Math.PI / 100;
		};
		q.rotate(cameraX, [1.0, 0.0, 0.0], qtx);
		q.rotate(cameraY, [0.0, 1.0, 0.0], qty);
		q.rotate(cameraZ, [0.0, 0.0, 1.0], qtz);
		q.toMatIV(qtx, qxMatrix);
		q.toMatIV(qty, qyMatrix);
		q.toMatIV(qtz, qzMatrix);
		m.lookAt(cameraPosition, centerPoint, cameraUp, vMatrix);
		m.multiply(pMatrix, vMatrix, vpMatrix);
		if(count % 100 == 1){
			for(var i = 0; i < lines; i++){
				lineData = line(50, [Math.random(), Math.random(), Math.random(), 0.8]);
				linePositionBuffer[i] = generateVBO(lineData.p);
				lineColorBuffer[i] = generateVBO(lineData.c);
				lineIndex = lineData.i;
				lineIndexBuffer[i] = generateIBO(lineIndex);
			};
		};
		if(Math.floor(count % 100 / 10) == 9){
		}else{
			for(i = 0; i < lines; i++){
				var lineVboList = [linePositionBuffer[i], lineColorBuffer[i]];

				setAttribute(lineVboList, attLocation, attStride, lineIndexBuffer[i]);

				m.identity(mMatrix);
				m.multiply(mMatrix, qxMatrix, mMatrix);
				m.multiply(mMatrix, qyMatrix, mMatrix);
				m.multiply(mMatrix, qzMatrix, mMatrix);
				m.multiply(vpMatrix, mMatrix, mvpMatrix);

				gl.uniformMatrix4fv(uniLocation.mvpMatrix, false, mvpMatrix);
				gl.uniform3fv(uniLocation.direction, [0.0, 0.0, 0.0]);
				gl.uniform1i(uniLocation.count, 0);

				gl.drawElements(gl.LINE_STRIP, lineIndex.length, gl.UNSIGNED_SHORT, 0);
			};
		};
		if(count % 100 % 25 == 0){
		}else{
			setAttribute(boxVboList, attLocation, attStride, boxIndexBuffer);

			m.identity(mMatrix);
			m.multiply(mMatrix, qxMatrix, mMatrix);
			m.multiply(mMatrix, qyMatrix, mMatrix);
			m.multiply(mMatrix, qzMatrix, mMatrix);
			m.multiply(vpMatrix, mMatrix, mvpMatrix);

			gl.uniformMatrix4fv(uniLocation.mvpMatrix, false, mvpMatrix);
			gl.uniform3fv(uniLocation.direction, [0.0, 0.0, 0.0]);
			gl.uniform1i(uniLocation.count, 0);

			gl.drawElements(gl.LINES, cubeData.i.length, gl.UNSIGNED_SHORT, 0);
		};

		gl.flush();
		requestAnimationFrame(render);
	};
	function keyDown(e){
		if (e.keyCode == 87){
			if(z > 0){
				z -= 2.0;
			}
			cameraPosition = [0.0, 0.0, z];
			center_z -= 2.0;
			centerPoint = [center_x, center_y, center_z];
		};
		if (e.keyCode == 83){
			if(z < 100){
				z += 2.0;
			};
			cameraPosition = [0.0, 0.0, z];
			center_z += 2.0;
			centerPoint = [center_x, center_y, center_z];
		};
		if(e.keyCode == 38){
				lines++;
		}
		if(e.keyCode == 40){
			if(lines > 0){
				lines--;
			}
		}
	}
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

