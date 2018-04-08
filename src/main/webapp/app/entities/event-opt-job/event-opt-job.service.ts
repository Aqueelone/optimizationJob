import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { EventOptJob } from './event-opt-job.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<EventOptJob>;

@Injectable()
export class EventOptJobService {

    private resourceUrl =  SERVER_API_URL + 'api/events';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(event: EventOptJob): Observable<EntityResponseType> {
        const copy = this.convert(event);
        return this.http.post<EventOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(event: EventOptJob): Observable<EntityResponseType> {
        const copy = this.convert(event);
        return this.http.put<EventOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<EventOptJob>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<EventOptJob[]>> {
        const options = createRequestOption(req);
        return this.http.get<EventOptJob[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<EventOptJob[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: EventOptJob = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<EventOptJob[]>): HttpResponse<EventOptJob[]> {
        const jsonResponse: EventOptJob[] = res.body;
        const body: EventOptJob[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to EventOptJob.
     */
    private convertItemFromServer(event: EventOptJob): EventOptJob {
        const copy: EventOptJob = Object.assign({}, event);
        copy.created = this.dateUtils
            .convertDateTimeFromServer(event.created);
        return copy;
    }

    /**
     * Convert a EventOptJob to a JSON which can be sent to the server.
     */
    private convert(event: EventOptJob): EventOptJob {
        const copy: EventOptJob = Object.assign({}, event);

        copy.created = this.dateUtils.toDate(event.created);
        return copy;
    }
}
