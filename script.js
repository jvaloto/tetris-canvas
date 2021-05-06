//pecas do tetris
//https://www.reddit.com/r/cellbits/comments/auxu40/voc%C3%AAs_sabiam_que_as_pe%C3%A7as_do_tetris_tem_nomes_ps%C3%A9/



// 20 x 10

var canvas = document.getElementById("screen")
var ctx = canvas.getContext("2d")
var startX = 200
var startY = 0
var currentX = 200
var currentY = 0
var blocksToMove = 5
var blocksToMovePress = 100
var listBlocks = new Array()
var currentBlock = null
var pointsPerBlock = 100
var actualPoints = 0
var recordPoints

function doIt(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Math.floor(Math.random()*6)

    if(!currentBlock){
        currentBlock = createBlock("smashboy");
    }

    drawnBlocks()

    checkColision()

    updateScore()
}

function drawnBlocks(){
    listBlocks.forEach(item =>{
        drawnBlock(item)
    })
    
    drawnBlock(currentBlock);
    
    currentY += blocksToMove

    if(currentY >= ( canvas.height - 90 )){
        resetBlock()
    }else{
        currentBlock.drawn.y = currentY
    }
}

function drawnBlock(block){
    ctx.beginPath()
    ctx.rect(block.drawn.x, block.drawn.y, block.drawn.w, block.drawn.h);
    ctx.fillStyle = block.color
    ctx.fill()
    ctx.stroke()
    ctx.closePath()
}

function createBlock(type){
    let newBlock = {}
    newBlock.color = getColor()

    if(type == "orange_ricky"){
        ctx.moveTo(0, 50)
        ctx.rect(0, 50, 150, 50)
        ctx.moveTo(100, 50);
        ctx.rect(100, 0, 50, 50)
    }else if(type == "blue_ricky"){
        ctx.moveTo(0, 0)
        ctx.rect(0, 0, 50, 50)
        ctx.moveTo(0, 50);
        ctx.rect(0, 50, 150, 50)
    }else if(type == "cleveland_z"){
        ctx.moveTo(0, 0)
        ctx.rect(0, 0, 100, 50)
        ctx.moveTo(50, 50);
        ctx.rect(50, 50, 100, 50)
    }else if(type == "rhode_island_z"){
        ctx.moveTo(50, 0)
        ctx.rect(50, 0, 100, 50)
        ctx.moveTo(0, 50);
        ctx.rect(0, 50, 100, 50)
    }else if(type == "hero"){
        newBlock.drawn = { x: startX, y: startY, w: 50, h: 200 }
    }else if(type == "teewee"){
        newBlock.drawn = { x: startX, y: startY, w: 150, h: 50 }
    }else if(type == "smashboy"){
        newBlock.drawn = { x: startX, y: startY, w: 100, h: 100 }
    }

    return newBlock;
}

function resetBlock(){
    listBlocks.push(currentBlock);

    currentBlock = null

    currentY = startY

    actualPoints += pointsPerBlock
}

function checkColision(){
    if(currentBlock != null){
        listBlocks.forEach(item =>{
            if(currentBlock != null &&
            item.drawn.x == currentBlock.drawn.x &&
            item.drawn.y == ( currentBlock.drawn.y + currentBlock.drawn.h) ){
                resetBlock()
            }
        })
    }
}

function updateScore(){
    document.getElementById("actual-pts").innerHTML = actualPoints

    if(actualPoints >= localStorage.getItem("record")){
        localStorage.setItem("record", actualPoints)
    }

    document.getElementById("record-pts").innerHTML = localStorage.getItem("record")
}

function getColor(){
    return "#"+ Math.floor(Math.random()*16777215).toString(16)
}

function keyDownHandler(e){
    if(e.key == "ArrowRight"){
        if(currentBlock.drawn.x <= 380 ){
            currentBlock.drawn.x += blocksToMovePress
        }
    }else if(e.key == "ArrowLeft"){
        if(currentBlock.drawn.x >= 20 ){
            currentBlock.drawn.x -= blocksToMovePress
        }
    }else if(e.key == "ArrowDown"){
        currentY += 50
    }
}

// setInterval(doIt, 50 )
// doIt()

document.addEventListener("keydown", keyDownHandler, false)