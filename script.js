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

    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {

    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
      const response = await fetch(APIURL + 'players', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(playerObj),
      });
      if (!response.ok) {
        throw new Error('Failed to add the player');
      }
      const addedPlayer = await response.json();
      console.log('Added Player:', addedPlayer);

      // append new player to the playerContainer
      // const playerCardHTML = createPlayerCardHTML(addedPlayer);
      // playerContainer.insertAdjacentHTML('beforehand', playerCardHTML);
    } catch (err) {
      console.error('Oops, something went wrong with adding that player!', err);
    }
}; 

// player card
// const createPlayerCardHTML = (player) => {
//     return `
//       <div class="player-card">
//         <h4>${player.name}</h4>
//         <p>Age: ${player.age}</p>
//         <p>Breed: ${player.breed}</p>
//       </div>
//     `;
//   };
  
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
const renderAllPlayers = (playerList) => {
    try {
        
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
      const formHTML = `
        <form id="new-player-form">
          <h3>Add a New Player</h3>
          <label for="name">Name:</label>
          <input type="text" id="name" required>
          <label for="age">Age:</label>
          <input type="number" id="age" required>
          <label for="breed">Breed:</label>
          <input type="text" id="breed" required>
          <button type="submit">Add Player</button>
        </form>
      `;
      newPlayerFormContainer.innerHTML = formHTML;
  
      const newPlayerForm = document.getElementById('new-player-form');
      newPlayerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('name');
        const ageInput = document.getElementById('age');
        const breedInput = document.getElementById('breed');
        const playerObj = {
          name: nameInput.value,
          age: parseInt(ageInput.value),
          breed: breedInput.value,
        };
        await addNewPlayer(playerObj);
        nameInput.value = '';
        ageInput.value = '';
        breedInput.value = '';
        const updatedPlayers = await fetchAllPlayers();
        renderAllPlayers(updatedPlayers);
      });
    } catch (err) {
      console.error('Uh oh, trouble rendering the new player form!', err);
    }
  };
  



const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();