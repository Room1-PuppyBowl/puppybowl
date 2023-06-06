const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2302-acc-ct-web-pt-b';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

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


function createForm() {
  const formContainer = document.getElementById("formContainer");

  // Create the form element
  const form = document.createElement("form");
  form.id = "myForm";

  // Create the form fields
  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Name:";
  const nameInput = document.createElement("input");
  nameInput.type = "text";
  nameInput.name = "name";
  nameInput.required = true;

const breedLabel = document.createElement("label");
  breedLabel.textContent = "Name:";
  const breedInput = document.createElement("input");
  breedInput.type = "text";
  breedInput.breed = "breed";
  breedInput.required = true;

  const imageLabel = document.createElement("label");
  imageLabel.textContent = "Image URL:";
  const imageInput = document.createElement("input");
  imageInput.type = "text";
  imageInput.name = "image";


  const submitButton = document.createElement("input");
  submitButton.type = "submit";
  submitButton.value = "Submit";
  submitButton.innerHTML = "Submit";

  // Append the form fields to the form
  form.appendChild(nameLabel);
  form.appendChild(nameInput);
  form.appendChild(breedLabel);
  form.appendChild(breedInput);
  form.appendChild(statusLabel);
  form.appendChild(statusInput);
  form.appendChild(imageLabel);
  form.appendChild(imageInput);
  form.appendChild(submitButton);

  // Append the form to the form container
  formContainer.appendChild(form);

  // Add form submission event listener
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve the entered values
    const name = nameInput.value;
    const email = emailInput.value;

    // Perform any necessary form validation

    // Process the entered data
    // You can send the data to a server, perform some calculations, or display it on the page

    // Optionally, reset the form after submission
    form.reset();

    // Remove the form from the form container
    formContainer.removeChild(form);
  });
}


const addNewPlayer = async (playerObj) => {
    const playerDetailsElement = document.createElement("div");
    playersDetailsElement.innerHTML = `
    <
    `
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
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    const players = await fetchAllPlayers();
    renderAllPlayers(players);

    renderNewPlayerForm();
}

init();