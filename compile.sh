#!/bin/bash

# --compilation_level
# WHITESPACE_ONLY
# SIMPLE_OPTIMIZATIONS
# ADVANCED_OPTIMIZATIONS

NAME="armcontext"
VERSION="0.5.0"
RASHIR="js"

FILE_NAME=$NAME-$VERSION.$RASHIR
FILE_NAME_WITH_OUT_VERSION=$NAME.$RASHIR

#COMPILATION_LEVEL="WHITESPACE_ONLY"
COMPILATION_LEVEL="SIMPLE_OPTIMIZATIONS"
#COMPILATION_LEVEL="ADVANCED_OPTIMIZATIONS"

echo "$FILE_NAME"
java -jar compiler.jar --js modules/ArmContext/ArmContext.js --js modules/Primitve/InternalRepresentation.js --js modules/Primitve/GlobalRepresentation.js --js modules/Primitve/C2dContextRepresentation.js --js modules/Primitve/MvMatrix.js --js modules/Primitve/Debug.js --js modules/Primitve/Primitive.js --js modules/Primitve/Image/Image2dContextRepresentation.js --js modules/Primitve/Image/ImageGlobalRepresentation.js --js modules/Primitve/Image/ImageInternalRepresentation.js --js modules/Primitve/Image/Image.js --js modules/Primitve/Rect/Rect2dContextRepresentation.js --js modules/Primitve/Rect/RectGlobalRepresentation.js --js modules/Primitve/Rect/RectInternalRepresentation.js --js modules/Primitve/Rect/Rect.js --js modules/Layer/Loop.js --js modules/Layer/Layer.js --compilation_level "$COMPILATION_LEVEL" --language_in ECMASCRIPT5 --js_output_file ./$FILE_NAME

echo "$FILE_NAME_WITH_OUT_VERSION"
cp "$FILE_NAME" "$FILE_NAME_WITH_OUT_VERSION"