class Bear{
    constructor(x,y,width,height){
        this.body = Bodies.rectangle(x,y,width,height)
        this.bearimage = loadImage("bear.png")
        this.width = width;
        this.height = height
    }
    display(){
     
       var pos = this.body.position
        push();
       
        imageMode(CENTER);
        image(this.bearimage, pos.x, pos.y, this.width, this.height);
        pop();
      }
}