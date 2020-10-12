const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'Top board',
    columns = [
      {
        id: uuid(),
        title: 'In Progress',
        order: 1
      },
      {
        id: uuid(),
        title: 'Finish',
        order: 2
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }

  static toResponse(board) {
    const { id, title, columns } = board;
    return { id, title, columns };
  }
}

module.exports = Board;
