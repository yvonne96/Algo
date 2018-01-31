import { OpaqueToken } from '@angular/core';

export interface AppConfig {
  baseServiceUrl: string;
}

export const ALGO_CONFIG: AppConfig = {
  baseServiceUrl: 'http://localhost:8080',
};

export let APP_CONFIG = new OpaqueToken('app-config');
