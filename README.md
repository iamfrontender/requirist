![YSON](logo.png?raw=true "YSON")

Give you all the modules you need in a single expression.

#### Features
* Globstar patterns support
* Single expression to get all what you need

```javascript
var $ = require('requirist')(
    // Natives
    'fs',
    'path',
    
    // Node Modules
    'lodash as _'
    
    // Local Modules
    './constants/*',
    '../utils/namespace-composer as ncomposer',
    '../static.json as config'
);
```