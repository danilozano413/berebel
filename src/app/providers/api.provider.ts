import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable()
export class ApiProvider
{
    private url: string = null;


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
        return this.http.get(this.url + '/' + endpoint, options);
    }

    post(endpoint: string, body?: any, options?: any)
    {
        return this.http.post(this.url + '/' + endpoint, body, options);
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
            path = this.url + '/' + endpoint
        }
        return this.http.post(path, p.toString(), options);
    }

    put(endpoint: string, body: any, options?: any)
    {
        return this.http.put(this.url + '/' + endpoint, body, options);
    }

    delete(endpoint: string, options?: any)
    {
        return this.http.delete(this.url + '/' + endpoint, options);
    }

    patch(endpoint: string, body: any, options?: any, url = this.url)
    {
        return this.http.put(url + '/' + endpoint, body, options);
    }

    public getUrl()
    {
        return this.url;
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
        return this.getUrl() + '/' + url + (opt === null ? '' : opt)
    }

}
