import { useEffect, useState } from "react";
import { useOHLCCandles, useOrderBook } from "./actions";

import { Container, TradingView } from './index.styled-component'
import OrderBook from '@/src/components/orderbook'
import { getTimes } from "@/src/libs/date";
import { WS_RESPONSE_TYPE } from "./constant";
import { useWebsocket } from "@/src/hooks/use-websocket";

const Component = () => {
  const [mounted, setMounted] = useState(false);
  const { isFetching, chartContainerRef, onUpdate } = useOHLCCandles();
  const { orderBook, onUpdate: onUpdateOrderBook } = useOrderBook();


  const onHandlerWSMessage = (values: any) => {
    if (values?.MESSAGE === "STREAMERWELCOME" && values?.TYPE === WS_RESPONSE_TYPE.INITIALIZE) {
      if (!mounted) setMounted(true);
    }

    if (values?.TYPE === WS_RESPONSE_TYPE.CANDLES && !isFetching) {
      onUpdate({
        time: values?.TS,
        open: +values?.OPEN,
        high: +values?.HIGH,
        close: +values?.CLOSE,
        low: +values?.LOW,
      })
    }

    if (values?.TYPE === WS_RESPONSE_TYPE.ORDERBOOK) {
      const isBuyer = !!values?.BID
      const data = values?.[isBuyer ? 'BID' : 'ASK'][0]
      const order = {
        time: getTimes(values?.CCSEQ),
        type: isBuyer ? 'buy': 'sell',
        price: data?.P,
        amount: data?.Q
      }

      onUpdateOrderBook(order);
    }
  }

  const { wsRef, onSend } = useWebsocket({
    wsUrl: 'wss://streamer.cryptocompare.com/v2?api_key=824b517e16d87b8c59b0de4df8ea7511df95b68888baf807357335a2b00df616',
    onMessage: onHandlerWSMessage,
    onOpen: () => {
      console.log('onOpen Websocket')
    }
  });

  useEffect(() => {
    if (mounted && wsRef.current) {
      const subRequest = {
        "action": "SubAdd",
        "subs": ["24~CCCAGG~BTC~USDT~m", "30~Binance~BTC~USDT"]
      };
      
      onSend(subRequest);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, wsRef]);

  return (
    <Container>
      <TradingView ref={chartContainerRef} />
      <OrderBook items={orderBook as any} />
    </Container>
  )
}

export default Component;
