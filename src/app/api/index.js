import axios from 'axios';
import queryStringParser from 'query-string';

const defaultParams = {
	fnr: 12341234,
	stub: true
};

function fetchData(params = defaultParams) {
	return axios.get(`/rest/personinfo?${queryStringParser.stringify(params)}`);
}

const Api = { fetchData };

export default Api;
