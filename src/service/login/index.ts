import { IFormLogin } from "src/utils/type";
import { api } from "../api";

class LoginServices {
    handleLogin = (data: IFormLogin) => {
        return api.post('/auth/admin/login', data);
    };
    handleRefreshToken = (refreshToken: any) => {
        return api.post('auth/refresh-token', refreshToken)
    }
    handleLogout = () => {
        return api.post('/auth/logout');
    };
}

const loginServices = new LoginServices();

export default loginServices;
