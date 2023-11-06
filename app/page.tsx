"use client"
import Image from 'next/image'
import styles from './page.module.css'
import LandingPage from '@/src/screens/landing-page'

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Subscribe Exchange&nbsp;
          <code className={styles.code}>BTC~USDT</code>
        </p>
        <div>
          <a
            href="https://www.cryptocompare.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supported By{' '}
            <Image
              src="/cryptocompare.png"
              alt="Vercel Logo"
              className={styles.vercelLogo}
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>
      <div>
        This dashboard is integrated with Websocket to get OrderBook and Candles data
      </div>
      <LandingPage />
    </main>
  )
}
