import axios from 'axios';
import queryStringParser from 'query-string';

const defaultParams = {
	fnr: 12341234,
	stub: true
};

function fetchData(params = defaultParams) {
	const url =
		window.REST_API_URL === '<%= REST_API_URL %>'
			? 'http://localhost:8888'
			: window.REST_API_URL;

	return axios.get(
		`${url}/rest/personinfo?${queryStringParser.stringify(params)}`
	);
}

function postData(data) {
	return axios.post('http://localhost:8888/rest/engangsstonad', data);
}

const Api = { fetchData, postData };

export default Api;
