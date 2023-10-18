import { api } from "../api";

class FruitServices {
    handleFetchFruitById = (id: string) => {
        return api.get(`/fruit-category/${id}`);
    };
    handleCreateFruit = (param: any) => {
        return api.post('/fruit-category/create', param);
    };
    handleFetchFruitCategory = (param: any) => {
        return api.get('/fruit-category', param);
    };
    handleDeleteFruitCategory = (id: string) => {
        return api.delete(`/fruit-category/${id}`);
    };
    handleUpdateFruitCategory = (param: any) => {
        return api.patch(`/fruit-category/${param?.id}`, param);
    };
    handleFetchFruitOfGardenerById = (id: string | undefined) => {
        return api.get(`/fruit/${id}`);
    };
}

const fruitServices = new FruitServices();

export default fruitServices;
