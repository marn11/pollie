import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	 constructor(private prisma: PrismaService,
			private jwtService: JwtService,
		) {}

		async validateUser(details: any){
			let user = await this.prisma.user.findUnique({where: {googleId: details.googleId},});
			if (!user) {
				user = await this.prisma.user.create({
					data: {
						email: details.email,
						name: details.firstName,
						googleId: details.googleId,
					}
				});
			}
			return user;
		}
		generateJwt(user: any){
			const payload = {sub: user.id, email: user.email};
			return this.jwtService.sign(payload);
		}
}
