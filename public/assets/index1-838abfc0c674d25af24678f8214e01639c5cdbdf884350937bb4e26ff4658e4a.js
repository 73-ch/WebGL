var c;
var q = new qtnIV();
var qt = q.identity(q.create());

// マウスムーブイベントに登録する処理
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
	// HTML上のCanvasへの参照を取得する
	c = document.getElementById('canvas');

	// Canvasサイズを変更
	c.height = window.innerHeight;
	c.width = window.innerWidth;

	c.addEventListener('mousemove', mouseMove, true);

	// CanvasエレメントからWebGLコンテキストを取得する
	var gl = c.getContext('webgl');

	// WebGLコンテキストが取得できたかどうか調べる
	if(!gl){
		alert('webgl not supported!');
		return;
	}

	// Canvasエレメントをクリアする色を指定する
	gl.clearColor(0.0, 0.0, 0.0, 1.0);

	// クリアする際の深度値を指定する
	gl.clearDepth(1.0);

	// シェーダとプログラムオブジェクト
	var vertexSource = document.getElementById('vs').textContent;
	var fragmentSource = document.getElementById('fs').textContent;

	// ユーザー定義のプログラムオブジェクト生成関数
	var programs = shaderProgram(vertexSource, fragmentSource);

	// 球体を形成する頂点のデータを受け取る
	var cubeData = cubeLine(1, [1.0, 1.0, 1.0, 1.0]);

	// 頂点データからバッファを生成
	var vertexBuffer = generateVBO(cubeData.p),
			vboList = [vertexBuffer];

	// インデックスバッファの生成
	var indexBuffer = generateIBO(cubeData.i);

	// プログラムオブジェクトに頂点データを登録
	var attLocation = [];
	attLocation[0] = gl.getAttribLocation(programs, 'position');

	var attStride = [];
	attStride[0] = 3;

	setAttribute(vboList, attLocation, attStride, indexBuffer);

	// 行列の初期化
	var mat = new matIV();
	var mMatrix = mat.identity(mat.create());
	var vMatrix = mat.identity(mat.create());
	var pMatrix = mat.identity(mat.create());
	var vpMatrix = mat.identity(mat.create());
	var mvpMatrix = mat.identity(mat.create());
	var qMatrix = mat.identity(mat.create());
	
	// ビュー座標変換行列
	var cameraPosition = [0.0, 0.0, 30.0]; // カメラの位置
	var centerPoint = [0.0, 0.0, 0.0];    // 注視点
	var cameraUp = [0.0, 1.0, 0.0];       // カメラの上方向
	mat.lookAt(cameraPosition, centerPoint, cameraUp, vMatrix);

	// プロジェクションのための情報を揃える
	var fovy = 45;                             // 視野角
	var aspect = canvas.width / canvas.height; // アスペクト比
	var near = 0.1;                            // 空間の最前面
	var far = 1000.0;                            // 空間の奥行き終端
	mat.perspective(fovy, aspect, near, far, pMatrix);

	// 行列を掛け合わせてVPマトリックスを生成しておく
	mat.multiply(pMatrix, vMatrix, vpMatrix);   // pにvを掛ける

	// カウンタを初期化
	var count = 0;

	// レンダリング関数を呼び出す
	render();

	// レンダリング関数の定義
	function render(){
		// カウンタをインクリメントする
		count++;

		// ラジアンを計算する
		var radians = (count % 360) * Math.PI / 180;

		// Canvasエレメントをクリアする
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

		q.toMatIV(qt, qMatrix);

		for (var i = 0; i < 10; i++) {
			var translateCount = (count + i * 120) % 360,
					translateRadian = translateCount * Math.PI / 180,
					translateSin = Math.sin(translateRadian),
					offset = translateSin * 3.0;

			mat.identity(mMatrix);
			mat.multiply(mMatrix, qMatrix, mMatrix);
			var xyz = -(10 - i);

			if (i == 9){
				var vec = [xyz, xyz, xyz];
			}else if(i % 3 == 1){
				var vec = [offset * xyz, xyz, xyz];
			}else if(i % 3 == 2){
				var vec = [xyz, xyz * offset, xyz];
			}else if(i % 3 == 0){
				var vec = [xyz, xyz, xyz * offset];
			}

			mat.scale(mMatrix, vec, mMatrix);
			// VPマトリックスにモデル座標変換行列を掛ける
			mat.multiply(vpMatrix, mMatrix, mvpMatrix);

			// シェーダに行列を送信する
			var uniLocation = gl.getUniformLocation(programs, 'mvpMatrix');
			gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

			// インデックスバッファによる描画
			gl.drawElements(gl.LINES, cubeData.i.length, gl.UNSIGNED_SHORT, 0);
		};

		gl.flush();

		// 再帰呼び出し
		requestAnimationFrame(render);
	};
	function shaderProgram(vertexSource, fragmentSource){
		// シェーダオブジェクトの生成
		var vertexShader = gl.createShader(gl.VERTEX_SHADER);
		var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

		// シェーダにソースを割り当ててコンパイル
		gl.shaderSource(vertexShader, vertexSource);
		gl.compileShader(vertexShader);
		
		// シェーダのコンパイル結果をチェック
		if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)){
			alert(gl.getShaderInfoLog(vertexShader) + "in vertexShader");
			return null;
		}

		// シェーダにソースを割り当ててコンパイル
		gl.shaderSource(fragmentShader, fragmentSource);
		gl.compileShader(fragmentShader);

		// シェーダのコンパイル結果をチェック
		if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)){
			alert(gl.getShaderInfoLog(fragmentShader) + "in fragmentShader");
			return null;
		}

		// プログラムオブジェクトの生成とシェーダのアタッチ
		var program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		gl.attachShader(program, fragmentShader);

		// シェーダをリンク
		gl.linkProgram(program);

		// シェーダのリンク結果をチェック
		if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
			alert(gl.getProgramInfoLog(program));
			return null;
		}

		// プログラムオブジェクトを選択状態にする
		gl.useProgram(program);

		// 生成したプログラムオブジェクトを戻り値として返す
		return program;
	}

	function generateVBO(data){
		// バッファオブジェクトの生成
		var vbo = gl.createBuffer();

		// バッファをバインドする
		gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

		// バッファにデータをセット
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);

		// バッファのバインドを無効化
		gl.bindBuffer(gl.ARRAY_BUFFER, null);

		// 生成した VBO を返して終了
		return vbo;
	}

	function generateIBO(data){
		// バッファオブジェクトの生成
		var ibo = gl.createBuffer();

		// バッファをバインドする
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

		// バッファにデータをセット
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(data), gl.STATIC_DRAW);

		// バッファのバインドを無効化
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

		// 生成したIBOを返して終了
		return ibo;
	}

		function setAttribute(vbo, attL, attS, ibo){
		// 引数として受け取った配列を処理する
		for(var i in vbo){
			// バッファをバインドする
			gl.bindBuffer(gl.ARRAY_BUFFER, vbo[i]);

			// attributeLocationを有効にする
			gl.enableVertexAttribArray(attL[i]);

			// attributeLocationを通知し登録する
			gl.vertexAttribPointer(attL[i], attS[i], gl.FLOAT, false, 0, 0);
		}

		// インデックスバッファをバインドする
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
	}
	
	function generateTexture(source){
		// イメージオブジェクトの生成
		var img = new Image();

		// データのオンロードをトリガにする
		img.onload = function(){
			// テクスチャオブジェクトの生成
			texture = gl.createTexture();

			// テクスチャをバインドする
			gl.bindTexture(gl.TEXTURE_2D, texture);

			// テクスチャへイメージを適用
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

			// ミップマップを生成
			gl.generateMipmap(gl.TEXTURE_2D);

			// テクスチャのバインドを無効化
			gl.bindTexture(gl.TEXTURE_2D, null);
		};

		// イメージオブジェクトの読み込みを開始
		img.src = source;
	}
};


