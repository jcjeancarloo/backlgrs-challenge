import { type GetApiStatusUsecase } from '@/domain/usecases/main/get-api-status-usecase'

export class GetApiStatusService implements GetApiStatusUsecase {
  async perform(): Promise<GetApiStatusUsecase.Result> {
    return { status: 'ok' }
  }
}
