import axios from 'axios';

function fetchData() {
	return axios.get('/rest/personinfo?fnr=12341234&stub=true');
}

const Api = { fetchData };

export default Api;
