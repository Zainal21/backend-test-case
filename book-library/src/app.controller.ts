import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiResponse } from './shared/utils/api-response.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): ApiResponse {
    return this.appService.getApplicationInfo();
  }

  @Get('up')
  getHealthy(): ApiResponse {
    return this.appService.healthyCheck();
  }
}
