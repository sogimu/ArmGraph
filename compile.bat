::--compilation_level
::WHITESPACE_ONLY
::SIMPLE_OPTIMIZATIONS
::ADVANCED_OPTIMIZATIONS

java -jar compiler.jar --js frameworks/Gizmo/gizmo-0.2.8.js --js modules/ArmLib/ArmLib.js --js modules/ArmObj/ArmObj.js --js modules/ArmObj/VisualObj/Skeleton.js --js modules/ArmObj/VisualObj/VisualObj.js --js modules/ArmObj/VisualObj/Primitive/Primitive.js --js modules/ArmObj/VisualObj/Object/Object.js --js modules/Layer/EventStack.js --js modules/Layer/Layer.js --js modules/ArmObj/VisualObj/Primitive/Rect/Rect.js --js modules/ArmObj/VisualObj/Primitive/Image/Image.js --js modules/ArmObj/VisualObj/Primitive/Line/Line.js --js modules/ArmObj/VisualObj/Primitive/Circle/Circle.js --compilation_level SIMPLE_OPTIMIZATIONS  --language_in ECMASCRIPT5 --js_output_file ../armlib-0.1.0.js

pause