import { Body, Controller, Get, Post, Put } from '@nestjs/common';

@Controller('bookmark')
export class BookmarkController {

	@Get()
	findAllBookmarks() {
		return 'This action returns all bookmarks';
	}

	@Post()
	createBookmark(@Body() body: any) {
		return 'This action adds a new bookmark';
	}
	@Put(':id')
	updateBookmark(@Body() body: any, id: string) {
		return 'This action updates a bookmark';
	}
}
