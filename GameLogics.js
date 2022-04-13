class Calculator
{
    static Percentage(num,percentage)
    {
        return num*percentage/100;
    }

    static MultiplyAndAdd(num1,num2,multiply1,multiply2)
    {
        return (num1*multiply1)+(num2*multiply2);
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

    RenderAllViews()
    {
        this.#Views.forEach((value)=> value.OnRender());
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
    CPVPanelWidth;
    CPVPanelHeight;
    CPVPanelPoint;
    CPVPanelBackColor;
    Game;
    constructor(Game,CanvasWidth,CanvasHeight)
    {
        super();
        this.#CurrentPlayer= 0;
        this.#Players = 
        [
            new Player(0),
            new Player(1)
        ];
        this.Game = Game;
        this.Resize(CanvasWidth,CanvasHeight);
        this.AddView(new CurrentPlayerView(this));
        this.AddView(new PlayerView(this.#Players[0]));
        this.AddView(new PlayerView(this.#Players[1]));

    }
    Resize(CanvasWidth,CanvasHeight)
    {
        this.CPVPanelWidth = Calculator.Percentage(CanvasWidth,25);
        this.CPVPanelHeight = Calculator.Percentage(this.Game.CellPos(4,3),33);
        this.CPVPanelPoint = new Point(Calculator.Percentage(CanvasWidth,56.25),0);
        this.CPVPanelBackColor = Colors.YellowCellColor();
        this.#Players.forEach((value)=> value.Resize(this.CPVPanelWidth,this.CPVPanelHeight,this.CPVPanelPoint));
    }

    NextPlayer()
    {
        this.#CurrentPlayer = (this.#CurrentPlayer==0)?1:0;
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
        return `bold ${Calculator.Percentage(this.CPVPanelWidth,20)}px serif`;
    }

    CPVFontFillStyle()
    {
        return 'black';
    }
    CPVPlayerFontStyle()
    {
        return `bold ${Calculator.Percentage(this.CPVPanelWidth,6)}px serif`;;
    }

    CPVVSPoint()
    {
        let X1 = this.#Players[0].CPVImagePoint().X;
        let X2 = this.#Players[1].CPVImagePoint().X;
        return new Point(X1 + Calculator.Percentage((X2-X1),50),Calculator.Percentage(this.CPVPanelHeight,60));
    }
}

class Player
{
    #PanelHeight;
    #PanelWidth;
    #PanelPoint;

    constructor(index)
    {
        this.#PanelHeight=0;
        this.#PanelWidth=0;
        this.#PanelPoint=0;
        this.Index=index;
    }
    CPVImagePoint()
    {
        let x = (this.Index==0)?this.#PanelPoint.X+Calculator.Percentage(this.#PanelWidth,10):this.#PanelPoint.X+Calculator.Percentage(this.#PanelWidth,65); 
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

    Resize(PanelWidth,PanelHeight,PanelPoint)
    {
        this.#PanelWidth = PanelWidth;
        this.#PanelHeight = PanelHeight;
        this.#PanelPoint = PanelPoint;
    }
}
