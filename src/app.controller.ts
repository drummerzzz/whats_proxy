import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

import { Request } from 'express';

import axios from 'axios';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async get(@Req() request: Request): Promise<any> {
    const params = request.query;
    const url = process.env.PROXY_URL;
    console.log(url);
    await axios.get(url, {
      headers: request.headers,
      params: request.query,
    });
    return params['hub.challenge'];
  }

  @Post()
  async post(@Req() request: Request): Promise<any> {
    const url = process.env.PROXY_URL;
    await axios.post(url, request.body, {
      headers: request.headers,
      params: request.query,
    });
    return 'ok';
  }
}
