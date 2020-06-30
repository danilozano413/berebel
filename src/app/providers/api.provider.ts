import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiProvider
{

    constructor(
        public http: HttpClient,
    )
    {

    }

    get(endpoint: string, params?: any, options: any = {})
    {

        if (!options)
        {
            options = {};
        }
        if (params)
        {
            options.params = params;
        }
        return this.http.get(endpoint, options);
    }

    post(endpoint: string, body?: any, options?: any)
    {
        return this.http.post(endpoint, body, options);
    }

    form(endpoint: string, params: any, options: any = {}, fullPath: boolean = false)
    {
        options.headers = new HttpHeaders().set("Content-Type", 'application/x-www-form-urlencoded');
        let p = new URLSearchParams();

        for (let k in params)
        {
            p.set(k, params[k]);
        }
        let path: string = endpoint;
        if (!fullPath)
        {
            path = endpoint
        }
        return this.http.post(path, p.toString(), options);
    }

    put(endpoint: string, body: any, options?: any)
    {
        return this.http.put(endpoint, body, options);
    }

    delete(endpoint: string, options?: any)
    {
        return this.http.delete(endpoint, options);
    }

    patch(endpoint: string, body: any, options?: any, url: string = null)
    {
        return this.http.put(url + '/' + endpoint, body, options);
    }


    public getEndpoint(url: string, params: string[] = null)
    {
        let opt = null;
        if (params)
        {
            opt = '?';
            for (let key in params)
            {
                opt += key + "=" + params[key] + "&";
            }
        }
        return url + (opt === null ? '' : opt)
    }

}
