import { Response, Request } from 'express';
import { container } from 'tsyringe';
import ListLogsService from '@shared/logs/services/ListLogsService';

class LogsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listLogsService = container.resolve(ListLogsService);

    const logs = await listLogsService.execute();

    return response.status(200).json(logs);
  }
}

export default new LogsController();
