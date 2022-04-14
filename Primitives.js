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

  static BlackColor()
  {
    return new Color(0,0,0);
  }
}

class Point
{
  constructor(x,y)
  {
    this.X = x;
    this.Y = y;
  }

  IsInRectangle(lesserX,greaterX,lesserY,greaterY)
  {

    return lesserX <= this.X && greaterX >= this.X && lesserY <= this.Y && greaterY >= this.Y;
  }
}