import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
} from '@nestjs/terminus';

@Controller({
  path: '/health',
  version: VERSION_NEUTRAL,
})
export class HealthController {
  constructor(
    private _health: HealthCheckService,
    private _memory: MemoryHealthIndicator,
  ) {}

  @Get('/')
  @HealthCheck()
  check() {
    return this._health.check([
      async () => this._memory.checkHeap('memory_heap', 200 * 1024 * 1024),
      async () => this._memory.checkRSS('memory_rss', 3000 * 1024 * 1024),
    ]);
  }
}
