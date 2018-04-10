import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthTokenService } from './services/authToken/index';
import { RESTConnectorService } from './services/RestService/index';
import { UserService } from './services/userService/index';
import { TattoService } from './services/tattoService/index';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: []
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [
                AuthTokenService,
                RESTConnectorService,
                UserService,
                TattoService,

            ]
        };
    }
}
