const items = [
  {
    name: "🎻 Violao",
    weight: 1,
    price: 1500,
  },

  {
    name: "📻 Radio",
    weight: 4,
    price: 3000,
  },
  {
    name: "💻 Notebook",
    weight: 3,
    price: 2000,
  },

  {
    name: "📲 Iphone",
    weight: 1,
    price: 2000,
  },
];

const TOTAL_WEIGHT = 4;
const HOW_MANY_ITEMS = items.length;

function createNewMatrix(rows, cols) {
  var matrix = new Array(rows);
  for (var i = 0; i < rows; i++) {
    matrix[i] = new Array(cols);
  }

  return matrix;
}

const table = createNewMatrix(HOW_MANY_ITEMS, TOTAL_WEIGHT);

items.forEach((currentItem, row) => {
  for (let column = 1; column <= TOTAL_WEIGHT; column++) {
    const COLUMN_INDEX = column - 1;

    const itsFit = currentItemFitsOnThisColumn({
      currentItem,
      column,
    });

    if (itsFit) {
      let item = currentItem;

      const fitsMoreThanOne = verifyIfFitCurrentItemAndOneMore({
        currentItem,
        column,
        row,
      });

      if (fitsMoreThanOne) {
        fillTheCellWithCurrentItemAndPrevItem({
          column,
          row,
          currentItem,
        });
      }

      if (!fitsMoreThanOne && row !== 0) {
        item = verifyIfIsTheBestChoiceOrIfTheSumOfMoreItemsIsBetter({
          column,
          row,
          currentItem,
        });
      }

      fillTheCellWithTheValue({
        currentItem: item,
        column: COLUMN_INDEX,
        row,
      });
    }

    if (!itsFit) {
      getTheItemOfThePreviousRowAndFillTheCurrentCell({
        column: COLUMN_INDEX,
        row,
      });
    }

    fillTheCellWithCurrentItemAndPrevItem({
      column,
      row,
      currentItem,
    });
  }
});

function verifyIfIsTheBestChoiceOrIfTheSumOfMoreItemsIsBetter({
  currentItem,
  column,
  row,
}) {
  const SPACE_LEFT = column - currentItem.weight;

  const itemOfSpaceLeft = table[row - 1][SPACE_LEFT];
  const itemPrev = table[row - 1][column - 1];

  if (itemPrev.price >= currentItem.price) return itemPrev;

  if (itemPrev.name === itemOfSpaceLeft.name) return currentItem;

  const joinedItems = joinItemsToFitInTheSameCell({
    currentItem: itemOfSpaceLeft,
    prevItem: itemPrev,
  });

  if (joinedItems.price >= currentItem.price) {
    return joinedItems;
  } else {
    return currentItem;
  }
}

function verifyIfFitCurrentItemAndOneMore({ currentItem, column }) {
  return column - currentItem.weight > 0;
}

function currentItemFitsOnThisColumn({ currentItem, column }) {
  const SPACE_ON_BAG = column;
  return SPACE_ON_BAG >= currentItem.weight;
}

function fillTheCellWithTheValue({ currentItem, column, row }) {
  table[row][column] = currentItem;
}

function getTheItemOfThePreviousRowAndFillTheCurrentCell({ column, row }) {
  if (row === 0) return;

  const PREV_ROW = row - 1;
  table[row][column] = table[PREV_ROW][column];
}

function fillTheCellWithCurrentItemAndPrevItem({ column, row, currentItem }) {
  if (currentItem.weight < column && row !== 0) {
    const PREV_ROW = row - 1;
    const SPACE_LEFT = column - currentItem.weight;

    const prevItem = table[PREV_ROW][SPACE_LEFT];

    if (prevItem.weight >= column) {
      return (table[row][column - 1] = prevItem);
    }

    const joined = joinItemsToFitInTheSameCell({
      currentItem,
      prevItem,
    });

    table[row][column - 1] = joined;
  }
}

function joinItemsToFitInTheSameCell({ currentItem, prevItem }) {
  return {
    name: `${prevItem.name}, ${currentItem.name}`,
    weight: prevItem.weight + currentItem.weight,
    price: prevItem.price + currentItem.price,
  };
}

console.log(table);
