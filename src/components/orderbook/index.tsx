import { HeaderOrderBook, OrderbookItem, OrderbookRow } from "./index.styled-component"

interface IOrderbookItem {
  time: string
  price: string
  amount: string
  type: 'buy' | 'sell'
}

interface IOrderBook {
  items: IOrderbookItem[]
}

const Component = (props: IOrderBook) => {
  return (
    <div>
        <h3>OrderBook</h3>
        <div>
          <table>
            <thead>
              <tr>
                <HeaderOrderBook>Time</HeaderOrderBook>
                <HeaderOrderBook>Price</HeaderOrderBook>
                <HeaderOrderBook>Amount</HeaderOrderBook>
              </tr>
            </thead>
            <tbody>
              {props?.items?.map(
                ({ time, price, amount, type = 'buy'}, idx) => (
                  <OrderbookItem key={idx} type={type}>
                    <OrderbookRow>{time}</OrderbookRow>
                    <OrderbookRow>{price}</OrderbookRow>
                    <OrderbookRow>{amount}</OrderbookRow>
                  </OrderbookItem>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
  )
}

export default Component;
