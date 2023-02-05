"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = exports.TesteController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const axios_1 = require("axios");
let TesteController = class TesteController {
    constructor(appService) {
        this.appService = appService;
    }
    test() {
        return 'ok';
    }
    test_post() {
        return 'ok';
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], TesteController.prototype, "test", null);
__decorate([
    (0, common_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], TesteController.prototype, "test_post", null);
TesteController = __decorate([
    (0, common_1.Controller)('teste'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], TesteController);
exports.TesteController = TesteController;
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async get(request) {
        const params = request.query;
        try {
            const url = process.env.PROXY_URL;
            await axios_1.default.get(url, {
                headers: request.headers,
                params: request.query,
            });
        }
        catch (_a) { }
        try {
            return params['hub.challenge'];
        }
        catch (_b) {
            return 'ok';
        }
    }
    async post(request) {
        try {
            const url = process.env.PROXY_URL;
            await axios_1.default.post(url, request.body, {
                headers: request.headers,
                params: request.query,
            });
        }
        catch (_a) { }
        return 'ok';
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "get", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "post", null);
AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map