import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GetProjectImageCommand } from '../../../application/query/project-image/get-project-image.command';
import { CreateProjectImageCommand } from '../../../application/command/project-image/create-project-image.command';
import { DeleteProjectImageCommand } from '../../../application/command/project-image/delete-project-image.command';

@Controller('project/:id/images')
export class ProjectImageController {

    constructor(private readonly commandBus: CommandBus) {
    }

    @Get()
    public async getAll(@Param('id') id: number) {

        return await this.commandBus.execute(
            new GetProjectImageCommand(id)
        );
    }

    @Post()
    public async store(@Body() request) {
        await this.commandBus.execute(
            new CreateProjectImageCommand(
                request.projectId,
                request.imagePath,
            )
        );
    }

    @Delete(':id')
    public async delete(@Param('id') id: number) {

        return await this.commandBus.execute(
            new DeleteProjectImageCommand(id)
        );
    }
}