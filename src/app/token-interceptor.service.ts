import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private _injector: Injector, private _router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const _authService = this._injector.get(AuthService);
    if (req.headers.get("noauth")) {
      return next.handle(req.clone());
    } else {
      const tokenizedReq = req.clone({
        headers: req.headers.set(
          "Authorization",
          `Bearer ${_authService.getToken()}`
        )
      });
      return next.handle(tokenizedReq);
      // const tokenizedReq = req.clone({
      //   setHeaders: {
      //     "Content-Type": "application/json; charset=utcf-8",
      //     Accept: "application/json",
      //     Authorization: ` ${_authService.getToken()}`
      //   }
      // });
      // return next.handle(tokenizedReq);
    }
  }
}
