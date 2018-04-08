import { BaseEntity } from './../../shared';

export class BlackListOptJob implements BaseEntity {
    constructor(
        public id?: number,
        public blacklistRecords?: BaseEntity[],
    ) {
    }
}
