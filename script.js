const playerContainer = document.getElementById('roster-container');
const newPlayerFormContainer = document.getElementById('form-container');


// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder

const cohortName = '2302-ACC-CTWEB-PT-B';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/`;

const fetchAllPlayers = async () => {
    try {
        const response = await fetch(APIURL);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}${playerId}`);
        const player = await response.json();
        console.log(player); // Log the player data to see its structure
        return player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(APIURL + 'players', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playerObj),
        });
        const newPlayer = await response.json();
        return newPlayer;
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const renderAllPlayers = async () => {
    try {
        const players = await fetchAllPlayers();
        let playerContainerHTML = '';
        players.data.players.forEach(player => {
            playerContainerHTML += `
            <div class="card">
                <img src="${player.imageUrl}" alt="${player.name}" width="200">
                <p>${player.name}</p>
                <button onclick="displayPlayerDetails(${player.id})">See details</button>
                <button onclick="removePlayer(${player.id}, ${JSON.stringify(player)})">Remove from roster</button>
            </div>`;
        });
        playerContainer.innerHTML = playerContainerHTML;
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


const displayPlayerDetails = async (playerId) => {
    try {
        const player = await fetchSinglePlayer(playerId);
        const smolContent = document.getElementById('player-details');
        let playerDetailsHTML = `
        <img src="${player.data.player.imageUrl}" alt="${player.data.player.name}" width="200">
        <p>Name: ${player.data.player.name}</p>
        <p>Breed: ${player.data.player.breed}</p>
        <p>Status: ${player.data.player.status}</p>`;
        smolContent.innerHTML = playerDetailsHTML;
        document.getElementById('player-smol').style.display = "block";
    } catch (err) {
        console.error(`Uh oh, trouble fetching and displaying player #${playerId} details!`, err);
    }
};

const closeSmol = () => {
    document.getElementById('player-smol').style.display = "none";
};


const renderNewPlayerForm = () => {
    try {
        newPlayerFormContainer.innerHTML = `
            <form id="newPlayerForm">
                <input type="text" name="name" placeholder="Name" required>
                <input type="text" name="breed" placeholder="Breed" required>
                <input type="text" name="status" placeholder="Status" required>
                <button type="submit">Add Player</button>
            </form>`;
        document.getElementById('newPlayerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const playerObj = {
                name: e.target.name.value,
                age: e.target.age.value,
            };
            await addNewPlayer(playerObj);
            renderAllPlayers();
        });
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
};

const init = async () => {
    renderAllPlayers();
    renderNewPlayerForm();
};

init();