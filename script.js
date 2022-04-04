class Color
{
  constructor(R,G,B)
  {
    this.R=R;
    this.G = G;
    this.B=B;
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

class Rectangle
{
  constructor(Point,Col,Width,Height)
  {
    this.Point = Point;
    this.Col = Col;
    this.Width = Width;
    this.Height = Height;
  }

  draw()
  {
    Context.beginPath();
    Context.fillStyle = `rgb(${this.Col.R},${this.Col.G},${this.Col.B})`;
    Context.fillRect(this.Point.X,this.Point.Y,this.Width,this.Height);
    Context.closePath();
  }
  getWidthPercentage(percentage)
  {
    return this.Width*percentage/100;
  }

  getHeightPercentage(percentage)
  {
    return this.Width*percentage/100;
  }

  getWidthPercentagePoint(percentage)
  {
    return this.Point.X+(this.Width*percentage/100);
  }

  getHeightPercentagePoint(percentage)
  {
    return this.Point.Y+(this.Width*percentage/100);
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

class PlayerPanel extends Panel
{
  constructor(Rectangle,PlayerStr)
  {
    super(Rectangle);
    this.PlayerStr = PlayerStr;
  }
  draw()
  {
    super.draw();
    Context.font = `bold 50px serif`;
    Context.rotate(Math.PI/2);
    Context.fillStyle = 'black';
    Context.fillText(this.PlayerStr,this.Rectangle.Point.X,this.Rectangle.Point.Y);
    Context.rotate(-Math.PI/2);
  }
}

class OpponentsPanel extends Panel
{
  constructor(Rectangle,Player1Image,Player2Image)
  {
    super(Rectangle);
    this.Player1Image = Player1Image;
    this.Player2Image = Player2Image;
  }
  draw()
  {
    super.draw();
    let Pos = this.Rectangle.Point;
    let dx1 = Pos.X+this.Rectangle.Width/10;
    let dy1 =Pos.Y+this.Rectangle.Height/6;
    let dw = this.Rectangle.Width/4;
    let dh = this.Rectangle.Height/2;
    let dx2 = Pos.X+this.Rectangle.Width-dw-this.Rectangle.Width/10;
    let dy2 = Pos.Y+this.Rectangle.Height/6;
    let VSPos = new Point(dx1+(dx2-dx1)/2,dy1+dh/2+(this.Rectangle.Width/12));
    let Player1StrPos = new Point(dx1,dy1+dh+this.Rectangle.Height/10);
    let Player2StrPos = new Point(dx2,dy2+dh+this.Rectangle.Height/10);
    let Player1Str = '1. Játékos';
    let Player2Str = '2. Játékos';
    Context.drawImage(this.Player1Image,dx1,dy1,dw,dh);
    Context.drawImage(this.Player2Image,dx2,dy2,dw,dh);
    Context.font = `bold ${this.Rectangle.Width/5}px serif`;
    Context.fillStyle = 'black';
    Context.fillText('VS',VSPos.X,VSPos.Y);
    Context.font = `bold ${this.Rectangle.Width/15}px serif`;
    Context.fillText(Player1Str,Player1StrPos.X,Player1StrPos.Y);
    Context.fillText(Player2Str,Player2StrPos.X,Player2StrPos.Y);
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
        new Rectangle(new Point(CellPos(0,0),CellPos(0,0)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(1,1),CellPos(0,0)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(0,0),CellPos(1,1)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(1,1),CellPos(1,1)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(2,2),CellPos(0,0)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(3,3),CellPos(0,0)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(2,2),CellPos(1,1)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(3,3),CellPos(1,1)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(0,0),CellPos(2,2)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(1,1),CellPos(2,2)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(0,0),CellPos(3,3)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(1,1),CellPos(3,3)),YellowCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(2,2),CellPos(2,2)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(3,3),CellPos(2,2)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(2,2),CellPos(3,3)),GreenCellColor,CellHeightWidth,CellHeightWidth),
        new Rectangle(new Point(CellPos(3,3),CellPos(3,3)),GreenCellColor,CellHeightWidth,CellHeightWidth)
      ]);

    let PanelWidths = Width/4;
    let OpponentsPanelHeight = CellPos(4,3)/3;
    let PlayerPanelHeight = CellPos(4,3)/5;
    let X = Width/2+Width/16;
    let player1Panel = new PlayerPanel(new Rectangle(new Point(X,CellPos(4,3)/2),Jatekos1PasszivColor,PanelWidths,PlayerPanelHeight),'1. Játékos');
    let player2Panel = new PlayerPanel(new Rectangle(new Point(X,CellPos(4,3)-PlayerPanelHeight),Jatekos2PasszivColor,PanelWidths,PlayerPanelHeight),'2. Játékos');
    let player1Image = document.createElement('img');
    player1Image.src = 'Images/piros.png';
    let player2Image = document.createElement('img');
    player2Image.src = 'Images/halvany_zold.png';
    let opponentsPanel = new OpponentsPanel(new Rectangle(new Point(X,0),YellowCellColor,PanelWidths,OpponentsPanelHeight),player1Image,player2Image);
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