function buscarListagem(urlPrincipal, listagem) {
	return fetch(urlPrincipal);
};

function criarHtml(pokemonList){
	var listItens = document.querySelectorAll("div[class=list-item]");
	listItens = Array.from(listItens);
	for (i in listItens){
		var dados = `<div class="list-nome caracteristica"><h2>${pokemonList[i].Nome}</h2></div>
					<div class="list-img"><img src="${pokemonList[i].Img}"</div>
					<div class="list-numero caracteristica">Número: ${pokemonList[i].Numero}</div>
					<div class="list-tipo caracteristica">Tipo: ${pokemonList[i].Tipo}</div>`
		listItens[i].innerHTML = dados
		console.log(pokemonList[i].Tipo)
	}
	
}

async function criarLista(){
	var urlPrincipal = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=20";
	try{
		var url = await buscarListagem(urlPrincipal);
		var pokemonList = await url.json();
		for (i in pokemonList.results){
			url = await fetch(pokemonList.results[i].url);
			url = await url.json();
			var pokemon = {Nome: url.name, Numero: url.id, Tipo: url.types[0].type.name, Img: url.sprites.front_default};
			pokemonList[i] = pokemon;
		}
	} catch {
		alert("Dados não encontrados");
	}
	criarHtml(pokemonList);
}

criarLista()