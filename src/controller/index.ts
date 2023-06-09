import { useRouter } from "vue-router";


export const ServiceUrl = 'http://127.0.0.1:32770'

export class AdminClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    /**
     * 删除用户（立即删除）
     */
    deleteUser(id: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Admin/user/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteUser(_response);
        });
    }

    protected processDeleteUser(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 管理员修改用户密码
     */
    changgeUser(id: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Admin/user/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processChanggeUser(_response);
        });
    }

    protected processChanggeUser(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 管理员根据用户Id获取信息
     */
    getUserById(id: number): Promise<ResCodeOfAdminUserDTO> {
        let url_ = this.baseUrl + "/api/Admin/user/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetUserById(_response);
        });
    }

    protected processGetUserById(response: Response): Promise<ResCodeOfAdminUserDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfAdminUserDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfAdminUserDTO>(null as any);
    }

    /**
     * 获取用户
     * @param pageIndex 页码
     * @param userType 用户角色
     * @param userStatus 用户状态
     */
    getUser(pageIndex: number, userType: number, userStatus: number): Promise<ResCodeOfPageDataOfAdminUserDTO> {
        let url_ = this.baseUrl + "/api/Admin/user/{pageIndex}/{userType}/{userStatus}";
        if (pageIndex === undefined || pageIndex === null)
            throw new Error("The parameter 'pageIndex' must be defined.");
        url_ = url_.replace("{pageIndex}", encodeURIComponent("" + pageIndex));
        if (userType === undefined || userType === null)
            throw new Error("The parameter 'userType' must be defined.");
        url_ = url_.replace("{userType}", encodeURIComponent("" + userType));
        if (userStatus === undefined || userStatus === null)
            throw new Error("The parameter 'userStatus' must be defined.");
        url_ = url_.replace("{userStatus}", encodeURIComponent("" + userStatus));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetUser(_response);
        });
    }

    protected processGetUser(response: Response): Promise<ResCodeOfPageDataOfAdminUserDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfPageDataOfAdminUserDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfPageDataOfAdminUserDTO>(null as any);
    }

    searchUserByNameOrEmile(pageindex: number, name: string | null): Promise<ResCodeOfPageDataOfUserDTO> {
        let url_ = this.baseUrl + "/api/Admin/user/search/{pageindex}/{name}";
        if (pageindex === undefined || pageindex === null)
            throw new Error("The parameter 'pageindex' must be defined.");
        url_ = url_.replace("{pageindex}", encodeURIComponent("" + pageindex));
        if (name === undefined || name === null)
            throw new Error("The parameter 'name' must be defined.");
        url_ = url_.replace("{name}", encodeURIComponent("" + name));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSearchUserByNameOrEmile(_response);
        });
    }

    protected processSearchUserByNameOrEmile(response: Response): Promise<ResCodeOfPageDataOfUserDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfPageDataOfUserDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfPageDataOfUserDTO>(null as any);
    }

    /**
     * 管理员修改用户信息
     */
    saveUser(userDTO: AdminUserDTO): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Admin/user/save";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(userDTO);

        let options_: RequestInit = {
            body: content_,
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSaveUser(_response);
        });
    }

    protected processSaveUser(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 根据传入类型获取评论
     */
    getCommentByStatus(pageindex: number, type: number): Promise<ResCodeOfPageDataOfCommentCheck> {
        let url_ = this.baseUrl + "/api/Admin/UnPass/{pageindex}/{type}";
        if (pageindex === undefined || pageindex === null)
            throw new Error("The parameter 'pageindex' must be defined.");
        url_ = url_.replace("{pageindex}", encodeURIComponent("" + pageindex));
        if (type === undefined || type === null)
            throw new Error("The parameter 'type' must be defined.");
        url_ = url_.replace("{type}", encodeURIComponent("" + type));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetCommentByStatus(_response);
        });
    }

    protected processGetCommentByStatus(response: Response): Promise<ResCodeOfPageDataOfCommentCheck> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfPageDataOfCommentCheck;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfPageDataOfCommentCheck>(null as any);
    }

    /**
     * 根据Id获取评论
     */
    getCommentById(id: number): Promise<ResCodeOfCommentCheck> {
        let url_ = this.baseUrl + "/api/Admin/comment/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetCommentById(_response);
        });
    }

    protected processGetCommentById(response: Response): Promise<ResCodeOfCommentCheck> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfCommentCheck;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfCommentCheck>(null as any);
    }

    /**
     * 硬删除评论（回复一并删除）
     */
    delectCommentById(id: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Admin/comment/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDelectCommentById(_response);
        });
    }

    protected processDelectCommentById(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 修改评论状态
     */
    changeCommentStatus(id: number, type: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Admin/comment/{id}/{type}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        if (type === undefined || type === null)
            throw new Error("The parameter 'type' must be defined.");
        url_ = url_.replace("{type}", encodeURIComponent("" + type));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processChangeCommentStatus(_response);
        });
    }

    protected processChangeCommentStatus(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 根据状态获取文章
     */
    getArticleByType(pageindex: number, type: number): Promise<ResCodeOfPageDataOfArticleDTO> {
        let url_ = this.baseUrl + "/api/Admin/article/{pageindex}/{type}";
        if (pageindex === undefined || pageindex === null)
            throw new Error("The parameter 'pageindex' must be defined.");
        url_ = url_.replace("{pageindex}", encodeURIComponent("" + pageindex));
        if (type === undefined || type === null)
            throw new Error("The parameter 'type' must be defined.");
        url_ = url_.replace("{type}", encodeURIComponent("" + type));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetArticleByType(_response);
        });
    }

    protected processGetArticleByType(response: Response): Promise<ResCodeOfPageDataOfArticleDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfPageDataOfArticleDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfPageDataOfArticleDTO>(null as any);
    }

    /**
     * 修改文章状态
     */
    setArticleStatus(articleid: number, status: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Admin/article/{articleid}/{status}";
        if (articleid === undefined || articleid === null)
            throw new Error("The parameter 'articleid' must be defined.");
        url_ = url_.replace("{articleid}", encodeURIComponent("" + articleid));
        if (status === undefined || status === null)
            throw new Error("The parameter 'status' must be defined.");
        url_ = url_.replace("{status}", encodeURIComponent("" + status));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSetArticleStatus(_response);
        });
    }

    protected processSetArticleStatus(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }
}

export class ArticleClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    /**
     * 获得本人文档(id通过解析Jwt获得,仅限正常)
     * @param pageindex 页码
     */
    getPersonalArticle(pageindex: number): Promise<ResCodeOfPageDataOfArticleDTO> {
        let url_ = this.baseUrl + "/api/Article/GetPersonal/{pageindex}";
        if (pageindex === undefined || pageindex === null)
            throw new Error("The parameter 'pageindex' must be defined.");
        url_ = url_.replace("{pageindex}", encodeURIComponent("" + pageindex));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string,
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetPersonalArticle(_response);
        });
    }

    protected processGetPersonalArticle(response: Response): Promise<ResCodeOfPageDataOfArticleDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfPageDataOfArticleDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfPageDataOfArticleDTO>(null as any);
    }

    /**
     * 获得本人文档(id通过解析Jwt获得,仅限待删除（垃圾箱）)
     * @param pageindex 页码
     */
    getPersonalArticleInRubbish(pageindex: number): Promise<ResCodeOfPageDataOfArticleDTO> {
        let url_ = this.baseUrl + "/api/Article/GetPersonalInRubbish/{pageindex}";
        if (pageindex === undefined || pageindex === null)
            throw new Error("The parameter 'pageindex' must be defined.");
        url_ = url_.replace("{pageindex}", encodeURIComponent("" + pageindex));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetPersonalArticleInRubbish(_response);
        });
    }

    protected processGetPersonalArticleInRubbish(response: Response): Promise<ResCodeOfPageDataOfArticleDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfPageDataOfArticleDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfPageDataOfArticleDTO>(null as any);
    }

    /**
     * 添加文章
     * @param article 文章内容
     */
    addArticle(article: ArticleDTO): Promise<number> {
        let url_ = this.baseUrl + "/api/Article";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(article);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAddArticle(_response);
        });
    }

    protected processAddArticle(response: Response): Promise<number> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as number;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number>(null as any);
    }

    /**
     * 根据文章Id获得内容
     */
    getById(id: number): Promise<ResCodeOfArticleDTO> {
        let url_ = this.baseUrl + "/api/Article/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetById(_response);
        });
    }

    protected processGetById(response: Response): Promise<ResCodeOfArticleDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfArticleDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfArticleDTO>(null as any);
    }

    /**
     * 删除文章
     */
    delect(id: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Article/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDelect(_response);
        });
    }

    protected processDelect(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 查找文章（标题）
     */
    getAllArticle(pageIndex: number, pageSize: number, query: string): Promise<ResCodeOfPageDataOfArticleDTO> {
        let url_ = this.baseUrl + "/api/Article/article/{PageIndex}/{PageSize}";
        if (pageIndex === undefined || pageIndex === null)
            throw new Error("The parameter 'pageIndex' must be defined.");
        url_ = url_.replace("{PageIndex}", encodeURIComponent("" + pageIndex));
        if (pageSize === undefined || pageSize === null)
            throw new Error("The parameter 'pageSize' must be defined.");
        url_ = url_.replace("{PageSize}", encodeURIComponent("" + pageSize));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(query);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetAllArticle(_response);
        });
    }

    protected processGetAllArticle(response: Response): Promise<ResCodeOfPageDataOfArticleDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfPageDataOfArticleDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfPageDataOfArticleDTO>(null as any);
    }

    /**
     * 根据用户Id获得他人文章（仅限发表且正常）
     */
    getPageAricleById(pageIndex: number, id: number): Promise<ResCodeOfPageDataOfArticleDTO> {
        let url_ = this.baseUrl + "/api/Article/user/{pageIndex}/{id}";
        if (pageIndex === undefined || pageIndex === null)
            throw new Error("The parameter 'pageIndex' must be defined.");
        url_ = url_.replace("{pageIndex}", encodeURIComponent("" + pageIndex));
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetPageAricleById(_response);
        });
    }

    protected processGetPageAricleById(response: Response): Promise<ResCodeOfPageDataOfArticleDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfPageDataOfArticleDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfPageDataOfArticleDTO>(null as any);
    }

    /**
     * 恢复文章状态
     */
    reRelease(articleId: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Article/ReRelease/{articleId}";
        if (articleId === undefined || articleId === null)
            throw new Error("The parameter 'articleId' must be defined.");
        url_ = url_.replace("{articleId}", encodeURIComponent("" + articleId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processReRelease(_response);
        });
    }

    protected processReRelease(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 获取文章编辑
     */
    getPersonalArticleById(id: number): Promise<ResCodeOfArticleDTO> {
        let url_ = this.baseUrl + "/api/Article/one/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetPersonalArticleById(_response);
        });
    }

    protected processGetPersonalArticleById(response: Response): Promise<ResCodeOfArticleDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfArticleDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfArticleDTO>(null as any);
    }

    /**
     * 获取文章数与评论数
     */
    getArsComms(): Promise<ResCodeOfListOfInteger> {
        let url_ = this.baseUrl + "/api/Article/numbers";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetArsComms(_response);
        });
    }

    protected processGetArsComms(response: Response): Promise<ResCodeOfListOfInteger> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfListOfInteger;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfListOfInteger>(null as any);
    }

    /**
     * 修改文章
     */
    changeArticle(article: ArticleDTO): Promise<ResCodeOfArticleDTO> {
        let url_ = this.baseUrl + "/api/Article/change";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(article);

        let options_: RequestInit = {
            body: content_,
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processChangeArticle(_response);
        });
    }

    protected processChangeArticle(response: Response): Promise<ResCodeOfArticleDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfArticleDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfArticleDTO>(null as any);
    }

    /**
     * 获得推荐
     */
    getCommend(): Promise<ResCodeOfListOfArticleDTO> {
        let url_ = this.baseUrl + "/api/Article/getCommend";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetCommend(_response);
        });
    }

    protected processGetCommend(response: Response): Promise<ResCodeOfListOfArticleDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfListOfArticleDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfListOfArticleDTO>(null as any);
    }
}

export class ChatClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    /**
     * 获得与某人的聊天记录
     */
    getChat(userId: number, pageindex: number, pagesize: number): Promise<ResCodeOfPageDataOfChatDTO> {
        let url_ = this.baseUrl + "/api/Chat/{userId}/{pageindex}/{pagesize}";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        if (pageindex === undefined || pageindex === null)
            throw new Error("The parameter 'pageindex' must be defined.");
        url_ = url_.replace("{pageindex}", encodeURIComponent("" + pageindex));
        if (pagesize === undefined || pagesize === null)
            throw new Error("The parameter 'pagesize' must be defined.");
        url_ = url_.replace("{pagesize}", encodeURIComponent("" + pagesize));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetChat(_response);
        });
    }

    protected processGetChat(response: Response): Promise<ResCodeOfPageDataOfChatDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfPageDataOfChatDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfPageDataOfChatDTO>(null as any);
    }

    /**
     * 发送消息
     */
    sendMessage(receiveId: number, message: string): Promise<ResCodeOfChatDTO> {
        let url_ = this.baseUrl + "/api/Chat/{ReceiveId}";
        if (receiveId === undefined || receiveId === null)
            throw new Error("The parameter 'receiveId' must be defined.");
        url_ = url_.replace("{ReceiveId}", encodeURIComponent("" + receiveId));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(message);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSendMessage(_response);
        });
    }

    protected processSendMessage(response: Response): Promise<ResCodeOfChatDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfChatDTO>(null as any);
    }

    /**
     * 将指定发送者的消息全部设为已读
     */
    recevieMessage(send: number): Promise<void> {
        let url_ = this.baseUrl + "/api/Chat/{send}";
        if (send === undefined || send === null)
            throw new Error("The parameter 'send' must be defined.");
        url_ = url_.replace("{send}", encodeURIComponent("" + send));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PATCH",
            headers: {
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processRecevieMessage(_response);
        });
    }

    protected processRecevieMessage(response: Response): Promise<void> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                return;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<void>(null as any);
    }

    /**
     * 获得聊天用户列表
     */
    getChatUserList(): Promise<UserDTO[]> {
        let url_ = this.baseUrl + "/api/Chat";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetChatUserList(_response);
        });
    }

    protected processGetChatUserList(response: Response): Promise<UserDTO[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as UserDTO[];
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<UserDTO[]>(null as any);
    }

    /**
     * 获取最后一条消息
     */
    getNewMessage(userId: number): Promise<ResCodeOfChatDTO> {
        let url_ = this.baseUrl + "/api/Chat/getlastchat/{userId}";
        if (userId === undefined || userId === null)
            throw new Error("The parameter 'userId' must be defined.");
        url_ = url_.replace("{userId}", encodeURIComponent("" + userId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetNewMessage(_response);
        });
    }

    protected processGetNewMessage(response: Response): Promise<ResCodeOfChatDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfChatDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfChatDTO>(null as any);
    }
}

export class CollectionClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    /**
     * 收藏文章
     */
    addCollect(articleId: number): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/Collection/collect/{articleId}";
        if (articleId === undefined || articleId === null)
            throw new Error("The parameter 'articleId' must be defined.");
        url_ = url_.replace("{articleId}", encodeURIComponent("" + articleId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAddCollect(_response);
        });
    }

    protected processAddCollect(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }

    /**
     * 取消收藏
     */
    voidArt(articleId: number): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/Collection/collect/void/{articleId}";
        if (articleId === undefined || articleId === null)
            throw new Error("The parameter 'articleId' must be defined.");
        url_ = url_.replace("{articleId}", encodeURIComponent("" + articleId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processVoidArt(_response);
        });
    }

    protected processVoidArt(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }

    /**
     * 是否收藏
     */
    isCollection(articleid: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Collection/collect/{articleid}";
        if (articleid === undefined || articleid === null)
            throw new Error("The parameter 'articleid' must be defined.");
        url_ = url_.replace("{articleid}", encodeURIComponent("" + articleid));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processIsCollection(_response);
        });
    }

    protected processIsCollection(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 获取收藏的文章
     */
    getCollection(pageindex: number): Promise<ResCodeOfPageDataOfArticleDTO> {
        let url_ = this.baseUrl + "/api/Collection/collection/{pageindex}";
        if (pageindex === undefined || pageindex === null)
            throw new Error("The parameter 'pageindex' must be defined.");
        url_ = url_.replace("{pageindex}", encodeURIComponent("" + pageindex));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetCollection(_response);
        });
    }

    protected processGetCollection(response: Response): Promise<ResCodeOfPageDataOfArticleDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfPageDataOfArticleDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfPageDataOfArticleDTO>(null as any);
    }
}

export class CommentClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    /**
     * 发表评论
     */
    addComment(comment: CommentDTO): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Comment";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(comment);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAddComment(_response);
        });
    }

    protected processAddComment(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 评论点赞（取消点赞）
     */
    upLike(id: number): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/Comment/uplick/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUpLike(_response);
        });
    }

    protected processUpLike(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }

    /**
     * 第一次获取评论（只获取第一层）
     */
    getComment(articleId: number): Promise<ResCodeOfListOfCommentDTO> {
        let url_ = this.baseUrl + "/api/Comment/getcomment/{articleId}";
        if (articleId === undefined || articleId === null)
            throw new Error("The parameter 'articleId' must be defined.");
        url_ = url_.replace("{articleId}", encodeURIComponent("" + articleId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetComment(_response);
        });
    }

    protected processGetComment(response: Response): Promise<ResCodeOfListOfCommentDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfListOfCommentDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfListOfCommentDTO>(null as any);
    }

    /**
     * 获得评论的回复
     * @param id 展开的顶层评论Id
     */
    getResponse(id: number): Promise<ResCodeOfListOfCommentDTO> {
        let url_ = this.baseUrl + "/response/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetResponse(_response);
        });
    }

    protected processGetResponse(response: Response): Promise<ResCodeOfListOfCommentDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfListOfCommentDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfListOfCommentDTO>(null as any);
    }

    /**
     * 根据传入类型获取评论
     */
    getUnPass(pageindex: number, type: number): Promise<ResCodeOfPageDataOfCommentCheck> {
        let url_ = this.baseUrl + "/api/Comment/UnPass/{pageindex}/{type}";
        if (pageindex === undefined || pageindex === null)
            throw new Error("The parameter 'pageindex' must be defined.");
        url_ = url_.replace("{pageindex}", encodeURIComponent("" + pageindex));
        if (type === undefined || type === null)
            throw new Error("The parameter 'type' must be defined.");
        url_ = url_.replace("{type}", encodeURIComponent("" + type));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetUnPass(_response);
        });
    }

    protected processGetUnPass(response: Response): Promise<ResCodeOfPageDataOfCommentCheck> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfPageDataOfCommentCheck;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfPageDataOfCommentCheck>(null as any);
    }

    /**
     * 审核评论
     * @param ispass 是否通过
     */
    passComment(commengId: number, ispass: boolean): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/Comment/{commengId}/{ispass}";
        if (commengId === undefined || commengId === null)
            throw new Error("The parameter 'commengId' must be defined.");
        url_ = url_.replace("{commengId}", encodeURIComponent("" + commengId));
        if (ispass === undefined || ispass === null)
            throw new Error("The parameter 'ispass' must be defined.");
        url_ = url_.replace("{ispass}", encodeURIComponent("" + ispass));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processPassComment(_response);
        });
    }

    protected processPassComment(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }

    /**
     * 删除评论
     */
    delect(id: number): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/Comment/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDelect(_response);
        });
    }

    protected processDelect(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }

    /**
     * 根据用户id获取发表的评论，仅限正常且通过
     */
    getCommentByUserId(userid: number, pageindex: number): Promise<ResCodeOfPageDataOfCommentCheck> {
        let url_ = this.baseUrl + "/api/Comment/usercomment/{userid}/{pageindex}";
        if (userid === undefined || userid === null)
            throw new Error("The parameter 'userid' must be defined.");
        url_ = url_.replace("{userid}", encodeURIComponent("" + userid));
        if (pageindex === undefined || pageindex === null)
            throw new Error("The parameter 'pageindex' must be defined.");
        url_ = url_.replace("{pageindex}", encodeURIComponent("" + pageindex));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetCommentByUserId(_response);
        });
    }

    protected processGetCommentByUserId(response: Response): Promise<ResCodeOfPageDataOfCommentCheck> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfPageDataOfCommentCheck;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfPageDataOfCommentCheck>(null as any);
    }
}

export class EmailClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    /**
     * 注册发送验证码 5分钟失效
     * @param account 用户邮箱
     */
    sendSecure(account: VerifyDTO): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Email/getcode";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(account);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSendSecure(_response);
        });
    }

    protected processSendSecure(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 验证注册验证码
     */
    verifyCode(verify: VerifyDTO): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Email/verify";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(verify);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processVerifyCode(_response);
        });
    }

    protected processVerifyCode(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 生成找回密码验证码
     */
    reSetPassCode(account: string): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Email/ReSetPassCode";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(account);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processReSetPassCode(_response);
        });
    }

    protected processReSetPassCode(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 验证找回密码密码验证码
     */
    verifyPassCode(verify: VerifyDTO): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/Email/VerifyPassCode";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(verify);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processVerifyPassCode(_response);
        });
    }

    protected processVerifyPassCode(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }
}

export class FriendClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    /**
     * 关注
     * @param userid 对方id
     */
    addFriend(userid: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Friend/{userid}";
        if (userid === undefined || userid === null)
            throw new Error("The parameter 'userid' must be defined.");
        url_ = url_.replace("{userid}", encodeURIComponent("" + userid));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAddFriend(_response);
        });
    }

    protected processAddFriend(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 取消关注
     * @param userid 对方id
     */
    deleteFriend(userid: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Friend/{userid}";
        if (userid === undefined || userid === null)
            throw new Error("The parameter 'userid' must be defined.");
        url_ = url_.replace("{userid}", encodeURIComponent("" + userid));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string,
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteFriend(_response);
        });
    }

    protected processDeleteFriend(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 是否关注此人
     * @param userid 对方Id
     */
    isFollow(userid: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Friend/{userid}";
        if (userid === undefined || userid === null)
            throw new Error("The parameter 'userid' must be defined.");
        url_ = url_.replace("{userid}", encodeURIComponent("" + userid));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processIsFollow(_response);
        });
    }

    protected processIsFollow(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 加入黑名单
     * @param id 对方id
     */
    delete(id: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Friend/add/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDelete(_response);
        });
    }

    protected processDelete(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 获取粉丝(数)
     */
    getFans(userid: number, page: number): Promise<ResCodeOfFansDTO> {
        let url_ = this.baseUrl + "/api/Friend/fan/{userid}/{page}";
        if (userid === undefined || userid === null)
            throw new Error("The parameter 'userid' must be defined.");
        url_ = url_.replace("{userid}", encodeURIComponent("" + userid));
        if (page === undefined || page === null)
            throw new Error("The parameter 'page' must be defined.");
        url_ = url_.replace("{page}", encodeURIComponent("" + page));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetFans(_response);
        });
    }

    protected processGetFans(response: Response): Promise<ResCodeOfFansDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfFansDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfFansDTO>(null as any);
    }

    /**
     * 获取关注的人(数)
     */
    getFollow(userid: number, page: number): Promise<ResCodeOfFansDTO> {
        let url_ = this.baseUrl + "/api/Friend/folow/{userid}/{page}";
        if (userid === undefined || userid === null)
            throw new Error("The parameter 'userid' must be defined.");
        url_ = url_.replace("{userid}", encodeURIComponent("" + userid));
        if (page === undefined || page === null)
            throw new Error("The parameter 'page' must be defined.");
        url_ = url_.replace("{page}", encodeURIComponent("" + page));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetFollow(_response);
        });
    }

    protected processGetFollow(response: Response): Promise<ResCodeOfFansDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfFansDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfFansDTO>(null as any);
    }

    /**
     * 获取粉丝数，关注数
     * @param userid (optional) 
     */
    getFanFollowNumber(userid: number | undefined): Promise<ResCodeOfDictionaryOfStringAndInteger> {
        let url_ = this.baseUrl + "/api/Friend?";
        if (userid === null)
            throw new Error("The parameter 'userid' cannot be null.");
        else if (userid !== undefined)
            url_ += "userid=" + encodeURIComponent("" + userid) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetFanFollowNumber(_response);
        });
    }

    protected processGetFanFollowNumber(response: Response): Promise<ResCodeOfDictionaryOfStringAndInteger> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfDictionaryOfStringAndInteger;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfDictionaryOfStringAndInteger>(null as any);
    }
}

export class LikeClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    /**
     * 点赞文章
     */
    addlike(articleId: number): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/Like/like/{articleId}";
        if (articleId === undefined || articleId === null)
            throw new Error("The parameter 'articleId' must be defined.");
        url_ = url_.replace("{articleId}", encodeURIComponent("" + articleId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAddlike(_response);
        });
    }

    protected processAddlike(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }

    /**
     * 取消点赞
     */
    voidlike(articleId: number): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/Like/like/void/{articleId}";
        if (articleId === undefined || articleId === null)
            throw new Error("The parameter 'articleId' must be defined.");
        url_ = url_.replace("{articleId}", encodeURIComponent("" + articleId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processVoidlike(_response);
        });
    }

    protected processVoidlike(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }

    /**
     * 是否点赞
     */
    islike(articleid: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Like/like/{articleid}";
        if (articleid === undefined || articleid === null)
            throw new Error("The parameter 'articleid' must be defined.");
        url_ = url_.replace("{articleid}", encodeURIComponent("" + articleid));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processIslike(_response);
        });
    }

    protected processIslike(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 文章点赞(取消点赞)
     */
    likeArticle(articleid: number): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/Like/{articleid}";
        if (articleid === undefined || articleid === null)
            throw new Error("The parameter 'articleid' must be defined.");
        url_ = url_.replace("{articleid}", encodeURIComponent("" + articleid));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processLikeArticle(_response);
        });
    }

    protected processLikeArticle(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }
}

export class LoginClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    /**
     * 登录
     */
    login(info: LoginInfo): Promise<ResCodeOfUserDTO> {
        let url_ = this.baseUrl + "/api/Login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(info);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processLogin(_response);
        });
    }

    protected processLogin(response: Response): Promise<ResCodeOfUserDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfUserDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfUserDTO>(null as any);
    }

    /**
     * 注册
     */
    reg(regInfo: RegInfo): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Login";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(regInfo);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processReg(_response);
        });
    }

    protected processReg(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 注销账号，七天后软删除
     */
    logout(): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Login";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processLogout(_response);
        });
    }

    protected processLogout(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 通过Jwt获取用户信息（自动登录时使用）
     */
    getByJwt(): Promise<ResCodeOfUserDTO> {
        let url_ = this.baseUrl + "/api/Login";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetByJwt(_response);
        });
    }

    protected processGetByJwt(response: Response): Promise<ResCodeOfUserDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfUserDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfUserDTO>(null as any);
    }

    admin(): Promise<boolean> {
        let url_ = this.baseUrl + "/api/Login/Admin";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAdmin(_response);
        });
    }

    protected processAdmin(response: Response): Promise<boolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as boolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<boolean>(null as any);
    }

    /**
     * 是否有权访问
     * @param path (optional) 
     */
    isAllow(path: string | null | undefined): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Login/path?";
        if (path !== undefined && path !== null)
            url_ += "path=" + encodeURIComponent("" + path) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processIsAllow(_response);
        });
    }

    protected processIsAllow(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }
}

export class MenuClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    getAllMenu(): Promise<ResCodeOfListOfMenuDTO> {
        let url_ = this.baseUrl + "/api/Menu";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetAllMenu(_response);
        });
    }

    protected processGetAllMenu(response: Response): Promise<ResCodeOfListOfMenuDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfListOfMenuDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfListOfMenuDTO>(null as any);
    }

    addMenu(menu: MenuDTO): Promise<ResCodeOfMenu> {
        let url_ = this.baseUrl + "/api/Menu";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(menu);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAddMenu(_response);
        });
    }

    protected processAddMenu(response: Response): Promise<ResCodeOfMenu> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfMenu;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfMenu>(null as any);
    }
}

export class PictureClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    public baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    /**
     * 上传头像
     */
    headerfile(): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/Picture/headfile";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processHeaderfile(_response);
        });
    }

    protected processHeaderfile(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }

    /**
     * 上传相册，并写入数据库
     * @param id 相册Id
     */
    collectionfile(id: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/Picture/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processCollectionfile(_response);
        });
    }

    protected processCollectionfile(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 获取相册图片
     * @param id 图片id
     */
    getByPicId(id: number): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/Picture/getById/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetByPicId(_response);
        });
    }

    protected processGetByPicId(response: Response): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    /**
     * 上传博文中的图片
     */
    upLoadArticleImg(formdata: FormData): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/Picture/articleimg";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            },
            body: formdata
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUpLoadArticleImg(_response);
        });
    }

    protected processUpLoadArticleImg(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }

    /**
     * 获取文章中的图片
     */
    getByPicName(picname: string | null): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/Picture/GetByPicName/{picname}";
        if (picname === undefined || picname === null)
            throw new Error("The parameter 'picname' must be defined.");
        url_ = url_.replace("{picname}", encodeURIComponent("" + picname));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetByPicName(_response);
        });
    }

    protected processGetByPicName(response: Response): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    /**
     * 返回相册文件对应图片ID列表
     */
    getPicGroup(id: number): Promise<number[]> {
        let url_ = this.baseUrl + "/api/Picture/imgs/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetPicGroup(_response);
        });
    }

    protected processGetPicGroup(response: Response): Promise<number[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as number[];
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<number[]>(null as any);
    }

    /**
     * 获得图片封面（最后一张图）
     * @param id 相册Id
     */
    getTheardPic(id: number): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/Picture/facepic/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetTheardPic(_response);
        });
    }

    protected processGetTheardPic(response: Response): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    /**
     * 根据路径获取头像
     */
    getHeadByPath(path: string | null): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/Picture/path/{path}";
        if (path === undefined || path === null)
            throw new Error("The parameter 'path' must be defined.");
        url_ = url_.replace("{path}", encodeURIComponent("" + path));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetHeadByPath(_response);
        });
    }

    protected processGetHeadByPath(response: Response): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse>(null as any);
    }
}

export class TagsClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    getall(): Promise<TagInfo[]> {
        let url_ = this.baseUrl + "/api/Tags";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetall(_response);
        });
    }

    protected processGetall(response: Response): Promise<TagInfo[]> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as TagInfo[];
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<TagInfo[]>(null as any);
    }

    addTag(tagname: string | null | undefined): Promise<boolean> {
        let url_ = this.baseUrl + "/api/Tags/addtag?";
        if (tagname !== undefined && tagname !== null)
            url_ += "tagname=" + encodeURIComponent("" + tagname) + "&";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAddTag(_response);
        });
    }

    protected processAddTag(response: Response): Promise<boolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as boolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<boolean>(null as any);
    }

    addTags(tags: TagInfo[]): Promise<boolean> {
        let url_ = this.baseUrl + "/api/Tags/addtags";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(tags);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAddTags(_response);
        });
    }

    protected processAddTags(response: Response): Promise<boolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as boolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<boolean>(null as any);
    }

    changTag(tag: TagInfo): Promise<boolean> {
        let url_ = this.baseUrl + "/api/Tags/changgetag";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(tag);

        let options_: RequestInit = {
            body: content_,
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processChangTag(_response);
        });
    }

    protected processChangTag(response: Response): Promise<boolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as boolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<boolean>(null as any);
    }

    deleteTag(tagId: number): Promise<boolean> {
        let url_ = this.baseUrl + "/api/Tags/{tagId}";
        if (tagId === undefined || tagId === null)
            throw new Error("The parameter 'tagId' must be defined.");
        url_ = url_.replace("{tagId}", encodeURIComponent("" + tagId));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDeleteTag(_response);
        });
    }

    protected processDeleteTag(response: Response): Promise<boolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as boolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<boolean>(null as any);
    }

    /**
     * 模糊查询
     */
    getByName(name: string | null): Promise<ResCodeOfListOfTagDTO> {
        let url_ = this.baseUrl + "/api/Tags/{name}";
        if (name === undefined || name === null)
            throw new Error("The parameter 'name' must be defined.");
        url_ = url_.replace("{name}", encodeURIComponent("" + name));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetByName(_response);
        });
    }

    protected processGetByName(response: Response): Promise<ResCodeOfListOfTagDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfListOfTagDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfListOfTagDTO>(null as any);
    }

    /**
     * 通过标签名模糊查询标签
     */
    searchByName(name: string | null): Promise<ResCodeOfListOfTagInfo> {
        let url_ = this.baseUrl + "/api/Tags/getby/{name}";
        if (name === undefined || name === null)
            throw new Error("The parameter 'name' must be defined.");
        url_ = url_.replace("{name}", encodeURIComponent("" + name));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSearchByName(_response);
        });
    }

    protected processSearchByName(response: Response): Promise<ResCodeOfListOfTagInfo> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfListOfTagInfo;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfListOfTagInfo>(null as any);
    }

    /**
     * 复杂查询（标签）
     */
    searchByTags(pageIndex: number, pageSize: number, query: string): Promise<PageDataOfArticleDTO> {
        let url_ = this.baseUrl + "/api/Tags/complicated/{PageIndex}/{PageSize}";
        if (pageIndex === undefined || pageIndex === null)
            throw new Error("The parameter 'pageIndex' must be defined.");
        url_ = url_.replace("{PageIndex}", encodeURIComponent("" + pageIndex));
        if (pageSize === undefined || pageSize === null)
            throw new Error("The parameter 'pageSize' must be defined.");
        url_ = url_.replace("{PageSize}", encodeURIComponent("" + pageSize));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(query);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSearchByTags(_response);
        });
    }

    protected processSearchByTags(response: Response): Promise<PageDataOfArticleDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as PageDataOfArticleDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<PageDataOfArticleDTO>(null as any);
    }
}

export class UserClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    /**
     * 修改个人信息
     */
    upDataUser(able: ChangeUserInfoAble): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/User";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(able);

        let options_: RequestInit = {
            body: content_,
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processUpDataUser(_response);
        });
    }

    protected processUpDataUser(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }

    /**
     * 根据用户ID获取用户非敏感信息(用于评论等信息获取)
     */
    getUserInfoById(id: number): Promise<ResCodeOfUserDTO> {
        let url_ = this.baseUrl + "/api/User/customer/{id}";
        if (id === undefined || id === null)
            throw new Error("The parameter 'id' must be defined.");
        url_ = url_.replace("{id}", encodeURIComponent("" + id));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string,
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetUserInfoById(_response);
        });
    }

    protected processGetUserInfoById(response: Response): Promise<ResCodeOfUserDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfUserDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfUserDTO>(null as any);
    }

    /**
     * 获取点击最高的文章和使用最多的标签
     */
    getViewNumberArticle(): Promise<ResCodeOfListOfDictionaryOfStringAndInteger> {
        let url_ = this.baseUrl + "/api/User/order";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetViewNumberArticle(_response);
        });
    }

    protected processGetViewNumberArticle(response: Response): Promise<ResCodeOfListOfDictionaryOfStringAndInteger> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfListOfDictionaryOfStringAndInteger;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfListOfDictionaryOfStringAndInteger>(null as any);
    }

    /**
     * 更改密码
     */
    changePassword(passwordgroup: PasswordGroup): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/User/changepass";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(passwordgroup);

        let options_: RequestInit = {
            body: content_,
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processChangePassword(_response);
        });
    }

    protected processChangePassword(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 根据邮箱搜索用户
     * @param account 邮箱全拼
     */
    searchUser(account: string): Promise<ResCodeOfUserDTO> {
        let url_ = this.baseUrl + "/api/User/search";
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(account);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSearchUser(_response);
        });
    }

    protected processSearchUser(response: Response): Promise<ResCodeOfUserDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfUserDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfUserDTO>(null as any);
    }

    /**
     * 根据昵称搜索用户
     */
    searchUsersByNickname(pageindex: number, pagesize: number, nickname: string): Promise<ResCodeOfListOfUserDTO> {
        let url_ = this.baseUrl + "/api/User/search/{pageindex}/{pagesize}";
        if (pageindex === undefined || pageindex === null)
            throw new Error("The parameter 'pageindex' must be defined.");
        url_ = url_.replace("{pageindex}", encodeURIComponent("" + pageindex));
        if (pagesize === undefined || pagesize === null)
            throw new Error("The parameter 'pagesize' must be defined.");
        url_ = url_.replace("{pagesize}", encodeURIComponent("" + pagesize));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(nickname);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSearchUsersByNickname(_response);
        });
    }

    protected processSearchUsersByNickname(response: Response): Promise<ResCodeOfListOfUserDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfListOfUserDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfListOfUserDTO>(null as any);
    }

    /**
     * 找回密码重设验证码
     */
    reSetPassWord(token: string | null, verify: VerifyDTO): Promise<ResCodeOfString> {
        let url_ = this.baseUrl + "/api/User/ReSetPassWord/{token}";
        if (token === undefined || token === null)
            throw new Error("The parameter 'token' must be defined.");
        url_ = url_.replace("{token}", encodeURIComponent("" + token));
        url_ = url_.replace(/[?&]$/, "");

        const content_ = JSON.stringify(verify);

        let options_: RequestInit = {
            body: content_,
            method: "POST",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processReSetPassWord(_response);
        });
    }

    protected processReSetPassWord(response: Response): Promise<ResCodeOfString> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfString;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfString>(null as any);
    }

    /**
     * 设置评论审核
     */
    setCommentChick(ischick: boolean): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/User/setcommentchick/{ischick}";
        if (ischick === undefined || ischick === null)
            throw new Error("The parameter 'ischick' must be defined.");
        url_ = url_.replace("{ischick}", encodeURIComponent("" + ischick));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processSetCommentChick(_response);
        });
    }

    protected processSetCommentChick(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 获取用户评论审核规则
     */
    getCommentChick(): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/User/GetCommentChick";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetCommentChick(_response);
        });
    }

    protected processGetCommentChick(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 获取头像
     */
    getHeader(): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/User/header";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetHeader(_response);
        });
    }

    protected processGetHeader(response: Response): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse>(null as any);
    }

    /**
     * 获取对方头像
     * @param userid 对方id
     */
    getHeadById(userid: number): Promise<FileResponse> {
        let url_ = this.baseUrl + "/api/User/{userid}";
        if (userid === undefined || userid === null)
            throw new Error("The parameter 'userid' must be defined.");
        url_ = url_.replace("{userid}", encodeURIComponent("" + userid));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/octet-stream"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetHeadById(_response);
        });
    }

    protected processGetHeadById(response: Response): Promise<FileResponse> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200 || status === 206) {
            const contentDisposition = response.headers ? response.headers.get("content-disposition") : undefined;
            let fileNameMatch = contentDisposition ? /filename\*=(?:(\\?['"])(.*?)\1|(?:[^\s]+'.*?')?([^;\n]*))/g.exec(contentDisposition) : undefined;
            let fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[3] || fileNameMatch[2] : undefined;
            if (fileName) {
                fileName = decodeURIComponent(fileName);
            } else {
                fileNameMatch = contentDisposition ? /filename="?([^"]*?)"?(;|$)/g.exec(contentDisposition) : undefined;
                fileName = fileNameMatch && fileNameMatch.length > 1 ? fileNameMatch[1] : undefined;
            }
            return response.blob().then(blob => { return { fileName: fileName, data: blob, status: status, headers: _headers }; });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<FileResponse>(null as any);
    }
}

export class UserGroupClient {
    private http: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> };
    private baseUrl: string;
    protected jsonParseReviver: ((key: string, value: any) => any) | undefined = undefined;

    constructor(baseUrl?: string, http?: { fetch(url: RequestInfo, init?: RequestInit): Promise<Response> }) {
        this.http = http ? http : window as any;
        this.baseUrl = baseUrl !== undefined && baseUrl !== null ? baseUrl : ServiceUrl;
    }

    /**
     * 用户添加相册，id通过jwt获取
     * @param groupname 相册名
     */
    addGroup(groupname: string | null): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/UserGroup/{groupname}";
        if (groupname === undefined || groupname === null)
            throw new Error("The parameter 'groupname' must be defined.");
        url_ = url_.replace("{groupname}", encodeURIComponent("" + groupname));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PUT",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processAddGroup(_response);
        });
    }

    protected processAddGroup(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 删除相册
     */
    delect(groupid: number): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/UserGroup/{groupid}";
        if (groupid === undefined || groupid === null)
            throw new Error("The parameter 'groupid' must be defined.");
        url_ = url_.replace("{groupid}", encodeURIComponent("" + groupid));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processDelect(_response);
        });
    }

    protected processDelect(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    /**
     * 修改相册名称
     */
    changegroup(groupid: number, groupname: string | null): Promise<ResCodeOfBoolean> {
        let url_ = this.baseUrl + "/api/UserGroup/{groupid}/{groupname}";
        if (groupid === undefined || groupid === null)
            throw new Error("The parameter 'groupid' must be defined.");
        url_ = url_.replace("{groupid}", encodeURIComponent("" + groupid));
        if (groupname === undefined || groupname === null)
            throw new Error("The parameter 'groupname' must be defined.");
        url_ = url_.replace("{groupname}", encodeURIComponent("" + groupname));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "PATCH",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processChangegroup(_response);
        });
    }

    protected processChangegroup(response: Response): Promise<ResCodeOfBoolean> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfBoolean;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfBoolean>(null as any);
    }

    getGroup(): Promise<ResCodeOfListOfUserGroupDTO> {
        let url_ = this.baseUrl + "/api/UserGroup";
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGetGroup(_response);
        });
    }

    protected processGetGroup(response: Response): Promise<ResCodeOfListOfUserGroupDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfListOfUserGroupDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfListOfUserGroupDTO>(null as any);
    }

    /**
     * 查找相册
     * @param name 相册名
     */
    get(name: string | null): Promise<ResCodeOfListOfUserGroupDTO> {
        let url_ = this.baseUrl + "/api/UserGroup/{name}";
        if (name === undefined || name === null)
            throw new Error("The parameter 'name' must be defined.");
        url_ = url_.replace("{name}", encodeURIComponent("" + name));
        url_ = url_.replace(/[?&]$/, "");

        let options_: RequestInit = {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem('MyBlogJwt') as string, "Accept": "application/json"
            }
        };

        return this.http.fetch(url_, options_).then((_response: Response) => {
            return this.processGet(_response);
        });
    }

    protected processGet(response: Response): Promise<ResCodeOfListOfUserGroupDTO> {
        const status = response.status;
        let _headers: any = {}; if (response.headers && response.headers.forEach) { response.headers.forEach((v: any, k: any) => _headers[k] = v); };
        if (status === 200) {
            return response.text().then((_responseText) => {
                let result200: any = null;
                result200 = _responseText === "" ? null : JSON.parse(_responseText, this.jsonParseReviver) as ResCodeOfListOfUserGroupDTO;
                return result200;
            });
        } else if (status !== 200 && status !== 204) {
            return response.text().then((_responseText) => {
                return throwException("An unexpected server error occurred.", status, _responseText, _headers);
            });
        }
        return Promise.resolve<ResCodeOfListOfUserGroupDTO>(null as any);
    }
}

export interface ResCodeOfBoolean {
    code?: number;
    message?: string | undefined;
    data?: boolean;
}

export interface ResCodeOfPageDataOfAdminUserDTO {
    code?: number;
    message?: string | undefined;
    data: PageDataOfAdminUserDTO;
}

export interface PageDataOfAdminUserDTO {
    pageindex?: number;
    pageSize?: number;
    total?: number;
    data?: AdminUserDTO[] | undefined;
}

export interface AdminUserDTO {
    id?: number;
    account?: string;
    nickName?: string;
    inyro?: string | undefined;
    fans?: number;
    userImg?: string;
    address?: string;
    roleId?: number;
    status?: number;
}

export interface ResCodeOfAdminUserDTO {
    code?: number;
    message?: string | undefined;
    data: AdminUserDTO;
}

export interface ResCodeOfPageDataOfUserDTO {
    code?: number;
    message?: string | undefined;
    data?: PageDataOfUserDTO | undefined;
}

export interface PageDataOfUserDTO {
    pageindex?: number;
    pageSize?: number;
    total?: number;
    data?: UserDTO[] | undefined;
}

export interface UserDTO {
    id?: number;
    account?: string;
    nickName?: string;
    inyro?: string | undefined;
    fans?: number;
    userImg?: string;
    address?: string;
    jwt?: string | undefined;
}

export interface ResCodeOfPageDataOfCommentCheck {
    code?: number;
    message?: string | undefined;
    data: PageDataOfCommentCheck;
}

export interface PageDataOfCommentCheck {
    pageindex?: number;
    pageSize?: number;
    total?: number;
    data?: CommentCheck[] | undefined;
}

export interface CommentCheck {
    commend?: number;
    articleId?: number;
    articleTitle?: string;
    userNickName?: string;
    userHeaderImg?: string;
    commentText?: string;
    isResponse?: boolean;
    responseCommentText?: string | undefined;
    releaseTime: Date;
}

export interface ResCodeOfCommentCheck {
    code?: number;
    message?: string | undefined;
    data?: CommentCheck | undefined;
}

export interface ResCodeOfPageDataOfArticleDTO {
    code?: number;
    message?: string | undefined;
    data: PageDataOfArticleDTO;
}

export interface PageDataOfArticleDTO {
    pageindex?: number;
    pageSize?: number;
    total?: number;
    data?: ArticleDTO[] | undefined;
}

export interface ArticleDTO {
    id: number;
    userId: number;
    title: string;
    detail?: string;
    creatTime: Date;
    changeTime?: Date | undefined;
    count: number;
    collection: number;
    likeNumber: number;
    status: number;
    typeNumber: number;
    isTop: boolean;
    tags: TagDTO[] | undefined;
}

export interface TagDTO {
    id?: number;
    tagName?: string;
}

export interface ResCodeOfArticleDTO {
    code?: number;
    message?: string | undefined;
    data: ArticleDTO;
}

export interface ResCodeOfListOfInteger {
    code?: number;
    message?: string | undefined;
    data?: number[] | undefined;
}

export interface ResCodeOfListOfArticleDTO {
    code?: number;
    message?: string | undefined;
    data?: (ArticleDTO | undefined)[] | undefined;
}

export interface ResCodeOfPageDataOfChatDTO {
    code?: number;
    message?: string | undefined;
    data: PageDataOfChatDTO;
}

export interface PageDataOfChatDTO {
    pageindex?: number;
    pageSize?: number;
    total?: number;
    data: ChatDTO[];
}

export interface ChatDTO {
    id?: number;
    sendId?: number;
    receiveId?: number;
    message?: string;
    receiveStatus?: boolean;
    sendTime: Date;
}

export interface ResCodeOfString {
    code?: number;
    message?: string | undefined;
    data?: string | undefined;
}

export interface ResCodeOfChatDTO {
    code?: number;
    message?: string | undefined;
    data: ChatDTO;
}

export interface CommentDTO {
    isLike?: boolean | undefined;
    commend?: number;
    articleId?: number;
    userId?: number;
    commentText?: string;
    isResponse?: boolean;
    responseId?: number | undefined;
    likeCount?: number | undefined;
    status?: number | undefined;
    releaseTime?: Date | undefined;
    parent?: CommentDTO | undefined;
    children?: CommentDTO[] | undefined;
}

export interface ResCodeOfListOfCommentDTO {
    code?: number;
    message?: string | undefined;
    data?: CommentDTO[];
}

export interface VerifyDTO {
    account: string;
    code: string;
}

export interface ResCodeOfFansDTO {
    code?: number;
    message?: string | undefined;
    data?: FansDTO | undefined;
}

export interface FansDTO {
    users?: UserDTO[];
    count?: number;
}

export interface ResCodeOfDictionaryOfStringAndInteger {
    code?: number;
    message?: string | undefined;
    data?: { [key: string]: number; } | undefined;
}

export interface ResCodeOfUserDTO {
    code?: number;
    message?: string | undefined;
    data: UserDTO;
}

export interface LoginInfo {
    account?: string;
    password?: string;
}

export interface RegInfo {
    account?: string;
    nickName?: string;
    password?: string;
    address?: string;
    userImg?: string;
}

export interface ResCodeOfListOfMenuDTO {
    code?: number;
    message?: string | undefined;
    data?: (MenuDTO | undefined)[] | undefined;
}

export interface MenuDTO {
    menuId?: number;
    menuPath?: string;
    menuName?: string;
    component?: string;
    father?: number | undefined;
    fatherMenu?: Menu | undefined;
    childrenMenu?: Menu[] | undefined;
}

export interface Menu {
    menuId?: number;
    menuPath?: string;
    menuName?: string;
    component?: string;
    father?: number | undefined;
    fatherNavigation?: Menu | undefined;
    children?: Menu[];
}

export interface ResCodeOfMenu {
    code?: number;
    message?: string | undefined;
    data?: Menu | undefined;
}

export interface TagInfo {
    id?: number;
    tagName?: string;
    articleInfos?: ArticleInfo[];
}

export interface ArticleInfo {
    id?: number;
    userId?: number;
    title?: string;
    detail?: string;
    creatTime?: Date;
    changeTime?: Date | undefined;
    count?: number;
    collection?: number;
    likeNumber?: number;
    status?: number;
    typeNumber?: number;
    isTop?: boolean;
    isDisable?: number;
    commentInfos?: CommentInfo[];
    user?: DetilUser;
    tags?: TagInfo[];
}

export interface CommentInfo {
    commend?: number;
    articleId?: number;
    commentText?: string;
    userId?: number;
    isResponse?: boolean;
    responseId?: number | undefined;
    likeCount?: number | undefined;
    status?: number;
    releaseTime?: Date;
    article?: ArticleInfo;
    response?: DetilUser | undefined;
    user?: DetilUser;
    parent?: CommentInfo | undefined;
    children?: CommentInfo[] | undefined;
}

export interface DetilUser {
    id?: number;
    account?: string;
    nickName?: string;
    inyro?: string | undefined;
    password?: string;
    fans?: number;
    commandChick?: boolean;
    address?: string;
    userImg?: string;
    userCount?: number;
    roleId?: number;
    blackRoomLeave?: number;
    isDisable?: number;
    organizeRole?: number;
    sendChatInfos?: ChatInfo[];
    reciveChatInfo?: ChatInfo[];
    articleInfos?: ArticleInfo[];
    commentInfoResponses?: CommentInfo[];
    commentInfoUsers?: CommentInfo[];
    role?: Role;
    userPictures?: PictureGroupInfo[];
}

export interface ChatInfo {
    id?: number;
    sendId?: number;
    receiveId?: number;
    message?: string;
    receiveStatus?: boolean;
    sendTime?: Date;
    receive?: DetilUser;
    send?: DetilUser;
}

export interface Role {
    roleId?: number;
    roleName?: string;
    detilUsers?: DetilUser[];
}

export interface PictureGroupInfo {
    groupId?: number;
    userId?: number;
    groupName?: string;
    user?: DetilUser;
    groupPictureList?: GroupPicture[] | undefined;
}

export interface GroupPicture {
    id?: number | undefined;
    groupId?: number;
    pictureId?: number;
    group?: PictureGroupInfo;
    picture?: Picture;
}

export interface Picture {
    id?: number;
    path?: string | undefined;
}

export interface ResCodeOfListOfTagDTO {
    code?: number;
    message?: string | undefined;
    data?: (TagDTO | undefined)[] | undefined;
}

export interface ResCodeOfListOfTagInfo {
    code?: number;
    message?: string | undefined;
    data?: (TagInfo | undefined)[] | undefined;
}

export interface ChangeUserInfoAble {
    nickName?: string;
    inyro?: string | undefined;
    userImg?: string;
    address?: string;
}

export interface ResCodeOfListOfDictionaryOfStringAndInteger {
    code?: number;
    message?: string | undefined;
    data?: ({ [key: string]: number; } | undefined)[] | undefined;
}

export interface PasswordGroup {
    oldPass?: string;
    newPass?: string;
}

export interface ResCodeOfListOfUserDTO {
    code?: number;
    message?: string | undefined;
    data?: (UserDTO | undefined)[] | undefined;
}

export interface ResCodeOfListOfUserGroupDTO {
    code?: number;
    message?: string | undefined;
    data?: (UserGroupDTO | undefined)[] | undefined;
}

export interface UserGroupDTO {
    groupId?: number;
    groupName?: string;
}

export interface FileResponse {
    data: Blob;
    status: number;
    fileName?: string;
    headers?: { [name: string]: any };
}

export class ApiException extends Error {
    override message: string;
    status: number;
    response: string;
    headers: { [key: string]: any; };
    result: any;

    constructor(message: string, status: number, response: string, headers: { [key: string]: any; }, result: any) {
        super();

        this.message = message;
        this.status = status;
        this.response = response;
        this.headers = headers;
        this.result = result;
    }

    protected isApiException = true;

    static isApiException(obj: any): obj is ApiException {
        return obj.isApiException === true;
    }
}

function throwException(message: string, status: number, response: string, headers: { [key: string]: any; }, result?: any): any {
    if (result !== null && result !== undefined) {
        ElMessage.error("网络错误")
        throw result;
    }
    else {
        ElMessage.error(message)
        if (status == 401) {
            ElMessage.error(result.message)
            const router = useRouter()
            router.replace('/')
        }
        throw new ApiException(message, status, response, headers, result);
    }
}