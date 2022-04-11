//Base Classes

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

//Child Classes

class Rectangle extends Drawable
{
  constructor(Point,FillColor,StrokeColor,Width,Height,StrokeWidth,Rotation=0)
  {
    super(Point,Rotation,FillColor.ToString(),StrokeColor.ToString());
    this.Width = Width;
    this.Height = Height;
    this.StrokeWidth = StrokeWidth;
  }

  draw()
  {
    this.BeginDraw();
    Context.beginPath();
    Context.fillStyle = this.FillStyle;
    Context.strokeStyle = this.StrokeStyle;
    Context.lineWidth = this.StrokeWidth;
    Context.rect(0,0,this.Width,this.Height);
    Context.fill();
    Context.stroke();
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
  constructor(Point,FillColor,StrokeColor,a,StrokeWidth,Rotation=0)
  {
    super(Point,FillColor,StrokeColor,a,a,StrokeWidth,Rotation);
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

  draw()
  {
    this.BeginDraw();
    Context.beginPath();
    Context.font = this.FontStr;
    Context.fillStyle = this.FillStyle;
    Context.fillText(this.Str,0,0);
    Context.closePath();
    this.EndDraw();
  }
}

class Triangle extends Drawable
{
    constructor(Point,FillColor,Width,Height,StrokeColor,StrokeWidth,Rotation=0)
    {
        super(Point,Rotation,FillColor.ToString(),StrokeColor.ToString());
        this.Width = Width;
        this.Height = Height;
        this.StrokeWidth = StrokeWidth;
    }

    getWidthPercentage(percentage)
    {
        return this.Width*percentage/100;
    }

    getHeightPercentage(percentage)
    {
        return this.Height*percentage/100;
    }

    draw()
    {
        this.BeginDraw();
        Context.beginPath();
        Context.fillStyle = this.FillStyle;
        Context.strokeStyle = this.StrokeStyle;
        Context.lineWidth = this.StrokeWidth;
        Context.moveTo(this.getWidthPercentage(50),0);
        Context.lineTo(this.Width,this.Height);
        Context.lineTo(0,this.Height);
        Context.lineTo(this.getWidthPercentage(50),0);
        Context.fill();
        Context.stroke();
        Context.closePath();
        this.EndDraw();
    }
}

class Circle extends Drawable
{
    constructor(Point,FillColor,Width,Height,StrokeColor,StrokeWidth,Rotation=0)
    {
        super(Point,Rotation,FillColor.ToString(),StrokeColor.ToString());
        this.Width = Width;
        this.Height = Height;
        this.StrokeWidth = StrokeWidth;
    }
    draw()
    {
        this.BeginDraw();
        Context.beginPath();
        Context.fillStyle = this.FillStyle;
        Context.strokeStyle = this.StrokeStyle;
        Context.lineWidth = this.StrokeWidth;
        Context.arc();
        Context.fill();
        Context.stroke();
        Context.closePath();
        this.EndDraw();
    }
}

class PlayerPanel extends Panel
{
  constructor(Rectangle,PlayerStr,ActiveColor,PassiveColor,IsActive)
  {
    super(Rectangle);
    this.Player = new Szoveg(PlayerStr,new Point(this.Rectangle.Point.X + this.Rectangle.getWidthPercentage(5),this.Rectangle.Point.Y + this.Rectangle.getHeightPercentage(93)),`bold ${this.Rectangle.getHeightPercentage(20)}px serif`,'black',-Math.PI/2);
    this.PlayerStrRectangle = new BorderlessRectangle(this.Rectangle.Point,ActiveColor,this.Rectangle.getWidthPercentage(7),this.Rectangle.Height);
    this.ActiveColor = ActiveColor;
    this.PassiveColor = PassiveColor;
    this.IsActive = IsActive;
    let black = new Color(0,0,0);
    this.Square = new Square(new Point(this.Rectangle.getWidthPercentagePoint(12),this.Rectangle.getHeightPercentagePoint(15)),this.GetCurrentColor(),black,this.Rectangle.getHeightPercentage(65),this.Rectangle.getHeightPercentage(5));
    this.Triangle = new Triangle(new Point(this.Rectangle.getWidthPercentagePoint(37),this.Rectangle.getHeightPercentagePoint(15)),this.GetCurrentColor(),this.Rectangle.getHeightPercentage(65),this.Rectangle.getHeightPercentage(65),black,this.Rectangle.getHeightPercentage(5));
   
   }
  GetCurrentColor()
  {
      return (this.IsActive) ? this.ActiveColor : this.PassiveColor;
  }
  draw()
  {
    super.draw();
    this.PlayerStrRectangle.draw();
    this.Player.draw();
    this.Square.draw();
    this.Triangle.draw();
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