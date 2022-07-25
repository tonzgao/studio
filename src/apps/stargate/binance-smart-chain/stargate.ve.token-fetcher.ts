import { Inject } from '@nestjs/common';

import { IAppToolkit, APP_TOOLKIT } from '~app-toolkit/app-toolkit.interface';
import { Register } from '~app-toolkit/decorators';
import { PositionFetcher } from '~position/position-fetcher.interface';
import { AppTokenPosition } from '~position/position.interface';
import { Network } from '~types/network.interface';

import { StargateContractFactory, StargateVe } from '../contracts';
import { STARGATE_DEFINITION } from '../stargate.definition';

const appId = STARGATE_DEFINITION.id;
const groupId = STARGATE_DEFINITION.groups.ve.id;
const network = Network.BINANCE_SMART_CHAIN_MAINNET;

const address = '0xd4888870c8686c748232719051b677791dbda26d'.toLowerCase();

@Register.TokenPositionFetcher({ appId, groupId, network })
export class BinanceSmartChainStargateVeTokenFetcher implements PositionFetcher<AppTokenPosition> {
  constructor(
    @Inject(APP_TOOLKIT) private readonly appToolkit: IAppToolkit,
    @Inject(StargateContractFactory) private readonly contractFactory: StargateContractFactory,
  ) {}

  async getPositions() {
    return await this.appToolkit.helpers.vaultTokenHelper.getTokens<StargateVe>({
      appId,
      groupId,
      network,
      resolveVaultAddresses: () => [address],
      resolveContract: ({ address, network }) => this.contractFactory.stargateVe({ address, network }),
      resolveUnderlyingTokenAddress: ({ multicall, contract }) => multicall.wrap(contract).token(),
      resolveReserve: ({ multicall, contract }) => multicall.wrap(contract).totalSupply().then(Number),
      resolvePricePerShare: ({ underlyingToken }) => underlyingToken.price,
    });
  }
}
