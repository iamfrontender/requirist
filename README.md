![YSON](logo.png?raw=true "YSON")

Give you all the modules you need. Attempts to do it in declarative maner.

```javascript
var $ = require('requirist')({
    // Natives
    'fs',
    'path',
    
    // Node Modules
    'lodash as _'
    
    // Local Modules
    '../utils/namespace-composer as ncomposer',
    '../static.json as static'
});
```