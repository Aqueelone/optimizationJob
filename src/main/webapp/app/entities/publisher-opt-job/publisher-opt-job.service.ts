import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { PublisherOptJob } from './publisher-opt-job.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PublisherOptJob>;

@Injectable()
export class PublisherOptJobService {

    private resourceUrl =  SERVER_API_URL + 'api/publishers';

    constructor(private http: HttpClient) { }

    create(publisher: PublisherOptJob): Observable<EntityResponseType> {
        const copy = this.convert(publisher);
        return this.http.post<PublisherOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(publisher: PublisherOptJob): Observable<EntityResponseType> {
        const copy = this.convert(publisher);
        return this.http.put<PublisherOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PublisherOptJob>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PublisherOptJob[]>> {
        const options = createRequestOption(req);
        return this.http.get<PublisherOptJob[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PublisherOptJob[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PublisherOptJob = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PublisherOptJob[]>): HttpResponse<PublisherOptJob[]> {
        const jsonResponse: PublisherOptJob[] = res.body;
        const body: PublisherOptJob[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PublisherOptJob.
     */
    private convertItemFromServer(publisher: PublisherOptJob): PublisherOptJob {
        const copy: PublisherOptJob = Object.assign({}, publisher);
        return copy;
    }

    /**
     * Convert a PublisherOptJob to a JSON which can be sent to the server.
     */
    private convert(publisher: PublisherOptJob): PublisherOptJob {
        const copy: PublisherOptJob = Object.assign({}, publisher);
        return copy;
    }
}
