
    let cryptoDataa;
        document.addEventListener('DOMContentLoaded', function () {
            fetchDataOnLoad();
        });
        async function fetchCryptoData(coinId, currency) {
            try {
                const apiUrl = `https://tokens.plena.finance/token-data/${coinId}`;
                const response = await fetch(`${apiUrl}?vs_currency=${currency}`);
                const data = await response.json();
                if (data && data.content.market_data && data.content.market_data.current_price) {
                    updateUI(data, currency,coinId);
                return data;  
        } else {
            console.error('Invalid', data);
            throw new Error('Invalid');
        }
            } catch (error) {
                console.error(`Error ${coinId} data:`,error);
                throw error;
            }
        }
        function updateUI(data, currency,coinId) {
        const coinnId =document.getElementById('coin-name').innerHTML.toUpperCase();
                const price = data.content.market_data.current_price[currency];
                const change24h = data.content.market_data.price_change_percentage_24h;
                const change7d = data.content.market_data.price_change_percentage_7d;
                const change24h2 = data.content.market_data.price_change_percentage_24h;
                const marketCap = data.content.market_data.market_cap[currency];
                const high24h = data.content.market_data.high_24h[currency];
                const low24h = data.content.market_data.low_24h[currency];
                const changev = data.content.market_data.price_change_24h_in_currency[currency];
                const tradingVolume = data.content.market_data.total_volume[currency];
                const hundredPrice = 100/price;
                const fivetPrice = 5000/price;
                const change1m = data.content.market_data.price_change_percentage_30d;
                const change3m = data.content.market_data.price_change_percentage_60d;
                const change1h = data.content.market_data.price_change_percentage_1h;
                const change14d = data.content.market_data.price_change_percentage_14d;
                const change1y = data.content.market_data.price_change_percentage_1y;
                const currencySymbol = getCurrencySymbol(currency);
                const formattedPrice = price !== undefined ? `${currencySymbol}${price.toFixed(2)}` : 'N/A';
                const formattedChangev = (changev !== undefined && !isNaN(changev)) ? `${currencySymbol}${changev.toFixed(2)}` : 'No data available';
                document.getElementById('price').innerHTML = `Buy ${coinnId} in India at ${formattedPrice}`;
                document.getElementById('change').innerHTML = formattedChangev;
                setArrowAndColors(document.getElementById('change'), changev);
                document.getElementById('pricee').innerHTML = formattedPrice;
                document.getElementById('high').innerHTML = `${currencySymbol}${high24h.toFixed(2)}`;
                document.getElementById('low').innerHTML = `${currencySymbol}${low24h.toFixed(2)}`;
                document.getElementById('price69').innerHTML = formattedPrice;
                document.getElementById('coin-logo').innerHTML = `<img src="${data.content.image.small}" alt="${coinId} Logo" style="width: 30px;">`;
                document.getElementById('coin-logoo').innerHTML = `<img src="${data.content.image.small}" alt="${coinId} Logo" style="width: 60px;">`;
                document.getElementById('price-change-24h').innerHTML = ` ${change24h.toFixed(2)}% `;
                setArrowAndColor(document.getElementById('price-change-24h'), change24h);
                document.getElementById('price-change-7d').innerHTML = ` ${change7d.toFixed(2)}% `;
                setArrowAndColor(document.getElementById('price-change-7d'), change7d);
                document.getElementById('price-change-24h2').innerHTML = ` ${change24h2.toFixed(2)}% `;
                setArrowAndColor(document.getElementById('price-change-24h2'), change24h2);
                document.getElementById('currentPara').innerHTML = `Currently, the value of 1 ${data.content.symbol.toUpperCase()} is  ${formattedPrice} INR (conversion rate may vary), suggesting that purchasing 5 ${data.content.symbol.toUpperCase()} would cost you around ${currencySymbol}${5*price.toFixed(2)} INR. On the other hand, ₹ 100.00 INR could get you approximately ${hundredPrice.toFixed(8)} ${data.content.symbol.toUpperCase()}, and ₹ 5,000 INR would amount to ${fivetPrice.toFixed(8)} ${data.content.symbol.toUpperCase()}, not including any platform or transaction fees. These figures give you an idea of what you can expect when buying ${data.content.symbol.toUpperCase()} in India with INR, usually through platforms like Plena Crypto Super App.`;
                document.getElementById('trading-volume').innerHTML = `${currencySymbol}${(tradingVolume / 1000000).toFixed(2)} million`;
                document.getElementById('change7d2').innerHTML = `${change7d.toFixed(2)}%`;            
                setArrowAndColors(document.getElementById('change7d2'), change7d);
                document.getElementById('change1m').innerHTML = `${change1m.toFixed(2)}%`;
                setArrowAndColors(document.getElementById('change1m'), change1m);
                document.getElementById('change14d').innerHTML = `${change14d.toFixed(2)}%`;
                setArrowAndColors(document.getElementById('change14d'), change14d);
                document.getElementById('change1y').innerHTML = `${change1y.toFixed(2)}%`;
                setArrowAndColors(document.getElementById('change1y'), change1y);
                document.getElementById('price-change-24h3').innerHTML = ` ${change24h2.toFixed(2)}% `;
                setArrowAndColors(document.getElementById('price-change-24h3'), change24h2);
                document.getElementById('7d-heading').innerHTML = `7 Days Exchange Rate ${data.content.symbol.toUpperCase()} to ${selectedCurrency1.toUpperCase()}`;
                document.getElementById('24h-heading').innerHTML = `24-Hour Exchange Rate ${data.content.symbol.toUpperCase()} to ${selectedCurrency1.toUpperCase()}`;
                document.getElementById('3m-heading').innerHTML = `3 Month Exchange Rate ${data.content.symbol.toUpperCase()} to ${selectedCurrency1.toUpperCase()}`;
                document.getElementById('1m-heading').innerHTML = `1 Month Exchange Rate ${data.content.symbol.toUpperCase()} to ${selectedCurrency1.toUpperCase()}`;
                document.getElementById('7d-content').innerHTML = `Current ${data.content.symbol.toUpperCase()} Price: ${price}<br>
                7-Day Change: ${change7d}%`;
                document.getElementById('24h-content').innerHTML = `Current ${data.content.symbol.toUpperCase()} Price: ${price}<br>
                24-Hour Change: ${change24h}%`;
                document.getElementById('1m-content').innerHTML = `Current ${data.content.symbol.toUpperCase()} Price: ${price}<br>
                1-Month Change: ${change1m}%`;
                document.getElementById('3m-content').innerHTML = `Current ${data.content.symbol.toUpperCase()} Price: ${price}<br>
                3-Month Change: ${change3m}%`;
                document.getElementById('market-cap').innerHTML = `${currencySymbol}${(marketCap / 1000000).toFixed(2)} million`
        }
        const selectedCurrency1 = document.getElementById('currency').value
        function getCurrencySymbol(currencyCode) {
            switch (currencyCode) {
                case 'usd':
                    return '$';
                case 'eur':
                    return '€';
                case 'gbp':
                    return '£';
                case 'inr':
                    return '₹';
                case 'jpy':
                    return '¥';
                case 'aud':
                    return 'A$';
                default:
                    return '';
            }
        }
        function setArrowAndColor(element, value) {
    console.log('Setting arrow and color:', element.id, value);
    if (value > 0) {
        element.className = 'positive';
    } else {
        element.className = 'negative'; 
    }
}
function setArrowAndColors(element, value) {
    console.log('Setting arrow and color:', element.id, value);

    if (value > 0) {
        element.className = 'positive1'; 
    } else {
        element.className = 'negative1'; 
    }
}
function changeCurrency() {
            const coinId = document.getElementById('coin-name').innerText.toLowerCase();
            const selectedCurrency = document.getElementById('currency').value;
            if (!cryptoDataa) {
                fetchCryptoData(coinId, selectedCurrency);
            } else {
                updateUI(cryptoDataa, selectedCurrency);
            }
            calculateLivePrice();
            
        }
        async function fetchDataOnLoad() {
        window.onload = async function () {
            const coinId = document.getElementById('coin-name').innerText.toLowerCase();
            const selectedCurrency = document.getElementById('currency').value;

            try {
                cryptoDataa = await fetchCryptoData(coinId, selectedCurrency);
                document.getElementById('quantity').value = 1;
                calculateLivePrice();
                updateUI(cryptoDataa, selectedCurrency, coinId);
            } catch (error) {
                console.error('Error', error);
            }
        };
    }
    async function calculateLivePrice() {
        const coinId = document.getElementById('coin-name').innerText.toLowerCase();
        const selectedCurrency = document.getElementById('currency').value;
        const quantity = parseFloat(document.getElementById('quantity').value) || 0;
        const livePriceElement = document.getElementById('live-price');

        if (!cryptoDataa) {
            try {
                cryptoDataa = await fetchCryptoData(coinId,selectedCurrency);
            } catch (error) {
                console.error('Error',error);
                livePriceElement.innerHTML = 'Error';
                return;
            }
        }

        if (!isNaN(quantity)) {
            try {
                const livePrice=cryptoDataa.content.market_data.current_price[selectedCurrency] * quantity;
                const currencySymbol=getCurrencySymbol(selectedCurrency);
                const formattedLivePrice =`${currencySymbol}${livePrice.toFixed(2)}`;
                livePriceElement.value=formattedLivePrice;
            } catch (error) {
                console.error('Error', error);
                livePriceElement.innerHTML = 'Error';
            }
        } else {
            livePriceElement.innerHTML = 'Invalid';
        }
    }
    document.getElementById('quantity').oninput = function () {
        calculateLivePrice();
    };