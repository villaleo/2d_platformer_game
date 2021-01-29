let mario, mario_walking_right, mario_walking_left, mario_still;
let mario_facing_left_img, mario_facing_right_img, goomba_rightFoot_img, goomba_leftFoot_img, mario_small_step_right_img, mario_big_step_right_img, mario_jumping_left_img, mario_jumping_right_img, block_img, walk_positions;
let floor_level;
let right_button_hold, left_button_hold;
let hue, blocks, dx, surface, isJumping;
let clouds, lives, song, gameIsOver;

function preload() {
  song = loadSound("Super Mario Bros. Theme Song.mp3");
}

function setup() {
  song.loop();
  hue = 360;
  gameIsOver = false;
  createCanvas(700, 700);
  colorMode(HSB, hue, 100, 100);

  // Loading Images ::
  mario_facing_right_img = loadImage("mario_facing_right.png");
  mario_facing_left_img = loadImage("mario_facing_left.png");
  mario_jumping_right_img = loadImage("mario_jumping.png");
  block_img = loadImage("https://lh3.googleusercontent.com/ZWSW33OuzBbl1lwheWx3pAhvLLP6aNZFEZZEl644dOp1acrXE-IcV8oxvWHITExiu9q5vTcPvoAme9n03Y_mEu4=s400");
  mario_jumping_left_img = loadImage("mario_jumping_left.png")
  goomba_rightFoot_img = loadImage("goomba_right_step.png");
  goomba_leftFoot_img = loadImage("goomba_left_step.png");
  mario_small_step_right_img = loadImage("mario_small_step_right.png");
  mario_big_step_right_img = loadImage("mario_big_step_right.png");

  // Instantiation Field ::
  mario = new Player();
  goomba1 = new Goomba();
  cloud = new Cloud();
  lives = 3; score = 0;

  dx = 0;
  blocks = [];
  for (let i = 0; i < 15; i++) {
    blocks.push(new Block(dx, height - 50, 50, 50));
    dx += 50;
  }
  
  clouds = [];
  for (let c = 0; c < 4; c++) {
    clouds.push(new Cloud());
  }
  
  right_button_hold = false;
  left_button_hold = false;
  mario_walking_right = false;
  mario_walking_left = false;
  mario_still = true;
  surface = height - 130;
  song.setVolume(25);
}

function draw() {
  background(200, 100, 100);
  if (gameIsOver) {
    frameRate(0);
    console.log("Game over.");
    song.pause();
  }

  // Displays the blocks ::
  for (let j = 0; j < blocks.length; j++) {
    blocks[j].display();
  }
  // Mario's function calls ::
  mario.showself();
  mario.hit_box();
  mario.jump();
  // Checks if the user is holding the move buttons ::
  if (right_button_hold) {
    mario_walking_right = true;
    mario_walking_left = false;
    mario.x += mario.speed;
  }
  if (left_button_hold) {
    mario_walking_left = true;
    mario_walking_right = false;
    mario.x -= mario.speed;
  }
  if (mario.x <= 10) {
    mario.x = 10;
  }
  //clouds
  for(let c=0;c<clouds.length;c++){
  clouds[c].show();
   clouds[c].movement();
   goomba1.movement();
   //score/lives
   displayScore();
   //goomba
   goomba1.showself();
  }
}

class Block {
  constructor(x, y, w) {
    this.x = x;
    this.y = y;
    this.w = w;
  }
  // Displays a block ::
  display() {
    image(block_img, this.x, this.y, this.w, this.w);
  }
} 

class Player {
  constructor() {
    this.x = 120;
    this.y = height - 130;

    this.speed = 3;
    this.gravity = .3;
    this.velocity = 0;
    this.lift = -10;
  }
  // Creates Mario's hitbox ::
  hit_box() {
    noFill();
    noStroke();
    rect(this.x, this.y, 60, 80);
  }
  
  // Displays Mario ::
  showself() {
    // TODO :Create the illusion of animation
    if (!isJumping) {
      image(mario_facing_right_img, this.x, this.y, 60, 80);
    }
    if (left_button_hold) {
      image(mario_facing_left_img, this.x, this.y, 60, 80);
    }
    if (isJumping && mario_walking_right) {
      image(mario_jumping_right_img, this.x, this.y, 75, 90);
    }
    if (isJumping && mario_walking_left) {
      image(mario_jumping_left_img, this.x, this.y, 75, 90);
    }
  }
  // Checks if Mario collides with somethings ::
  checkCollision() {
    // TODO :Check if mario collides with certain objects
  }

   jump() {
    if (this.y < surface && !isJumping) {
      //console.log(`being pulled`);
      this.y += this.velocity;
      this.velocity += this.gravity;
      if (this.y >= surface) {
        //console.log(`at surface`)
        this.y = surface;
        this.velocity = 0;
        isJumping = false;
      }
    }
    if (isJumping) {
      this.y-= 10;
      
    }
  }
}

class Cloud {
  constructor() {
    this.x=random(600,650);
    this.y= random(0,350);
    this.speed=3
    this.size=random(60,100) 
  }
  show(){
    fill(100);
    ellipse(this.x,this.y,this.size,40)
  }
  movement()  {
    this.x-=this.speed
    if(this.x<0){
      this.x=width
      this.y=random(0,400);
    }
  }
}

function keyPressed() {
  switch (keyCode) {
    case 39: // Right (RIGHT ARROW)
    right_button_hold = true;
    left_button_hold = false;
    // TODO :Create the illusion of animation
    //console.log('moving right');
    break;
    
    case 37: // Left (LEFT ARROW)
    left_button_hold = true;
    right_button_hold = false;
    // TODO :Create the illusion of animation
    //console.log(`moving left`);
    break;

    case 32: // Up (SPACE)
    // TODO :Special condition in case moving and jumping
    isJumping = true;
    //console.log(`jumping`);
    break;

    default:
    // TODO :Special condition to resume current process
    console.log(`wrong key`);
    break;
  }
}

function keyReleased() {
  switch(keyCode) {
    case 39: 
    right_button_hold = false;
    break;

    case 37:
    left_button_hold = false;
    break;

    case 32:
    //console.log(`not jumping`)
    isJumping = false;
    break;

    default:
    break;
  }
}

function displayScore() {
  text(`Lives: ${lives}`, 10, 20);
  text(`Score: ${score}`, 10, 40)
  if (lives <= 0) {
    gameIsOver === true;
    textSize(30);
    text(`Game Over`,width/2,height/2);
  }
}

//if(collideRectRect(this.x, this.y, this.width, this.height, Player.x, Player.y, Player.width, Player.height)){

class Goomba {
  constructor(){
    this.x = width;
    this.y = height - 118;
    this.speed = -0.25;
    this.showing = true;
  }
  showself() {
    // TODO :Create the illusion of animation
    if(this.showing == true){
      image(goomba_rightFoot_img , this.x, this.y, 70, 90);
      this.hit_box(); 
      this.check_hit();
    }
    
  }
  movement(){
    this.x += this.speed;
  }

  hit_box(){
    noFill();
    //stroke(50); 
    noStroke();
    rect(this.x + 10, this.y + 20, 50, 1);
    rect(this.x + 10, this.y + 25, 1, 50);
    rect(this.x + 60, this.y + 25, 1, 50);
  }
  check_hit(){ 
    if(  collideRectRect(mario.x, mario.y, 60, 80, goomba1.x + 10, goomba1.y + 20, 50, 1) && (!collideRectRect(mario.x, mario.y, 60, 80, goomba1.x + 10, goomba1.y + 25, 1, 50))  && (!collideRectRect(mario.x, mario.y, 60, 80, goomba1.x + 60, goomba1.y + 25, 1, 50))){
      this.showing = false;
    }

    // LEO LEO !!!! um when i subtract lives it kills him too quickly
    if(collideRectRect(mario.x, mario.y, 60, 80, goomba1.x + 10, goomba1.y + 25, 1, 50) || collideRectRect(mario.x, mario.y, 60, 80, goomba1.x + 60, goomba1.y + 25, 1, 50)){
      lives -= 1;
      
    }



  }
}