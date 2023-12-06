import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
// import { HttpModule } from '@nestjs/axios';

import { HealthController } from '@/modules/health/health.controller';

@Module({
  imports: [TerminusModule],
  controllers: [HealthController],
  providers: [],
})
export class HealthModule {}
