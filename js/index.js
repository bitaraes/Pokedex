//Não recarregar página ao clicar no submit
document.querySelector("form")
.addEventListener("submit", function(evento){
		evento.preventDefault();
		enviarClick();
	}
)

//Criar o promise
function buscar(urlPrincipal, pesquisado){
	return fetch(urlPrincipal+pesquisado);
}

//Preencher os dados do html
function criarHtml(dados){
	document.querySelector("section[id=resultados]").innerHTML = dados; 
}

//evento de click
async function enviarClick(){
	var urlPrincipal =  "https://pokeapi.co/api/v2/pokemon/";
	var pesquisado = document.querySelector("input[id=pokemon]").value;
	try{
		var url = await buscar(urlPrincipal, pesquisado);
		var pokemon = await url.json();
		console.log(pokemon)
	} catch {
		alert("Numero ou nome não encontrado");
	}
	var dados = `<div class="column">
				<div id="card">
					<h2>Nome: </h2>
					<h2 class="caracteristica">${pokemon.name} </h2>
					<div id="poke-foto">
						<img src=${pokemon.sprites.front_default}>
					</div>
					<div id="poke-informacao">
						<ul>
							<li><h3>Altura: <span class="caracteristica">${Number(pokemon.height)/10} m</span></h3></li>
							<li><h3>Peso: <span class="caracteristica">${Number(pokemon.weight)/10} Kg</span></h3></li>
							<li><h3>Habilidade: <span class="caracteristica">${pokemon.abilities[0].ability.name}</span></h3></li>
							<li><h3>Categoria: <span class="caracteristica">${pokemon.types[0].type.name}</span></h3></li>
						</ul>
					</div>
				</div>
			</div>`;

	criarHtml(dados);
}
