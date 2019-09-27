import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(private _injector: Injector) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const _authService = this._injector.get(AuthService);
    const tokenizedReq = req.clone({
      setHeaders: {
        "Content-Type": "application/json; charset=utcf-8",
        Accept: "application/json",
        Authorization: ` ${_authService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
