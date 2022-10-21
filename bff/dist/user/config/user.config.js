"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
exports.default = (0, config_1.registerAs)('user', () => ({
    avatarUrl: 'https://fe-pet-projects.youtrack.cloud/hub/api/rest/avatar/default',
}));
//# sourceMappingURL=user.config.js.map