import { Injectable } from '@nestjs/common';
import { ApiResponse } from './shared/utils/api-response.interface';

@Injectable()
export class AppService {
  getApplicationInfo(): ApiResponse {
    return {
      code: 200,
      message: 'Eigen3Dev Technical Test',
    };
  }

  healthyCheck(): ApiResponse {
    return {
      code: 200,
      message: 'Application is up',
    };
  }
}
