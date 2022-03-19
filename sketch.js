let font;
let neuro,ux,vd;
let neurolist = ['wet lab techniques','MATLAB','Python','Microsoft Suite tools'];
let uxlist = ['survey design','user testing','Figma', 'Sketch'];
let vdlist = ['Photoshop','Illustrator','InDesign'];
let neurovdlist = ['poster design'];
let neurouxlist = ['quant. data analysis','designing research questions','data driven design'];
let uxvdlist = ['illustration', 'information architecture'];
let allList = ['visual communication','creative problem solving', 'storytelling','data visualization'];

let cnv;



function preload(){
  font = loadFont('https://cdn.jsdelivr.net/gh/lillylin998/portfolio-wd-animation@main/cream-DEMO.ttf');
}

function setup() {
  cnv = createCanvas(800, 600);
  cnv.parent('wd-sketch');
  rectMode(CENTER);
  neuro = new Interest(width/3,height/3,'neuroscience',neurolist,-90,0, [237, 106, 90]); //red
  ux = new Interest(width*2/3, height/3, 'UX R&D',uxlist,-50,0,[204, 230, 244]); //blue
  vd = new Interest(width/2, height*2/3, 'visual design', vdlist,-85,50,[181, 202, 141]); //green
}

function draw() {
  background('#272727');
  
  neuro.display();
  ux.display();
  vd.display();
  mouseTrack(neuro,vd,ux);
  
  //mouseTrack(mouseX,mouseY);
  
}

function mouseTrack(n,v,u){
  n.overlapped=false;
  v.overlapped=false;
  u.overlapped=false;
  if(n.filled){
    if(v.filled){
    //if mouse is on overlap between neuro and vd
      n.overlapped=true;
      v.overlapped=true;
     // n.overlap(neurovdlist);

      if(u.filled){
        //if all are filled
        u.overlapped=true;
        v.overlap(allList);
      }else{
         n.overlap(neurovdlist);
      }
    } else if (u.filled){
      //if mouse is on overlap between neuro and vd
      n.overlapped=true;
      u.overlapped=true;
      n.overlap(neurouxlist);
    }
  } else if (v.filled) {
    if(u.filled){
        //if mouse is on overlap between ux and vd
        v.overlapped=true;
        u.overlapped=true;
        v.overlap(uxvdlist);
    }
  }
  
}


class Interest{
  constructor(x,y,name,traits,offsetx,offsety,c){
    this.name = name;
    this.traits = traits;
    this.x = x;
    this.y = y;
    this.offsetx = offsetx;
    this.offsety=offsety;
    this.overlapped = false;
    this.filled=false;
    this.color = c;
  }
  
  display(){
     
  //print(this.filled);
  noStroke();
  textFont(font);
  textSize(30);
     fill(255,255,255);
                 text(this.name,this.x+this.offsetx,this.y+this.offsety);
    
    // if(mouseX>=this.x-350/2 && mouseX<=this.x+350/2 && mouseY >= this.y-350/2 && mouseY <= this.y + 350/2 ){
    if(this.checkCollision(mouseX,mouseY)){
   fill(this.color[0],this.color[1], this.color[2],90)
      this.filled=true;
      //might not even need this variable
      if(!this.overlapped){
      let textpos = mouseY;
      push()
      for(let i in this.traits){ 
        fill(255); 
        noStroke();
        textSize(18)
        text(this.traits[i],mouseX-50,textpos);
        textpos += 25;
      }
      pop();
      } 
    } else {
    // } else{
      this.filled=false;
    noFill();
    }
   // }
  //  stroke(this.color[0],this.color[1],this.color[2])
    stroke(255,255,255)
    circle(this.x,this.y,350);
  }
  
  overlap(newlist){
    let textpos = mouseY;
    push();
  //  fill(255,255,0);
    strokeWeight(2);
    for(let i in newlist){ 
 fill(255);       
      if(newlist.length>3){
        textSize(30)
      }else{
         textSize(24)
      }
     noStroke();
      text(newlist[i],mouseX-100,textpos-30);
                                textpos += 40;
      }
    pop();
  }
  
  checkCollision(x,y){
    let d = dist(this.x,this.y,x,y);
   // print(d)
    if (d<=350/2){
      return true;
    }else{
      return false;
    }
  }
}