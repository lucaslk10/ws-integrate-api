import { Injectable } from '@nestjs/common';

@Injectable()
export class HelpersService {
  /**
   * A simple function to check Object
   */
  isJson = (string) => {
    try {
      return JSON.parse(string) && !!string;
    } catch (e) {
      return false;
    }
  };
}
