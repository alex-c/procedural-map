# procedural-map
Two-dimensional maps generator using procedural generation from a seed. For seedless random generation, check out [random-walk-map](https://github.com/alex-c/random-walk-map).

## Installation
Install via npm:

    $ npm install --save procedural-map

## Usage
Call the function exposed by the package to generate a two-dimensional map with connected paths. It returns a matrix (an array of arrays), where each postion contains 0 (default) or 1 (a path).

```javascript
  let generateMap = require('procedural-map');

  //Generate a map with default config
  let map = generateMap("some-seed");

  /* Example output:
  *   map =[[0, 0, 0, 0, 1],
  *         [0, 0, 0, 0, 1],
  *         [0, 1, 1, 0, 1],
  *         [0, 0, 1, 1, 1],
  *         [0, 0, 0, 0, 0]]
  */
```

## Configuration
The generator can take a config object as second parameter, with any of the following parameters:

```javascript
  let map = generateMap("some-seed", {
      numberOfPaths: 10,           //Number of paths to draw
      minPathLength: 1,            //Minimal length of a path
      maxPathLength: 5,            //Maximal length of a path
      maxWidth: 24,                //Maximum width of the map - x index will go from 0 to 23
      maxHeight: 18,               //Maximum height of the map - y index will go from 0 to 17
      startPosition: {x: 0, y: 0}  //Position at which random walk is started
  });
```
