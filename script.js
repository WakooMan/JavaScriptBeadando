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
    /*this.Players = 
    [
      new Player(P1Name), 
      new Player(P2Name)
    ];
    this.CellSpaceDivNum = 200;
    this.CellHeightWidthDivNum = 11;
    this.GrabbedObject = null;
    this.CurrentPlayer = 0;
    this.TableLogic = new TableLogic();
    this.resizeCanvas();
    this.Canvas.addEventListener('mousedown', function(event) {
        event.preventDefault();
        let point = new Point(event.clientX,event.clientY);
        let player = game.PlayerPanels[game.CurrentPlayer];
        let playerlogic = game.Players[game.CurrentPlayer];
        if(player.Square.InThis(point)&&playerlogic.SquareCount>0) 
        {
          game.GrabbedObject = new GrabbedObject(point,player.Square.Copy());
        }
        else if(player.Triangle.InThis(point)&&playerlogic.TriangleCount>0)
        {
          game.GrabbedObject = new GrabbedObject(point,player.Triangle.Copy());
        } 
        else if(player.XForm.InThis(point)&&playerlogic.XFormCount>0)
        {
          game.GrabbedObject = new GrabbedObject(point,player.XForm.Copy());
        }
        else if(player.Circle.InThis(point)&& playerlogic.CircleCount>0)
        {
          game.GrabbedObject = new GrabbedObject(point,player.Circle.Copy());
        }
        if(game.GrabbedObject!=null)
        {
          game.Canvas.addEventListener('mousemove',game.GrabbedObject.update);
        }
    }, false);
    this.Canvas.addEventListener('mouseup', function(event) {
      event.preventDefault();
      if(game.GrabbedObject!=null)
      {
          game.Table.PutIfValid(game.GrabbedObject.Object);
        game.Canvas.removeEventListener('mousemove',game.GrabbedObject.update);
        game.GrabbedObject = null;
      }
  }, false);*/
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
    // this.Table.draw(this.Context);
    // this.PlayerPanels[0].draw(this.Context);
    // this.PlayerPanels[1].draw(this.Context);
    // this.InformationPanel.draw(this.Context);
    // if(this.GrabbedObject!=null)
    // {
    //   this.GrabbedObject.draw(this.Context);
    // }
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
   /* let tables = [];
    for(let i = 0;i<16;i++)
    {
      let color = ((i<2 && i >=0)|| (i<6&& i>=4) || (i<12&& i>=10) || (i<16&&i>=14))? Colors.GreenCellColor():Colors.YellowCellColor();
      let point = this.getPoint(i);
      let negyes;
      if((i<2 && i >=0)|| (i<6&& i>=4))
      {
        negyes = 1;
      }
      else if( (i<4&& i>=2) || (i<8&&i>=6))
      {
        negyes = 2;
      }
      else if( (i<10&& i>=8) || (i<14&&i>=12))
      {
        negyes = 3;
      }
      else if( (i<12&& i>=10) || (i<16&&i>=14))
      {
        negyes = 4;
      }
      tables.push(new Cell(i,point,color,this.CellHeightWidth,-1,Math.floor(i/4)+1,(i%4)+1,negyes));
    }*/
    //this.Table = new Table(tables);
    /*let PanelWidths = this.Canvas.width/4;
    let InformationPanelHeight = this.cellPos(4,3)/3;
    let PlayerPanelHeight = this.cellPos(4,3)/5;
    let X = this.Canvas.width/2+this.Canvas.width/16;
    this.PlayerPanels =
    [
      new PlayerPanel(this.Players[0],X,this.cellPos(4,3)/2,PanelWidths,PlayerPanelHeight,Colors.P1ActiveColor(),Colors.P1PassiveColor(),this.CurrentPlayer==0),
      new PlayerPanel(this.Players[1],X,this.cellPos(4,3)-PlayerPanelHeight,PanelWidths,PlayerPanelHeight,Colors.P2ActiveColor(),Colors.P2PassiveColor(),this.CurrentPlayer==1)
    ];
    this.InformationPanel = new InformationPanel(new BorderlessRectangle(new Point(X,0),Colors.YellowCellColor(),PanelWidths,InformationPanelHeight),this.Players[0].Name,this.Players[1].Name,this.CurrentPlayer);
    
    this.Table.Cells.forEach((value)=>
    {
      if(this.TableLogic.Cells[value.Index].Object!=null)
      {
        let obj = this.TableLogic.Cells[value.Index].Object;
        obj.a = this.PlayerPanels[this.CurrentPlayer].Circle.a;
        obj.StrokeWidth = this.PlayerPanels[this.CurrentPlayer].Circle.StrokeWidth;
        obj.Point = new Point(value.Rectangle.getWidthPercentagePoint(50)-obj.getSidePercentage(50),value.Rectangle.getHeightPercentagePoint(50)-obj.getSidePercentage(50));
      }
    });*/
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

Game.Initialize("Viktor","Viki");

  function Next() {
    Game.Current().Render();
    requestAnimationFrame(Next);
  }
  Next();