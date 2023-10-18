import { api } from "../api";

class BlogServices {
    handleFetchBlogById = (id: string) => {
        return api.get(`/blog/${id}`);
    };
    handleCreateBlog = (param: any) => {
        return api.post('/blog/create', param);
    };
    handleFetchBlog = (param: any) => {
        return api.get('/blog', param);
    };
    handleUpdateBlog = (param: any) => {
        return api.patch(`/blog/${param?.id}`, param);
    };
    handleDeleteBlog = (id: string) => {
        return api.delete(`/blog/${id}`);
    };
    
}

const blogServices = new BlogServices();

export default blogServices;
