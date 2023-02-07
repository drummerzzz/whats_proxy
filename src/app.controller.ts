import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';

import { Request } from 'express';
import { Agent } from 'https';

import axios from 'axios';

const httpsAgent = new Agent({
  rejectUnauthorized: false, // (NOTE: this will disable client verification)
});

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
      const headers = Object.keys(request.headers).reduce((a, key) => {
        return { ...a, key: request.headers[key].toString() };
      }, {});

      const response = await axios.get(url, {
        params: request.query,
        headers: { 'ngrok-skip-browser-warning': true, ...headers },
        httpsAgent,
      });
      return {
        status: response.status,
        response: response.data,
        headers: response.headers,
      };
    } catch (error) {
      return error;
    }
  }

  @Post()
  async test_post(@Req() request: Request): Promise<any> {
    const url = process.env.PROXY_URL;
    try {
      const headers = Object.keys(request.headers).reduce((a, key) => {
        return { ...a, key: request.headers[key].toString() };
      }, {});
      const response = await axios.post(url, {
        headers: { 'ngrok-skip-browser-warning': true, ...headers },
        params: request.query,
        httpsAgent,
      });
      return {
        status: response.status,
        response: response.data,
        headers: response.headers,
      };
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
      const headers = Object.keys(request.headers).reduce((a, key) => {
        return { ...a, key: request.headers[key].toString() };
      }, {});
      await axios.get(url, {
        headers: { 'ngrok-skip-browser-warning': true, ...headers },
        params: request.query,
        httpsAgent,
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
      const headers = Object.keys(request.headers).reduce((a, key) => {
        return { ...a, key: request.headers[key].toString() };
      }, {});
      await axios.post(url, request.body, {
        headers: { 'ngrok-skip-browser-warning': true, ...headers },
        params: request.query,
        httpsAgent,
      });
    } catch {}
    return 'ok';
  }
}
