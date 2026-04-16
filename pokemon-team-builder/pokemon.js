const pokemonInput = document.getElementById("pokemonInput");
const searchButton = document.getElementById("searchButton");
const statusMessage = document.getElementById("statusMessage");
const pokemonDisplay = document.getElementById("pokemonDisplay");
const pokemonName = document.getElementById("pokemonName");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonAudio = document.getElementById("pokemonAudio");
const addToTeamButton = document.getElementById("addToTeamButton");
const teamList = document.getElementById("teamList");
const moveSelects = [
    document.getElementById("move1"),
    document.getElementById("move2"),
    document.getElementById("move3"),
    document.getElementById("move4")
];

let currentPokemon = null;
const team = [];

function formatName(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

function setStatus(message) {
    statusMessage.textContent = message;
}

function fillMoveDropdowns(moveNames) {
    moveSelects.forEach((select) => {
        select.innerHTML = "";

        moveNames.forEach((moveName) => {
            const option = document.createElement("option");
            option.value = moveName;
            option.textContent = moveName;
            select.appendChild(option);
        });
    });
}

function getImageUrl(data) {
    return (
        data.sprites?.other?.["official-artwork"]?.front_default ||
        data.sprites?.front_default ||
        ""
    );
}

function getCryUrl(data) {
    return data.cries?.latest || data.cries?.legacy || "";
}

async function fetchPokemon() {
    const query = pokemonInput.value.trim().toLowerCase();
    if (!query) {
        setStatus("Please enter a Pokemon name or ID.");
        return;
    }

    setStatus("Loading...");

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
        if (!response.ok) {
            throw new Error("Pokemon not found.");
        }

        const data = await response.json();
        const moves = data.moves.map((entry) => entry.move.name);

        if (moves.length === 0) {
            throw new Error("No moves available for this Pokemon.");
        }

        currentPokemon = {
            id: data.id,
            name: data.name,
            imageUrl: getImageUrl(data),
            cryUrl: getCryUrl(data),
            moves
        };

        pokemonName.textContent = `#${data.id} ${formatName(data.name)}`;
        pokemonImage.src = currentPokemon.imageUrl;
        pokemonImage.alt = `${data.name} sprite`;

        if (currentPokemon.cryUrl) {
            pokemonAudio.src = currentPokemon.cryUrl;
            pokemonAudio.style.display = "block";
        } else {
            pokemonAudio.removeAttribute("src");
            pokemonAudio.load();
            pokemonAudio.style.display = "none";
        }

        fillMoveDropdowns(currentPokemon.moves);
        pokemonDisplay.hidden = false;
        setStatus("Pokemon loaded.");
    } catch (error) {
        currentPokemon = null;
        pokemonDisplay.hidden = true;
        setStatus(error.message || "Could not load this Pokemon.");
    }
}

function addToTeam() {
    if (!currentPokemon) {
        setStatus("Load a Pokemon before adding to your team.");
        return;
    }

    const selectedMoves = moveSelects.map((select) => select.value);
    const teamMember = {
        id: currentPokemon.id,
        name: currentPokemon.name,
        imageUrl: currentPokemon.imageUrl,
        selectedMoves
    };

    team.push(teamMember);
    renderTeam();
    setStatus(`${formatName(currentPokemon.name)} added to team.`);
}

function renderTeam() {
    teamList.innerHTML = "";

    team.forEach((member, index) => {
        const card = document.createElement("article");
        card.className = "team-card";

        const title = document.createElement("h3");
        title.textContent = `${index + 1}. #${member.id} ${formatName(member.name)}`;

        const image = document.createElement("img");
        image.src = member.imageUrl;
        image.alt = `${member.name} sprite`;

        const movesTitle = document.createElement("p");
        movesTitle.textContent = "Moves:";

        const movesList = document.createElement("ol");
        member.selectedMoves.forEach((move) => {
            const item = document.createElement("li");
            item.textContent = move;
            movesList.appendChild(item);
        });

        card.appendChild(title);
        card.appendChild(image);
        card.appendChild(movesTitle);
        card.appendChild(movesList);
        teamList.appendChild(card);
    });
}

searchButton.addEventListener("click", fetchPokemon);
addToTeamButton.addEventListener("click", addToTeam);
