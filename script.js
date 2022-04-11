class Drawable
{
  constructor(Point,Rotation,FillStyle,StrokeStyle)
  {
    this.Point = Point;
    this.Rotation = Rotation;
    this.FillStyle = FillStyle;
    this.StrokeStyle = StrokeStyle;
  }
  BeginDraw()
  {
    Context.translate(this.Point.X,this.Point.Y);
    Context.rotate(this.Rotation);
  }

  EndDraw()
  {
    Context.rotate(-this.Rotation);
    Context.translate(-this.Point.X,-this.Point.Y);
  }
}



class Color
{
  constructor(R,G,B)
  {
    this.R=R;
    this.G = G;
    this.B=B;
  }
  ToString()
  {
    return `rgb(${this.R},${this.G},${this.B})`;
  }
}

class Point
{
  constructor(x,y)
  {
    this.X = x;
    this.Y = y;
  }
}

class Rectangle extends Drawable
{
  constructor(Point,FillColor,StrokeColor,Width,Height,Rotation=0)
  {
    super(Point,Rotation,FillColor.ToString(),StrokeColor.ToString());
    this.Width = Width;
    this.Height = Height;
  }

  draw()
  {
    this.BeginDraw();
    Context.beginPath();
    Context.fillStyle = this.FillStyle;
    Context.strokeStyle = this.StrokeStyle;
    Context.rect(0,0,this.Width,this.Height);
    Context.fill();
    Context.closePath();
    this.EndDraw();
  }
  getWidthPercentage(percentage)
  {
    return this.Width*percentage/100;
  }

  getHeightPercentage(percentage)
  {
    return this.Height*percentage/100;
  }

  getWidthPercentagePoint(percentage)
  {
    return this.Point.X+this.getWidthPercentage(percentage);
  }

  getHeightPercentagePoint(percentage)
  {
    return this.Point.Y+this.getHeightPercentage(percentage);
  }
}

class Square extends Rectangle
{
  constructor(Point,FillColor,StrokeColor,a,Rotation=0)
  {
    super(Point,Rotation,FillColor.ToString(),StrokeColor.ToString(),a,a,Rotation);
  }
}

class BorderlessRectangle extends Rectangle
{
  constructor(Point,FillColor,Width,Height,Rotation=0)
  {
    super(Point,FillColor,FillColor,Width,Height,Rotation);
  }
}

class Table
{
  constructor(Cells)
  {
    this.Cells = Cells;
  }
  draw()
  {
    this.Cells.forEach(
      (Value,idx,array)=> 
      {
        Value.draw();
      });
  }
}

class Panel
{
  constructor(Rectangle)
  {
    this.Rectangle = Rectangle;
  }
  draw()
  {
    this.Rectangle.draw();
  }
}

class Szoveg extends Drawable
{
  constructor(Str,Point,fontStr,fillStyle,Rotation = 0)
  {
    super(Point,Rotation);
    this.Str = Str;
    this.fontStr = fontStr;
    this.fillStyle = fillStyle;
  }

  draw()
  {
    this.BeginDraw();
    Context.beginPath();
    Context.font = this.fontStr;
    Context.fillStyle = this.fillStyle;
    Context.fillText(this.Str,0,0);
    Context.closePath();
    this.EndDraw();
  }
}

class PlayerPanel extends Panel
{
  constructor(Rectangle,PlayerStr)
  {
    super(Rectangle);
    this.Player = new Szoveg(PlayerStr,new Point(this.Rectangle.Point.X + this.Rectangle.getWidthPercentage(5),this.Rectangle.Point.Y + this.Rectangle.getHeightPercentage(93)),`bold ${this.Rectangle.getHeightPercentage(20)}px serif`,'black',-Math.PI/2);
  }
  draw()
  {
    super.draw();
    this.Player.draw();
  }
}

class OpponentsPanel extends Panel
{
  constructor(Rectangle,Player1Image,Player2Image,P1Name,P2Name)
  {
    super(Rectangle);
    this.Player1Image = Player1Image;
    this.Player2Image = Player2Image;
    this.dx1 = this.Rectangle.getWidthPercentagePoint(10);
    this.dx2 = this.Rectangle.getWidthPercentagePoint(65);
    this.dy = this.Rectangle.getHeightPercentagePoint(20);
    this.dw = this.Rectangle.getWidthPercentage(25);
    this.dh = this.Rectangle.getHeightPercentage(50);
    this.VS = new Szoveg('VS',new Point(this.dx1+(this.dx2-this.dx1)/2,this.Rectangle.getHeightPercentagePoint(60)),`bold ${this.Rectangle.getWidthPercentage(20)}px serif`,'black');
    this.P1 = new Szoveg(P1Name,new Point(this.dx1,this.dy+this.dh+this.Rectangle.getHeightPercentagePoint(10)),`bold ${this.Rectangle.getWidthPercentage(6)}px serif`,'black');
    this.P2 = new Szoveg(P2Name,new Point(this.dx2,this.dy+this.dh+this.Rectangle.getHeightPercentagePoint(10)),`bold ${this.Rectangle.getWidthPercentage(6)}px serif`,'black');
  }
  draw()
  {
    super.draw();
    Context.drawImage(this.Player1Image,this.dx1,this.dy,this.dw,this.dh);
    Context.drawImage(this.Player2Image,this.dx2,this.dy,this.dw,this.dh);
    this.VS.draw();
    this.P1.draw();
    this.P2.draw();
  }
}

class SurfacePanel
{
  constructor(Table,Panel,Player1Panel,Player2Panel)
  {
    this.Table = Table;
    this.Panel = Panel;
    this. Player1Panel = Player1Panel;
    this. Player2Panel = Player2Panel;
  }
  draw()
  {
    this.Table.draw();
    this.Panel.draw();
    this.Player1Panel.draw();
    this.Player2Panel.draw();
  }
}

const Canvas = document.querySelector('canvas');
const Context = Canvas.getContext('2d');
const GreenCellColor = new Color(104,175,104);
const YellowCellColor = new Color(231, 231, 103);
const Jatekos1PasszivColor = new Color(252, 133, 133);
const Jatekos1AktivColor = new Color(237,28,36);
const Jatekos2PasszivColor = new Color(162, 255, 162);
const Jatekos2AktivColor = new Color(34, 177, 76);
const CellSpaceDivNum = 200;
const CellHeightWidthDivNum = 11;
let Width = Canvas.width;
let Height = Canvas.height;
let CellHeightWidth;
let CellSpace;
let GUI;
window.addEventListener('resize', resizeCanvas, false);

  function CellPos(CellHeightWidthNum,CellSpaceNum)
  {
    return (CellHeightWidth*CellHeightWidthNum)+(CellSpace*CellSpaceNum);
  }
  function resizeCanvas() {
    Canvas.width = window.innerWidth;
    Canvas.height = window.innerHeight;
    Width = Canvas.width;
    Height = Canvas.height;
    CellHeightWidth = Width/CellHeightWidthDivNum;
    CellSpace = Width/CellSpaceDivNum;
    if(CellPos(4,3)>Height)
    {
      Width= Height;
    }
    let table = new Table(
      [
        new BorderlessRectangle(new Point(CellPos(0,0),CellPos(0,0)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(1,1),CellPos(0,0)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(0,0),CellPos(1,1)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(1,1),CellPos(1,1)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(2,2),CellPos(0,0)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(3,3),CellPos(0,0)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(2,2),CellPos(1,1)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(3,3),CellPos(1,1)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(0,0),CellPos(2,2)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(1,1),CellPos(2,2)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(0,0),CellPos(3,3)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(1,1),CellPos(3,3)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(2,2),CellPos(2,2)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(3,3),CellPos(2,2)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(2,2),CellPos(3,3)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new BorderlessRectangle(new Point(CellPos(3,3),CellPos(3,3)),GreenCellColor,CellHeightWidth,CellHeightWidth)
      ]);

    let PanelWidths = Width/4;
    let OpponentsPanelHeight = CellPos(4,3)/3;
    let PlayerPanelHeight = CellPos(4,3)/5;
    let X = Width/2+Width/16;
    let player1Panel = new PlayerPanel(new BorderlessRectangle(new Point(X,CellPos(4,3)/2),Jatekos1PasszivColor,PanelWidths,PlayerPanelHeight),'1. Játékos');
    let player2Panel = new PlayerPanel(new BorderlessRectangle(new Point(X,CellPos(4,3)-PlayerPanelHeight),Jatekos2PasszivColor,PanelWidths,PlayerPanelHeight),'2. Játékos');
    let player1Image = document.createElement('img');
    player1Image.src = 'Images/piros.png';
    let player2Image = document.createElement('img');
    player2Image.src = 'Images/halvany_zold.png';
    let opponentsPanel = new OpponentsPanel(new BorderlessRectangle(new Point(X,0),YellowCellColor,PanelWidths,OpponentsPanelHeight),player1Image,player2Image,'1. Játékos','2. Játékos');
    GUI = new SurfacePanel(table,opponentsPanel,player1Panel,player2Panel);
    render(); 
  }

  function next() {
    update();
    render();
    requestAnimationFrame(next);
  }
  resizeCanvas();
  next();
  
  function update() 
  {
     
  }
  function render()
  { 
    Context.clearRect(0,0,Width,Height);
    GUI.draw();
  }