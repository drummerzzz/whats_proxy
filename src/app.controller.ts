import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

import { Request } from 'express';

import axios from 'axios';

@Controller('teste')
export class TesteController {
  constructor(private readonly appService: AppService) {}

  @Get('/url')
  async url(): Promise<any> {
    const url = process.env.PROXY_URL;
    return url;
  }

  @Get()
  async test(@Req() request: Request): Promise<any> {
    const url = process.env.PROXY_URL;
    try {
      const response = await axios.get(url, {
        headers: request.headers,
        params: request.query,
      });
      return response.status;
    } catch (error) {
      return error;
    }
  }

  @Post()
  async test_post(@Req() request: Request): Promise<any> {
    const url = process.env.PROXY_URL;
    try {
      const response = await axios.post(url, {
        headers: request.headers,
        params: request.query,
      });
      return response.status;
    } catch (error) {
      return error;
    }
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
