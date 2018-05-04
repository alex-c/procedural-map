const seedrandom = require('seedrandom');

function random(rng, min, max) {
    return Math.floor(rng() * (max - min)) + min;
}

function step(x, y, direction) {
    return [x + direction[0], y + direction[1]];
}

function validatePosition(map, x, y) {
    return x >= 0
        && x < map[0].length
        && y >= 0
        && y < map.length;
}

function generateMap(seed, configOverride) {

    var rng = seedrandom(seed);

    //Make config parameter optional
    var configOverride = configOverride || {}

    //Default configuration overwritten if needed
    var config = {
        numberOfPaths: configOverride.numberOfPaths || 30,
        minPathLength: configOverride.minPathLength || 5,
        maxPathLength: configOverride.maxPathLength || 12,
        maxWidth: configOverride.maxWidth || 30,
        maxHeight: configOverride.maxHeight || 30,
        startPosition: configOverride.startPosition || {x: -1, y: -1}
    }

    //Ensure valid starting position
    if (config.startPosition.x < 0 || config.startPosition.x >= config.maxWidth) {
        config.startPosition.x = random(rng, 0, config.maxWidth);
    }
    if (config.startPosition.y < 0 || config.startPosition.y >= config.maxHeight) {
        config.startPosition.y = random(rng, 0, config.maxHeight);
    }

    //Generate empty map
    var map = [];
    for (var y = 0; y < config.maxHeight; y++) {
        map.push([]);
        for (var x = 0; x < config.maxWidth; x++) {
            map[y].push(0);
        }
    }

    //Available directions
    var directions = [
        [-1,  0], //left
        [ 1,  0], //right
        [ 0, -1], //down
        [ 0,  1]  //up
    ]

    //Initialize variables needed during generation
    var x = config.startPosition.x;
    var y = config.startPosition.y;
    map[y][x] = 1;
    var direction;
    var lastDirection;
    var pathLength;

    //Generate paths
    for (var i = 0; i < config.numberOfPaths; i++) {

        //Select a path length
        pathLength = random(rng, config.minPathLength, config.maxPathLength + 1);

        //Select direction, which allows at least one step, and is different from the previous direction
        do {
            direction = directions[random(rng, 0, directions.length)];
        } while (!validatePosition(map, ...step(x, y, direction)) || (lastDirection && direction == lastDirection));

        //Step until path length or map boundary reached
        for (var j = 0; j < pathLength; j++) {
            //Check if step is possible
            if (!validatePosition(map, ...step(x, y, direction))) {
                break;
            }
            //Perform step
            [x, y] = step(x, y, direction);
            map[y][x] = 1;
        }

        //Store last direction
        lastDirection = direction;
    }

    //Done generating!
    return map;
}

module.exports = generateMap;
