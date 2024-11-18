import { AppConfigService } from "src/config/appconfig.service"
import { DatabaseModule } from "src/database/database.module"

const getProviders=():any[]=>{
    return [
        AppConfigService
    ]
},
importProviders=():any[]=>{
    return [DatabaseModule]
},
exportProviders=():any[]=>{
    return [AppConfigService,DatabaseModule]
};


export {exportProviders,getProviders,importProviders};