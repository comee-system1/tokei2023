import Axios from 'axios';

export async function putConnect(path, token, requestId, realm, param) {

    const origin = process.env.NODE_ENV === 'production' ?
        'http://t-sct1wb00.fukushikenbunroku.com:69080' : 'http://localhost:8000';

    const corporationUniqueId = realm.match(/^R([0-9]+)_admin$/);
    if (corporationUniqueId == null) {
        return false;
    }

    let data = JSON.stringify(param);

    const header = {};
    header['Content-Type'] = 'application/json';
    header['Accept'] = 'application/json';
    header['x-access-token'] = token;
    header['x-request-id'] = requestId;
    header['x-corporation-unique-id'] = corporationUniqueId[1];

    return await Axios.put(origin + '/' + path, data, {
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
