import styled from "styled-components";

interface IOrderbook {
  type: 'buy' | 'sell'
}

const ORDERBOOK = {
  BUY: '#00bc8c',
  SELL: '#e74c3c'
}
export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 20px;
`

export const TradingView = styled.div``

export const HeaderOrderBook = styled.th`
  padding: .3rem;
  min-width: 100px;
  text-align: left;
`

export const OrderbookItem = styled.tr<IOrderbook>`
  background-color: ${({ type }) => type === 'sell' ? ORDERBOOK.SELL : ORDERBOOK.BUY };

  td {
    border: 1px solid ${({ type }) => type === 'sell' ? ORDERBOOK.SELL : ORDERBOOK.BUY };
  }
`;

export const OrderbookRow = styled.td`
  font-size: 14px;
`;