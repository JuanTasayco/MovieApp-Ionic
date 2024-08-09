import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ApiKeyInterceptor implements HttpInterceptor {
    private apiKey = environment.apiKey;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const cloneReq = req.clone({
            setParams: {
                api_key: this.apiKey
            }
        })

        return next.handle(cloneReq);
    }
}
