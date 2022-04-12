const game = new Game("Viktor","Viki");

  function next() {
    game.render();
    requestAnimationFrame(next);
  }
  next();