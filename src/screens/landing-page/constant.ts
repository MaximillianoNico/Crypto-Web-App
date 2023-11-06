import { CrosshairMode } from "lightweight-charts";

export const TRADING_VIEW_CONFIG = {
  width: 700,
  height: 400,
  timeScale: {
      timeVisible: true,
      secondsVisible: false,
      fixLeftEdge: true,
      fixRightEdge: true,
  },
  crosshair: {
      mode: CrosshairMode.Normal,
  },
  layout: {
    background: {
      // type: 'solid',
      color: 'transparan',
    },
    textColor: 'rgba(255, 255, 255, 0.9)',
  }
}

export const TRADING_VIEW_CANDLES_CONF = {
  priceFormat: {
    type: 'price',
    minMove: 0.00001,
    precision: 5,
  },
  upColor: '#26a69a',
  downColor: '#ef5350',
  borderVisible: false,
  wickUpColor: '#26a69a',
  wickDownColor: '#ef5350',
}

export const WS_RESPONSE_TYPE = {
  ORDERBOOK: '30',
  CANDLES: '24',
  INITIALIZE: '20'
}
