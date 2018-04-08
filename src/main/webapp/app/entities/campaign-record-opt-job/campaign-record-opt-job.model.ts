import { BaseEntity } from './../../shared';

export class CampaignRecordOptJob implements BaseEntity {
    constructor(
        public id?: number,
        public publisherId?: number,
        public campaignId?: number,
    ) {
    }
}
