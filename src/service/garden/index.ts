import { IFormCreateGarden, IFormParamGarden } from "src/utils/type";
import { api } from "../api";

class GardenServices {
    handleFetchGarden = (param: IFormParamGarden) => {
        return api.get('/gardeners', param);
    };
    handleCreateGarden = (param: IFormCreateGarden) => {
        return api.post('/auth/gardens/register', param);
    };
    handleDeleteGarden = (id: string) => {
        return api.delete(`/gardeners/${id}`);
    };
    handleFetchGardenById = (id: string) => {
        return api.get(`/gardeners/${id}`);
    };
    
}

const gardenServices = new GardenServices();

export default gardenServices;
