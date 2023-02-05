import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

import { Request } from 'express';

import axios from 'axios';

@Controller('teste')
export class TesteController {
  constructor(private readonly appService: AppService) {}

  @Get()
  test(): any {
    return 'ok';
  }
  @Post()
  test_post(): any {
    return 'ok';
  }
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async get(@Req() request: Request): Promise<any> {
    const params = request.query;
    try {
      const url = process.env.PROXY_URL;
      await axios.get(url, {
        headers: request.headers,
        params: request.query,
      });
    } catch {}
    try {
      return params['hub.challenge'];
    } catch {
      return 'ok';
    }
  }

  @Post()
  async post(@Req() request: Request): Promise<any> {
    try {
      const url = process.env.PROXY_URL;
      await axios.post(url, request.body, {
        headers: request.headers,
        params: request.query,
      });
    } catch {}
    return 'ok';
  }
}
