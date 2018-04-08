import { BaseEntity } from './../../shared';

export class OptimizationPropsOptJob implements BaseEntity {
    constructor(
        public id?: number,
        public threshold?: number,
        public sourceEvent?: string,
        public ratioThreshold?: number,
        public measuredEvent?: string,
    ) {
    }
}
