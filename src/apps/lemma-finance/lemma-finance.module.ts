import { Register } from '~app-toolkit/decorators';
import { AbstractApp } from '~app/app.dynamic-module';

import { LemmaFinanceContractFactory } from './contracts';
import { LemmaFinanceAppDefinition, LEMMA_FINANCE_DEFINITION } from './lemma-finance.definition';
import { OptimismLemmaFinanceSynthTokenFetcher } from './optimism/lemma-finance.synth.token-fetcher';
import { OptimismLemmaFinanceUsdlTokenFetcher } from './optimism/lemma-finance.usdl.token-fetcher';
import { OptimismLemmaFinanceXSynthTokenFetcher } from './optimism/lemma-finance.x-synth.token-fetcher';
import { OptimismLemmaFinanceXUsdlTokenFetcher } from './optimism/lemma-finance.x-usdl.token-fetcher';

@Register.AppModule({
  appId: LEMMA_FINANCE_DEFINITION.id,
  providers: [
    LemmaFinanceAppDefinition,
    LemmaFinanceContractFactory,
    // Optimism
    OptimismLemmaFinanceSynthTokenFetcher,
    OptimismLemmaFinanceUsdlTokenFetcher,
    OptimismLemmaFinanceXSynthTokenFetcher,
    OptimismLemmaFinanceXUsdlTokenFetcher,
  ],
})
export class LemmaFinanceAppModule extends AbstractApp() {}
