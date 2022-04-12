//Base Classes

class Colors
{
  static P1ActiveColor()
  {
    return new Color(237,28,36);
  }

  static P1PassiveColor()
  {
    return new Color(252,133,133);
  }

  static P2ActiveColor()
  {
    return new Color(34,177,76);
  }

  static P2PassiveColor()
  {
    return new Color(162,255,162);
  }

  static GreenCellColor()
  {
    return new Color(104,175,104);
  }

  static YellowCellColor()
  {
    return new Color(231, 231, 103);
  }
}

class Drawable
{
  constructor(Point,Rotation,FillStyle,StrokeStyle)
  {
    this.Point = Point;
    this.Rotation = Rotation;
    this.FillStyle = FillStyle;
    this.StrokeStyle = StrokeStyle;
  }
  BeginDraw(Context)
  {
    Context.translate(this.Point.X,this.Point.Y);
    Context.rotate(this.Rotation);
  }

  EndDraw(Context)
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

class Table
{
  constructor(Cells)
  {
    this.Cells = Cells;
  }
  draw(Context)
  {
    this.Cells.forEach(
      (Value,idx,array)=> 
      {
        Value.draw(Context);
      });
  }
  PutIfValid(Object)
  {
      this.Cells.forEach(
        (value,idx,array)=>
        {
          if(value.Object==null && value.InThis(Object.Point) && value.InThis(new Point(Object.Point.X,Object.Point.Y + Object.a)) && value.InThis(new Point(Object.Point.X + Object.a,Object.Point.Y)) && value.InThis(new Point(Object.Point.X + Object.a,Object.Point.Y + Object.a)))
          {
            value.Push(Object);
          }
        });
  }

}

class Panel
{
  constructor(Rectangle)
  {
    this.Rectangle = Rectangle;
  }
  draw(Context)
  {
    this.Rectangle.draw(Context);
  }
}

//Child Classes

class Cell extends Panel
{
  constructor(point,color,a,Object,PlayerID)
  {
    super(new BorderlessRectangle(point,color,a,a));
    this.Object = Object;
    this.PlayerID = PlayerID;
  }

  draw(Context)
  {
    super.draw(Context);
    if(this.Object!=null)
    {
      this.Object.draw(Context);
    }
  }

  InThis(Point)
  {
    return (Point.X >= this.Rectangle.Point.X) && (Point.X <= this.Rectangle.Point.X + this.Rectangle.Width) && (Point.Y >= this.Rectangle.Point.Y) && (Point.Y <= this.Rectangle.Point.Y + this.Rectangle.Height);
  }

  Push(Object)
  {
    this.Object = Object;
    this.Object.Point = new Point(this.Rectangle.Point.X + this.Rectangle.getWidthPercentage(50) - Object.a/2,this.Rectangle.Point.Y + this.Rectangle.getHeightPercentage(50) - Object.a/2);
  }

}

class Rectangle extends Drawable
{
  constructor(Point,FillColor,StrokeColor,Width,Height,StrokeWidth,Rotation=0)
  {
    super(Point,Rotation,FillColor.ToString(),StrokeColor.ToString());
    this.Width = Width;
    this.Height = Height;
    this.StrokeWidth = StrokeWidth;
  }

  draw(Context)
  {
    this.BeginDraw(Context);
    Context.beginPath();
    Context.fillStyle = this.FillStyle;
    Context.strokeStyle = this.StrokeStyle;
    Context.lineWidth = this.StrokeWidth;
    Context.rect(0,0,this.Width,this.Height);
    Context.fill();
    Context.stroke();
    Context.closePath();
    this.EndDraw(Context);
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

class BorderlessRectangle extends Rectangle
{
  constructor(Point,FillColor,Width,Height,Rotation=0)
  {
    super(Point,FillColor,FillColor,Width,Height,0,Rotation);
  }
}

class Szoveg extends Drawable
{
  constructor(Str,Point,FontStr,fillStyle,Rotation = 0)
  {
    super(Point,Rotation,fillStyle,fillStyle);
    this.Str = Str;
    this.FontStr = FontStr;
  }

  draw(Context)
  {
    this.BeginDraw(Context);
    Context.beginPath();
    Context.font = this.FontStr;
    Context.fillStyle = this.FillStyle;
    Context.fillText(this.Str,0,0);
    Context.closePath();
    this.EndDraw(Context);
  }
}
class DrawableObject extends Drawable
{
    constructor(Point,FillColor,a,StrokeColor,StrokeWidth,Rotation=0)
    {
        super(Point,Rotation,FillColor.ToString(),StrokeColor.ToString());
        this.a = a;
        this.StrokeWidth = StrokeWidth;
        this.FillColor = FillColor;
        this.StrokeColor = StrokeColor;
    }

    getSidePercentage(percentage)
    {
        return this.a*percentage/100;
    }

    InThis(point)
    {
      return point.X>= this.Point.X && point.X <= this.Point.X + this.a && point.Y>= this.Point.Y && point.Y <= this.Point.Y + this.a;
    }
}

class Square extends DrawableObject
{
  constructor(Point,FillColor,StrokeColor,a,StrokeWidth,Rotation=0)
  {
    super(Point,FillColor,a,StrokeColor,StrokeWidth,Rotation);
  }

  Copy()
  {
    return new Square(new Point(this.Point.X,this.Point.Y),new Color(this.FillColor.R,this.FillColor.G,this.FillColor.B),new Color(this.StrokeColor.R,this.StrokeColor.G,this.StrokeColor.B),this.a,this.StrokeWidth,this.Rotation);
  }

  draw(Context)
  {
    this.BeginDraw(Context);
    Context.beginPath();
    Context.fillStyle = this.FillStyle;
    Context.strokeStyle = this.StrokeStyle;
    Context.lineWidth = this.StrokeWidth;
    Context.rect(0,0,this.a,this.a);
    Context.fill();
    Context.stroke();
    Context.closePath();
    this.EndDraw(Context);
  }
}
class Triangle extends DrawableObject
{
    constructor(Point,FillColor,a,StrokeColor,StrokeWidth,Rotation=0)
    {
        super(Point,FillColor,a,StrokeColor,StrokeWidth,Rotation);
    }

    Copy()
    {
      return new Triangle(new Point(this.Point.X,this.Point.Y),new Color(this.FillColor.R,this.FillColor.G,this.FillColor.B),this.a,new Color(this.StrokeColor.R,this.StrokeColor.G,this.StrokeColor.B),this.StrokeWidth,this.Rotation);
    }

    draw(Context)
    {
        this.BeginDraw(Context);
        Context.beginPath();
        Context.fillStyle = this.FillStyle;
        Context.strokeStyle = this.StrokeStyle;
        Context.lineWidth = this.StrokeWidth;
        Context.moveTo(this.getSidePercentage(50),0);
        Context.lineTo(this.a,this.a);
        Context.lineTo(0,this.a);
        Context.lineTo(this.getSidePercentage(50),0);
        Context.fill();
        Context.stroke();
        Context.closePath();
        this.EndDraw(Context);
    }
}

class Circle extends DrawableObject
{
    constructor(Point,FillColor,a,StrokeColor,StrokeWidth,Rotation=0)
    {
        super(Point,FillColor,a,StrokeColor,StrokeWidth,Rotation);
    }

    Copy()
    {
      return new Circle(new Point(this.Point.X,this.Point.Y),new Color(this.FillColor.R,this.FillColor.G,this.FillColor.B),this.a,new Color(this.StrokeColor.R,this.StrokeColor.G,this.StrokeColor.B),this.StrokeWidth,this.Rotation);
    }

    draw(Context)
    {
        this.BeginDraw(Context);
        Context.beginPath();
        Context.fillStyle = this.FillStyle;
        Context.strokeStyle = this.StrokeStyle;
        Context.lineWidth = this.StrokeWidth;
        Context.arc(this.getSidePercentage(50),this.getSidePercentage(50),this.getSidePercentage(50),0,Math.PI*2);
        Context.fill();
        Context.stroke();
        Context.closePath();
        this.EndDraw(Context);
    }
}

class XForm extends DrawableObject
{
    constructor(Point,FillColor,a,StrokeColor,StrokeWidth,Rotation=0)
    {
        super(Point,FillColor,a,StrokeColor,StrokeWidth,Rotation);
    }

    Copy()
    {
      return new XForm(new Point(this.Point.X,this.Point.Y),new Color(this.FillColor.R,this.FillColor.G,this.FillColor.B),this.a,new Color(this.StrokeColor.R,this.StrokeColor.G,this.StrokeColor.B),this.StrokeWidth,this.Rotation);
    }

    draw(Context)
    {
        this.BeginDraw(Context);
        Context.beginPath();
        Context.fillStyle = this.FillStyle;
        Context.strokeStyle = this.StrokeStyle;
        Context.lineWidth = this.StrokeWidth;
        Context.moveTo(0,this.getSidePercentage(20));
        Context.lineTo(this.getSidePercentage(20),0);
        Context.lineTo(this.getSidePercentage(50),this.getSidePercentage(35));
        Context.lineTo(this.a-this.getSidePercentage(20),0);
        Context.lineTo(this.a,this.getSidePercentage(20));
        Context.lineTo(this.a-this.getSidePercentage(35),this.getSidePercentage(50));
        Context.lineTo(this.a,this.a-this.getSidePercentage(20));
        Context.lineTo(this.a-this.getSidePercentage(20),this.a);
        Context.lineTo(this.getSidePercentage(50),this.a-this.getSidePercentage(35));
        Context.lineTo(this.getSidePercentage(20),this.a);
        Context.lineTo(0,this.a-this.getSidePercentage(20));
        Context.lineTo(this.getSidePercentage(35),this.getSidePercentage(50));
        Context.lineTo(0,this.getSidePercentage(20));
        Context.fill();
        Context.stroke();
        Context.closePath();
        this.EndDraw(Context);
    }
}

class Player extends Panel
{
  constructor(X,Y,Width,Height,PlayerStr,ActiveColor,PassiveColor,IsActive)
  {
    super(new BorderlessRectangle(new Point(X,Y),PassiveColor,Width,Height));
    this.Player = new Szoveg(PlayerStr,new Point(this.Rectangle.Point.X + this.Rectangle.getWidthPercentage(5),this.Rectangle.Point.Y + this.Rectangle.getHeightPercentage(93)),`bold ${this.Rectangle.getHeightPercentage(20)}px serif`,'black',-Math.PI/2);
    this.PlayerStrRectangle = new BorderlessRectangle(this.Rectangle.Point,ActiveColor,this.Rectangle.getWidthPercentage(7),this.Rectangle.Height);
    this.ActiveColor = ActiveColor;
    this.PassiveColor = PassiveColor;
    this.IsActive = IsActive;
    let black = new Color(0,0,0);
    this.Square = new Square(new Point(this.Rectangle.getWidthPercentagePoint(12),this.Rectangle.getHeightPercentagePoint(25)),this.GetCurrentColor(),black,this.Rectangle.getHeightPercentage(50),this.Rectangle.getHeightPercentage(5));
    this.Triangle = new Triangle(new Point(this.Rectangle.getWidthPercentagePoint(35),this.Rectangle.getHeightPercentagePoint(25)),this.GetCurrentColor(),this.Rectangle.getHeightPercentage(50),black,this.Rectangle.getHeightPercentage(5));
    this.Circle = new Circle(new Point(this.Rectangle.getWidthPercentagePoint(58),this.Rectangle.getHeightPercentagePoint(25)),this.GetCurrentColor(),this.Rectangle.getHeightPercentage(50),black,this.Rectangle.getHeightPercentage(5));
    this.XForm = new XForm(new Point(this.Rectangle.getWidthPercentagePoint(81),this.Rectangle.getHeightPercentagePoint(25)),this.GetCurrentColor(),this.Rectangle.getHeightPercentage(50),black,this.Rectangle.getHeightPercentage(5)); 
   }
  GetCurrentColor()
  {
      return (this.IsActive) ? this.ActiveColor : this.PassiveColor;
  }
  draw(Context)
  {
    super.draw(Context);
    this.PlayerStrRectangle.draw(Context);
    this.Player.draw(Context);
    this.Square.draw(Context);
    this.Triangle.draw(Context);
    this.Circle.draw(Context);
    this.XForm.draw(Context);
  }
}

class GrabbedObject
{
  constructor(MousePoint,Object)
  {
    this.MousePoint = MousePoint;
    this.Object = Object;
    this.update = (event) => 
    {
      this.MousePoint.X = event.clientX;
      this.MousePoint.Y = event.clientY;
      this.Object.Point.X = this.MousePoint.X - this.Object.getSidePercentage(50);
      this.Object.Point.Y = this.MousePoint.Y - this.Object.getSidePercentage(50);
    }; 
  }

  draw(Context)
  {
    this.Object.draw(Context);
  }

}

class InformationPanel extends Panel
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
  draw(Context)
  {
    super.draw(Context);
    Context.drawImage(this.Player1Image,this.dx1,this.dy,this.dw,this.dh);
    Context.drawImage(this.Player2Image,this.dx2,this.dy,this.dw,this.dh);
    this.VS.draw(Context);
    this.P1.draw(Context);
    this.P2.draw(Context);
  }
}

class Game
{
  constructor(P1Name,P2Name)
  {
    this.Canvas = document.querySelector('canvas');
    this.Context = this.Canvas.getContext('2d');
    this.P1Name= P1Name;
    this.P2Name = P2Name;
    this.CellSpaceDivNum = 200;
    this.CellHeightWidthDivNum = 11;
    this.GrabbedObject = null;
    this.CurrentPlayer = 0;
    this.resizeCanvas();
    window.addEventListener('resize', ()=> {this.resizeCanvas();}, false);
    this.Canvas.addEventListener('mousedown', function(event) {
        event.preventDefault();
        let point = new Point(event.clientX,event.clientY);
        let player = game.Players[game.CurrentPlayer];
        if(player.Square.InThis(point)) 
        {
          game.GrabbedObject = new GrabbedObject(point,player.Square.Copy());
        }
        else if(player.Triangle.InThis(point))
        {
          game.GrabbedObject = new GrabbedObject(point,player.Triangle.Copy());
        } 
        else if(player.XForm.InThis(point))
        {
          game.GrabbedObject = new GrabbedObject(point,player.XForm.Copy());
        }
        else if(player.Circle.InThis(point))
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
  }, false);
  }
  render()
  {
    this.Context.clearRect(0,0,this.Canvas.width,this.Canvas.height);
    this.Table.draw(this.Context);
    this.Players[0].draw(this.Context);
    this.Players[1].draw(this.Context);
    this.InformationPanel.draw(this.Context);
    if(this.GrabbedObject!=null)
    {
      this.GrabbedObject.draw(this.Context);
    }
  }
  resizeCanvas()
  {
    this.Canvas.width = window.innerWidth;
    this.Canvas.height = window.innerHeight;
    this.CellHeightWidth = this.Canvas.width/this.CellHeightWidthDivNum;
    this.CellSpace = this.Canvas.width/this.CellSpaceDivNum;
    let tables = [];
    for(let i = 0;i<16;i++)
    {
      let color = ((i<2 && i >=0)|| (i<6&& i>=4) || (i<12&& i>=10) || (i<16&&i>=14))? Colors.GreenCellColor():Colors.YellowCellColor();
      let point = this.getPoint(i);
      tables.push(new Cell(point,color,this.CellHeightWidth,null,-1));
    }
    this.Table = new Table(tables);
    let PanelWidths = this.Canvas.width/4;
    let InformationPanelHeight = this.cellPos(4,3)/3;
    let PlayerPanelHeight = this.cellPos(4,3)/5;
    let X = this.Canvas.width/2+this.Canvas.width/16;
    this.Players = 
    [
      new Player(X,this.cellPos(4,3)/2,PanelWidths,PlayerPanelHeight,this.P1Name,Colors.P1ActiveColor(),Colors.P1PassiveColor(),this.CurrentPlayer==0), 
      new Player(X,this.cellPos(4,3)-PlayerPanelHeight,PanelWidths,PlayerPanelHeight,this.P2Name,Colors.P2ActiveColor(),Colors.P2PassiveColor(),this.CurrentPlayer==1)
    ];
    let player1Image = document.createElement('img');
    player1Image.src = 'Images/piros.png';
    let player2Image = document.createElement('img');
    player2Image.src = 'Images/halvany_zold.png';
    this.InformationPanel = new InformationPanel(new BorderlessRectangle(new Point(X,0),Colors.YellowCellColor(),PanelWidths,InformationPanelHeight),player1Image,player2Image,this.P1Name,this.P2Name);
    this.render();
  }

  getPoint(i)
  {
    let maradek = i%4;
    let megvan = Math.floor(i/4);
    return new Point(this.cellPos(maradek,maradek),this.cellPos(megvan,megvan));
  }

  cellPos(CellHeightWidthNum,CellSpaceNum)
  {
    return (this.CellHeightWidth*CellHeightWidthNum)+(this.CellSpace*CellSpaceNum);
  }
}