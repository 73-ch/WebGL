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

	var poli_position = [],
			poli_color = [],
			poli_index = [],
			d_poli_position = [],
			d_poli_color = [],
			d_poli_index = [];

	var m = new matIV(),
			m_matrix = m.identity(m.create()),
			v_matrix = m.identity(m.create()),
			p_matrix = m.identity(m.create()),
			vp_matrix = m.identity(m.create()),
			mvp_matrix = m.identity(m.create()),
			q_matrix = m.identity(m.create());

	var camera_position = [0.0, 0.0, 20.0],
			center_point = [0.0, 0.0, 0.0],
			camera_up = [0.0, 1.0, 0.0];
	m.lookAt(camera_position, center_point, camera_up, v_matrix);

	var fovy = 45,
			near = 0.5,
			far = 1000.0,
			aspect;

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

    setAttribute(cube_vbolist, att_location, att_stride, cube_indexbuffer);
		gl.uniformMatrix4fv(uni_location[0], false, mvp_matrix);
		gl.drawElements(gl.LINES, cube_data.i.length, gl.UNSIGNED_SHORT, 0);


		temp = count % 80;
		if(temp == 0){
			d_poli_position = [];
			d_poli_color = [];
			poli_position = [];
			poli_color = [];
			for(var i = 0; i < 200; i++){
				var random1_x = Math.random() * 10 - 5,
						random1_y = Math.random() * 10 - 5,
						random1_z = Math.random() * 10 - 5,
						random2_x = Math.random() * 10 - 5,
						random2_y = Math.random() * 10 - 5,
						random2_z = Math.random() * 10 - 5,
						random3_x = Math.random() * 10 - 5,
						random3_y = Math.random() * 10 - 5,
						random3_z = Math.random() * 10 - 5,
						color_r = Math.random(),
						color_g = Math.random(),
						color_b = Math.random();
				d_poli_position.push(random1_x, random1_y, random1_z, random2_x, random2_y, random2_z, random3_x, random3_y, random3_z);
				for(var j = 0; j < 3; j++){
					d_poli_color.push(color_r, color_g, color_b, 0.3);
				}
				d_poli_index.push(i * 3, i * 3 + 1, i * 3 + 2);
			}
		}else if(temp == 20){
			poli_position = [];
			poli_color = [];
			for(var i = 0; i < 200; i++){
				var x1 = d_poli_position[i * 9],
						y1 = d_poli_position[i * 9 + 1],
						z1 = d_poli_position[i * 9 + 2],
						x2 = d_poli_position[i * 9 + 3],
						y2 = d_poli_position[i * 9 + 4],
						z2 = d_poli_position[i * 9 + 5],
						x3 = d_poli_position[i * 9 + 6],
						y3 = d_poli_position[i * 9 + 7],
						z3 = d_poli_position[i * 9 + 8],
						center_x = (x1 + x2 + x3) / 3,
						center_y = (y1 + y2 + y3) / 3,
						center_z = (z1 + z2 + z3) / 3,
						color_r = d_poli_color[i * 12],
						color_g = d_poli_color[i * 12 + 1],
						color_b = d_poli_color[i * 12 + 2];

				poli_position.push(center_x, center_y, center_z);
				poli_color.push(color_r, color_g, color_b, 0.3);
			}
		}else if(temp > 40 && temp < 60){
			poli_position = [];
			for(var i = 0; i < 200; i++){
				var x1 = d_poli_position[i * 9] / 19 * (temp - 40),
						y1 = d_poli_position[i * 9 + 1] / 19 * (temp - 40),
						z1 = d_poli_position[i * 9 + 2] / 19 * (temp - 40),
						x2 = d_poli_position[i * 9 + 3] / 19 * (temp - 40),
						y2 = d_poli_position[i * 9 + 4] / 19 * (temp - 40),
						z2 = d_poli_position[i * 9 + 5] / 19 * (temp - 40),
						x3 = d_poli_position[i * 9 + 6] / 19 * (temp - 40),
						y3 = d_poli_position[i * 9 + 7] / 19 * (temp - 40),
						z3 = d_poli_position[i * 9 + 8] / 19 * (temp - 40);
				poli_position.push(x1, y1, z1, x2, y2, z2, x3, y3, z3);
			}
		}

		if(temp >= 20 && temp <= 40){
			var poli_positionbuffer = generateVBO(poli_position),
					poli_colorbuffer = generateVBO(poli_color),
					poli_vbolist = [poli_positionbuffer, poli_colorbuffer];
			setAttribute(poli_vbolist, att_location, att_stride);
			gl.uniformMatrix4fv(uni_location[0], false, mvp_matrix);
			gl.drawArrays(gl.POINTS, 0, poli_position.length / 3);
		}else if(temp > 40 && temp < 60){
			var poli_positionbuffer = generateVBO(poli_position),
					poli_colorbuffer = generateVBO(d_poli_color),
					poli_vbolist = [poli_positionbuffer, poli_colorbuffer],
					poli_indexbuffer = generateIBO(d_poli_index);
			setAttribute(poli_vbolist, att_location, att_stride, poli_indexbuffer);
			gl.uniformMatrix4fv(uni_location[0], false, mvp_matrix);
			gl.drawElements(gl.TRIANGLES, d_poli_index.length / 3, gl.UNSIGNED_SHORT, 0);
		}else if(temp >= 60){
			var poli_positionbuffer = generateVBO(d_poli_position),
					poli_colorbuffer = generateVBO(d_poli_color),
					poli_vbolist = [poli_positionbuffer, poli_colorbuffer],
					poli_indexbuffer = generateIBO(d_poli_index);
			setAttribute(poli_vbolist, att_location, att_stride, poli_indexbuffer);
	    gl.uniformMatrix4fv(uni_location[0], false, mvp_matrix);
	    gl.drawElements(gl.TRIANGLES, d_poli_index.length / 3, gl.UNSIGNED_SHORT, 0);
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

