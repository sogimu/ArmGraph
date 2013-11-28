module( "World" );
test( "World.GetPrimitivesFormArea()", function() {
	var world = ArmGraph.World();
	var rect0 = ArmContext.Rect({width: 100, height: 50, fillObject: "#ff0000"});
	var rect1 = ArmContext.Rect({width: 100, height: 50, fillObject: "#00ff00"});
	var rect2 = ArmContext.Rect({width: 100, height: 50, fillObject: "#0000ff"});
	rect1.TranslateTo({x: 200, y: 0});
	rect2.TranslateTo({x: 1500, y: 0});

	world.AddPrimitive(rect0);
	world.AddPrimitive(rect1);
	world.AddPrimitive(rect2);

	var listOfPrimitives = world.GetPrimitivesFormArea({x0: 0, y0: 0, x1: 150, y1: 150});
	
	if(primitives.GetArray().IndexOf(rect0) != -1 && primitives.GetArray().IndexOf(rect1) != -1 && primitives.GetArray().IndexOf(rect2) == -1) {
		ok( true,  "rect0 and rect1 lie into area 0,0 150,150. rect2 not lie into area" );
	} else {
		of( false, "!(rect0 and rect1 lie into area 0,0 150,150. rect2 not lie into area)" );
	}	
});

test( "World.GetPrimitives()", function() {
	ok( true,  "first test" );
	
});