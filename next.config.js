/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        API_CRYPTOCOMPARE: 'https://min-api.cryptocompare.com/data/v2',
        WS_CRYPTOCOMPARE: 'wss://streamer.cryptocompare.com/v2',
        CRYPTO_API_KEY: "824b517e16d87b8c59b0de4df8ea7511df95b68888baf807357335a2b00df616"
    }
}

module.exports = nextConfig
