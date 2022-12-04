import { Candle, ICandle } from '@/models/Candle'
import axios from 'axios'
import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'

type CandleChartEntry = {
  x: string
  y: [number, number, number, number]
}

const http = axios.create({
  baseURL: String(process.env.VUE_APP_CANDLES_API)
})

@Module({ name: 'CandleStore' })
export default class CandleStore extends VuexModule {
  private _candles: Candle[] = []

  get candles(): CandleChartEntry[] {
    if (!this._candles.length) return []

    return this._candles.map((candle) => ({
      x: candle.finalDateTime.toLocaleTimeString(),
      y: [candle.open, candle.high, candle.low, candle.close]
    }))
  }

  @Action
  async loadInitialCandles() {
    const { data } = await http.get(`${String(process.env.VUE_APP_CANDLES_API_ENDPOINT)}/10`)
    const candles: Candle[] = data.map((candleObj: ICandle) => new Candle(candleObj))
    this.context.commit('_initializeCandles', candles.reverse())
  }

  @Action
  addCandle(candle: Candle) {
    this.context.commit('_appendNewCandle', candle)
  }

  @Mutation
  private _initializeCandles(candles: Candle[]) {
    this._candles = candles
  }

  @Mutation
  private _appendNewCandle(candle: Candle) {
    this._candles.push(candle)
  }
}
