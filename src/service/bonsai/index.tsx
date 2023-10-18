import { api } from "../api";

class BonsaiServices {
    handleFetchBonsaiOfGardenerById = (id: string | undefined) => {
        return api.get(`/bonsai/${id}`);
    };
}

const bonsaiServices = new BonsaiServices();

export default bonsaiServices;
