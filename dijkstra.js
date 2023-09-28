const grafo = {};

// Grafo inicio é uma tabela hash, com seus vizinhos (a, b)
grafo["inicio"] = {};
grafo["inicio"]["a"] = 6;
grafo["inicio"]["b"] = 2;

// Add o grafo a com o seu vizinho
grafo["a"] = {};
grafo["a"]["fim"] = 1;

// Add o grafo B com o seu vizinho
grafo["b"] = {};
grafo["b"]["a"] = 3;
grafo["b"]["fim"] = 5;

grafo["fim"] = {};

// Segundo passo, criar uma tabela hash para armazernar
//os custos de cada vertice;

const custos = {};
custos["a"] = 6;
custos["b"] = 2;
custos["fim"] = Infinity;

// Terceiro passo, criar uma tabela hash para armzernar os pais

const pais = {};
pais["a"] = "inicio";
pais["b"] = "inicio";
pais["fim"] = "undefined";

// um array para guardar todos os VERTICES processados, para que não sejam processados novamente;

console.log(custos, "antes");

const processados = [];

function ache_no_com_custo_mais_baixo(custosParams) {
  let custo_mais_baixo = Infinity;
  let no_custo_mais_baixo = undefined;

  Object.keys(custosParams).forEach((vetice) => {
    const custo = custos[vetice];

    // console.log(vetice, "v", processados.includes(vetice));

    if (custo < custo_mais_baixo && !processados.includes(vetice)) {
      custo_mais_baixo = custo;
      no_custo_mais_baixo = vetice;
    }
  });

  return no_custo_mais_baixo;
}

let vertice_com_menor_custo = ache_no_com_custo_mais_baixo(custos);

while (vertice_com_menor_custo) {
  const custo = custos[vertice_com_menor_custo];

  const vizinhos = grafo[vertice_com_menor_custo];

  Object.keys(vizinhos).forEach((vizinho) => {
    const novo_custo = custo + vizinhos[vizinho];

    if (custos[vizinho] > novo_custo) {
      //   console.log(custos[vizinho], vizinho, "ii", novo_custo);
      custos[vizinho] = novo_custo;
      pais[vizinho] = vertice_com_menor_custo;
    }
  });

  processados.push(vertice_com_menor_custo);

  vertice_com_menor_custo = ache_no_com_custo_mais_baixo(custos);
}

console.log(custos, "depois");
