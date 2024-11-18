import { Global, Module } from "@nestjs/common";
import { exportProviders, getProviders, importProviders } from "./providers";

@Global()
@Module({
    providers:[...getProviders()],
    exports:[...exportProviders()],
    imports:[...importProviders()]
})

export class CoreModule{}