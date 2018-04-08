import { BaseEntity } from './../../shared';

export class EventOptJob implements BaseEntity {
    constructor(
        public id?: number,
        public type?: string,
        public created?: any,
        public publisherId?: number,
        public campaignId?: number,
    ) {
    }
}
