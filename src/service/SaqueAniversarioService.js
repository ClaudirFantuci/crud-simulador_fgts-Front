import api from "../config/api";

class SaqueAniversarioService {
    constructor() {
        this.endPoint = '/api/SaqueAniversario';
    };

    async create(data) {
        const response = await api.post(this.endPoint, data);
        return response.data;
    }

    async listAll() {
        const response = await api.get(this.endPoint);
        return response.data;
    }

    async update(id, data) {
        const response = await api.put(`${this.endPoint}/${id}`, data);
        return response.data;
    }

    async delete(id) {
        const response = await api.delete(`${this.endPoint}/${id}`);
        return response.data;
    }
}
const saqueAniversarioService = new SaqueAniversarioService();
export default saqueAniversarioService;