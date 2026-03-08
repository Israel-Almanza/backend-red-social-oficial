'use strict';

// import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import * as jwt from 'jsonwebtoken';
import { JwtPayload, SignOptions } from 'jsonwebtoken';

// import { config } from '../../common';

/* ===========================
   TIPOS E INTERFACES
=========================== */

interface IUserContext {
  permissions?: string[];
}

interface IParametro {
  findOne(query: { grupo: string; codigo: string }): Promise<{
    descripcion: string;
  }>;
}

interface IServices {
  UsuarioService: {
    getUser(usuario: number | string, withRelations: boolean): Promise<{
      data: any;
    }>;
  };
}

interface IRequest {
  headers: {
    authorization?: string;
  };
}

/* ===========================
   JWT HELPERS
=========================== */

export function sign(
  payload: string | object | Buffer,
  secret: string,
  options?: SignOptions
): string {
  return jwt.sign(payload, secret, options);
}

export function verify(
  token: string,
  secret: string
): string | JwtPayload {
  return jwt.verify(token, secret);
}

/* ===========================
   PERMISSIONS
=========================== */

export function permissions(
  context: IUserContext,
  permission: string
): boolean {
  if (context.permissions) {
    let type: string | undefined;
    const permissionList = permission.split('|');

    for (const perm of permissionList) {
      if (context.permissions.includes(perm)) {
        return true;
      } else {
        type = perm.split(':')[1]?.toUpperCase();
      }
    }

    throw new Error(`NOT_AUTHORIZED:${type || 'READ'}`);
  }

  throw new Error('NOT_AUTHORIZED:READ');
}

/* ===========================
   TOKEN GENERATION
=========================== */

export async function generateToken(
  Parametro: IParametro,
  data: Record<string, any>
): Promise<string> {
  const { descripcion: tiempoToken } = await Parametro.findOne({
    grupo: 'CONFIG',
    codigo: 'TK'
  });

  if (!tiempoToken) {
    throw new Error('No existe el parámetro JWT_TOKEN_EXPIRATION');
  }

  console.log('Tiempo del token en minutos:', tiempoToken);

  const exp =
    Math.floor(Date.now() / 1000) + parseInt(tiempoToken, 10) * 60;

  return sign(
    {
      ...data,
      exp
    },
    'BASE'// config.auth.secret
  );
}

export function generateTokenInfinite(
  data: Record<string, any>
): string {
  return sign(data, // config.auth.secret
     'BASE'
  );
}

/* ===========================
   USER DATA FROM TOKEN
=========================== */

export async function userData(
  req: IRequest,
  services: IServices
): Promise<any> {
  const { authorization } = req.headers;

  if (!authorization) return null;

  try {
    const token = authorization.replace('Bearer ', '');
    const decoded = verify(token, // config.auth.secret
    'BASE'
    ) as JwtPayload;

    const { UsuarioService } = services;
    const user = await UsuarioService.getUser(
      decoded.usuario,
      false
    );

    return user.data;
  } catch (e: any) {
    throw new Error(`Error al crear el token: ${e.message}`);
  }
}
