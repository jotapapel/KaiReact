#! /bin/sh
tsc
jsmin <dist/src/js/react.js> dist/src/js/react.min.js; rm dist/src/js/react.js
jsmin <dist/src/js/foundation.js> dist/src/js/foundation.min.js; rm dist/src/js/foundation.js
echo "ready"