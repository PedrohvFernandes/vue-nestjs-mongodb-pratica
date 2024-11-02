import { NestInterceptor, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
export interface Response<T> {
    data: T;
}
export declare class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(_: any, next: CallHandler): Observable<Response<T>>;
}
