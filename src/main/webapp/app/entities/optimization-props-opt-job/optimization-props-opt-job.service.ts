import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { OptimizationPropsOptJob } from './optimization-props-opt-job.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<OptimizationPropsOptJob>;

@Injectable()
export class OptimizationPropsOptJobService {

    private resourceUrl =  SERVER_API_URL + 'api/optimization-props';

    constructor(private http: HttpClient) { }

    create(optimizationProps: OptimizationPropsOptJob): Observable<EntityResponseType> {
        const copy = this.convert(optimizationProps);
        return this.http.post<OptimizationPropsOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(optimizationProps: OptimizationPropsOptJob): Observable<EntityResponseType> {
        const copy = this.convert(optimizationProps);
        return this.http.put<OptimizationPropsOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<OptimizationPropsOptJob>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<OptimizationPropsOptJob[]>> {
        const options = createRequestOption(req);
        return this.http.get<OptimizationPropsOptJob[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<OptimizationPropsOptJob[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: OptimizationPropsOptJob = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<OptimizationPropsOptJob[]>): HttpResponse<OptimizationPropsOptJob[]> {
        const jsonResponse: OptimizationPropsOptJob[] = res.body;
        const body: OptimizationPropsOptJob[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to OptimizationPropsOptJob.
     */
    private convertItemFromServer(optimizationProps: OptimizationPropsOptJob): OptimizationPropsOptJob {
        const copy: OptimizationPropsOptJob = Object.assign({}, optimizationProps);
        return copy;
    }

    /**
     * Convert a OptimizationPropsOptJob to a JSON which can be sent to the server.
     */
    private convert(optimizationProps: OptimizationPropsOptJob): OptimizationPropsOptJob {
        const copy: OptimizationPropsOptJob = Object.assign({}, optimizationProps);
        return copy;
    }
}
