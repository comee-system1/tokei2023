import Axios from 'axios';

export async function getConnect(path, token, requestId, realm, param) {

    const origin = process.env.NODE_ENV === 'production' ?
        'http://t-sct1wb00.fukushikenbunroku.com:65433' : 'http://localhost:8000';

    const corporationUniqueId = realm.match(/^R([0-9]+)_admin$/);
    if (corporationUniqueId == null) {
        return false;
    }

    let query = '';
    Object.keys(param).forEach(key => {
        query += '&' + key + '=' + param[key];
    });
    if (query != '') {
        query = query.replace('&', '');
        query = '?' + query;
    }

    const header = {};
    header['Content-Type'] = 'application/json';
    header['Accept'] = 'application/json';
    header['x-access-token'] = token;
    header['x-request-id'] = requestId;
    header['x-corporation-unique-id'] = corporationUniqueId[1];
    return await Axios.get(origin + '/' + path + query, {
            timeout: 5000,
            headers: header
        })
        .then(function (response) {
            return response.data;
        })
        .catch(function () {
            return false;
        });
}