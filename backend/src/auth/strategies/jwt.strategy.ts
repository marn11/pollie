import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

console.log(process.env.JWT_SECRET)
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService :ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        return req?.cookies?.['access_token'] || null;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,      
    });
  }
  async validate(payload: any) {
    // protected routes will have attached req.user now!
    return { userId: payload.sub, email: payload.email };
  }
}
