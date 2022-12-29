import type { PlaywrightTestConfig } from '@playwright/test';

import { baseConfig } from '../../playwright.config.base';

// Base url is exported to be used in checklyHQ
export const BASE_URL = process.env.E2E_BASE_URL || process.env.ENVIRONMENT_URL || 'http://localhost:4200/';

const config: PlaywrightTestConfig = {
  ...baseConfig,
};

export default config;
