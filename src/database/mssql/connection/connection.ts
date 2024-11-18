import { SequelizeModule } from '@nestjs/sequelize';
import { AppConfigService } from 'src/config/appconfig.service';  // Import AppConfigService

export const DatabaseConnection = SequelizeModule.forRootAsync({
  imports: [],
  inject: [AppConfigService], 
  useFactory: (appConfigService: AppConfigService) => ({
    dialect: 'mssql',
    dialectModule: require('tedious'),
    host: appConfigService.envConfig.db.host,   
    port: appConfigService.envConfig.db.port,   
    username: appConfigService.envConfig.db.username,  
    password: appConfigService.envConfig.db.password,  
    database: appConfigService.envConfig.db.database,  
     trustServerCertificate: true, 
    // dialectOptions: {
    //   options: {
    //     encrypt: true,
    //     trustServerCertificate: true, 
    //   },
    //   authentication: {
    //     type: 'ntlm',
    //     options: {
    //       domain: appConfigService.envConfig.db.domain,  
    //       userName: appConfigService.envConfig.db.username,  
    //       password: appConfigService.envConfig.db.password, 
    //     },
    //   },
    // },
    autoLoadModels: true,
    synchronize: true,
  }),
});
