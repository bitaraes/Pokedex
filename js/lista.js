let paginaAtual = 1
criarLista()

function buscarListagem(urlPrincipal) {
	return fetch(urlPrincipal);
};

//Faz a requisição da lista e cria um objeto com os dados dos pokemons
async function criarLista(){
	//Calcula o número da página que irá compor a URL principal
	const urlPagina = Number((paginaAtual-1)*20);
	const urlPrincipal = `https://pokeapi.co/api/v2/pokemon?offset=${urlPagina}&limit=20`;
	try{
		//Requisita a Lista com os pokemons
		const url = await buscarListagem(urlPrincipal);
		//Converte o response em um json
		var pokemonList = await url.json();
		//Faz uma requisição para cada pokemon da lista
		for (i in pokemonList.results){
			//Faz a requisição de um pokemon específico.
			const pokemonReq = await fetch(pokemonList.results[i].url);
			//Converte o response em JSON
			const results = await pokemonReq.json();
			const pokemon = {nome: results.name, 
							numero: results.id, 
							tipo: results.types[0].type.name,
							tipo2: !results.types[1] ? "":results.types[1].type.name,  
							img: results.sprites.front_default};
			//Inclui os objetos criados à lista
			pokemonList.results[i] = pokemon;
		}
	} catch {
		console.log("Dados não encontrados");
	}
	//Chama a função que irá gerar o html
	criarHtml(pokemonList);
}

//Gera os itens html
function criarHtml(pokemonList){
	//seleciona o elemento pai
	let elementSelect = document.querySelector("section[id=pokemon-listagem] > div");
	//limpa o elemento pai para que os novos elementos sejam criados
	elementSelect.innerHTML="";
	//Percorre a lista e cria um elemento para cada pokemon
	pokemonList.results.forEach(atual => {
		const dados = `
			<div class="list-item">
			<div class="list-nome caracteristica"><h2>${atual.nome}</h2></div>
			<div class="list-img"><img src="${atual.img}"></div>
			<div class="list-numero caracteristica">Número: ${atual.numero}</div>
			<div class="list-tipo caracteristica">Tipos: ${atual.tipo} ${atual.tipo2}</div>
			</div>`;
		elementSelect.innerHTML+=dados;
	});

	//Cria os links de mudança de página caso a pagina seja menor que 5. 
	if(paginaAtual < 5) {
		document.querySelector("#paginacao").innerHTML = `
		<span class="pag-num"><a href="">1</a></span>
		<span class="pag-num"><a href="">2</a></span>
		<span class="pag-num"><a href="">3</a></span>
		<span class="pag-num"><a href="">4</a></span>
		<span class="pag-num"><a href="">5</a></span>
		<span class="dot"></span><span class="dot"></span><span class="dot"></span>
		<span class="pag-num"><a href="">56</a></span>`;
		capturaPagina();
		return;
	}

	//Cria os links de mudança de página caso a pagina seja maior que 53. 
	if (paginaAtual > 53) {
		document.querySelector("#paginacao").innerHTML = `
			<span class="pag-num"><a href="">1</a></span>
			<span class="dot"></span><span class="dot"></span><span class="dot"></span>
			<span class="pag-num"><a href="">52</a></span>
			<span class="pag-num"><a href="">53</a></span>
			<span class="pag-num"><a href="">54</a></span>
			<span class="pag-num"><a href="">55</a></span>
			<span class="pag-num"><a href="">56</a></span>`;
			capturaPagina();
		return ;
	}

	//Calcula o valor dos links de acordo com o número da página atual. 
	const paginas = { penultima:paginaAtual-2,
					ultima:paginaAtual-1,
					atual:paginaAtual,
					sucessora: paginaAtual+1,
					proxima: paginaAtual+2
				};
	document.querySelector("#paginacao").innerHTML = `
	<span class="pag-num"><a href="">1</a></span>
	<span class="dot"></span><span class="dot"></span><span class="dot"></span>
	<span class="pag-num"><a href="">${paginas.penultima}</a></span>
	<span class="pag-num"><a href="">${paginas.ultima}</a></span>
	<span class="pag-num"><a href="">${paginas.atual}</a></span>
	<span class="pag-num"><a href="">${paginas.sucessora}</a></span>
	<span class="pag-num"><a href="">${paginas.proxima}</a></span>
	<span class="dot"></span><span class="dot"></span><span class="dot"></span>
	<span class="pag-num"><a href="">56</a></span>`;

	//Chama a função que captura o valor da pagina atual.
	capturaPagina();
}

//Captura o valor do link clicado e atribui à pagina Atual
function capturaPagina(){
	//Seleciona os elementos com os números das páginas
	const elementList = document.querySelectorAll("#paginacao a");
	const numeroPagina = Array.from(elementList);
	//Capturar o clique de mudança de página
	elementList.forEach(atual => {
		atual.addEventListener("click", evento => {
			evento.preventDefault();
			paginaAtual = parseInt(evento.target.text);
			criarLista();
		});
	});
}
