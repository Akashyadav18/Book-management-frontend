import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class TenantInterceptor implements HttpInterceptor {

  private readonly validTenants = ['delhi', 'mumbai', 'bangalore', 'pune'];

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // const url = location.pathname;
    // const city = url.split('/')[1];
    // if (city) {
    //   req = req.clone({
    //     setHeaders: {
    //       'X-TENANTID': city
    //     }
    //   });
    // }

    const url = location.pathname;
    const segments = url.split('/').filter(s => s);
    const city = segments[0];
    console.log("url :",city);
    
    if (city && this.validTenants.includes(city)) {
      req = req.clone({
        setHeaders: {
          'X-TENANTID': city
        }
      });
      console.log('X-TENANTID:', city);
    } else {
      console.log('X-TENANTID: (public schema)');
    }

    return next.handle(req);
  }
}


