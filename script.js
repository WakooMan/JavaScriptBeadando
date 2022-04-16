class Game
{
  #Canvas;
  #Context;
  #PlayerLogic;
  #TableLogic;
  #DragLogic;
  #CellSpace;
  #CellHeightWidth;
  static #current= null;
  static #Initializing = false;
  constructor(P1Name,P2Name)
  {
    if(!Game.#Initializing)
    {
      throw Error('This is a private constructor call initialize instead.');
    }
    this.#Canvas = document.querySelector('canvas');
    this.#Context = this.#Canvas.getContext('2d');
    this.#PlayerLogic = new PlayerLogics(this,this.#Canvas.width,this.#Canvas.height,P1Name,P2Name);
    this.#TableLogic = new TableLogic(this,this.#Canvas.width,this.#Canvas.height);
    this.#DragLogic = new DragLogic(this.#PlayerLogic,this.#TableLogic,this.#Canvas);
    window.addEventListener('resize', ()=> {this.ResizeCanvas();}, false);
    this.ResizeCanvas();
  }
  static Initialize(P1,P2)
  {
    this.#Initializing = true;
    if(this.#current!=null)
    {
      throw Error('Game is already Initialized.');
    }
    this.#current = new Game(P1,P2);
    this.#Initializing = false;
  }

  static Current()
  {
    return this.#current;
  }

  Render()
  {
    this.#Context.clearRect(0,0,this.#Canvas.width,this.#Canvas.height);
    this.#PlayerLogic.RenderAllViews(this.#Context);
    this.#TableLogic.RenderAllViews(this.#Context);
    this.#DragLogic.RenderAllViews(this.#Context);
  }
  ResizeCanvas()
  {
    this.#Canvas.width = window.innerWidth;
    this.#Canvas.height = window.innerHeight;
    this.#CellHeightWidth = Calculator.Percentage(this.#Canvas.width,9);
    this.#CellSpace = Calculator.Percentage(this.#Canvas.width,0.5);
    this.#PlayerLogic.Resize(this.#Canvas.width,this.#Canvas.height);
    this.#TableLogic.Resize(this.#Canvas.width,this.#Canvas.height);
    this.#DragLogic.Resize(this.#Canvas.width,this.#Canvas.height);
  }

  GetPoint(Row,Column)
  {
    return new Point(this.CellPos(Column-1,Column-1),this.CellPos(Row-1,Row-1));
  }

  CellHeightWidth()
  {
    return this.#CellHeightWidth;
  }

  CellPos(CellHeightWidthNum,CellSpaceNum)
  {
    return (this.#CellHeightWidth*CellHeightWidthNum)+(this.#CellSpace*CellSpaceNum);
  }
}

let nytiolap = document.querySelector('#nyitolap');
nytiolap.style.display = 'block';
let jatekoldal = document.querySelector('#jatekoldal');
jatekoldal.style.display = 'none';

function Next() 
{
    Game.Current().Render();
    requestAnimationFrame(Next);
}

let StartButton = document.querySelector('#StartButton');
StartButton.addEventListener('click',()=>
{
  Game.Initialize(document.querySelector('#player1').value,document.querySelector('#player2').value);
  Next();
  nytiolap.style.display = 'none';
  jatekoldal.style.display = 'block';
});