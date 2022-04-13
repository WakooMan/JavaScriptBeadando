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

  Draw()
  {
      throw new Error('Abstract method should be initiated.');
  }
}

class DText extends Drawable
{
    constructor()
    {}

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
    {}

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
    {}

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
        this.Rectangle = new BorderlessRectangle();
        this.PlayerLogics = playerlogics;
    }
    OnRender(Context)
    {
        this.Rectangle.Draw(Context,this.PlayerLogics.CPVPanelPoint,0,this.PlayerLogics.CPVPanelBackColor,this.PlayerLogics.CPVPanelWidth,this.PlayerLogics.CPVPanelHeight);
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
        this.#Picture.Draw(Context,this.PlayerLogics.GetCurrentPlayer().CPVImagePoint(),0,this.PlayerLogics.GetCurrentPlayer().ActiveImage,this.PlayerLogics.GetCurrentPlayer().CPVImageWidth(),this.PlayerLogics.GetCurrentPlayer().CPVImageHeight());
        this.#Picture.Draw(Context,this.PlayerLogics.GetPassivePlayer().CPVImagePoint(),0,this.PlayerLogics.GetPassivePlayer().PassiveImage,this.PlayerLogics.GetPassivePlayer().CPVImageWidth(),this.PlayerLogics.GetPassivePlayer().CPVImageHeight());
        this.#Text.Draw(Context,this.PlayerLogics.CPVVSPoint(),0,this.PlayerLogics.CPVVSFontStyle(),this.PlayerLogics.CPVFontFillStyle(),'VS');
        this.#Text.Draw(Context,this.PlayerLogics.GetCurrentPlayer().CPVTextPoint(),0,this.PlayerLogics.CPVPlayerFontStyle(),this.PlayerLogics.CPVFontFillStyle(),this.PlayerLogics.GetCurrentPlayer().Name);
        this.#Text.Draw(Context,this.PlayerLogics.GetPassivePlayer().CPVTextPoint(),0,this.PlayerLogics.CPVPlayerFontStyle(),this.PlayerLogics.CPVFontFillStyle(),this.PlayerLogics.GetPassivePlayer().Name);
    }
}