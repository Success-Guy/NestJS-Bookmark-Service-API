import { Injectable } from '@nestjs/common';
import { Prisma } from 'src/generated/prisma';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
	constructor(
		private prisma: PrismaService
	) {}

	getBookmarks(userId: number, params?: Prisma.BookmarkFindManyArgs) {
		return this.prisma.bookmark.findMany({
			where: {
				userId
			},
			...params
		});
	}
}
