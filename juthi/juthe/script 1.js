async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.binance.com/api/v3/ticker/price');
        const data = await response.json();

        const btcPrice = data.find(coin => coin.symbol === 'BTCUSDT');
        const ethPrice = data.find(coin => coin.symbol === 'ETHUSDT');

        if (btcPrice && document.getElementById('btc-price')) {
            document.getElementById('btc-price').textContent = `$${parseFloat(btcPrice.price).toFixed(2)}`;
        }
        if (ethPrice && document.getElementById('eth-price')) {
            document.getElementById('eth-price').textContent = `$${parseFloat(ethPrice.price).toFixed(2)}`;
        }
    } catch (error) {
        console.error('Error fetching crypto prices:', error);
    }
}

// Fetch prices immediately
fetchCryptoPrices();

// Use an async interval function to prevent blocking
setInterval(async () => {
    try {
        await fetchCryptoPrices();
    } catch (error) {
        console.error('Error in interval fetch:', error);
    }
}, 5000);
