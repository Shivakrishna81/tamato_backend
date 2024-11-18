import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
	public readonly envConfig: { [key: string]:any } = {};

	constructor() {

		this.envConfig.app = {
			port: parseInt(process.env.PORT, 10) || 3000,
		};


		this.envConfig.db = {
			host: process.env.DB_HOST || 'localhost',
			port: Number(process.env.DB_PORT) || 1433,
			username: process.env.DB_USERNAME || 'default_user',
			password: process.env.DB_PASSWORD || 'default_password',
			database: process.env.DB_NAME || 'default_database',
			domain: process.env.DB_DOMAIN || 'localhost',
		};

		this.envConfig.jwt = {
			secret: process.env.JWT_SECRET || 'default_jwt_secret',
		};
	}
}

