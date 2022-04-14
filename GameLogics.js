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
    #Game;
    constructor(Game,CanvasWidth,CanvasHeight)
    {
        super();
        this.#Cells=[];
        this.#Game = Game;
        for(let i=0;i<16;i++)
        {
            let Color = ((i<2 && i >=0)|| (i<6&& i>=4) || (i<12&& i>=10) || (i<16&&i>=14))? Colors.GreenCellColor():Colors.YellowCellColor();
            let Row = Math.floor(i/4) + 1;
            let Column = (i%4)+1;
            let Quarter;
            if((i<2 && i >=0)|| (i<6&& i>=4))
            {
                Quarter = 1;
            }
            else if( (i<4&& i>=2) || (i<8&&i>=6))
            {
                Quarter = 2;
            }
            else if( (i<10&& i>=8) || (i<14&&i>=12))
            {
                Quarter = 3;
            }
            else if( (i<12&& i>=10) || (i<16&&i>=14))
            {
                Quarter = 4;
            }
            this.#Cells.push(new Cell(Row,Column,Quarter,Color));
        }
        this.Resize(CanvasWidth,CanvasHeight);
        this.AddView(new TableView(this.#Cells));
    }

    Resize(CanvasWidth,CanvasHeight)
    {
        this.#Cells.forEach((value) => value.Resize(this.#Game));
    }

}

class Cell
{
    #Object;
    #Row;
    #Column;
    #Quarter;
    #Color
    #a;
    #Point;

    constructor(Row,Column,Quarter,Color)
    {
        this.#Object = null;
        this.#Row = Row;
        this.#Column = Column;
        this.#Quarter = Quarter;
        this.#Color = Color;
    }

    a()
    {
        return this.#a;
    }

    Quarter()
    {
        return this.#Quarter;
    }

    Object()
    {
        return this.#Object;
    }

    Column()
    {
        return this.#Column;
    }

    Row()
    {
        return this.#Row;
    }

    Point()
    {
        return this.#Point;
    }

    Color()
    {
        return this.#Color;
    }
    Resize(Game)
    {
        this.#a = Game.CellHeightWidth();
        this.#Point = Game.GetPoint(this.#Row,this.#Column);
    }
}

class DragLogic extends GameLogic
{
    #DraggedObject;
    #TableLogic;
    #PlayerLogic;
    #Canvas;
    constructor(PlayerLogic,TableLogic,Canvas)
    {
        super();
        this.#DraggedObject = null;
        this.#TableLogic = TableLogic;
        this.#PlayerLogic = PlayerLogic;
        this.#Canvas = Canvas;
        this.AddView(new DraggedObjectView(this));
    }

    DraggedObject()
    {
        return this.#DraggedObject;
    }

    OnMouseDown(event)
    {
        let point = new Point(event.clientX,event.clientY);
        for(let i=0;i<4;i++)
        {
            let lesserX = this.#PlayerLogic.GetCurrentPlayer().PVObjectPoints()[i].X;
            let lesserY = this.#PlayerLogic.GetCurrentPlayer().PVObjectPoints()[i].Y;
            let greaterX = lesserX + this.#PlayerLogic.GetCurrentPlayer().a();
            let greaterY = lesserY + this.#PlayerLogic.GetCurrentPlayer().a();
            if(this.#PlayerLogic.GetCurrentPlayer().PVObjectCounts()[i] > 0&& point.IsInRectangle(lesserX,greaterX,lesserY,greaterY))
            {
                let drawable;
                switch(i)
                {
                    case 0:
                        drawable = new Square();
                        break;
                    case 1:
                        drawable = new Triangle();
                        break;
                    case 2:
                        drawable = new Circle();
                        break;
                    case 3:
                        drawable = new XForm();
                        break;
                }
                this.#DraggedObject = new DraggedObject(drawable,point.Subtract(Calculator.Percentage(this.#PlayerLogic.GetCurrentPlayer().a(),50)),this.#PlayerLogic.GetCurrentPlayer());
                this.#Canvas.addEventListener('mousemove',this.OnMouseMove);
            }
        }
    }

    OnMouseUp(event)
    {
        this.#Canvas.removeEventListener('mousemove',this.OnMouseMove);
        this.#DraggedObject= null;
    }

    OnMouseMove(event)
    {
        let p = new Point(event.clientX,event.clientY);
        let point = p.Subtract(Calculator.Percentage(this.#PlayerLogic.GetCurrentPlayer().a(),50));
        this.#DraggedObject.SetPoint(point.X,point.Y);
    }



    Resize(CanvasWidth,CanvasHeight)
    {

    }
}

class DraggedObject
{
    #Drawable;
    #Object;
    #Point;
    constructor(Drawable,Point,Object)
    {
        this.#Drawable = Drawable;
        this.#Object = Object;
        this.#Point = Point;
    }
    Drawable()
    {
        return this.#Drawable;
    }

    Point()
    {
        return this.#Point;
    }

    FillStyle()
    {
        return this.#Object.GetCurrentColor().ToString();
    }

    StrokeWidth()
    {
        return this.#Object.PVObjectStrokeWidth();
    }
    SetPoint(X,Y)
    {
        this.#Point= new Point(X,Y);
    }
    a()
    {
        return this.#Object.a();
    }
}