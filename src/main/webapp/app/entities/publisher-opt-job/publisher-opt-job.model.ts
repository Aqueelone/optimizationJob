import { BaseEntity } from './../../shared';

export class PublisherOptJob implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public events?: BaseEntity[],
        public campaignRecords?: BaseEntity[],
        public blacklistRecords?: BaseEntity[],
    ) {
    }
}
