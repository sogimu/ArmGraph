#!/bin/bash

PATH_TO_CODE="./modules"
PATH_TO_JSDOC="./lib/jsdoc/jsdoc.js"
PATH_TO_DOCS_FILE="./doc"

python ./lib/generateDocs.py "$PATH_TO_CODE" "$PATH_TO_DOCS_FILE" "$PATH_TO_JSDOC"