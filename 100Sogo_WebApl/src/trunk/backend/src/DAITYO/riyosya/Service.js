const Repo = require('./Repo')
const repo = new Repo();
const ApiResponse = require('./ApiResponse')
const apiResponse = new ApiResponse();
module.exports = class Service {
    constructor() {}
    async getData(apiRun) {
        return await repo.connectApi(apiRun).then(result => {
            let api = apiResponse.setResponse(result);
            return api;
        });
    }
}