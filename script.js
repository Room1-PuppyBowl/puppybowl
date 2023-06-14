const playerContainer = document.getElementById('roster-container');
const newPlayerFormContainer = document.getElementById('form-container');


// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder

const cohortName = '2302-ACC-CT-WEB-PT-X';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players/`;

//function to fetch all players from api
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(APIURL);
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

//function to fetch a single player from the api by its id
const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}${playerId}`);
        const player = await response.json();
        console.log(player);
        return player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

//function to add a new player using the api
const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(APIURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(playerObj),
        });
        
        const newPlayer = await response.json();
        
        // checks if the api response indicates success
        if (newPlayer.success) {
            // re-renders the player list to include the new player
            renderAllPlayers();
        } else {
            console.error('Failed to add player:', newPlayer.error);
        }
        
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

//function to remove a player via the api
const removePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}${playerId}`, {
            method: 'DELETE',
        });
        // if response is good, re-renders the players
        if (response.ok) {
            renderAllPlayers();
        } else {
            console.error('Failed to delete player:'. response.statusText);
        }
    } catch (err) {
        console.error(`Error removing player #${playerId} from the roster!`, err);
    }
};

//function to render all players to the dom
const renderAllPlayers = async () => {
    try {
        const players = await fetchAllPlayers();
        let playerContainerHTML = '';
        // loop through all players and create a new div for each
        players.data.players.forEach(player => {
            playerContainerHTML += `
            <div class="card">
                <img src="${player.imageUrl}" alt="${player.name}" width="200">
                <p>${player.name}</p>
                <button onclick="displayPlayerDetails(${player.id})">See details</button>
                <button onclick="removePlayer(${player.id})">Remove from Roster</button>
            </div>`;
        });
        playerContainer.innerHTML = playerContainerHTML;
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};

// function to display details of a player
const displayPlayerDetails = async (playerId) => {
    try {
        const player = await fetchSinglePlayer(playerId);
        const smolContent = document.getElementById('player-details');
        // two divs for image and info to fix media screen scaling issues and display player details
        let playerDetailsHTML = `
        <div class="player-image">
            <img src="${player.data.player.imageUrl}" alt="${player.data.player.name}" width="200">
        </div>
        <div class="player-info">
            <h2>${player.data.player.name}</h2>
            <p>Breed: ${player.data.player.breed}</p>
            <p>Status: ${player.data.player.status}</p>
        </div>`;
        smolContent.innerHTML = playerDetailsHTML;
        document.getElementById('player-smol').style.display = "block";
    } catch (err) {
        console.error(`Uh oh, trouble fetching and displaying player #${playerId} details!`, err);
    }
};

// to close the see player details view by hiding the container
const closeSmol = () => {
    document.getElementById('player-smol').style.display = "none";
};

// function to render the form to add new players
const renderNewPlayerForm = () => {
    try {
        newPlayerFormContainer.innerHTML = `
            <form id="newPlayerForm">
                <input type="text" name="name" placeholder="Name" required>
                <input type="text" name="breed" placeholder="Breed" required>
                <button type="submit">Add Player</button>
            </form>`;
            // event listener to handle form submission
        document.getElementById('newPlayerForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            //player object from form data
            const playerObj = {
                name: e.target.name.value,
                breed: e.target.breed.value,
            };
            // calls function to send new player data to api (name and breed only, status auto to bench)
            await addNewPlayer(playerObj);
            // after adding player clears the text field to be blank again
            e.target.name.value = '';
            e.target.breed.value = '';
            // re-render the players
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