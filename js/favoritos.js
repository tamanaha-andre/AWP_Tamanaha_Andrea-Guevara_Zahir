//Mis Personajes favoritos guardados

let misfavoritos = {
	id:[],
	genero:[],
	nombre:[],
	imagen:[],
	especie:[]
};

if (localStorage.misfavoritos){
    misfavoritos = JSON.parse(localStorage.misfavoritos);
} else {
    localStorage.misfavoritos = JSON.stringify(misfavoritos);
}

let datosfavoritos = document.getElementById('contentFavoritos');

function mostrarFavoritos(){
	let cardPersonaje = '';
	
		for (i = 0; i < misfavoritos.id.length; i++) {
		
		console.log(misfavoritos.nombre[i]);
		console.log(misfavoritos.especie[i]);
		cardPersonaje += `
		<div class="col-sm-3">
				<div class="card">
				  <div class="card-body">
				    <img src="${misfavoritos.imagen[i]}" alt="${misfavoritos.nombre[i]}" class="card-img-top">
					<h2 class="card-title mb-1">${misfavoritos.nombre[i]}</h2>
					<p class="card-text mb-1">${misfavoritos.especie[i]}</p>
					<p class="card-text">${misfavoritos.genero[i]}</p>
				
					<button data-cod="${misfavoritos.id[i]}" class="eliminarPersonaje">Eliminar</button>
				  </div>
				</div>
			</div>`;
			datosfavoritos.innerHTML = `${cardPersonaje}`;
	}


let cards = document.querySelectorAll('.eliminarPersonaje');
	console.log(cards);

	for(i of cards){

			i.onclick = function(){
				let saveCod = this.dataset.cod;
				
				for (s = 0; s < misfavoritos.id.length; s++) {
					
					if( saveCod == misfavoritos.id[s]){
						
						misfavoritos.id.splice(s,1);
						misfavoritos.genero.splice(s,1);
						misfavoritos.nombre.splice(s,1);
						misfavoritos.imagen.splice(s,1);
						misfavoritos.especie.splice(s,1);	
						
						
						let nodoPadre = this.parentNode;
						let nodoAbu = nodoPadre.parentNode;
						let nodoBisa = nodoAbu.parentNode;
							nodoBisa.remove();

							localStorage.misfavoritos = JSON.stringify(misfavoritos);
						
					}
				}
			}
	};

}


mostrarFavoritos();