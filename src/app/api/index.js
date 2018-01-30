import axios from 'axios';
import queryStringParser from 'query-string';

const defaultParams = {
	fnr: 12341234,
	stub: true
};

const stub = () => ({
	data: {
		fornavn: 'Brukernavn'
	}
});

const url = __ENV__ === 'dev' ? 'http://localhost:8888' : window.REST_API_URL;

function fetchData(params = defaultParams) {
	if (__ENV__ === 'heroku') {
		return stub();
	}

	return axios.get(
		`${url}/rest/personinfo?${queryStringParser.stringify(params)}`
	);
}

function postData(data) {
	return axios.post('http://localhost:8888/rest/engangsstonad', data);
}

const Api = { fetchData, postData };

export default Api;
