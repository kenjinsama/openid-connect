import { plainToClass } from 'class-transformer';

import { Config, ConfigDto } from './dtos/config.dto';

export class ConfigService {
  private readonly config: ConfigDto;

  constructor(config: Config) {
    this.config = plainToClass(ConfigDto, config);
  }

  public async setup() {
    console.debug('Setting up...', this.config);
    await this.config.validate();
  }

  get(): Config;
  get<K extends keyof Config>(property: K): Config[K];
  get<K extends keyof Config>(property?: K): Config | Config[K] {
    if (property === undefined) {
      return this.config.toPlainObject();
    }

    return this.config[property];
  }
}
