import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20251122_011447 from './20251122_011447';
import * as migration_20251122_011448 from './20251122_011448';
import * as migration_20260123_074756 from './20260123_074756';
import * as migration_20260420_163105 from './20260420_163105';
import * as migration_20260420_163215 from './20260420_163215';
import * as migration_20260420_180750 from './20260420_180750';
import * as migration_20261110_093430_payload_3_93 from './20261110_093430_payload_3_93';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20251122_011447.up,
    down: migration_20251122_011447.down,
    name: '20251122_011447',
  },
  {
    up: migration_20251122_011448.up,
    down: migration_20251122_011448.down,
    name: '20251122_011448',
  },
  {
    up: migration_20260123_074756.up,
    down: migration_20260123_074756.down,
    name: '20260123_074756',
  },
  {
    up: migration_20260420_163105.up,
    down: migration_20260420_163105.down,
    name: '20260420_163105',
  },
  {
    up: migration_20260420_163215.up,
    down: migration_20260420_163215.down,
    name: '20260420_163215',
  },
  {
    up: migration_20260420_180750.up,
    down: migration_20260420_180750.down,
    name: '20260420_180750',
  },
  {
    up: migration_20261110_093430_payload_3_93.up,
    down: migration_20261110_093430_payload_3_93.down,
    name: '20261110_093430_payload_3_93',
  },
];
