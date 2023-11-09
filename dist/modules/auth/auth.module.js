"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const companies_1 = require("../companies");
const controllers_1 = require("./controllers");
const auth_guard_1 = require("./guards/auth.guard");
const services_1 = require("./services");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            companies_1.CompaniesModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    global: true,
                    secret: configService.get('JWT_SECRET'),
                    signOptions: {
                        allowInvalidAsymmetricKeyTypes: true,
                        expiresIn: configService.get('JWT_EXPIRES'),
                    },
                }),
                inject: [config_1.ConfigService],
            }),
        ],
        controllers: [controllers_1.AuthController],
        providers: [
            services_1.AuthService,
            {
                provide: core_1.APP_GUARD,
                useClass: auth_guard_1.AuthGuard,
            },
        ],
        exports: [jwt_1.JwtModule],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map