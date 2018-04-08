import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { CampaignOptJob } from './campaign-opt-job.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<CampaignOptJob>;

@Injectable()
export class CampaignOptJobService {

    private resourceUrl =  SERVER_API_URL + 'api/campaigns';

    constructor(private http: HttpClient) { }

    create(campaign: CampaignOptJob): Observable<EntityResponseType> {
        const copy = this.convert(campaign);
        return this.http.post<CampaignOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(campaign: CampaignOptJob): Observable<EntityResponseType> {
        const copy = this.convert(campaign);
        return this.http.put<CampaignOptJob>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<CampaignOptJob>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<CampaignOptJob[]>> {
        const options = createRequestOption(req);
        return this.http.get<CampaignOptJob[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<CampaignOptJob[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: CampaignOptJob = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<CampaignOptJob[]>): HttpResponse<CampaignOptJob[]> {
        const jsonResponse: CampaignOptJob[] = res.body;
        const body: CampaignOptJob[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to CampaignOptJob.
     */
    private convertItemFromServer(campaign: CampaignOptJob): CampaignOptJob {
        const copy: CampaignOptJob = Object.assign({}, campaign);
        return copy;
    }

    /**
     * Convert a CampaignOptJob to a JSON which can be sent to the server.
     */
    private convert(campaign: CampaignOptJob): CampaignOptJob {
        const copy: CampaignOptJob = Object.assign({}, campaign);
        return copy;
    }
}
