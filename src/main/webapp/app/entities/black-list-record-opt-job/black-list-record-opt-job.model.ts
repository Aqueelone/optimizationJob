import { BaseEntity } from './../../shared';

export class BlackListRecordOptJob implements BaseEntity {
    constructor(
        public id?: number,
        public publisherId?: number,
        public blackListId?: number,
    ) {
    }
}
