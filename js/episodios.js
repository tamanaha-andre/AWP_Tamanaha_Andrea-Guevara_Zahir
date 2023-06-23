//https://rickandmortyapi.com/api/episode/


const searchButton = document.getElementById('search-button');
const episodeInput = document.getElementById('episode-input');
const episodeDetails = document.getElementById('episode-details');

        searchButton.addEventListener('click', () => {
            const episodeNumber = episodeInput.value;
            const apiUrl = `https://rickandmortyapi.com/api/episode/${episodeNumber}`;

            // Realizar la solicitud GET a la API
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Manipular los datos de la respuesta
                    const episodeName = data.name;
                    const episodeAirDate = data.air_date;

                    // Solicitar cada URL de personaje para obtener el nombre del personaje
                    const characterPromises = data.characters.map(characterUrl =>
                        fetch(characterUrl).then(response => response.json())
                    );

                    // Resolver todas las promesas de personajes
                    return Promise.all(characterPromises).then(characters => {
                        return {
                            episodeName,
                            episodeAirDate,
                            characters
                        };
                    });
                })
                .then(data => {
                    // Mostrar los detalles del episodio en la página
                    const episodeCharacters = data.characters.map(character => character.name);

                    episodeDetails.innerHTML = `
                        <h2>${data.episodeName}</h2>
                        <p>Fecha de lanzamiento: ${data.episodeAirDate}</p>
                        <p>Personajes:</p>
                                <ul>
                                    ${episodeCharacters.map(character => `<li>${character}</li>`).join('')}
                                </ul>
                            `;
                    episodeDetails.classList.add('visible');
                })
                .catch(error => {
                    // Manejar errores en caso de que la solicitud falle
                    episodeDetails.innerHTML = 'Error al buscar el episodio';
                    console.error(error);
                });
        });