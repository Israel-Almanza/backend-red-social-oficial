import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthService } from '../../application/services/auth.service'

@Injectable()
export class PermissionGuard implements CanActivate {

  constructor(
    private reflector: Reflector,
    private authService: AuthService
  ) {}

  // TODO israel revisar esta funcion
  async canActivate(context: ExecutionContext): Promise<boolean> {

    const permisos = this.reflector.get<string[]>(
      'permissions',
      context.getHandler()
    )

    if (!permisos || permisos.length === 0) return true

    const request = context.switchToHttp().getRequest()
    const user = request.user

    const tiene = await this.authService.verificarPermisos({
      roles: user.idRoles,
      permisos
    })

    if (!tiene) {
      throw new ForbiddenException('No tiene permisos para realizar esta acción')
    }

    return true
  }
}
