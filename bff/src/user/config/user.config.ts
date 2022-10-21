import { registerAs } from '@nestjs/config';

export default registerAs('user', () => ({
  avatarUrl:
    'https://fe-pet-projects.youtrack.cloud/hub/api/rest/avatar/default',
}));
