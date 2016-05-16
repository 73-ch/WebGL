var src, ac, fr, c, gl, anm;
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
	ac = new AudioContext;
	fr = new FileReader;

	var analyser = ac.createAnalyser();
	analyser.fftSize = 128;
	analyser.connect(ac.destination);
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);


	c = document.getElementById('canvas');
	gl = c.getContext('webgl');
	if(!gl){
		alert('webgl not supported!');
		return;
	}
	gl.clearColor(0.0, 0.0, 0.0, 1.0);
	gl.clearDepth(1.0);
	gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);

  c.addEventListener('mousemove', mouseMove, true);

	var vs = document.getElementById('vs').textContent,
			fs = document.getElementById('fs').textContent,
			program = shaderProgram(vs, fs),
			att_location = [],
			att_stride = [],
			uni_location = [];

	att_location[0] = gl.getAttribLocation(program, 'position');
	att_location[1] = gl.getAttribLocation(program, 'color');
	att_stride[0] = 3;
	att_stride[1] = 4;
	uni_location[0] = gl.getUniformLocation(program, 'mvp_matrix');

	var cube_data = cubeLine(10, [0.5, 0.0, 1.0, 0.8]),
			cube_positionbuffer = generateVBO(cube_data.p),
			cube_colorbuffer = generateVBO(cube_data.c),
			cube_vbolist = [cube_positionbuffer, cube_colorbuffer],
			cube_indexbuffer = generateIBO(cube_data.i);

	var pvs = document.getElementById('pvs').textContent,
			pfs = document.getElementById('pfs').textContent,
			p_program = shaderProgram(pvs, pfs),
			p_att_location = [],
			p_att_stride = [],
			p_uni_location = [],
			p_index = [];

	p_att_location[0] = gl.getAttribLocation(p_program, 'num');
	p_att_stride[1] = 1;
	var num = [];
	for(var i = 0; i < 200; i++){
		num.push(i);
	}
	var num_buffer = generateVBO(num);
	var p_vbolist = [num_buffer];

	p_uni_location[0] = gl.getUniformLocation(p_program, 'mvp_matrix');
	p_uni_location[1] = gl.getUniformLocation(p_program, 'temp');
	p_uni_location[2] = gl.getUniformLocation(p_program, 'inv_matrix');
	p_uni_location[3] = gl.getUniformLocation(p_program, 'light_direction');
	p_uni_location[4] = gl.getUniformLocation(p_program, 'eye_direction');
	p_uni_location[5] = gl.getUniformLocation(p_program, 'ambient_color');
	p_uni_location[6] = gl.getUniformLocation(p_program, 'random');

	for(var i = 0; i < 200; i++){
		p_index.push(i*3, i*3+1, i*3+2);
	}
	var p_index_buffer = generateIBO(p_index);

	var m = new matIV(),
			m_matrix = m.identity(m.create()),
			v_matrix = m.identity(m.create()),
			p_matrix = m.identity(m.create()),
			vp_matrix = m.identity(m.create()),
			mvp_matrix = m.identity(m.create()),
			q_matrix = m.identity(m.create()),
			inv_matrix = m.identity(m.create());

	var camera_position = [0.0, 0.0, 20.0],
			center_point = [0.0, 0.0, 0.0],
			camera_up = [0.0, 1.0, 0.0];
	m.lookAt(camera_position, center_point, camera_up, v_matrix);

	var fovy = 45,
			near = 0.5,
			far = 1000.0,
			aspect;

	var light_direction = [-0.5, 0.5, 0.5],
			eye_direction = [0.0, 0.0, 20.0],
			ambient_color = [0.1, 0.1, 0.1, 1.0];

	fr.onload = function(){
		ac.decodeAudioData(fr.result, function(buffer){
			if(src){
				src.stop();
				cancelAnimationFrame(anm);
			}

			src = ac.createBufferSource();

			src.buffer = buffer;
			src.connect(analyser);
			src.start(0);

			anm = requestAnimationFrame(render);
		})
	}

	var count = 0,
			temp;

	function render(){
		analyser.getByteFrequencyData(dataArray);
		var dNum = 0;
		for(var i = 0; i < 20;i++){
		  dataArray[i] *= 2.5; //増幅させる
		  dNum += dataArray[i];
		}
		console.log(dNum * 0.0003);
		c.height = window.innerHeight;
		c.width = window.innerWidth;
		aspect = c.width / c.height;
		gl.viewport(0.0, 0.0, c.width, c.height);
		m.perspective(fovy, aspect, near, far, p_matrix);
		m.multiply(p_matrix, v_matrix, vp_matrix);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		q.toMatIV(qt, q_matrix);
		m.identity(m_matrix);
		m.multiply(m_matrix, q_matrix, m_matrix);
		m.multiply(vp_matrix, m_matrix, mvp_matrix);

		var spectrums = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(spectrums);
    gl.useProgram(program);
    setAttribute(cube_vbolist, att_location, att_stride, cube_indexbuffer);
		gl.uniformMatrix4fv(uni_location[0], false, mvp_matrix);
		gl.drawElements(gl.LINES, cube_data.i.length, gl.UNSIGNED_SHORT, 0);


		temp = count % 80;

		if(temp = 0){
			var random = Math.random();
		}

		if(temp > 10){
			gl.useProgram(p_program);
			setAttribute(p_vbolist, p_att_location, p_att_stride, p_index_buffer);

			m.inverse(m_matrix, inv_matrix);

			gl.uniformMatrix4fv(p_uni_location[0], false, mvp_matrix);
			gl.uniform1i(p_uni_location[1], false, temp);
			gl.uniformMatrix4fv(p_uni_location[2], inv_matrix);
			gl.uniform3fv(p_uni_location[3], light_direction);
			gl.uniform3fv(p_uni_location[4], eye_direction);
			gl.uniform4fv(p_uni_location[5], ambient_color);
			gl.uniform1f(p_uni_location[6], random);

			gl.drawElements(gl.TRIANGLES, p_index.length, gl.UNSIGNED_SHORT, 0);
		}


		gl.flush();
		anm = requestAnimationFrame(render);
		count++;
	};

	document.getElementById('file').addEventListener('change', function(e){
    fr.readAsArrayBuffer(e.target.files[0]);
  });


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
		if(ibo){
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
		}
	}
};

