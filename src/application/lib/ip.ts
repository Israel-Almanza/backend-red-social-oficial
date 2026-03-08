import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'
// import geoip from 'geoip-lite'
import * as geoip from 'geoip-lite'


@Injectable()
export class IpInfoMiddleware implements NestMiddleware {

  private getIpInfo(ip: string, userAgent: string) {

  if (!ip) return null

  if (ip.includes('::ffff:')) {
    ip = ip.split(':').reverse()[0]
  }

  if (ip === '127.0.0.1' || ip === '::1') {
    return { ip, navigator: userAgent }
  }

  try {

    const location = geoip.lookup(ip)

    if (!location) {
      return { ip, navigator: userAgent }
    }

    return {
      ip,
      location,
      navigator: userAgent
    }

  } catch (error) {

    console.log('GeoIP error:', error)

    return {
      ip,
      navigator: userAgent
    }

  }
}


  use(req: Request, res: Response, next: NextFunction) {

    const xForwardedFor = (req.headers['x-forwarded-for'] || '') as string

    const ip =
      xForwardedFor.split(',')[0]?.trim() ||
      req.socket.remoteAddress ||
      req.ip

    req['ipInfo'] = this.getIpInfo(ip, req.headers['user-agent'] || '')

    next()
  }
}
