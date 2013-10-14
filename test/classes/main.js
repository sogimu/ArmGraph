window.onload = function() {

    Root = new ArmGraph.Root({fps: 60});
    
    G = new Captcha.Captcha({owner: Root})
	// new Captcha.Item({owner: G, x: 100, y: 100, width: 100, height: 100});

	// img = new Image();
 //    img.onload = function() {
 //    	console.log("img load");
 //    }
 //    img.src = "img/image0.png";
	// G.GetTask();

    Root.Start();
	




};