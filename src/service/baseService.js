import api from "../config/api";

class BaseService {
    constructor(endPoint) {
        this.endPoint = endPoint;
        this.api = api;
    }

    async insert(data) {
        const response = await this.api.post(this.endPoint, data);
        return response;
    }

    async update(data) {
        const response = await this.api.put(this.endPoint, data);
        return response;
    }

    async delete(data) {
        const response = await this.api.delete(this.endPoint, data)
        return response
    }

    async listAll() {
        const response = await this.api.delete(this.endPoint)
        return response
    }
}