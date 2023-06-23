//https://rickandmortyapi.com/graphql

let input_buscador = document.getElementById('buscador');
let boton_buscador = document.querySelector('.buscarboton');
let content_buscador = document.querySelector('.main_buscador');
let infotarjeta = document.getElementById('contentPersonaje');

	// gif de recarga
let reloadelement = document.createElement('div'); 
	reloadelement.className = 'reloadelement';
	
let reload = document.createElement('img');
	reload.src = 'img/reload.gif';
	reload.alt = 'Un momento por favor...';
	reload.className = 'reload';

	// guardo mis favoritos en Local Storage
let misfavoritos = {
	id:[],
	genero:[],
	nombre:[],
	imagen:[],
	especie:[]
};

if (localStorage.misfavoritos) {
    misfavoritos = JSON.parse(localStorage.misfavoritos);
} else {
    localStorage.misfavoritos = JSON.stringify(misfavoritos);
}

const datosrickymorty = (contenido) => `query{
  characters(filter: { name: "${contenido}" }) {
    results {
	  id,
	  gender,
      name,
      image,
      species,
	  status
      episode{
        name
      }
    }
  }
}`

boton_buscador.addEventListener('click', ()=>{
	infotarjeta.innerHTML = ``;
	infotarjeta.appendChild(reloadelement);
	reloadelement.appendChild(reload);

    let contenido = input_buscador.value;

    const option = {
        method: "post",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            query: datosrickymorty(contenido)
        })
    }

    fetch('https://rickandmortyapi.com/graphql',option)
	.then(function(datos){
            console.log('datosapi', datos);
			return datos.json();
    }).then(function(json){
		    
		mostrarPersonajes(json.data);
    }).finally(function(){
       
    }).catch(function(err){
           console.log("Error", err);
    });
});


function mostrarPersonajes(json){
	let a = json.characters.results;
	console.log(json);
	let cardPerdonaje = '';
	reloadelement.removeChild(reload);
	infotarjeta.removeChild(reloadelement);
	
	
		for (i = 0; i < a.length; i++) {
		let hayPersonaje = 0;
		console.log(a[i].name);
		cardPerdonaje += `
		<div class="col-sm-4">
				<div class="card">
				  <div class="card-body">
				    <img src="${a[i].image}" alt="${a[i].name}"class="card-img-top">
					<h2 class="card-title mb-1">${a[i].name}</h2>

					<p class="card-text">Estado: ${a[i].status}</p>
					<p class="card-text mb-1">Especie: ${a[i].species}</p>
					<p class="card-text mb-1">Genero: ${a[i].gender}</p>`;
		
		for(s = 0; s < misfavoritos.id.length; s++) {
					if(misfavoritos.id[s] == a[i].id){
						existePersonaje = 1;
						console.log(misfavoritos.id[s]);
						console.log(a[i].id);
					}
			}

		if(hayPersonaje == 0){
				cardPerdonaje += `<button class="guardoMiPersonaje" data-cod="${a[i].id}" >Guardar</button>`;
		}else{
				cardPerdonaje += `<button class="guardoMiPersonaje" data-cod="${a[i].id}" >Eliminar</button>`;
			}

		cardPerdonaje +=`</div>
				   </div></div>`;

		infotarjeta.innerHTML = `${cardPerdonaje}`;

	}
	
	let cards = document.querySelectorAll('.guardoMiPersonaje');
	console.log(cards);
	
	for(i of cards){

			i.onclick = function(){

				let saveCod = this.dataset.cod;
								
				for(s = 0; s < misfavoritos.id.length; s++) {
					if(misfavoritos.id[s] == saveCod){

						misfavoritos.id.splice(s,1);
						misfavoritos.genero.splice(s,1);
						misfavoritos.nombre.splice(s,1);
						misfavoritos.imagen.splice(s,1);
						misfavoritos.especie.splice(s,1);	

						localStorage.misfavoritos = JSON.stringify(misfavoritos);
						this.className = "guardoMiPersonaje";
						this.innerHTML = "Guardar";
						return;
					}
				}
				
				for(j = 0; j < a.length; j++) {
					if( saveCod == a[j].id){
						
						console.log(saveCod);
						console.log(a[j].id);
						
						misfavoritos.id.push(saveCod);
						misfavoritos.genero.push(a[j].gender);
						misfavoritos.nombre.push(a[j].name);
						misfavoritos.imagen.push(a[j].image);
						misfavoritos.especie.push(a[j].species);	

						localStorage.misfavoritos = JSON.stringify(misfavoritos);
						
					}
				}
				this.className = "guardoMiPersonaje desabilitado";
				this.innerHTML = "Eliminar";
	
			}
	};

}