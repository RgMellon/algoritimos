const myFriends = [
  {
    name: "Alice",
    sellMango: false,
  },
  {
    name: "Bob",
    sellMango: true,
  },
  {
    name: "Claire",
    sellMango: false,
  },
];

const bobsFriend = [
  {
    name: "Anuj",
    sellMango: false,
  },
  {
    name: "Peggy",
    sellMango: false,
  },
];

const alicesFriend = [
  {
    name: "Peggy",
    sellMango: false,
  },
];

const clairesFriend = [
  {
    name: "Thom",
    sellMango: false,
  },
  {
    name: "Jhony",
    sellMango: false,
  },
];

const grafo = {};

grafo["me"] = myFriends;
grafo["bob"] = bobsFriend;
grafo["alice"] = alicesFriend;
grafo["claire"] = clairesFriend;
grafo["anuj"] = [];
grafo["peggy"] = [];
grafo["thom"] = [];
grafo["jhony"] = [];

let searchQueue = [];
searchQueue = grafo["me"];

let loop = 0;

while (searchQueue.length !== 0) {
  const person = searchQueue.shift();

  loop++;

  try {
    if (person.sellMango) {
      console.log("opaa, essa pessoa vende manga", person.name);
      console.log(loop);
      break;
    } else {
      // busca o meu amigo no grafo, e recupera os amigos dele, para adicionar futuramente a fila
      const searchIfFriendOfMyFriendSellMango =
        grafo[`${person.name.toLocaleLowerCase()}`];

      //   aqui vou passar por cada um da lista dos amigos do meu amigo e adicionar na searchQueue

      if (searchIfFriendOfMyFriendSellMango.length > 0)
        searchIfFriendOfMyFriendSellMango.forEach((friend) => {
          searchQueue.push(friend);
        });
    }
  } catch (err) {
    console.error(err);
  }
}

console.log("ppppp", loop);
