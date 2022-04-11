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
    let player1Panel = new PlayerPanel(new BorderlessRectangle(new Point(X,CellPos(4,3)/2),Jatekos1PasszivColor,PanelWidths,PlayerPanelHeight),'1. Játékos',Jatekos1AktivColor,Jatekos1PasszivColor,true);
    let player2Panel = new PlayerPanel(new BorderlessRectangle(new Point(X,CellPos(4,3)-PlayerPanelHeight),Jatekos2PasszivColor,PanelWidths,PlayerPanelHeight),'2. Játékos',Jatekos2AktivColor,Jatekos2PasszivColor,false);
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