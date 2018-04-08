import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BlackListOptJob } from './black-list-opt-job.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BlackListOptJob>;

@Injectable()
export class BlackListOptJobService {

    private resourceUrl =  SERVER_API_URL + 'api/black-lists';

    constructor(private http: HttpClient) { }

    create(blackList: BlackListOptJob): Observable<EntityResponseType> {
        const copy = this.convert(blackList);
        return this.http.post<BlackListOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(blackList: BlackListOptJob): Observable<EntityResponseType> {
        const copy = this.convert(blackList);
        return this.http.put<BlackListOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BlackListOptJob>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BlackListOptJob[]>> {
        const options = createRequestOption(req);
        return this.http.get<BlackListOptJob[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BlackListOptJob[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BlackListOptJob = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BlackListOptJob[]>): HttpResponse<BlackListOptJob[]> {
        const jsonResponse: BlackListOptJob[] = res.body;
        const body: BlackListOptJob[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BlackListOptJob.
     */
    private convertItemFromServer(blackList: BlackListOptJob): BlackListOptJob {
        const copy: BlackListOptJob = Object.assign({}, blackList);
        return copy;
    }

    /**
     * Convert a BlackListOptJob to a JSON which can be sent to the server.
     */
    private convert(blackList: BlackListOptJob): BlackListOptJob {
        const copy: BlackListOptJob = Object.assign({}, blackList);
        return copy;
    }
}
