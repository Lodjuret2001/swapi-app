import axios from 'axios';

function configAxios() {
    const axiosInstance = axios.create({
        baseURL: 'https://swapi.dev/api'
    });
    return axiosInstance;
}

function findCharacter(characters, req, res) {

    const character = characters.find(character => {
        return character.id === parseInt(req.params.id);
    });

    if (!character) res.status(400).send('Given character was not found!');

    return character;
}

function validateLengthOf(invalidCharacters, res) {
    if (invalidCharacters.length === 1) res.send('One character is invalid!')
    if (invalidCharacters.length === 2) res.send('Both characters are invalid!')
}

export { configAxios, findCharacter, validateLengthOf };