mudaPagina()
criarLista(1)

function buscarListagem(urlPrincipal, listagem) {
	return fetch(urlPrincipal);
};
//Insere os itens html na lista
function criarHtml(pokemonList, paginaAtual){
	var listItens = document.querySelectorAll("div[class=list-item]");
	listItens = Array.from(listItens);
	for (i in listItens){
		var dados = `<div class="list-nome caracteristica"><h2>${pokemonList[i].Nome}</h2></div>
					<div class="list-img"><img src="${pokemonList[i].Img}"</div>
					<div class="list-numero caracteristica">Número: ${pokemonList[i].Numero}</div>
					<div class="list-tipo caracteristica">Tipos: ${pokemonList[i].Tipo} ${pokemonList[i].Tipo2}</div>`
		listItens[i].innerHTML = dados;
	}
}
//Faz a requisição da lista e cria um objeto com os dados dos pokemons
async function criarLista(paginaAtual){
	var urlPagina = Number((paginaAtual-1)*20)
	var urlPrincipal = `https://pokeapi.co/api/v2/pokemon?offset=${urlPagina}&limit=20`;
	try{
		var url = await buscarListagem(urlPrincipal);
		var pokemonList = await url.json();
		for (i in pokemonList.results){
			url = await fetch(pokemonList.results[i].url);
			url = await url.json();
			if (url.types[1] != null) {
				var pokemon = {	Nome: url.name, 
							Numero: url.id, 
							Tipo: url.types[0].type.name,
							Tipo2: url.types[1].type.name,  
							Img: url.sprites.front_default};
			} else {
				var pokemon = {	
					Nome: url.name, 
					Numero: url.id, 
					Tipo: url.types[0].type.name,
					Tipo2: "",  
					Img: url.sprites.front_default
				};
			}

			pokemonList[i] = pokemon;
		}
	} catch {
		alert("Dados não encontrados");
	}
	criarHtml(pokemonList, paginaAtual);
}

//Faz a transição entre os itens da lista
function mudaPagina(){
	numeroPagina = document.querySelectorAll("#paginacao a");
	numeroPagina = Array.from(numeroPagina)
	for (i=0; i < numeroPagina.length; i++){
		numeroPagina[i].addEventListener("click", function(evento){
			evento.preventDefault();
			var paginaAtual = parseInt(this.text);
			criarLista(paginaAtual);
		})
	}

}



