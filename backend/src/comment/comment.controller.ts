import {Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Put} from '@nestjs/common';
import {CommentService} from "./comment.service";
import {CommentModel} from "./comment.model";

@Controller('comments')
export class CommentController {
    constructor(private service: CommentService) {
    }

    @Get()
    getAll() {
        return this.service.getAll();
    }

    @Get(':uuid')
    getByUuid(@Param() params) {
        return this.service.getByUuid(params.uuid);
    }

    @Post()
    @HttpCode(201)
    create(@Body() comment: CommentModel) {
        return this.service.create(comment);
    }

    @Patch(':uuid')
    @HttpCode(204)
    update(@Param() params, @Body() comment: CommentModel) {
        return this.service.update(params.uuid, comment);
    }

    @Put(':uuid')
    @HttpCode(204)
    updateAll(@Param() params, @Body() comment: CommentModel) {
        return this.service.updateAll(params.uuid, comment);
    }

    @Delete(':uuid')
    @HttpCode(204)
    delete(@Param() params) {
        return this.service.delete(params.uuid);
    }
}
