import { Controller, Get, Req, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // @Public() we'll add this later once we have protected routes
  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res: Response) {
    const jwt = this.authService.generateJwt(req.user);
    res.cookie('access_token', jwt, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 3600000,
      path: '/',
    });
    res.redirect(`http://localhost:3000/dashboard`);
  }
}
