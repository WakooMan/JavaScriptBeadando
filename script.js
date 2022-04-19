class Game
{
  #Key;
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

  static InitializeSave(GameData)
  {
    this.Initialize(GameData.P1,GameData.P2);
    this.#current.Load(GameData);
  }
  Key()
  {
    return this.#Key;
  }
  Save()
  {
    let saved = JSON.parse(localStorage.getItem('SavedGames'));
    if(saved == null)
    {
      saved = [];
    }
    let today = new Date();
    if(this.#Key!=null)
    {
      saved = saved.filter(value => value.Key != this.#Key);
      SavedGames = SavedGames.filter(value => value != this.#Key);
      document.querySelector('#savedgames').childNodes.forEach(value=> 
        {
          if(value.value == this.#Key)
          {
            document.querySelector('#savedgames').removeChild(value);
          }
        });
    }
    this.#Key = this.#PlayerLogic.GetCurrentPlayer().Name() + ' vs ' + this.#PlayerLogic.GetPassivePlayer().Name() + ' ' + today.getFullYear() +'-'+today.getMonth()+'-'+today.getDay();
    let element = {
      Key: this.#Key,
      Cells : this.#TableLogic.GetCells(),
      CurrentIndex : this.#PlayerLogic.GetCurrentIndex(),
      Player1Nums: this.#PlayerLogic.GetP1Counts(),
      Player2Nums: this.#PlayerLogic.GetP2Counts(),
      P1: this.#PlayerLogic.GetP1Name(),
      P2: this.#PlayerLogic.GetP2Name()
    };
    saved.push(element);
    SavedGames.push(element);
    let option = document.createElement('option');
    option.value= this.#Key;
    option.innerText = this.#Key;
    document.querySelector('#savedgames').appendChild(option);
    localStorage.setItem('SavedGames',JSON.stringify(saved));
  }

  Load(GameData)
  {
    this.#Key = GameData.Key;
    this.#TableLogic.Load(GameData,this.#PlayerLogic.GetCurrentPlayer(),this.#PlayerLogic.GetPassivePlayer());
    this.#PlayerLogic.Load(GameData);
  }

  static Delete()
  {
    this.#current = null;
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
  if(Game.Current()!=null)
  {
    Game.Current().Render();
    requestAnimationFrame(Next);
  }
}

let StartButton = document.querySelector('#StartButton');
StartButton.addEventListener('click',()=>
{
  if(document.querySelector('#savedgames').value=='None')
  {
    Game.Initialize(document.querySelector('#player1').value,document.querySelector('#player2').value);
  }
  else
  {
    Game.InitializeSave(SavedGames.find(value => value.Key == document.querySelector('#savedgames').value));
  }

  Next();
  nytiolap.style.display = 'none';
  document.querySelector('#player1').value = '1. Játékos';
  document.querySelector('#player2').value = '2. Játékos';
  document.querySelector('#player1').readOnly = false;
  document.querySelector('#player2').readOnly = false;
  document.querySelector('#savedgames').value = 'None';
  document.querySelector('#mentesgomb').style.display = 'inline';
  jatekoldal.style.display = 'block';
});
document.querySelector('#kilepesgomb').addEventListener('click',()=> 
{
  Game.Delete();
  jatekoldal.style.display = 'none';
  nytiolap.style.display = 'block';
});

document.querySelector('#mentesgomb').addEventListener('click',()=> 
{
  localStorage.removeItem('SavedGames');
  Game.Current().Save();
  Game.Delete();
  jatekoldal.style.display = 'none';
  nytiolap.style.display = 'block';
});
document.querySelector('#savedgames').addEventListener('change',() =>
{
  if(document.querySelector('#savedgames').value=='None')
  {
    let P1Text = document.querySelector('#player1');
    let P2Text = document.querySelector('#player2');
    P1Text.value = '1. Játékos';
    P1Text.readOnly = false;
    P2Text.value = '2. Játékos';
    P2Text.readOnly = false;
  }
  else
  {
    let GameData = SavedGames.find(value => value.Key == document.querySelector('#savedgames').value);
    let P1Text = document.querySelector('#player1');
    let P2Text = document.querySelector('#player2');
    P1Text.value = GameData.P1;
    P1Text.readOnly = true;
    P2Text.value = GameData.P2;
    P2Text.readOnly = true;
  }
});

let SavedGames = JSON.parse(localStorage.getItem('SavedGames'));
SavedGames.forEach(value=> 
  {
    let option = document.createElement('option');
    option.value = value.Key;
    option.innerText = value.Key;
    document.querySelector('#savedgames').appendChild(option);
  });