const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-ACC-CTWEB-PT-B';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/players`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(APIURL);
        const players = await response.json();
        console.log("PLAYERS:",players)
        return players;
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`${APIURL}/${playerId}`);
        const player = await response.json();
        console.log(player)
        return player;
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {

    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {

    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */

const renderSinglePlayerById = async (id) => {
    try {
    const players = await fetchSinglePlayer(id);
    console.log(players)
    const playerDetailsElement = document.createElement('div');
    playerDetailsElement.classList.add('player-details');
    playerDetailsElement.innerHTML = `
            <h2>${players.name}</h2>
            <p>${players.breed}</p>
            <p>${players.status}</p>
            <img>${players.imageUrl}</img>
            <h3>team:</h3>
            <ul>
            ${team
              .map(
                (team, index) => `
              <li>
                <div>${players.team.name}</div>
              </li>
            `
              )
              .join('')}
          </ul>
          


            <button class="close-button">Close</button>
        `;
    playerContainer.appendChild(playerDetailsElement);

    // add event listener to close button
    const closeButton = playerDetailsElement.querySelector('.close-button');
    closeButton.addEventListener('click', () => {
      playerDetailsElement.remove();
    });
    } catch (error) {
    console.error(error);
  }
}

const renderAllPlayers = async (players) => {
    try {
           playerContainer.innerHTML = '';
           console.log("Render players:", players)
           players.data.players.forEach((player) => {
             const playerElement = document.createElement('div');
             playerElement.classList.add('player');
             playerElement.innerHTML = `
                       <h2>${player.name}</h2>
                       <p>${player.breed}</p>
                       <p>${player.status}</p>
                       <img src="${player.imageUrl}" alt="${player.name}" width="200">
                       <button class="details-button" data-id="${player.id}">See Details</button>
                       <button class="delete-button" data-id="${player.id}">Delete</button>
                   `;
             playerContainer.appendChild(playerElement);
       
             // see details
             const detailsButton = playerElement.querySelector('.details-button');
             detailsButton.addEventListener('click', async (event) => {
               const playerId = event.target.dataset.id;
               await renderSinglePlayerById(playerId);
             })
             // delete party
             const deleteButton = playerElement.querySelector('.delete-button');
             deleteButton.addEventListener('click', async (event) => {
               const playerId = event.target.dataset.id;
               await removePlayer(playerId);
             });
           });
       
   } catch (err) {
       console.error('Uh oh, trouble rendering players!', err);
   }
};
/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    console.log("player:", players)
    renderAllPlayers(players);
    // renderNewPlayerForm();
}

init();