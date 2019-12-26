const nrows = 22;
const ncols = 10;

const colors = ['white','#ff0000','#000099','#006600','#ff6600','#ffff00'];

class Block {

    constructor() {
        this.left = Math.floor(ncols / 2);
        this.top = 0;
        this.type = Math.floor(Math.random() * types.length);
        this.color = Math.floor(Math.random() * (colors.length - 1)) + 1;
        this.maxRotation = types[this.type].length;
        this.rotation = Math.floor(Math.random() * this.maxRotation);
        this.block = types[this.type][this.rotation]
            .map((x) => x.map((y) => y * this.color));
        this.updateCoord();
    }

    updateCoord() {
        this.maxUp = 0;
        this.maxDown = this.block.length - 1;
        this.maxLeft = 0;
        this.maxRight = this.block[0].length - 1;
    }


    upRotate() {
        var rotation = this.rotation + 1;
        if ( rotation == this.maxRotation ) {
            rotation = 0;
        }
        this.rotation = rotation;
        this.block = types[this.type][this.rotation]
            .map((x) => x.map((y) => y * this.color));
        this.updateCoord();

    }

    downRotate() {
        var rotation = this.rotation - 1;
        if ( rotation < 0 ) {
            rotation = this.maxRotation - 1;
        }
        this.rotation = rotation;
        this.block = types[this.type][this.rotation]
            .map((x) => x.map((y) => y * this.color));
        this.updateCoord();

    }

}

const types = [
    [ 
        [ [ 1 ],
          [ 1 ],
          [ 1 ],
          [ 1 ] ], 

        [ [ 1, 1, 1, 1 ]]
    ],
    [
        [ [ 1, 1 ],
          [ 1, 1 ] ]
    ],
    [
        [ [0, 0, 1 ],
          [1, 1, 1 ] ],
        [ [1, 0 ],
          [1, 0 ],
          [1, 1 ]],
        [ [1, 1, 1 ],
          [1, 0, 0 ] ],
        [ [1, 1 ],
          [0, 1 ],
          [0, 1 ]]
    ],
    [   
        [ [1, 1, 1 ],
          [0, 0, 1 ] ],
        [ [0, 1 ],
          [0, 1 ],
          [1, 1 ]],
        [ [1, 0, 0 ],
          [1, 1, 1 ] ],
        [ [1, 1 ],
          [1, 0 ],
          [1, 0 ]]
    ], 
    [
        [ [ 1, 0 ],
          [ 1, 1 ],
          [ 1, 0 ] ],
        [ [ 1, 1, 1 ],
          [ 0, 1, 0 ] ],
        [ [ 0, 1 ],
          [ 1, 1 ],
          [ 0, 1 ] ],
        [ [ 0, 1, 0 ],
            [ 1, 1, 1 ] ]
    ],
    [
        [ [ 1, 1, 0 ],
          [ 0, 1, 1 ] ],
        [ [ 0, 1 ],
            [ 1, 1 ],
            [ 1, 0 ] ]
    ],
    [
        [ [ 0, 1, 1 ],
          [ 1, 1, 0 ] ],
        [ [ 1, 0],
            [ 1, 1],
            [0, 1] ]
    ]
];

createSkeleton = function() {
    var skeleton = Array(nrows)
        .fill(0)
        .map(() => Array(ncols).fill(0))
    return(skeleton);
}

class Game {
    constructor(skeleton) {
        this.game = createSkeleton();
        this.createNewBlock();
    }
    moveRight() {
        if ( this.currentBlock.left + this.currentBlock.maxRight == ncols -1 ) {
            return null;
        }
        this.currentBlock.left += 1;
        this.sumBlock(this.currentBlock.block,
            this.currentBlock.left,
            this.currentBlock.top);
        if ( this.testOverlap() )
            this.moveLeft();
    }
    moveLeft() {
        if ( this.currentBlock.left == 0 ) {
            return null;
        }
        this.currentBlock.left -= 1;
        this.sumBlock(this.currentBlock.block,
            this.currentBlock.left,
            this.currentBlock.top);
        if ( this.testOverlap() )
            this.moveRight();
    }

    moveDown() {
        if ( this.currentBlock.top + this.currentBlock.maxDown == nrows -1 ) {
            this.sumBlock(this.currentBlock.block,
                this.currentBlock.left,
                this.currentBlock.top, true);
            this.createNewBlock();
            return null;
        }
        this.currentBlock.top += 1;
        this.sumBlock(this.currentBlock.block,
            this.currentBlock.left,
            this.currentBlock.top);
        if ( this.testOverlap() ) {
            this.moveUp();
            this.sumBlock(this.currentBlock.block,
                this.currentBlock.left,
                this.currentBlock.top, true);
            this.createNewBlock();
        }
    }

    moveUp() {
        this.currentBlock.top -= 1;
        if ( this.testOverlap() ) {
            this.currentBlock.top += 1;
        }
        this.sumBlock(this.currentBlock.block,
            this.currentBlock.left,
            this.currentBlock.top);
    }
    sumBlock(block, left, top, update = false) {
        var game = this.game.map((x) => Array.from(x));
        for (var i = 0; i < block.length; i++) { 
            for (var j = 0; j < block[0].length; j++) { 
                if ( block[i][j] != 0 ) {
                    game[top + i][left + j] = block[i][j];
                }
            }
        }
        if ( update == true )  {
           this.game = game;
        }
        this.plotMatrix(game);
    }

    rotate() {
        this.currentBlock.upRotate();
        if ( this.currentBlock.left + this.currentBlock.maxRight >= ncols ) {
            this.currentBlock.downRotate();
            return null;
        }
        if ( this.currentBlock.top + this.currentBlock.maxDown >= nrows ) {
            this.currentBlock.downRotate();
            return null;
        }
        if ( this.testOverlap() )
            this.currentBlock.downRotate();
        this.sumBlock(this.currentBlock.block,
            this.currentBlock.left,
            this.currentBlock.top);
    }
    
    gameOver() {
        x = function() {};
        titleHeader = document.getElementById('titleHeader');
        titleHeader.innerHTML = "GAME OVER!!!";
    }

    testOverlap() {
        var maxLeft = this.currentBlock.maxLeft;
        var maxRight = this.currentBlock.maxRight;
        var maxUp = this.currentBlock.maxUp;
        var maxDown = this.currentBlock.maxDown;
        var left = this.currentBlock.left;
        var top = this.currentBlock.top;
        for (var i = maxUp; i < maxDown + 1; i++) {
            for (var j = maxLeft; j < maxRight + 1; j++) {
                if ( this.currentBlock.block[i][j] > 0 ) {
                    if ( this.game[top + i][left + j] > 0 )
                        return true;
                }
            }
        }
        return false;
    }

    createNewBlock() {
        this.filterCompleteRows();
        this.currentBlock = new Block();
        if ( this.testOverlap() ) {
            this.gameOver();
        }
        this.sumBlock(this.currentBlock.block,
           this.currentBlock.left, 
          this.currentBlock.top);
    }

    plotMatrix(Matrix) {
        for (var i = 0; i < nrows; i++ ) {
            for (var j = 0; j < ncols; j++) {
                document
                    .getElementById(ncols*i+j)
                    .style['background-color'] = colors[Matrix[i][j]];
            }
        }

    };

   filterCompleteRows() {
        game = Array.from(this.game);
        game = game
            .filter(vec => !vec
                .every(n => n > 0));
        var nRest = nrows - game.length;
       if ( nRest == 0)
           return null
       
       game = Array(nRest)
           .fill(0).map(() => Array(ncols).fill(0))
            .concat(game);
        this.game = game;

    }

}


window.addEventListener('load', function() { 
    startSite();
    startNewGame();
}) 

createDivBlock = function(i,height, width) {
    div = document.createElement('div');
    height = 100;
    div.setAttribute('id',i);
    div.style.height = height + "%";
    div.style.width = width + "%";
    div.style.display = "inline-block";
    div.style.margin = "0";
    div.style.padding = "0";
    div.style.color = "black";
    div.style['border-radius'] = '5px';
    return div;
}
startGameDraw = function() {
    var game = document.getElementById('game');
    var height = 100/nrows;
    var width = 100/ncols;
    var counter = 0;
    for (var i = 0; i < nrows; i++ ) {
        row = document.createElement('div');
        row.setAttribute('id', "row" + i);
        row.style.height = height + "%";
        for (var j = 0; j < ncols; j++) {
            row.appendChild(createDivBlock(counter, height, width));
            counter++;
        }
        game.appendChild(row);
        
    }
}

startNewGame = function() {
    startGameDraw();
    startKeyboardEvents();
    document.addEventListener('keydown', event => {
        if ((event.keyCode || event.which) == 78) 
            x = new Game();
    });
}

startKeyboardEvents = function() {
    document.addEventListener('keydown', event => {
        if ( typeof x == "undefined" )
            return null;
        if ((event.keyCode || event.which) == 37) 
            x.moveLeft();
        if ((event.keyCode || event.which) == 38) 
            x.rotate();
        if ((event.keyCode || event.which) == 39)
            x.moveRight();
        if ((event.keyCode || event.which) == 40)
            x.moveDown();
    });
}

createHeader = function() {
    header = document.createElement('div');
    header.style.width = "100%";
    header.style.height = "10%";
    header.style['padding-top'] = "5%";
    header.style['margin-bottom'] = "0%";

    titleHeader = document.createElement('div');
    titleHeader.setAttribute('id','titleHeader');
    titleHeader.style['font-family'] = "'Press Start 2P'";
    titleHeader.style['font-size'] = "155%";
    titleHeader.style['text-align'] = "center";
    titleHeader.innerHTML = "TETRIS";

    textHeader = document.createElement('div');
    textHeader.setAttribute('id','textHeader');
    textHeader.style['font-family'] = "'Press Start 2P'";
    textHeader.style['font-size'] = "55%";
    textHeader.style['text-align'] = "center";
    textHeader.innerHTML = "<br><br> Press 'n' to start <br> <br> ";

    header.appendChild(titleHeader);
    header.appendChild(textHeader);
    return header;
}

startSite = function() {
    body = document.body;
    body.style.height = "800px";
    body.style.width = "800px";
    div = document.createElement('div');
    div.setAttribute('id', 'main');
    div.style.height = "100%";
    body.appendChild(div);

    header = createHeader(); 

    game = document.createElement('div');
    game.setAttribute('id','game'); 
    game.style.width = "40%";
    game.style.height = "90%";
   game.style['border-style'] = "double";
   game.style['margin-left'] = "30%";
   game.style['margin-right'] = "30%";

    div.appendChild(header);
    div.appendChild(game);
    
}
