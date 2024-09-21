import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "./db";

const AuthOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	callbacks: {
		signIn({ profile }: any) {
			return profile.email_verified || false;
		},
		async jwt({ token, profile }: any) {
			if (profile) {
				const email: string = profile.email;
				const name: string = profile.name;

				let user = await db.user.findFirst({
					where: { email: email },
				});

				if (!user) {
					user = await db.user.create({
						data: {
							email: email,
							name: name,
						},
					});
				}

				delete token.email;
				delete token.picture;

				token.sub = user.id;
				token.name = user.name;
			}

			return token;
		},
		session: ({ session, token }: any) => {
			if (session && session.user) {
				session.user.id = token.sub;
			}
			return session;
		},
	},
	secret: process.env.NEXTAUTH_SECRET,
};

export { AuthOptions };
