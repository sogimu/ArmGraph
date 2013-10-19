window.onload = function() {

    Root = new ArmGraph.Root({fps: 60});
    
    G = new Captcha.Captcha({owner: Root, width: 350, height: 200})

    Root.Start();
	
};