import axios from 'axios';

function fetchData() {
    return (axios.get('https://foreldrepenger-selvbetjening-engangsstonad.nais.oera-q.local/rest/personinfo'));
}

const Api = { fetchData };

export default Api;

