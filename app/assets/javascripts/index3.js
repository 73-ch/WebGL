var c;
var rot1 = 0,
    rot2 = 0,
    pressedKeys = [],
    moveX = 0.0,
    moveY = 0.0,
    moveZ = 20.0,
    r = Math.PI / 180;

// マウスムーブイベントに登録する処理
function keyDownEvent(e){
  switch(e.keyCode){
    case 37:
      pressedKeys[0] = true;
      break;
    case 38:
      pressedKeys[1] = true;
      break;
    case 39:
      pressedKeys[2] = true;
      break;
    case 40:
      pressedKeys[3] = true;
      break;
    default:
      break;
  }   
}
function keyUpEvent(e){
  switch(e.keyCode){
    case 37:
      pressedKeys[0] = false;
      break;
    case 38:
      pressedKeys[1] = false;
      break;
    case 39:
      pressedKeys[2] = false;
      break;
    case 40:
      pressedKeys[3] = false;
      break;
    default:
      break;
  } 
}

function keyMove(){
  if (pressedKeys[0] == true){
    rot2 -= r;
  };
  if (pressedKeys[1] == true && rot1 <= 1.5){
    rot1 += r;
  };
  if (pressedKeys[2] == true){
    rot2 += r;
  };
  if (pressedKeys[3] == true && rot1 >= -1.5){
    rot1 -= r;
  };
  if (pressedKeys[0] == true || pressedKeys[1] == true || pressedKeys[2] == true || pressedKeys[3] == true){
    moveX = Math.cos(rot1) * 20,
    moveY = Math.sin(rot1) * 20,
    moveZ = Math.cos(rot2) * moveX,
    moveX = Math.sin(rot2) * moveX;
  };
}

function clickEvent(e){
  var eyeDirection = cameraPosition - centerPoint;
  
}
window.onload = function(){
  // HTML上のCanvasへの参照を取得する
  c = document.getElementById('canvas');

  // Canvasサイズを変更
  c.height = window.innerHeight;
  c.width = window.innerWidth;

  document.addEventListener('keydown', keyDownEvent, true);
  document.addEventListener('keyup', keyUpEvent, true);
  c.addEventListener('click', clickEvent, true);

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

  gl.enable(gl.BLEND);

  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE);

  // シェーダとプログラムオブジェクト
  var vertexSource = document.getElementById('vs').textContent;
  var fragmentSource = document.getElementById('fs').textContent;

  // ユーザー定義のプログラムオブジェクト生成関数
  var programs = shaderProgram(vertexSource, fragmentSource);

  vertexSource = document.getElementById('light-vs').textContent;
  fragmentSource = document.getElementById('light-fs').textContent;

  var lightPrograms = shaderProgram(vertexSource, fragmentSource);

  var lightUniLocation = {};
  lightUniLocation.eyePosition = gl.getUniformLocation(lightPrograms, 'cameraPosition');
  lightUniLocation.centerPoint = gl.getUniformLocation(lightPrograms, 'centerPoint');
  lightUniLocation.firstNormal = gl.getUniformLocation(lightPrograms, 'firstNormal');

  var uniLocation = gl.getUniformLocation(programs, 'mvpMatrix');

  // 球体を形成する頂点のデータを受け取る
  var cubeSide = 10;

  var cubeData = cubeLine(cubeSide, [1.0, 0.0, 1.0, 1.0]);

  // 頂点データからバッファを生成
  var vPositionBuffer = generateVBO(cubeData.p),
      vColorBuffer = generateVBO(cubeData.c),
      boxVboList = [vPositionBuffer, vColorBuffer],
      boxIndexBuffer = generateIBO(cubeData.i);

  // プログラムオブジェクトに頂点データを登録
  var attLocation = [];
  attLocation[0] = gl.getAttribLocation(programs, 'position');
  attLocation[1] = gl.getAttribLocation(programs, 'color');

  var attStride = [];
  attStride[0] = 3;
  attStride[1] = 4;

  uniform3fv(lightUniLocation, cubeData.n);

  // 行列の初期化
  var m = new matIV();
  var mMatrix = m.identity(m.create());
  var vMatrix = m.identity(m.create());
  var pMatrix = m.identity(m.create());
  var vpMatrix = m.identity(m.create());
  var mvpMatrix = m.identity(m.create());
  
  // ビュー座標変換行列
  var centerPoint = [0.0, 0.0, 0.0];    // 注視点
  var cameraUp = [0.0, 1.0, 0.0];       // カメラの上方向

  // プロジェクションのための情報を揃える
  var fovy = 45;                             // 視野角
  var aspect = canvas.width / canvas.height; // アスペクト比
  var near = 0.5;                            // 空間の最前面
  var far = 1000.0;                            // 空間の奥行き終端
  m.perspective(fovy, aspect, near, far, pMatrix);

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

    keyMove();
    var cameraPosition = [moveX, moveY, moveZ];
    m.lookAt(cameraPosition, centerPoint, cameraUp, vMatrix);

    m.multiply(pMatrix, vMatrix, vpMatrix);

    setAttribute(boxVboList, attLocation, attStride, boxIndexBuffer);

    m.identity(mMatrix);
    m.multiply(vpMatrix, mMatrix, mvpMatrix);

    gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

    gl.drawElements(gl.LINES, cubeData.i.length, gl.UNSIGNED_SHORT, 0);
    
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
    if (ibo != null){
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
    };
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


