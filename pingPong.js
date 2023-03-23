const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
var windowCutter = 6;
canvas.width = window.innerWidth - windowCutter;
canvas.height = window.innerHeight - windowCutter;
/*const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resize()
  window.addEventListener('resize', resize)*/

/*const ballX = canvas.width/2;
const ballY = canvas.height/2;
const ballR = 30;
ctx.fillStyle = 'red'; */

const circle = {
    x: canvas.width/2, //starting X of the ball
    y: canvas.height/2, //starting Y of the ball
    r: 12.5, //the radius of the ball
    h: canvas.width/750, //the horizontal speed of the ball
    v: canvas.height/525 //the vertical speed of the ball
};
var count = 0; // a counter
var playerPoints = 0; // points of player
var computerPoints = 0; //points of AI
var timer = 10; //timer


const rectAI = {
    x: canvas.width-50, //AI x-position
    y: canvas.height/2, //Ai y-position
    w: 12.5, //rect AI width
    h: canvas.height/10, //AI height
    speed: canvas.height/275 //speed of AI
};

const rectPlayer = {
    x: 50, // player X-position
    y: canvas.height/2, // player Y-position
    w: 12.5, // rect player width
    h: canvas.height/10, // rect player height
    speed: canvas.height/175, //player speed
    y2: canvas.height/2 //something to test speed
};

const textBox = {
    x: canvas.width/2-50,
    y: 0,
    w: canvas.width/2 + 50,
    h: canvas.height/10,
    text: ""
}
function drawCircle(x,y,r) { //drawing the ball
    ctx.beginPath(); 
    ctx.arc(x, y, r, 0, Math.PI*2, false);
    ctx.fillStyle = 'white';
    ctx.fill();
}

function drawAI(x,y,w,h){ //drawing the AI
    ctx.fillRect(x,y,w,h);
}

function drawPlayer(x,y,w,h){ //drawing the player
    ctx.fillRect(x,y,w,h);
}

function centerLine(pointOneX,pointOneY, pointTwoX, pointTwoY){ //the dashed line in the center
    ctx.setLineDash([5,10]);
    ctx.beginPath();
    ctx.lineWidth = "2";
    ctx.strokeStyle = "white";
    ctx.moveTo(pointOneX, pointOneY);// canvas.width/2,0
    ctx.lineTo(pointTwoX, pointTwoY);//canvas.width/2,canvas.height
    ctx.stroke();
}

function delayGame(){
//trying to pause the game when someone scores or wins but not sure how to
}
function pointText(playerPointX,computerPointX, pointY){ //text for the points
    ctx.fillText("Player Points", playerPointX, pointY);
    ctx.fillText("Computer Points", computerPointX, pointY);
    ctx.fillText(playerPoints, playerPointX, pointY+50);
    ctx.fillText(computerPoints, computerPointX, pointY+50);
}
function boxText(text){//text at the bottom displaying who scored/won
    ctx.fillStyle = "black";
    ctx.fillText(text, canvas.width/2, canvas.height-15);
}

function doKeyDown(evt){//down arrow and up arrow makes player go up and down
	switch (evt.keyCode) {
		case 38:  /* Up arrow was pressed */
            rectPlayer.speed *= -1;
            /*if (rectPlayer.y2 < 6){
                rectPlayer.y2 += canvas.width/75
            }
			rectPlayer.y2 -= canvas.width/75;*/

            //rectPlayer.y -= canvas.width/60;
			break;

		case 40:  /* Down arrow was pressed */
            rectPlayer.speed *= -1;

            /*if (rectPlayer.y2 > canvas.height-rectPlayer.h-6){
            rectPlayer.y2 -= canvas.width/75
            }
            rectPlayer.y2 += canvas.width/75;*/

            //rectPlayer.y += canvas.width/60;
			break;
	}
}

function update(){ //the game
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
    drawCircle(circle.x, circle.y, circle.r);
    drawAI(rectAI.x, rectAI.y, rectAI.w, rectAI.h);
    centerLine(canvas.width/2, 0, canvas.width/2,canvas.height);
    drawPlayer(rectPlayer.x, rectPlayer.y, rectPlayer.w, rectPlayer.h);
    pointText((canvas.width/4),(canvas.width/4)*3, 50);

    ctx.fillRect(0,canvas.height-50,canvas.width,50);
    boxText(textBox.text);

    rectPlayer.y += rectPlayer.speed;
    if (rectPlayer.y > canvas.height - rectPlayer.h - 50 || rectPlayer.y < 0){
        rectPlayer.y -= rectPlayer.speed;
    }

    /*if (rectPlayer.y != rectPlayer.y2 && rectPlayer.y > rectPlayer.y2){
        rectPlayer.y += rectPlayer.speed;
    }
    else if (rectPlayer.y != rectPlayer.y2 && rectPlayer.y > rectPlayer.y2){
        rectPlayer.y -= rectPlayer.speed;
    }*/

    //circle is CenterPlaced and rect is TopLeftPlaced
    if (rectAI.y != circle.y && circle.y > rectAI.y){
        rectAI.y += rectAI.speed;
    }
    else if (rectAI.y != circle.y && circle.y < rectAI.y){
        rectAI.y -= rectAI.speed;
    }

    ctx.font = "35px Arial";
    ctx.textAlign = "center";
    
    /*if (circle.x > canvas.width - (circle.r/2) || circle.x < (circle.r/2)){
        circle.h *= -1;
    }*/

    /*if (circle.y >= rectAI.y && circle.y <= (rectAI+rectAI.h) && circle.x >= (rectAI.x - rectAI.w/2) && circle.x <= rectAI.x){
        circle.h *= -1;
    }*/

    if (circle.x >= rectAI.x - circle.r/2 && circle.x <= rectAI.x && circle.y <= rectAI.y + rectAI.h&& circle.y >= rectAI.y){
        circle.h *= -1.33; //If the ball collides with the AI, the ball will deflect and go the opposite way while increasing its speed by 10%
    }

    if (circle.x >= rectPlayer.x + rectPlayer.w &&  circle.x <= rectPlayer.x + (rectPlayer.w *2) && circle.y >= rectPlayer.y - circle.r/2 && circle.y <= rectPlayer.y + rectPlayer.h + circle.r){
        circle.h *= -1.33; //If the ball collides with the player, the ball will deflect and go the opposite way while increasing its speed by 10%
    }

    if (circle.y > canvas.height - (circle.r/2) - 50 || circle.y < (circle.r/2)){
        circle.v *= -1; //If the ball hits the ceiling or floor, it'll bounce the opposite way vertically
    }
    if ((circle.y >= rectPlayer.y - (circle.r/2) && circle.x <= rectPlayer.x + rectPlayer.w && circle.x >= rectPlayer.x && circle.y <= rectPlayer.y) || (circle.y <= rectPlayer.y + (circle.r/2) + rectPlayer.h && circle.x <= rectPlayer.x + rectPlayer.w && circle.x >= rectPlayer.x && circle.y >= rectPlayer.y + rectPlayer.h)){
        circle.v *= -1; //If the ball hits the top or bottom of the Player, the ball will bounce vertically
    }
    if ((circle.y >= rectAI.y - (circle.r/2) && circle.x <= rectAI.x + rectAI.w && circle.x >= rectAI.x && circle.y <= rectAI.y) || (circle.y <= rectAI.y + (circle.r/2) + rectAI.h && circle.x <= rectAI.x + rectAI.w && circle.x >= rectAI.x && circle.y >= rectAI.y + rectAI.h)){
        circle.v *= -1; //If the ball hits the top or bottom of the AI, the ball will bounce vertically
    }

    if (playerPoints == 20){
        
        textBox.text = ("You have won. Good job!!!!! :]");
        timer = 0;
        playerPoints = 0;
        computerPoints = 0;
    }
    else if (computerPoints == 20){
        textBox.text = ("The Computer has won. You lose!!!!! :P")
        timer = 0;
        playerPoints = 0;
        computerPoints = 0;
    }

    if (circle.x > canvas.width + (circle.r)){
        textBox.text = "The Player scored!"
        boxText(textBox.x, textBox.y, textBox.w, textBox.h, textBox.text);
        circle.x = canvas.width/2;
        circle.y = Math.floor(Math.random() * (canvas.height-circle.r-51)) + circle.r;
        circle.h = canvas.width/750;
        playerPoints +=1;
        
    }
    
    else if (circle.x < 0 - (circle.r)){
        textBox.text = "The Computer scored!"
        boxText(textBox.x, textBox.y, textBox.w, textBox.h, textBox.text);
        circle.x = canvas.width/2;
        circle.y = Math.floor(Math.random() * (canvas.height-circle.r-51)) + circle.r;
        circle.h = -(canvas.width/750);
        computerPoints +=1;
        
    }
    circle.x += circle.h;
    circle.y += circle.v;
    
    //requestAnimationFrame(update);
}
function game(){ //the canvas will refresh every 10 milliseconds so it'll look like its animated
    setInterval(update,timer);
}
game()

//setInterval(update,timer);
window.addEventListener('keydown',doKeyDown,true);
