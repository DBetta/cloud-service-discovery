import * as ip from 'ip';

export class IpUtils {
  private constructor() {
  }

  /**
   * Get the ip address.
   */
  static getIpAddress(): string {
    return ip.address();
  }
}
