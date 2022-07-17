import { Register } from '~app-toolkit/decorators';
import { AbstractApp } from '~app/app.dynamic-module';

import { AvalancheSteakHutBalanceFetcher } from './avalanche/steak-hut.balance-fetcher';
import { AvalancheSteakHutPoolContractPositionFetcher } from './avalanche/steak-hut.pool.contract-position-fetcher';
import { AvalancheSteakHutVotedEscrowContractPositionFetcher } from './avalanche/steak-hut.ve.contract-position-fetcher';
import { AvalancheSteakHutStakingContractPositionFetcher } from './avalanche/steak-hut.staking.contract-position-fetcher';
import { SteakHutContractFactory } from './contracts';
import { SteakHutAppDefinition, STEAK_HUT_DEFINITION } from './steak-hut.definition';

@Register.AppModule({
  appId: STEAK_HUT_DEFINITION.id,
  providers: [
    AvalancheSteakHutBalanceFetcher,
    AvalancheSteakHutPoolContractPositionFetcher,
    AvalancheSteakHutStakingContractPositionFetcher,
    AvalancheSteakHutVotedEscrowContractPositionFetcher,
    SteakHutAppDefinition,
    SteakHutContractFactory,
  ],
})
export class SteakHutAppModule extends AbstractApp() { }
