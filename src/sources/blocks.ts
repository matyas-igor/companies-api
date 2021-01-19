import { RESTDataSource } from 'apollo-datasource-rest'
import { runFetchRequest } from '../helpers/utils'

export class BlocksAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'https://blockchain.info/'
  }

  async getBlocks(date: Date) {
    const path = `blocks/${date.getTime()}?format=json`
    const data = await runFetchRequest(this.get(path), this.baseURL + path)
    return data.blocks.reverse()
  }

  async getBlockByHash(hash: string) {
    const path = `rawblock/${hash}`
    return runFetchRequest(this.get(path), this.baseURL + path)
  }
}
