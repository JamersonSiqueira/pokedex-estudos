const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');

const form = document.querySelector('.form__search');
const input = document.querySelector('.input__search');
const prev = document.querySelector('.btn-prev');
const next = document.querySelector('.btn-next');
let value = 1;


const fetchPokemon = async(pokemon) => {

    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200){
    const data = await APIResponse.json();
    return data;
    }
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = "Pesquisando...";
    pokemonNumber.innerHTML = "";

    const data = await fetchPokemon(pokemon);

    if (data) {
    pokemonName.innerHTML = data.name;
    pokemonNumber.innerHTML = data.id;
    pokemonImage.src = data.sprites.versions['generation-v']['black-white'].animated.front_default;
    input.value='';
    value=data.id;
    } else {
        pokemonName.innerHTML = "Não tem!"
        pokemonNumber.innerHTML = "";
    }
}
/*Listeners dos botões e formulários */
form.addEventListener('submit',(event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
});

prev.addEventListener('click',() => {
    if(value > 1){
        value--;
        renderPokemon(value);
    }  
});

next.addEventListener('click',() => {
    value++;    
    renderPokemon(value);
});



renderPokemon(`${value}`);