var point=0;
function main(param) {
	g.game.pushScene(MainGame());
}

function MainGame()
{
	const scene = new g.Scene({
        game: g.game,
        assetIds: ["bom"]
    });


    scene.onLoad.add(function () {
        // ここからゲーム内容を記述します
        // 各アセットオブジェクトを取得します
        // プレイヤーを生成します
		var bomImage = scene.asset.getImageById("bom");
		var font = new g.DynamicFont({
			game: g.game,
			fontFamily: g.FontFamily.SansSerif,
			size: 15
		  });
		  let label = new g.Label({
			scene: scene,
			font: font,
			text: String(point),
			fontSize: 15,
			textColor: "blue",
			x: 1280/2,
			y: 720/2
		  });
		  scene.append(label);



		let nowpoint=point;
		let random=Math.floor(g.game.localRandom.generate()*10)+1;
		let targetcount=Math.floor(g.game.localRandom.generate()*random);
		for(let i=0;i<targetcount;i++)
		{
			let target = new g.FilledRect({
				scene: scene,
				width: 50,
				height: 50,
				x:Math.floor(g.game.localRandom.generate()*(g.game.width-50)),
				y:Math.floor(g.game.localRandom.generate()*(g.game.height-50)),
				cssColor:"red",
				touchable:true
			});
			target.onPointDown.add(function () 
			{
				point+=1;
				label.text=String(point);
				scene.remove(target);
				label.invalidate();
			});
			scene.append(target);


		}
		for(let i=0;i<random-targetcount;i++)
		{
			let bom= new g.Sprite({
				scene: scene,
				src: bomImage,
				width: 800,
				height: 800,
				scaleX:0.2,
				scaleY:0.2,
				x:Math.floor(g.game.localRandom.generate()*(g.game.width-50)),
				y:Math.floor(g.game.localRandom.generate()*(g.game.height-50)),
				touchable:true
				});

				bom.onPointDown.add(()=>
				{
					scene.remove(bom);
					g.game.replaceScene(GameOver());
				})
				scene.append(bom);
		}
		setTimeout(function()
		{
			if(point==(nowpoint+targetcount))
			{
				g.game.replaceScene(MainGame());
			}else
			{
				g.game.replaceScene(GameOver());
			}
		},targetcount*1000);
    });
	return scene;
}


function GameOver()
{
	const scene=new g.Scene({
        game: g.game,
    });

	scene.onLoad.add(function () {
		var font = new g.DynamicFont({
			game: g.game,
			fontFamily: g.FontFamily.SansSerif,
			size: 50
		  });
		  let label = new g.Label({
			scene: scene,
			font: font,
			text: "GAME OVER",
			fontSize: 50,
			textColor: "red",
			x: 1280/2,
			y: 720/2
		  });

		  let score = new g.Label({
			scene: scene,
			font: font,
			text: "スコア"+point,
			fontSize: 50,
			textColor: "blue",
			x: 1280/2+50,
			y: 720/2+50
		  });
		  point=0;
		  
		  scene.append(score);
		  scene.append(label);

		  scene.onPointDownCapture.add(function(){
			g.game.replaceScene(MainGame());
		  });
	})
	  return scene;
}

module.exports = main;