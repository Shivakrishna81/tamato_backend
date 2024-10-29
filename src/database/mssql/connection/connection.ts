import { ConfigModule, ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";

export const DatabaseConnection = SequelizeModule.forRootAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    dialect: 'mssql',
    dialectModule: require('tedious'),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    database: configService.get<string>('DB_NAME'),
    dialectOptions: {
      options: {
        encrypt: true,
        trustServerCertificate: true, 
      },
      authentication: {
        type: 'ntlm',
        options: {
          domain: configService.get<string>('DB_DOMAIN'),
          userName: configService.get<string>('DB_USERNAME'),
          password: configService.get<string>('DB_PASSWORD'),
        },
      },
    },
    autoLoadModels: true,
    synchronize: true, 
  }),
});
