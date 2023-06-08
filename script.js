const playerContainer = document.getElementById('roster-container');
const newPlayerFormContainer = document.getElementById('form-container');


// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder

const cohortName = '2302-ACC-CTWEB-PT-B';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

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
        const response = await fetch(APIURL + 'players/' + playerId);
        const player = await response.json();
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

const removePlayer = async (playerId) => {
    try {
        await fetch(APIURL + 'players/' + playerId, {
            method: 'DELETE',
        });
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
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
                <p>Name: ${player.name}</p>
                <p>Breed: ${player.breed}</p>
                <p>Status: ${player.status}</p>
                <button onclick="fetchSinglePlayer(${player.id})">See details</button>
                <button onclick="removePlayer(${player.id})">Remove from roster</button>
            </div>`;
        });
        playerContainer.innerHTML = playerContainerHTML;
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};


const renderNewPlayerForm = () => {
    try {
        newPlayerFormContainer.innerHTML = `
            <form id="newPlayerForm">
                <input type="text" name="name" placeholder="Name" required>
                <input type="number" name="age" placeholder="Age" required>
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
