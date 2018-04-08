import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { BlackListRecordOptJob } from './black-list-record-opt-job.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<BlackListRecordOptJob>;

@Injectable()
export class BlackListRecordOptJobService {

    private resourceUrl =  SERVER_API_URL + 'api/black-list-records';

    constructor(private http: HttpClient) { }

    create(blackListRecord: BlackListRecordOptJob): Observable<EntityResponseType> {
        const copy = this.convert(blackListRecord);
        return this.http.post<BlackListRecordOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(blackListRecord: BlackListRecordOptJob): Observable<EntityResponseType> {
        const copy = this.convert(blackListRecord);
        return this.http.put<BlackListRecordOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<BlackListRecordOptJob>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<BlackListRecordOptJob[]>> {
        const options = createRequestOption(req);
        return this.http.get<BlackListRecordOptJob[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<BlackListRecordOptJob[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: BlackListRecordOptJob = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<BlackListRecordOptJob[]>): HttpResponse<BlackListRecordOptJob[]> {
        const jsonResponse: BlackListRecordOptJob[] = res.body;
        const body: BlackListRecordOptJob[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to BlackListRecordOptJob.
     */
    private convertItemFromServer(blackListRecord: BlackListRecordOptJob): BlackListRecordOptJob {
        const copy: BlackListRecordOptJob = Object.assign({}, blackListRecord);
        return copy;
    }

    /**
     * Convert a BlackListRecordOptJob to a JSON which can be sent to the server.
     */
    private convert(blackListRecord: BlackListRecordOptJob): BlackListRecordOptJob {
        const copy: BlackListRecordOptJob = Object.assign({}, blackListRecord);
        return copy;
    }
}
