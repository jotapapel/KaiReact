#! /bin/sh
clear
echo "styles"
sass src/css:dist/src/css --no-source-map
echo "styles: ready"
echo "script"
tsc
jsmin <dist/src/js/react.js> dist/src/js/react.min.js
jsmin <dist/src/js/foundation.js> dist/src/js/foundation.min.js
echo "script: ready"
echo "cleaning files"
rm dist/src/js/react.js
rm dist/src/js/foundation.js
echo "cleaning: ready"