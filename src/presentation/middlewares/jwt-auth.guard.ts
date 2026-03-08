import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { Request } from 'express'
import { verify } from '../../application/lib/auth' // tu función
import { JwtPayload } from 'jsonwebtoken'

@Injectable()
export class JwtAuthGuard implements CanActivate {

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()

    const authHeader = request.headers['authorization']
    if (!authHeader) {
      throw new UnauthorizedException('No autorizado')
    }

    try {
      const token = authHeader.replace('Bearer ', '')
      const data = verify(token, 'BASE') as JwtPayload   // config.auth.secret

      request['user'] = data   // 🔥 igual que req.user en Express
      return true

    } catch (err) {
      throw new UnauthorizedException(err.message)
    }
  }
}
