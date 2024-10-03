var point=0;
function main(param) {
    var scene = new g.Scene({
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
		  var label = new g.Label({
			scene: scene,
			font: font,
			text: String(point),
			fontSize: 15,
			textColor: "blue",
			x: 1280/2,
			y: 720/2
		  });
		  scene.append(label);





		for(var i=0;i<Math.floor(g.game.localRandom.generate()*10)+1;i++)
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

        target.onPointDown.add(function () {
			point+=1;
			label.text=String(point)
			scene.remove(target);
			label.invalidate();
        });

		bom.onPointDown.add(()=>
		{
			point-=1
			scene.remove(bom);
		})
		scene.append(bom);
		scene.append(target);
	}
        // ここまでゲーム内容を記述します
    });
    g.game.pushScene(scene);
}

module.exports = main;