class Calculator
{
    static Percentage(num,percentage)
    {
        return num*percentage/100;
    }
}

class GameLogic
{
    #Views;
    constructor()
    {
        if (this.constructor == GameLogic) 
        {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.#Views = [];
    }

    AddView(view)
    {
        this.#Views.push(view);
    }

    RemoveView()
    {
        this.#Views.pop();
    }

    RenderAllViews(Context)
    {
        this.#Views.forEach((value)=> value.OnRender(Context));
    }

    Resize(CanvasWidth,CanvasHeight)
    {
        throw new Error("Abstract methods should be implemented in inherited class.");
    }
}

class PlayerLogics extends GameLogic
{
    #CurrentPlayer;
    #Players
    #CPVPanelWidth;
    #CPVPanelHeight;
    #CPVPanelPoint;
    #CPVPanelBackColor;
    Game;
    constructor(Game,CanvasWidth,CanvasHeight,P1,P2)
    {
        super();
        this.#CurrentPlayer= 0;
        this.#Players = 
        [
            new Player(0,P1),
            new Player(1,P2)
        ];
        this.Game = Game;
        this.#CPVPanelBackColor = Colors.YellowCellColor();
        this.Resize(CanvasWidth,CanvasHeight);
        this.AddView(new CurrentPlayerView(this));
        this.AddView(new PlayerView(this.#Players[0]));
        this.AddView(new PlayerView(this.#Players[1]));

    }
    Resize(CanvasWidth,CanvasHeight)
    {
        this.#CPVPanelWidth = Calculator.Percentage(CanvasWidth,25);
        this.#CPVPanelHeight = Calculator.Percentage(this.Game.CellPos(4,3),33);
        this.#CPVPanelPoint = new Point(Calculator.Percentage(CanvasWidth,56.25),0);
        this.#Players.forEach((value)=> value.Resize(this.#CPVPanelWidth,this.#CPVPanelHeight,this.#CPVPanelPoint,Calculator.Percentage(this.Game.CellPos(4,3),20),this.Game.CellPos(4,3)));
    }

    NextPlayer()
    {
        this.#CurrentPlayer = (this.#CurrentPlayer==0)?1:0;
        this.#Players.forEach((value)=> value.NextPlayer());
    }

    GetCurrentPlayer()
    {
        return this.#Players[this.#CurrentPlayer];
    }

    GetPassivePlayer()
    {
        return this.#Players[(this.#CurrentPlayer== 0)?1:0];
    }

    CPVVSFontStyle()
    {
        return `bold ${Calculator.Percentage(this.#CPVPanelWidth,20)}px serif`;
    }

    CPVFontFillStyle()
    {
        return 'black';
    }
    CPVPlayerFontStyle()
    {
        return `bold ${Calculator.Percentage(this.#CPVPanelWidth,6)}px serif`;;
    }

    CPVVSPoint()
    {
        let X1 = this.#Players[0].CPVImagePoint().X;
        let X2 = this.#Players[1].CPVImagePoint().X;
        return new Point(X1 + Calculator.Percentage((X2-X1),50),Calculator.Percentage(this.#CPVPanelHeight,60));
    }

    CPVPanelBackColor()
    {
        return this.#CPVPanelBackColor;
    }

    CPVPanelWidth()
    {
        return this.#CPVPanelWidth;
    }

    CPVPanelHeight()
    {
        return this.#CPVPanelHeight;
    }

    CPVPanelPoint()
    {
        return this.#CPVPanelPoint;
    }
}

class Player
{
    #PanelHeight;
    #PanelWidth;
    #PanelPoint;
    #PVPanelPoint;
    #PVPanelHeight;
    #ActiveImage;
    #PassiveImage;
    #Name;
    #Counts;
    #IsActive;
    #Index;

    constructor(index,Name)
    {
        this.#PanelHeight=0;
        this.#PanelWidth=0;
        this.#PanelPoint=0;
        this.#PVPanelHeight = 0;
        this.#PVPanelPoint= null;
        this.#Name = Name;
        this.#Counts = [3,3,3,3];
        this.#Index=index;
        this.#ActiveImage = document.createElement('img');
        this.#PassiveImage = document.createElement('img');
        this.#ActiveImage.src = (this.#Index==0)? 'Images/piros.png':'Images/zold.png';
        this.#PassiveImage.src = (this.#Index==0)? 'Images/halvany_piros.png':'Images/halvany_zold.png';
        this.#IsActive = (this.#Index==0)? true: false;
    }
    CPVImagePoint()
    {
        let x = (this.#Index==0)?this.#PanelPoint.X+Calculator.Percentage(this.#PanelWidth,10):this.#PanelPoint.X+Calculator.Percentage(this.#PanelWidth,65); 
        return new Point(x,Calculator.Percentage(this.#PanelHeight,20));
    }

    CPVImageWidth()
    {
        return Calculator.Percentage(this.#PanelWidth,25);
    }

    CPVImageHeight()
    {
        return Calculator.Percentage(this.#PanelHeight,50);
    }

    CPVTextPoint()
    {
        let imgPoint = this.CPVImagePoint();
        return new Point(imgPoint.X,imgPoint.Y + this.CPVImageHeight() + Calculator.Percentage(this.#PanelHeight,10));
    }

    PVPanelWidth()
    {
        return this.#PanelWidth;
    }

    PVPanelHeight()
    {
        return this.#PVPanelHeight;
    }

    PVPanelPoint()
    {
        return this.#PVPanelPoint;
    }

    PVNamePoint()
    {
        return new Point(this.#PVPanelPoint.X + Calculator.Percentage(this.#PanelWidth,5),this.#PVPanelPoint.Y + Calculator.Percentage(this.#PVPanelHeight,93));
    }

    PVNameFontStyle()
    {
        return `bold ${Calculator.Percentage(this.#PVPanelHeight,20)}px serif`
    }

    Name()
    {
        return this.#Name;
    }
    GetCurrentColor()
    {
        return (this.#IsActive)? this.ActiveColor(): this.PassiveColor();
    }

    PassiveColor()
    {
        return (this.#Index==0)?Colors.P1PassiveColor():Colors.P2PassiveColor();
    }

    ActiveColor()
    {
        return (this.#Index==0)?Colors.P1ActiveColor():Colors.P2ActiveColor();
    }

    Image()
    {
        return (this.#IsActive)?this.#ActiveImage:this.#PassiveImage;
    }

    a()
    {
        return Calculator.Percentage(this.#PVPanelHeight,50);
    }

    PVObjectStrokeWidth()
    {
        return Calculator.Percentage(this.#PVPanelHeight,5);
    }

    PVObjectPoints()
    {
        let Y = this.#PVPanelPoint.Y +Calculator.Percentage(this.#PVPanelHeight,25);
        let tomb = 
        [
            new Point(this.#PVPanelPoint.X + Calculator.Percentage(this.#PanelWidth,12),Y),
            new Point(this.#PVPanelPoint.X + Calculator.Percentage(this.#PanelWidth,35),Y),
            new Point(this.#PVPanelPoint.X + Calculator.Percentage(this.#PanelWidth,58),Y),
            new Point(this.#PVPanelPoint.X + Calculator.Percentage(this.#PanelWidth,81),Y)
        ];
        return tomb;
    }
    NextPlayer()
    {
        this.#IsActive=!this.#IsActive;
    }
    PVObjectCounts()
    {
        return this.#Counts;
    }

    Resize(PanelWidth,PanelHeight,PanelPoint,PVPanelHeight,CellPos)
    {
        this.#PanelWidth = PanelWidth;
        this.#PanelHeight = PanelHeight;
        this.#PanelPoint = PanelPoint;
        this.#PVPanelHeight = PVPanelHeight;
        let X = this.#PanelPoint.X;
        this.#PVPanelPoint = (this.#Index==0)?new Point(X,Calculator.Percentage(CellPos,50)):new Point(X,CellPos-this.#PVPanelHeight);
    }
}


class TableLogic extends GameLogic
{
    #Cells;
    constructor(CanvasWidth,CanvasHeight)
    {
        super();
        this.#Cells=[];
        for(let i=0;i<16;i++)
        {
            
        }
    }

    Resize(CanvasWidth,CanvasHeight)
    {

    }

}

class Cell
{

}
