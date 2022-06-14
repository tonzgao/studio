import Axios from 'axios';
import _ from 'lodash';

import { Network } from '~types';

const datasourceUrl =
  'https://raw.githubusercontent.com/tempus-finance/tempus-app/release-3.0/packages/tempus-client_v3/src/config/config.ts';
const start = 'Config =';

export type TempusPool = {
  address: string;
  ammAddress: string;
  yieldsAddress: string;
  principalsAddress: string;
  // Should probably use yieldBearingTokenAddress instead, but that may have dependency issues in the future
  backingTokenAddress: string;
};
type TempusData = {
  tempusPools: TempusPool[];
};
type TempusDataResponse = Record<Network, TempusData>;

// TODO: find JSON to load instead
const parseConfig = (config: string) => {
  config = config.slice(config.search(start) + start.length);
  const result = {};
  let current = {};
  let level = 0;
  let network = '';

  for (const line of config.split('\n')) {
    if (line.includes('}') && !line.includes('{')) {
      level--;
    } else if (level === 3) {
      const [key, value] = line.trim().split(': ');
      current[key] = value.replaceAll("'", '').replace(',', '');
    }
    if (line.includes('{') && !line.includes('}')) {
      if (level === 1 || level === 2) {
        if (_.keys(current).length) result[network].tempusPools.push(current);
        current = {};
      }
      if (level === 1) {
        network = line.trim().split(': ')[0];
        result[network] = { tempusPools: [] };
      }
      level++;
    }
  }
  return result;
};

export const getTempusData = async (network: string) => {
  const data = (await Axios.get<string>(datasourceUrl)).data;
  const json = parseConfig(data) as TempusDataResponse;
  const pools = json[network];
  return pools as TempusData;
};
