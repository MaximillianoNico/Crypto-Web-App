import { createChart } from "lightweight-charts";
import { useCallback, useEffect, useRef, useState } from "react";
import { TRADING_VIEW_CANDLES_CONF, TRADING_VIEW_CONFIG } from "./constant";

export const useOHLCCandles = () => {
  const candleRef = useRef<any>();
  const chartContainerRef = useRef(null);

  const [isFetching, setIsFetching] = useState(true);

  const onInitDataCandle = async () => {
    setIsFetching(true);
    try {
      const response = await fetch(
        `${process?.env?.API_CRYPTOCOMPARE}/histoday?fsym=BTC&tsym=USD&limit=10`,
        {
          headers: {
            'authorization': `Apikey ${process?.env?.CRYPTO_API_KEY}`
          }
        }
      )

      if (response.ok) {
        const data = await response.json();
        const list = data?.Data?.Data;

        const candlesData = list?.length ? list.map(
          ({ time, open, close, high, low }: any) =>({
            time,
            open: +open,
            high: +high,
            close: +close,
            low: +low
          })
        ) : []
        
        candleRef.current.setData(candlesData)
      }
    } catch (err) {

    }

    setIsFetching(false);
  }

  // Initialize Chart & Candles Data
  useEffect(() => {
    if (chartContainerRef.current) {
      const chart = createChart(chartContainerRef.current, TRADING_VIEW_CONFIG);
      candleRef.current = chart.addCandlestickSeries(TRADING_VIEW_CANDLES_CONF as any);

      onInitDataCandle();

      return () => {
        chart.remove();
      }
    }
  }, []);

  const onUpdate = (payload = {}) => candleRef.current.update(payload);

  return { chartContainerRef, isFetching, onUpdate }
}

type TUpdate = {
  time: string
  price: string
  amount: string
  type: string
};

export const useOrderBook = () => {
  const [orderBook, setOrderBook] = useState<TUpdate[]>([]);

  const onUpdate = useCallback(
    (payload: TUpdate) => {
      setOrderBook((prev) => {
  
        const newOrder = [payload, ...prev]
        return newOrder.splice(0, 10)
      });
    },
    []
  )

  return { onUpdate, orderBook }
}