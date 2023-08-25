import { plainToClass } from 'class-transformer';

import { Config, ConfigDto } from './dtos/config.dto';

export class ConfigService {
  private readonly config: ConfigDto;

  constructor(config: Config) {
    this.config = plainToClass(ConfigDto, config, {
      excludeExtraneousValues: true,
    });
  }

  public async setup() {
    console.debug('Setting up...', this.config);
    await this.config.validate();
  }

  get(): Config;
  get<K extends keyof Config>(property: K): Config[K];
  get<K extends keyof Config>(property?: K): Config | Config[K] {
    const config = this.config.toPlainObject<Config>();

    if (property === undefined) {
      return config;
    }

    return config[property];
  }
}
