import { type GetApiStatusUsecase } from '@/domain/usecases/main/get-api-status-usecase'
import { ok } from '@/presentation/helpers/http-helper'
import { type Controller, type HttpResponse } from '@/presentation/protocols'
import { inject, injectable } from 'tsyringe'

@injectable()
export class GetApiStatusController implements Controller {
  constructor(@inject('GetApiStatusUsecase') private readonly getApiStatus: GetApiStatusUsecase) {}

  async handle(): Promise<HttpResponse> {
    const { status } = await this.getApiStatus.perform()
    return ok({ status })
  }
}
