
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
	i = gl.getParameter(gl.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
	if(i > 0){
		console.log('max_vertex_texture_image_unit: ' + i);
	}else{
		alert('VTF not supported');
		return;
	}
	var ext;
	ext = gl.getExtension('OES_texture_float');
	if(ext == null){
	    alert('float texture not supported');
	    return;
	}
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.BLEND);
	gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);


	document.addEventListener('keydown', keyDown, true);
	c.addEventListener('mousemove', mouseMove, true);

	var v_source = document.getElementById('dpvs').textContent,
			f_source = document.getElementById('dpfs').textContent,
			dp_programs = shaderProgram(v_source, f_source);
	var dp_attlocation = [];
	dp_attlocation[0] = gl.getAttribLocation(dp_programs, 'position');
	var dp_attstride = [];
	dp_attstride[0] = 3;
	var dp_unilocation = [];
	dp_unilocation[0] = gl.getUniformLocation(dp_programs, "resolution");


	var v_source = document.getElementById('dvvs').textContent,
			f_source = document.getElementById('dvfs').textContent,
			dv_programs = shaderProgram(v_source, f_source);
	var dv_attlocation = [];
	dv_attlocation[0] = gl.getAttribLocation(dv_programs, 'position');
	var dv_attstride = [];
	dv_attstride[0] = 3;
	var dv_unilocation = [];
	dv_unilocation[0] = gl.getUniformLocation(dv_programs, "resolution");


	var v_source = document.getElementById('npvs').textContent,
			f_source = document.getElementById('npfs').textContent,
			np_programs = shaderProgram(v_source, f_source);
	var np_attlocation = [];
	np_attlocation[0] = gl.getAttribLocation(np_programs, 'position');
	var np_attstride = [];
	np_attstride[0] = 3;
	var np_unilocation = [];
	np_unilocation[0] = gl.getUniformLocation(np_programs, "resolution");
	np_unilocation[1] = gl.getUniformLocation(np_programs, "b_position");
	np_unilocation[2] = gl.getUniformLocation(np_programs, "velocity");


	var v_source = document.getElementById('nvvs').textContent,
			f_source = document.getElementById('nvfs').textContent,
			nv_programs = shaderProgram(v_source, f_source);
	var nv_attlocation = [];
	nv_attlocation[0] = gl.getAttribLocation(nv_programs, 'position');
	var nv_attstride = [];
	nv_attstride[0] = 3;
	var nv_unilocation = [];
	nv_unilocation[0] = gl.getUniformLocation(nv_programs, "resolution");
	nv_unilocation[1] = gl.getUniformLocation(nv_programs, "n_position");
	nv_unilocation[2] = gl.getUniformLocation(nv_programs, "b_velocity");


	var poli_position = [
		-1.0, 1.0, 0.0,
		-1.0, -1.0, 0.0,
		1.0, 1.0, 0.0,
		1.0, -1.0, 0.0
	];
	var poli_vbo = generateVBO(poli_position);
	var vbolist = [poli_vbo];


	var v_source = document.getElementById('mvs').textContent,
			f_source = document.getElementById('mfs').textContent,
			m_programs = shaderProgram(v_source, f_source);
	var m_attlocation = [];
	m_attlocation[0] = gl.getAttribLocation(m_programs, 'ver_num');
	var m_attstride = [];
	m_attstride[0] = 1;
	var m_unilocation = [];
	m_unilocation[0] = gl.getUniformLocation(m_programs, "resolution");
	m_unilocation[1] = gl.getUniformLocation(m_programs, "mvp_matrix");
	m_unilocation[2] = gl.getUniformLocation(m_programs, "position");

	var TEXTURE_WIDTH  = 64.0;
	var TEXTURE_HEIGHT = 64.0;
	var resolution = [TEXTURE_WIDTH, TEXTURE_HEIGHT];

	var ver_num = [];
	for (var i = 0; i < 4000; i++){
		ver_num.push(i);
	};
	v_ver_num = generateVBO(ver_num);
	m_vbolist = [v_ver_num];

	var index = [];
	for(var i = 0; i < 4000; i++){
		if(i % 32 < 31){
			index.push(i, i + 1);
		};
	};
	index_buffer = generateIBO(index);


	var v_source = document.getElementById('cvs').textContent,
			f_source = document.getElementById('cfs').textContent,
			c_programs = shaderProgram(v_source, f_source);
	var c_attlocation = [];
	c_attlocation[0] = gl.getAttribLocation(c_programs, 'position');
	c_attlocation[1] = gl.getAttribLocation(c_programs, 'color');
	var c_attstride = [];
	c_attstride[0] = 3;
	c_attstride[1] = 4;
	var c_unilocation = [];
	c_unilocation[0] = gl.getUniformLocation(c_programs, "mvp_matrix");

	var cubeSide = 10;
	var cubeData = cubeLine(cubeSide, [1.0, 0.8, 0.2, 0.5]),
			vPositionBuffer = generateVBO(cubeData.p),
			vColorBuffer = generateVBO(cubeData.c),
			boxVboList = [vPositionBuffer, vColorBuffer],
			boxIndexBuffer = generateIBO(cubeData.i);


	var back_position = createFramebuffer(TEXTURE_WIDTH, TEXTURE_WIDTH, gl.FLOAT),
			back_velocity = createFramebuffer(TEXTURE_WIDTH, TEXTURE_WIDTH, gl.FLOAT),
			front_position = createFramebuffer(TEXTURE_WIDTH, TEXTURE_WIDTH, gl.FLOAT),
			front_velocity = createFramebuffer(TEXTURE_WIDTH, TEXTURE_WIDTH, gl.FLOAT);


	gl.disable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE);

	(function(){
		gl.bindFramebuffer(gl.FRAMEBUFFER, back_position.f);
		gl.viewport(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);
		gl.clearColor(0.0, 0.0, 0.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(dp_programs);

		setAttribute(vbolist, dp_attlocation, dp_attstride);
		gl.uniform2fv(dp_unilocation[0], resolution);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, poli_position.length / 3);


		gl.bindFramebuffer(gl.FRAMEBUFFER, back_velocity.f);
		gl.viewport(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);
		gl.clearColor(0.0, 0.0, 0.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(dv_programs);

		setAttribute(vbolist, dv_attlocation, dv_attstride);
		gl.uniform2fv(dv_unilocation[0], resolution);
		gl.drawArrays(gl.TRIANGLE_STRIP, 0, poli_position.length / 3);
	})();

	var m = new matIV();
	var mMatrix = m.identity(m.create());
	var vMatrix = m.identity(m.create());
	var pMatrix = m.identity(m.create());
	var vpMatrix = m.identity(m.create());
	var mvpMatrix = m.identity(m.create());
	var qMatrix = m.identity(m.create());

	var cameraPosition = [0.0, 0.0, z];
	var centerPoint = [0.0, 0.0, 0.0];
	var cameraUp = [0.0, 1.0, 0.0];

	var fovy = 45;
	var near = 0.5;
	var far = 1000.0;

	var count = 0,
			cameraX = 0,
			cameraY = 0,
			cameraZ = 0;

	var flip;

	render();

	function render(){
		gl.disable(gl.BLEND);
		gl.bindFramebuffer(gl.FRAMEBUFFER, front_position.f);
		gl.viewport(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);
		gl.clearColor(0.0, 0.0, 0.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(np_programs);

		setAttribute(vbolist, np_attlocation, np_attstride);
		gl.uniform2fv(np_unilocation[0], resolution);
		gl.bindTexture(gl.TEXTURE_2D, back_position.t);
		gl.activeTexture(gl.TEXTURE0);
		gl.uniform1i(np_unilocation[1], 0);
		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, back_velocity.t);
		gl.uniform1i(np_unilocation[2], 1);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, poli_position.length / 3);


		gl.bindFramebuffer(gl.FRAMEBUFFER, front_velocity.f);
		gl.viewport(0, 0, TEXTURE_WIDTH, TEXTURE_HEIGHT);
		gl.clearColor(0.0, 0.0, 0.0, 0.0);
		gl.clear(gl.COLOR_BUFFER_BIT);
		gl.useProgram(nv_programs);

		setAttribute(vbolist, nv_attlocation, nv_attstride);
		gl.uniform2fv(nv_unilocation[0], resolution);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, front_position.t);
		gl.uniform1i(nv_unilocation[1], 0);

		gl.activeTexture(gl.TEXTURE1);
		gl.bindTexture(gl.TEXTURE_2D, back_velocity.t);
		gl.uniform1i(nv_unilocation[2], 1);

		gl.drawArrays(gl.TRIANGLE_STRIP, 0, poli_position.length / 3);


		count++;
		gl.enable(gl.BLEND);
		gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);


		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.useProgram(c_programs);
		c.height = window.innerHeight;
		c.width = window.innerWidth;
		var aspect = c.width / c.height;
		var radians = (count % 360) * Math.PI / 180;
		gl.viewport(0.0, 0.0, c.width, c.height);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		m.perspective(fovy, aspect, near, far, pMatrix);
		m.lookAt(cameraPosition, centerPoint, cameraUp, vMatrix);
		m.multiply(pMatrix, vMatrix, vpMatrix);
		q.toMatIV(qt, qMatrix);
		m.identity(mMatrix);
		m.multiply(mMatrix, qMatrix, mMatrix);
		m.multiply(vpMatrix, mMatrix, mvpMatrix);


		setAttribute(boxVboList, c_attlocation, c_attstride, boxIndexBuffer);
		gl.uniformMatrix4fv(c_unilocation[0], false, mvpMatrix);
		gl.drawElements(gl.LINES, cubeData.i.length, gl.UNSIGNED_SHORT, 0);


		gl.useProgram(m_programs);

		setAttribute(m_vbolist, m_attlocation, m_attstride, index_buffer);
		gl.uniform2fv(m_unilocation[0], resolution);
		gl.uniformMatrix4fv(m_unilocation[1], false, mvpMatrix);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, front_position.t);
		gl.uniform1i(m_unilocation[2], 0);
		gl.drawElements(gl.LINES, index.length, gl.UNSIGNED_SHORT, 0);


		gl.flush();
		requestAnimationFrame(render);

		flip = back_position;
		back_position = front_position;
		front_position = flip;
		flip = back_velocity;
		back_velocity = front_velocity;
		front_velocity = flip;
	};
	function keyDown(e){
		if (e.keyCode == 83){
			if(z < 100){
				z += 2.0;
			};
			cameraPosition = [0.0, 0.0, z];
			center_z += 2.0;
			centerPoint = [center_x, center_y, center_z];
		};
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

	function createFramebuffer(width, height, format){
		var textureFormat = null;
		if(!format){
			textureFormat = gl.UNSIGNED_BYTE;
		}else{
			textureFormat = format;
		}
		var frameBuffer = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
		var depthRenderBuffer = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, depthRenderBuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthRenderBuffer);
		var fTexture = gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, fTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, textureFormat, null);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, fTexture, 0);
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		return {f : frameBuffer, d : depthRenderBuffer, t : fTexture};
	}
};

