import { Injectable, Inject } from '@angular/core';
import { Headers, Http, Request, Response, RequestOptions, RequestMethod } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';
//import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Router } from '@angular/router';

import { APP_CONFIG, AppConfig } from '../config/app-config.module';

@Injectable()
export class ApiService {
    constructor(
        private http: Http,
        private requestoptions: RequestOptions,
        @Inject(APP_CONFIG) private appConfig: AppConfig,
        private router: Router
    ) { }

    /*
     * Method makeReq
     * @paran urlKey: string
     * @param (optional)options: any
     * @return observable
     * @author DZONE
     */
    makeReq(urlKey: string, options?: any) {
        options = (options) ? options : {};
        console.log('=======================');
        console.log(options.body);
        console.log('=======================');
        console.log(options);
        /*
        var formData = new FormData();
        let file = $event.target.files[0]; // <--- File Object for future use. file ? file : ''
        console.log(file);
        formData.append('file',file);
        */

        const requestOptions = new RequestOptions({
            // RequestMethod: [Get, Post, Put, Delete, Options, Head, Patch]
            method: (options.method) ? RequestMethod[options.method] : RequestMethod.Get,
            url: this.getUrl(urlKey, options),
            headers: this.makeHeader((options.headers) ? options.headers : {}),
            //body: { 'id': 11, 'currentPage': 12 },
            body: JSON.stringify((options.body) ? options.body : {}),
            params: (options.params) ? options.params : {}
        });
        return this.http.request(new Request(requestOptions))
            .timeout(this.appConfig.HTTP_REQUEST_TIMEOUT)
            .map((res: Response) => {
                let resData = res.json();
                return resData;
            }).catch((error: any) => {
                return this.handleError(error);
            });
    }

    /*---------------- private helper methods---------------------------*/
    /*
     * Method handleError
     * @paran error: any
     * @return any
     * @author DZONE
     */
    private handleError(error: any) {
        error.body = error.hasOwnProperty('_body') ? ((typeof error._body === 'object') ? error._body : JSON.parse(error._body)) : false;
        error.msg = this.appConfig.HTTP_STATUS_MSGS[this.appConfig.HTTP_STATUS_MSGS.hasOwnProperty(error.status)
            ? error.status : 'default'];
        if (error.hasOwnProperty('name') && error.name == 'TimeoutError') {
            return Observable.throw({ status: 408, msg: 'Request timeout has occurred!' });
        } else if (error.hasOwnProperty('status') && error.status == 401) {
            if (error.body && error.body.hasOwnProperty('action') && error.body.action == 'logout') {
                error.msg = 'Session expired';
                // remove user from local storage to log user out
                this.router.navigate(['/login']);
            }
        }
        return Observable.throw({
            status: error.status,
            msg: error.msg,
            body: error.body
        });
    }
    /*
     * Method makeHeader: To make API request header
     * @options : Object
     * @return Object
     * @author DZONE
     */
    makeHeader(options: Object) {
        const headers = new Headers();
        // Accept
        if (options['Accept']) {
            headers.append('Accept', options['Accept']); // Desired Accept
        } else {
            headers.append('Accept', 'application/json'); // Default Accept
        }
        // Accept-Language
        if (options['Accept-Language']) {
            headers.append('Accept-Language', options['Accept-Language']); // Desired Accept-Language
        }
        // Content-Language
        if (options['Content-Language']) {
            headers.append('Content-Language', options['Content-Language']); // Desired Content-Language
        }
        // Content-Type
        if (options['Content-Type']) {
            headers.append('Content-Type', options['Content-Type']); // Desired Content-Type
        } else {
            headers.append('Content-Type', 'application/json'); // Default
        }
        // DPR
        if (options['DPR']) {
            headers.append('DPR', options['DPR']); // Desired DPR
        }
        // Downlink
        if (options['Downlink']) {
            headers.append('Downlink', options['Downlink']); // Desired Downlink
        }
        // Save-Data
        if (options['Save-Data']) {
            headers.append('Save-Data', options['Save-Data']); // Desired Content-Language
        }
        // Viewport-Width
        if (options['Viewport-Width']) {
            headers.append('Viewport-Width', options['Viewport-Width']); // Desired Viewport-Width
        }
        // Width
        if (options['Width']) {
            headers.append('Width', options['Width']); // Desired Viewport-Width
        }
        // add authentication token
        var currentUser = localStorage.getItem('currentUser');
        var obj = JSON.parse(currentUser);
        //headers.append('Authorization', 'Bearer ' + this.localStorageService.getUserData('authToken'));
       
        headers.append('Authorization', 'Bearer ' + obj.data.token);
        return headers;
    }
    /*
     * Method getUrl
     * @paran urlKey: string
     * @param (optional)options: any
     * @return string
     * @author DZONE
     */
    private getUrl(urlKey: string, options?: any) {
        if (options.completeUrl) {
            return urlKey;
        }
        return (this.appConfig.API_END_POINT + this.appConfig.API_URLS[urlKey] + ((options.urlData) ? '/' + options.urlData : ''));
    }
   
}
