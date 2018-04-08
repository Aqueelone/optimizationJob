import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CampaignRecordOptJob } from './campaign-record-opt-job.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CampaignRecordOptJob>;

@Injectable()
export class CampaignRecordOptJobService {

    private resourceUrl =  SERVER_API_URL + 'api/campaign-records';

    constructor(private http: HttpClient) { }

    create(campaignRecord: CampaignRecordOptJob): Observable<EntityResponseType> {
        const copy = this.convert(campaignRecord);
        return this.http.post<CampaignRecordOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(campaignRecord: CampaignRecordOptJob): Observable<EntityResponseType> {
        const copy = this.convert(campaignRecord);
        return this.http.put<CampaignRecordOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CampaignRecordOptJob>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CampaignRecordOptJob[]>> {
        const options = createRequestOption(req);
        return this.http.get<CampaignRecordOptJob[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CampaignRecordOptJob[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CampaignRecordOptJob = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CampaignRecordOptJob[]>): HttpResponse<CampaignRecordOptJob[]> {
        const jsonResponse: CampaignRecordOptJob[] = res.body;
        const body: CampaignRecordOptJob[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CampaignRecordOptJob.
     */
    private convertItemFromServer(campaignRecord: CampaignRecordOptJob): CampaignRecordOptJob {
        const copy: CampaignRecordOptJob = Object.assign({}, campaignRecord);
        return copy;
    }

    /**
     * Convert a CampaignRecordOptJob to a JSON which can be sent to the server.
     */
    private convert(campaignRecord: CampaignRecordOptJob): CampaignRecordOptJob {
        const copy: CampaignRecordOptJob = Object.assign({}, campaignRecord);
        return copy;
    }
}
