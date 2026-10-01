const searchForm = document.getElementById("search-form");
const pokemonInput = document.getElementById("pokemon-input");

const loadingMessage = document.getElementById("loading-message");
const errorMessage = document.getElementById("error-message");
const statusMessage = document.getElementById("status-message");

const pokemonCard = document.getElementById("pokemon-card");

const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const pokemonImage = document.getElementById("pokemon-image");
const pokemonTypes = document.getElementById("pokemon-types");

const pokemonHeight = document.getElementById("pokemon-height");
const pokemonWeight = document.getElementById("pokemon-weight");
const pokemonAbilities = document.getElementById("pokemon-abilities");

const cardType = document.getElementById("card-type");


/* Search Pokémon */

async function searchPokemon(name) {

    /* Make input suitable for API */

    name = name.trim().toLowerCase();

    /* Allow spaces in names like "mr mime" */

    name = name.replaceAll(" ", "-");


    if (name === "") {
        showError("Please enter a Pokémon name.");
        return;
    }


    const apiUrl =
        `https://pokeapi.co/api/v2/pokemon/${name}`;


    /* Loading */

    loadingMessage.hidden = false;
    errorMessage.hidden = true;
    pokemonCard.hidden = true;
    statusMessage.textContent = "";


    try {

        /* Get data from API */

        const response = await fetch(apiUrl);


        /* Check if Pokémon exists */

        if (!response.ok) {
            throw new Error("Pokémon not found");
        }


        /* Convert response to JSON */

        const data = await response.json();


        /* Name and ID */

        pokemonName.textContent = data.name;

        pokemonId.textContent =
            "#" + String(data.id).padStart(3, "0");


        /* Image */

        pokemonImage.src =
            data.sprites.other["official-artwork"].front_default
            || data.sprites.front_default;


        pokemonImage.alt =
            data.name + " artwork";


        /* Types */

        pokemonTypes.innerHTML = "";

        data.types.forEach(function(typeInfo) {

            const type = document.createElement("span");

            type.className = "type";

            type.textContent =
                typeInfo.type.name;

            pokemonTypes.appendChild(type);
        });


        /* Change card color */

        pokemonCard.className =
            "type-" + data.types[0].type.name;


        cardType.textContent =
            data.types[0].type.name.toUpperCase()
            + " TYPE · POKÉDEX ENTRY";


        /* Height and weight */

        pokemonHeight.textContent =
            data.height / 10 + " m";

        pokemonWeight.textContent =
            data.weight / 10 + " kg";


        /* Abilities */

        pokemonAbilities.innerHTML = "";

        data.abilities.forEach(function(abilityInfo) {

            const ability = document.createElement("span");

            ability.className = "ability";

            ability.textContent =
                abilityInfo.ability.name;

            pokemonAbilities.appendChild(ability);
        });


        /* Stats */

        data.stats.forEach(function(statInfo) {

            const value = statInfo.base_stat;
            const width = Math.min(value / 1.5, 100) + "%";


            if (statInfo.stat.name === "hp") {

                document.getElementById("stat-hp").textContent = value;
                document.getElementById("bar-hp").style.width = width;

            }

            else if (statInfo.stat.name === "attack") {

                document.getElementById("stat-attack").textContent = value;
                document.getElementById("bar-attack").style.width = width;

            }

            else if (statInfo.stat.name === "defense") {

                document.getElementById("stat-defense").textContent = value;
                document.getElementById("bar-defense").style.width = width;

            }

            else if (statInfo.stat.name === "special-attack") {

                document.getElementById("stat-special-attack").textContent = value;
                document.getElementById("bar-special-attack").style.width = width;

            }

            else if (statInfo.stat.name === "special-defense") {

                document.getElementById("stat-special-defense").textContent = value;
                document.getElementById("bar-special-defense").style.width = width;

            }

            else if (statInfo.stat.name === "speed") {

                document.getElementById("stat-speed").textContent = value;
                document.getElementById("bar-speed").style.width = width;

            }

        });


        /* Show result */

        loadingMessage.hidden = true;
        errorMessage.hidden = true;
        pokemonCard.hidden = false;

        statusMessage.textContent =
            "Loaded " + data.name + " successfully.";

    }


    catch (error) {

        loadingMessage.hidden = true;
        pokemonCard.hidden = true;

        showError(
            "Pokémon not found. Please check the name and try again."
        );
    }
}


/* Error function */

function showError(message) {

    errorMessage.querySelector("p").textContent = message;

    errorMessage.hidden = false;
    loadingMessage.hidden = true;
}


/* Form search */

searchForm.addEventListener("submit", function(event) {

    event.preventDefault();

    searchPokemon(pokemonInput.value);

});


/* Quick search */

document.querySelectorAll(".quick-search").forEach(function(button) {

    button.addEventListener("click", function() {

        pokemonInput.value =
            button.dataset.pokemon;

        searchPokemon(button.dataset.pokemon);

    });

});


/* Show Pikachu when page opens */

searchPokemon("pikachu");