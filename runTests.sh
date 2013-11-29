#!/bin/bash

phantomjs tests/run-qunit.js tests/index.html junit-xml > tests/testsResult.xml
phantomjs tests/run-qunit.js tests/testsForMiniVersion.html junit-xml > tests/testsResultForMiniVersion.xml