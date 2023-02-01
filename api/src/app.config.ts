import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';

const HEARTHSTONE_CONFIG = './config/hearthstone.config.yaml';

export const hearthstoneConfig = () => {
  return yaml.load(readFileSync(HEARTHSTONE_CONFIG, 'utf8')) as Record<
    string,
    any
  >;
};

export const authConfig = () => {};

export const appConfig = () => {};
