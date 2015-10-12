![YSON](logo.png?raw=true "YSON")

Give you all the modules you need in a single expression.

#### Features
* Globstar patterns support
* Single expression to get all what you need

#### Usage
Given the following files structure:

```
/tasks
  to-png.js,
  attach-meta.js,
  crop-resize.js
/utils
  object.js,
  collection.js
/config
  theme.js,
  controls.js
package.json  
```      
And expression:

```javascript
var $ = require('requirist')(
    // Natives
    'fs',
    'path',
    
    // Node Modules
    'lodash as _'
    
    // Local Modules
    './tasks/*',
    './utils/* as utils',
    './config/theme as themeManager',
    './package.json as config'
);
```
Bundle object ``$`` will look like:

```javascript
  {
    fs: {},    // Native node fs module
    path: {},  // Native node path module,
    
    _: {},     // Lodash itself,
    
    toPng: {}, // Exports of 'to-png.js'
    ...
    
    utilsobject: {}, // Exports of './utils/object.js'm
    ...
    
    themeManager: {}, // Exports of './config/theme.js',
    config: {}        // Package information
  }
```
