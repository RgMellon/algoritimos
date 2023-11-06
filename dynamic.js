const items = [
  {
    name: "🎻 Violao",
    weight: 1,
    price: 1500,
  },
  {
    name: "💻 Notebook",
    weight: 3,
    price: 2000,
  },
  {
    name: "📻 Radio",
    weight: 4,
    price: 3000,
  },
];

const TOTAL_WEIGHT = 4;

function criarMatrizBidimensional(rows, cols) {
  var matriz = new Array(rows);
  for (var i = 0; i < rows; i++) {
    matriz[i] = new Array(cols);
  }

  return matriz;
}

var minhaMatriz = criarMatrizBidimensional(items.length, TOTAL_WEIGHT);

for (let row = 0; row < minhaMatriz.length; row++) {
  for (let column = 1; column <= TOTAL_WEIGHT; column++) {
    if (isTheFirstRow(row)) {
      if (column >= items[row].weight) {
        minhaMatriz[row][column - 1] = items[row];
      } else {
        minhaMatriz[row][column] = 0;
      }
    } else {
      const prevItem = minhaMatriz[row - 1][column - 1];
      const currentItem = items[row];

      if (column >= currentItem.weight) {
        const howManySpaceLeft = column - currentItem.weight;
        if (howManySpaceLeft > 0) {
          const adjacentCell = minhaMatriz[row - 1][howManySpaceLeft];

          if (column >= adjacentCell.weight + currentItem.weight) {
            const newObject = {
              name: `${currentItem.name}, ${adjacentCell.name}`,
              weight: adjacentCell.weight + currentItem.weight,
              price: adjacentCell.price + currentItem.price,
            };

            minhaMatriz[row][column - 1] = newObject;
          } else {
            const adjacentCell = minhaMatriz[row - 1][howManySpaceLeft - 1];
            const newObject = {
              name: `${currentItem.name}, ${adjacentCell.name}`,
              weight: adjacentCell.weight + currentItem.weight,
              price: adjacentCell.price + currentItem.price,
            };
            minhaMatriz[row][column - 1] = newObject;
          }
        } else {
          const howManySpaceLeft = column - currentItem.weight;
          const adjacentCell = minhaMatriz[row - 1][howManySpaceLeft];

          const newObject = {
            name: `${currentItem.name}, ${adjacentCell.name}`,
            weight: adjacentCell.weight + currentItem.weight,
            price: adjacentCell.price + currentItem.price,
          };

          if (
            newObject.price > currentItem.price &&
            newObject.weight <= column
          ) {
            minhaMatriz[row][column - 1] = newObject;
          } else {
            const itemBefore = items[row - 1];
            if (
              itemBefore.weight + adjacentCell.weight <= column &&
              itemBefore.name !== adjacentCell.name
            ) {
              const newObject2 = {
                name: `${itemBefore.name}, ${adjacentCell.name}`,
                weight: adjacentCell.weight + itemBefore.weight,
                price: adjacentCell.price + itemBefore.price,
              };
              minhaMatriz[row][column - 1] = newObject2;
            } else {
              minhaMatriz[row][column - 1] = currentItem;
            }
          }
        }
      } else {
        minhaMatriz[row][column - 1] = prevItem;
      }
    }
  }
}

console.log("------");
console.log(minhaMatriz);
console.log("------");

function isTheFirstRow(row) {
  return row === 0;
}
