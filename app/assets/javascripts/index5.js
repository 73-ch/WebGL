
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

	document.addEventListener('keydown', keyDown, true);
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
	var cubeData = cubeLine(cubeSide, [0.3, 1.0, 1.0, 0.5]),
			vPositionBuffer = generateVBO(cubeData.p),
			vColorBuffer = generateVBO(cubeData.c),
			boxVboList = [vPositionBuffer, vColorBuffer],
			boxIndexBuffer = generateIBO(cubeData.i);

	var l_position = [],
			l_color = [],
			l_index = [],
			direction = [],
			random_var = 1;
	for(var i = 0; i < 20; i++){
		var direction_x = Math.random() * random_var - random_var / 2,
				direction_y = Math.random() * random_var - random_var / 2,
				direction_z = Math.random() * random_var - random_var / 2;
				position_x = Math.random() * 10 - 5,
				position_y = Math.random() * 10 - 5,
				position_z = Math.random() * 10 - 5,
				col_r = Math.random(),
				col_g = Math.random(),
				col_b = Math.random();
		for(var j = 0; j < 5; j++){
			change();
			l_position.push(position_x, position_y, position_z);
			l_color.push(col_r, col_g, col_b, 1.0);
			if(j != 0){
				l_index.push(i * 5 + j - 1, i * 5 + j);
			};
		};
		direction.push(direction_x, direction_y, direction_z);
	}
	l_color_buffer = generateVBO(l_color);
	l_index_buffer = generateIBO(l_index);


	var uniLocation = [];
	uniLocation.mvpMatrix = gl.getUniformLocation(programs, 'mvpMatrix');

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
		m.lookAt(cameraPosition, centerPoint, cameraUp, vMatrix);
		m.multiply(pMatrix, vMatrix, vpMatrix);
		q.toMatIV(qt, qMatrix);
		
		setAttribute(boxVboList, attLocation, attStride, boxIndexBuffer);

		m.identity(mMatrix);
		m.multiply(mMatrix, qMatrix, mMatrix);
		m.multiply(vpMatrix, mMatrix, mvpMatrix);

		gl.uniformMatrix4fv(uniLocation.mvpMatrix, false, mvpMatrix);

		gl.drawElements(gl.LINES, cubeData.i.length, gl.UNSIGNED_SHORT, 0);

		for(var i = 0; i < 20; i++){
			var position = l_position.slice(15 * i, 15 * i + 15);
			position = position.slice(3, 15);
			direction_x = direction[i * 3];
			direction_y = direction[i * 3 + 1];
			direction_z = direction[i * 3 + 2];
			if(count < 3){
				console.log(direction_x, direction_y, direction_z);
			}
			for(var j = 0; j < 3; j ++){
				if(j == 0){
					position_x = position[9];
				}else if(j == 1){
					position_y = position[10];
				}else if(j == 2){
					position_z = position[11];
				}
			}
			change();
			position.push(position_x, position_y, position_z);
			direction.push(direction_x, direction_y, direction_z);
			l_position = l_position.concat(position);
		}
		l_position = l_position.slice(300, 600);
		direction = direction.slice(60, 120);
		l_position_buffer = generateVBO(l_position);
		l_vbo_list = [l_position_buffer, l_color_buffer];

		setAttribute(l_vbo_list, attLocation, attStride, l_index_buffer);

		gl.uniformMatrix4fv(uniLocation[0], false, mvpMatrix);
		gl.drawElements(gl.LINES, l_index.length, gl.UNSIGNED_SHORT, 0);

		gl.flush();
		requestAnimationFrame(render);
	};
	function keyDown(e){
		if(e.keyCode == 32){
			for(var i = 0; i < 20; i++){
				var direction_x = Math.random() * random_var - random_var / 2,
						direction_y = Math.random() * random_var - random_var / 2,
						direction_z = Math.random() * random_var - random_var / 2;
				direction.push(direction_x, direction_y, direction_z);
			}
			direction = direction.slice(60, 120);
		}

		if(e.keyCode == 38){
			if(random_var < 1){
				random_var += 0.01;
			};
		}

		if(e.keyCode == 40){
			if(random_var > 0){
				random_var -= 0.01;
			};
		}


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
	}

	function change(){
		var percentage = 1.0,
				surface_x = 5.0 * direction_x / Math.abs(direction_x),
				surface_y = 5.0 * direction_y / Math.abs(direction_y),
				surface_z = 5.0 * direction_z / Math.abs(direction_z),
				percentage_x = (-position_x + surface_x) / direction_x / percentage;
		if(percentage_x < 1.0 && percentage_x > 0){
			percentage = percentage_x;
		};
		if(Math.abs(position_x) == 5.0){
			direction_x *= -1;
		}
		var percentage_y = (-position_y + surface_y) / direction_y / percentage;
		if(percentage_y < 1.0 && percentage_y > 0){
			percentage = percentage_y;
		};
		if(Math.abs(position_y) == 5.0){
			direction_y *= -1;
		}
		var percentage_z = (-position_z + surface_z) / direction_z / percentage;
		if(percentage_z < 1.0 && percentage_z > 0){
			percentage = percentage_z;
		};
		if(Math.abs(position_z) == 5.0){
			direction_z *= -1;
		}
		position_x += direction_x * percentage;
		position_y += direction_y * percentage;
		position_z += direction_z * percentage;
		if (Math.abs(position_x) > 5.0){
			position_x = surface_x;
		};
		if (Math.abs(position_y) > 5.0){
			position_y = surface_y;
		};
		if (Math.abs(position_z) > 5.0){
			position_z = surface_z;
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
};

