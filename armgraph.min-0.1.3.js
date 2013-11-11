(function(window){var ArmGraph=function(){var me={};me._lastUnicalNumber=0;me.GetNewUnicalNumber=function(){this._lastUnicalNumber+=1;return this._lastUnicalNumber};return me};window.ArmGraph=ArmGraph()})(window);(function(window){var Node=function(O){var me={};me._begin=function(){if(this.begin)this.begin();var objects=this._nodes.GetArray();for(var object in objects)objects[object]._begin();if(this.afterBegin)this.afterBegin()};me._update=function(){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._update();if(this.update)this.update()};me._draw=function(){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._draw();if(this.draw)this.draw()};me._clear=
function(){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._clear();if(this.clear)this.clear()};me._onKeyDown=function(e){if(this.onKeyDown)this.onKeyDown(e);var objects=this._nodes.GetArray();for(var object in objects)objects[object]._onKeyDown(e)};me._onKeyPress=function(e){if(this.onKeyPress)this.onKeyPress(e);var objects=this._nodes.GetArray();for(var object in objects)objects[object]._onKeyPress(e)};me._onKeyUp=function(e){if(this.onKeyUp)this.onKeyUp(e);var objects=
this._nodes.GetArray();for(var object in objects)objects[object]._onKeyUp(e)};me._onMouseDown=function(e){if(this.onMouseDown)this.onMouseDown(e);var objects=this._nodes.GetArray();for(var object in objects)objects[object]._onMouseDown(e)};me._onMouseUp=function(e){if(this.onMouseUp)this.onMouseUp(e);var objects=this._nodes.GetArray();for(var object in objects)objects[object]._onMouseUp(e)};me._onMouseMove=function(e){if(this.onMouseMove)this.onMouseMove(e);var objects=this._nodes.GetArray();for(var object in objects)objects[object]._onMouseMove(e)};
me.AddObject=function(O){gizmo.Filter(O,"Object");this._nodes.Add(O)};me.RemoveObject=function(O){gizmo.Filter(O,"Object");return this._nodes.Remove(O)};me.RemoveAll=function(){this._nodes.RemoveAll()};me.SetFunc=function(name,func){gizmo.Filter(name,"String");gizmo.Filter(func,"Function");if(name&&func)this[name]=func;return this};me.GetFunc=function(name){gizmo.Filter(name,"String");if(this[name])return this[name]};me.SetProp=function(name,value){gizmo.Filter(name,"String");if(name&&value)this["_"+
name]=value;return this};me.GetProp=function(name){gizmo.Filter(name,"String");if(this["_"+name])return this["_"+name]};me.GetDefaultName=function(){return this._defaultName};me.SetName=function(name){gizmo.Filter(name,"String");this._name=name};me.GetName=function(){return this._name};me.SetOwner=function(object){gizmo.Filter(object,"Object");this._owner=object;this._owner.AddObject(this)};me.GetOwner=function(){return this._owner};me.HasOwner=function(){return this._owner};me.Set=function(O){gizmo.Filter(O,
"Object");this._owner=O.owner||this._owner;this._name=O.name||this._name;for(var name in O)switch(name){case "owner":this.SetOwner(O[name]);break;case "name":this.SetName(O[name]);break}};me._defaultName="GameNode";me._name=me.GetDefaultName()+ArmGraph.GetNewUnicalNumber();me._owner=null;me._nodes=new ArmContext.Nodes;me.Set(O||{});return me};window.ArmGraph.Node=Node})(window);(function(window){var Nodes=function(O){var me={};me.Add=function(O){gizmo.Filter(O,"Object");this._nodes.push(O);return this};me.Remove=function(O){gizmo.Filter(O,"Object");var index=0;if((index=this._nodes.indexOf(O))!=-1){delete this._nodes[index];return true}else return false};me.RemoveAll=function(){for(var nodeName in this._nodes)this._nodes[nodeName]._clear();this._nodes=[]};me.GetArray=function(){return this._nodes};me.Set=function(O){gizmo.Filter(O,"Object");for(var name in O)switch(name){case "Nodes":var Nodes=
O[name];gizmo.Filter(Nodes,"Array");for(var primitive in Nodes)this.Add(Nodes[primitive]);break}};me._nodes=[];me.Set(O||{});return me};window.ArmContext.Nodes=Nodes})(window);(function(window){var EventQueue=function(){var me={};me.Push=function(reg){try{this._queue.push(reg);return true}catch(e){return false}};me.Pop=function(){var event=this._queue.shift();if(event!=undefined)return event;else return false};me._queue=[];return me};window.ArmGraph.EventQueue=EventQueue})(window);(function(window){var Loop=function(O){gizmo.Filter(O,"Object");var me={};me.Start=function(){if(!this.IsRunning()){if(this.IsPause())this.SetPauseStatus(false);else this.GetBeginFunc()();this._setEachFrame();this._onEachFrame(this.GetStepFunc());this.SetRunningStatus(true)}else console.log("Loop already started!");return this};me.Stop=function(){if(this.IsRunning()){this._cancelAnimationFrame.call(window,this._request);this.SetRunningStatus(false)}else if(this.IsPause())this.SetPauseStatus(false);
return this};me.Pause=function(){if(this.IsRunning()){this._cancelAnimationFrame.call(window,this._request);this.SetRunningStatus(false);this.SetPauseStatus(true)}else console.log("This Loop not started yet!");return this};me.Restart=function(){this.Stop();this.Start();return this};me._setEachFrame=function(){var self=this;var _onEachFrame;if(this.GetFPS()>0){var fps=this.GetFPS();_onEachFrame=function(cb){this._request=setInterval(cb,1E3/fps)};this._cancelAnimationFrame=window.clearInterval}else{if(window.webkitRequestAnimationFrame)_onEachFrame=
function(cb){var _cb=function(){cb();self._request=webkitRequestAnimationFrame(_cb)};_cb()};else if(window.mozRequestAnimationFrame)_onEachFrame=function(cb){var _cb=function(){cb();self._request=mozRequestAnimationFrame(_cb)};_cb()};else if(window.requestAnimationFrame)_onEachFrame=function(cb){var _cb=function(){cb();self._request=requestAnimationFrame(_cb)};_cb()};else if(window.msRequestAnimationFrame)_onEachFrame=function(cb){var _cb=function(){cb();self._request=msRequestAnimationFrame(_cb)};
_cb()};this._cancelAnimationFrame=window.cancelAnimationFrame||window.mozCancelAnimationFrame}this._onEachFrame=_onEachFrame};me.SetFPS=function(fps){gizmo.Filter(fps,"Number");this._fps=fps};me.GetFPS=function(){return this._fps};me.SetStepFunc=function(func){gizmo.Filter(func,"Function");this._stepFunc=func};me.GetStepFunc=function(){return this._stepFunc};me.SetBeginFunc=function(func){gizmo.Filter(func,"Function");this._beginFunc=func};me.GetBeginFunc=function(){return this._beginFunc};me.SetPauseStatus=
function(status){gizmo.Filter(status,"Boolean");this._isPause=status};me.IsPause=function(){return this._isPause};me.SetRunningStatus=function(status){gizmo.Filter(status,"Boolean");this._isRunning=status};me.IsRunning=function(){return this._isRunning};me.Set=function(O){for(var name in O)switch(name){case "fps":this.SetFPS(O[name]);break;case "beginFunc":this.SetBeginFunc(O[name]);break;case "stepFunc":this.SetStepFunc(O[name]);break}if(this.IsRunning()){this.Pause();this.Start()}};me._fps=0;me._stepFunc=
null;me._isRunning=false;me._isPause=false;me._onEachFrame=null;me._cancelAnimationFrame=null;me._request=null;me.Set(O||{});return me};window.ArmGraph.Loop=Loop})(window);(function(window){var Root=function(O){var me={};me.AddObject=function(O){gizmo.Filter(O,"Object");this._nodes.Add(O)};me.RemoveObject=function(O){gizmo.Filter(O,"Object");return this._nodes.Remove(O)};me.Start=function(){this._loop.Start()};me.Stop=function(){this._loop.Stop()};me.Pause=function(){this._loop.Pause()};me.Restart=function(){this._loop.Restart()};me.SetLisener=function(name,func){gizmo.Filter(name,"String");gizmo.Filter(func,"Function");if(name&&func)if(this["_"+name]){gizmo.Filter(this["_"+
name],"Array");var index=0;if((index=this["_"+name].indexOf(func))==-1)this["_"+name].push(func);else console.log("This Function allredy added for event "+name+" of Root "+this.GetName())}else{this["_"+name]=[];this.SetLisener(name,func)}return this};me.GetLisener=function(name){gizmo.Filter(name,"String");if(this["_"+name])return this["_"+name];else return false};me.GetDefaultName=function(){return this._defaultName};me.Begin=function(){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._begin()};
me.Update=function(){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._update()};me.Draw=function(){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._draw()};me.Clear=function(){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._clear()};me.ListenKeybordEvents=function(){var self=this;var SendEvent=function(event){self._eventQueue.Push(event)};window.onkeydown=function(e){SendEvent({name:"onKeyDown",type:"keyboard",
e:e})};window.onkeypress=function(e){SendEvent({name:"onKeyPress",type:"keyboard",e:e})};window.onkeyup=function(e){SendEvent({name:"onKeyUp",type:"keyboard",e:e})}};me.NotListenKeybordEvents=function(){var self=this;window.onkeydown=null;window.onkeypress=null;window.onkeyup=null};me.ProcessEvents=function(){var event;while(event=this._eventQueue.Pop())switch(event.name){case "onKeyDown":this.OnKeyDown(event.e);break;case "onKeyUp":this.OnKeyUp(event.e);break;case "onKeyPress":this.OnKeyPress(event.e);
break;case "onMouseDown":this._onMouseDown(event);break;case "onMouseUp":this._onMouseUp(event);break;case "onMouseMove":this._onMouseMove(event);break}};me.OnKeyDown=function(e){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._onKeyDown(e)};me.OnKeyPress=function(e){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._onKeyPress(e)};me.OnKeyUp=function(e){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._onKeyUp(e)};
me.OnMouseDown=function(e){this._eventQueue.Push({name:"onMouseDown",type:"mouse",e:e})};me._onMouseDown=function(e){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._onMouseDown(e)};me.OnMouseUp=function(e){this._eventQueue.Push({name:"onMouseUp",type:"mouse",e:e})};me._onMouseUp=function(e){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._onMouseUp(e)};me.OnMouseMove=function(e){this._eventQueue.Push({name:"onMouseMove",type:"mouse",e:e})};
me._onMouseMove=function(e){var objects=this._nodes.GetArray();for(var object in objects)objects[object]._onMouseMove(e)};me.SetFPS=function(fps){gizmo.Filter(fps,"Number");this._loop.Set({"fps":fps})};me.GetFPS=function(){return this._loop.GetFPS()};me.Set=function(O){for(var name in O)switch(name){case "layer":switch(gizmo.type(O[name])){case "Array":for(var layer in O[name]){this._layers.push(O[name][layer]);O[name][layer].SetLisener("onMouseMove",this.OnMouseMove);O[name][layer].SetLisener("onMouseDown",
this.OnMouseDown);O[name][layer].SetLisener("onMouseUp",this.OnMouseUp)}break;case "Object":this._layers.push(O[name]);var self=this;O[name].SetLisener("onMouseMove",function(e){self.OnMouseMove(e)});O[name].SetLisener("onMouseDown",function(e){self.OnMouseDown(e)});O[name].SetLisener("onMouseUp",function(e){self.OnMouseUp(e)});break}break;case "fps":this.SetFPS(O[name]);break}};me._defaultName="Root";me._name=me.GetDefaultName()+ArmContext.GetNewUnicalNumber();me._layers=[];me._nodes=new ArmContext.Nodes;
me._eventQueue=new ArmGraph.EventQueue;me._loop=new ArmGraph.Loop({"beginFunc":function(O){return function(){O.Begin()}}(me),"stepFunc":function(O){return function(){O.ProcessEvents();O.Update();O.Clear();O.Draw()}}(me)});me.Set(O||{});return me};window.ArmGraph.Root=Root})(window);
