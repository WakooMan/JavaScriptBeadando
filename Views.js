class Drawable
{
  constructor()
  {
    if(this.constructor == Drawable)
    {
        throw new Error('Abstract class cant be initiated.');
    }
  }
  BeginDraw(Context,Point,Rotation)
  {
    Context.translate(Point.X,Point.Y);
    Context.rotate(Rotation);
  }

  EndDraw(Context,Point,Rotation)
  {
    Context.rotate(-Rotation);
    Context.translate(-Point.X,-Point.Y);
  }
}

class DText extends Drawable
{
    constructor()
    {
        super();
    }

    Draw(Context,Point,Rotation,FontStyle,FillStyle,Text)
    {
        this.BeginDraw(Context,Point,Rotation);
        Context.beginPath();
        Context.font = FontStyle;
        Context.fillStyle = FillStyle;
        Context.fillText(Text,0,0);
        Context.closePath();
        this.EndDraw(Context,Point,Rotation);
    }
}

class Picture extends Drawable
{
    constructor()
    {
        super();
    }

    Draw(Context,Point,Rotation,Image,ImageWidth,ImageHeight)
    {
        this.BeginDraw(Context,Point,Rotation);
        Context.drawImage(Image,0,0,ImageWidth,ImageHeight);
        this.EndDraw(Context,Point,Rotation);
    }
}

class BorderlessRectangle extends Drawable
{
    constructor()
    {
        super();
    }

    Draw(Context,Point,Rotation,FillStyle,Width,Height)
    {
        this.BeginDraw(Context,Point,Rotation);
        Context.beginPath();
        Context.fillStyle = FillStyle;
        Context.fillRect(0,0,Width,Height);
        Context.closePath();
        this.EndDraw(Context,Point,Rotation);
    }
}

class Square extends Drawable
{
    constructor()
    {
        super();
    }

    Draw(Context,Point,Rotation,a,FillStyle,StrokeStyle,StrokeWidth)
    {
        this.BeginDraw(Context,Point,Rotation);
        Context.beginPath();
        Context.fillStyle = FillStyle;
        Context.strokeStyle = StrokeStyle;
        Context.lineWidth = StrokeWidth;
        Context.rect(0,0,a,a);
        Context.fill();
        Context.stroke();
        Context.closePath();
        this.EndDraw(Context,Point,Rotation);
    }
}

class Triangle extends Drawable
{
    constructor()
    {
        super();
    }

    Draw(Context,Point,Rotation,a,FillStyle,StrokeStyle,StrokeWidth)
    {
        this.BeginDraw(Context,Point,Rotation);
        Context.beginPath();
        Context.fillStyle = FillStyle;
        Context.strokeStyle = StrokeStyle;
        Context.lineWidth = StrokeWidth;
        Context.moveTo(Calculator.Percentage(a,50),0);
        Context.lineTo(a,a);
        Context.lineTo(0,a);
        Context.lineTo(Calculator.Percentage(a,50),0);
        Context.fill();
        Context.stroke();
        Context.closePath();
        this.EndDraw(Context,Point,Rotation);
    }
}

class Circle extends Drawable
{
    constructor()
    {
        super();
    }

    Draw(Context,Point,Rotation,a,FillStyle,StrokeStyle,StrokeWidth)
    {
        this.BeginDraw(Context,Point,Rotation);
        Context.beginPath();
        Context.fillStyle = FillStyle;
        Context.strokeStyle = StrokeStyle;
        Context.lineWidth = StrokeWidth;
        Context.arc(Calculator.Percentage(a,50),Calculator.Percentage(a,50),Calculator.Percentage(a,50),0,Math.PI*2);
        Context.fill();
        Context.stroke();
        Context.closePath();
        this.EndDraw(Context,Point,Rotation);
    }
}

class XForm extends Drawable
{
    constructor()
    {
        super();
    }

    Draw(Context,Point,Rotation,a,FillStyle,StrokeStyle,StrokeWidth)
    {
        this.BeginDraw(Context,Point,Rotation);
        Context.beginPath();
        Context.fillStyle = FillStyle;
        Context.strokeStyle = StrokeStyle;
        Context.lineWidth = StrokeWidth;
        Context.moveTo(0,Calculator.Percentage(a,20));
        Context.lineTo(Calculator.Percentage(a,20),0);
        Context.lineTo(Calculator.Percentage(a,50),Calculator.Percentage(a,35));
        Context.lineTo(a-Calculator.Percentage(a,20),0);
        Context.lineTo(a,Calculator.Percentage(a,20));
        Context.lineTo(a-Calculator.Percentage(a,35),Calculator.Percentage(a,50));
        Context.lineTo(a,a-Calculator.Percentage(a,20));
        Context.lineTo(a-Calculator.Percentage(a,20),a);
        Context.lineTo(Calculator.Percentage(a,50),a-Calculator.Percentage(a,35));
        Context.lineTo(Calculator.Percentage(a,20),a);
        Context.lineTo(0,a-Calculator.Percentage(a,20));
        Context.lineTo(Calculator.Percentage(a,35),Calculator.Percentage(a,50));
        Context.lineTo(0,Calculator.Percentage(a,20));
        Context.fill();
        Context.stroke();
        Context.closePath();
        this.EndDraw(Context,Point,Rotation);
    }
}

class View
{
    OnRender(Context)
    {
        throw new Error("Abstract methods should be implemented in inherited class.");
    }
}
class InformationView extends View
{
    Rectangle;
    PlayerLogics;
    constructor(playerlogics)
    {
        super();
        this.Rectangle = new BorderlessRectangle();
        this.PlayerLogics = playerlogics;
    }
    OnRender(Context)
    {
        this.Rectangle.Draw(Context,this.PlayerLogics.CPVPanelPoint(),0,this.PlayerLogics.CPVPanelBackColor().ToString(),this.PlayerLogics.CPVPanelWidth(),this.PlayerLogics.CPVPanelHeight());
    }
}
class CurrentPlayerView extends InformationView
{
    #Text;
    #Picture;
    

    constructor(playerlogics)
    {
        super(playerlogics);
        this.#Picture = new Picture();
        this.#Text = new DText();
    }

    OnRender(Context)
    {
        super.OnRender(Context);
        this.#Picture.Draw(Context,this.PlayerLogics.GetCurrentPlayer().CPVImagePoint(),0,this.PlayerLogics.GetCurrentPlayer().Image(),this.PlayerLogics.GetCurrentPlayer().CPVImageWidth(),this.PlayerLogics.GetCurrentPlayer().CPVImageHeight());
        this.#Picture.Draw(Context,this.PlayerLogics.GetPassivePlayer().CPVImagePoint(),0,this.PlayerLogics.GetPassivePlayer().Image(),this.PlayerLogics.GetPassivePlayer().CPVImageWidth(),this.PlayerLogics.GetPassivePlayer().CPVImageHeight());
        this.#Text.Draw(Context,this.PlayerLogics.CPVVSPoint(),0,this.PlayerLogics.CPVVSFontStyle(),this.PlayerLogics.CPVFontFillStyle(),'VS');
        this.#Text.Draw(Context,this.PlayerLogics.GetCurrentPlayer().CPVTextPoint(),0,this.PlayerLogics.CPVPlayerFontStyle(),this.PlayerLogics.CPVFontFillStyle(),this.PlayerLogics.GetCurrentPlayer().Name());
        this.#Text.Draw(Context,this.PlayerLogics.GetPassivePlayer().CPVTextPoint(),0,this.PlayerLogics.CPVPlayerFontStyle(),this.PlayerLogics.CPVFontFillStyle(),this.PlayerLogics.GetPassivePlayer().Name());
    }
}

class PlayerView extends View
{
    #Player;
    #Rectangle;
    #Objects;
    #Text;
    constructor(player)
    {
        super();
        this.#Player = player;
        this.#Text = new DText();
        this.#Rectangle = new BorderlessRectangle();
        this.#Objects = 
        [
            new Square(),
            new Triangle(),
            new Circle(),
            new XForm()
        ];
    }

    OnRender(Context)
    {
        this.#Rectangle.Draw(Context,this.#Player.PVPanelPoint(),0,this.#Player.PassiveColor().ToString(),this.#Player.PVPanelWidth(),this.#Player.PVPanelHeight());
        this.#Rectangle.Draw(Context,this.#Player.PVPanelPoint(),0,this.#Player.ActiveColor().ToString(),Calculator.Percentage(this.#Player.PVPanelWidth(),7),this.#Player.PVPanelHeight());
        this.#Text.Draw(Context,this.#Player.PVNamePoint(),-Math.PI/2,this.#Player.PVNameFontStyle(),'black',this.#Player.Name());
        let Points = this.#Player.PVObjectPoints();
        let Counts = this.#Player.PVObjectCounts();
        this.#Objects.forEach((value,index)=> 
        {
            value.Draw(Context,Points[index],0,this.#Player.a(),this.#Player.GetCurrentColor().ToString(),Colors.BlackColor().ToString(),this.#Player.PVObjectStrokeWidth());
            this.#Objects[2].Draw(Context,new Point(Points[index].X + Calculator.Percentage(this.#Player.a(),90),Points[index].Y + Calculator.Percentage(this.#Player.a(),90)),0,Calculator.Percentage(this.#Player.PVPanelHeight(),15),Colors.YellowCellColor().ToString(),Colors.YellowCellColor().ToString(),0);
            this.#Text.Draw(Context,new Point(Points[index].X + Calculator.Percentage(this.#Player.a(),90) + Calculator.Percentage(this.#Player.PVPanelHeight(),3) ,Points[index].Y + Calculator.Percentage(this.#Player.a(),90) + Calculator.Percentage(this.#Player.PVPanelHeight(),13.5)),0,this.#Player.PVNameFontStyle(),'black',Counts[index]);
        });
    }
}

class TableView extends View
{
    #Cells;
    constructor(Cells)
    {
        super();
        this.#Cells = [];
        Cells.forEach((value)=> this.#Cells.push(new CellView(value)));
    }

    OnRender(Context)
    {
        this.#Cells.forEach((value)=> value.OnRender(Context));
    }
}

class CellView extends View
{
    #Cell;
    #Rectangle;
    constructor(cell)
    {
        super();
        this.#Cell = cell;
        this.#Rectangle = new BorderlessRectangle();
    }

    OnRender(Context)
    {
        this.#Rectangle.Draw(Context,this.#Cell.Point(),0,this.#Cell.Color().ToString(),this.#Cell.a(),this.#Cell.a());
    }
}