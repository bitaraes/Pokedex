var paginaAtual = 1
criarLista(paginaAtual)

function buscarListagem(urlPrincipal, listagem) {
	return fetch(urlPrincipal);
};

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
	if (paginaAtual > 2) {
		if (paginaAtual > 53) {
			document.querySelector("#paginacao").innerHTML = `
			<span class="pag-num"><a href="">52</a></span>
			<span class="pag-num"><a href="">53</a></span>
			<span class="pag-num"><a href="">54</a></span>
			<span class="pag-num"><a href="">55</a></span>
			<span class="pag-num"><a href="">56</a></span>`
		} else {
			var paginas = { Penultima:paginaAtual-2,
							Ultima:paginaAtual-1,
							Atual:paginaAtual,
							Sucessora: paginaAtual+1,
							Proxima: paginaAtual+2
						}
			document.querySelector("#paginacao").innerHTML = `
			<span class="pag-num"><a href="">1</a></span>
			<span class="dot"></span><span class="dot"></span><span class="dot"></span>
			<span class="pag-num"><a href="">${paginas.Penultima}</a></span>
			<span class="pag-num"><a href="">${paginas.Ultima}</a></span>
			<span class="pag-num"><a href="">${paginas.Atual}</a></span>
			<span class="pag-num"><a href="">${paginas.Sucessora}</a></span>
			<span class="pag-num"><a href="">${paginas.Proxima}</a></span>
			<span class="dot"></span><span class="dot"></span><span class="dot"></span>
			<span class="pag-num"><a href="">56</a></span>
			`
		}

	} else {
		document.querySelector("#paginacao").innerHTML = `
		<span class="pag-num"><a href="">1</a></span>
		<span class="pag-num"><a href="">2</a></span>
		<span class="pag-num"><a href="">3</a></span>
		<span class="pag-num"><a href="">4</a></span>
		<span class="pag-num"><a href="">5</a></span>
		<span class="dot"></span><span class="dot"></span><span class="dot"></span>
		<span class="pag-num"><a href="">56</a></span>
		`
	}
	mudaPagina()
}

//Faz a transição entre os itens da lista
function mudaPagina(){
	//Selecionar os números das páginas
	numeroPagina = document.querySelectorAll("#paginacao a");
	numeroPagina = Array.from(numeroPagina)
	//Caputurar o clique de mudança de página
	for (i=0; i < numeroPagina.length; i++){
		console.log(numeroPagina[i])
		numeroPagina[i].addEventListener("click", function(evento){
			evento.preventDefault();
			var paginaAtual = parseInt(this.text);
			criarLista(paginaAtual);
		})
	}
}



