import { Environment, sharedEnvironment } from './shared-environment';

export const environment: Environment = {
  production: true,
  ...sharedEnvironment
};
