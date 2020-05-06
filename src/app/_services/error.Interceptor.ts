import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: import ('@angular/common/http').HttpRequest<any>,
    next: import ('@angular/common/http').HttpHandler
  ): import ('rxjs').Observable<import ('@angular/common/http').HttpEvent<any>> {
    return next.handle(req).pipe(
        catchError(errorRes => {
            if (errorRes.status === 401) {
                return throwError(errorRes.statusText);
            }
            if (errorRes instanceof HttpErrorResponse) {       // 500 type errors
                console.log('500 type error' + JSON.stringify(errorRes));
                const applicationError = errorRes.headers.get('Application-Error');
                if (applicationError) {
                    return throwError(applicationError);
                }
                const serverError = errorRes.error;
                let modalStateError = '';
                // && serverError.errors === 'Object'
                if (serverError.errors) {
                    for (const key in serverError.errors) {
                        if (serverError.errors[key]) {
                            modalStateError += serverError.errors[key] + '\n';
                        }
                    }
                }
                return throwError(modalStateError || serverError || 'Server Error');
            }

        } )
    );
  }
}

export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true
};
