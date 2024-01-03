document.addEventListener('DOMContentLoaded', function () {
    const apiUrl = 'https://tokens.plena.finance/token-data';
    let params = {
        vs_currency: 'inr',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false,
        filter: 'all',
    };
    let coinData = {};
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
    window.sortData = function (column) {
    coinData.content.sort((a, b) => {
        const aValue = getColumnValue(a, column);
        const bValue = getColumnValue(b, column);

        if (aValue < bValue) {
            return -1;
        } else if (aValue > bValue) {
            return 1;
        } else {
            return 0;
        }
    });

    // Toggle order for next click
    if (params.order === `${column}_asc`) {
        params.order = `${column}_desc`;
    } else {
        params.order = `${column}_asc`;
        coinData.content.reverse();
    }

    displayData(coinData);
};

function getColumnValue(coin, column) {
    switch (column) {
        case 'name':
            return coin.name.toLowerCase();
        case 'price':
            return coin.market_data.current_price[params.vs_currency];
        case 'high':
            return coin.market_data.high_24h[params.vs_currency];
        case 'low':
            return coin.market_data.low_24h[params.vs_currency];
        case 'change':
            return coin.market_data.price_change_24h_in_currency[params.vs_currency];
        default:
            return '';
    }
}

    function fetchData(url, callback) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                callback(data);
            })
            .catch(error => {
                console.error('Error', error);
            });
    }

    const coinsPerPage = 10;
    let currentPage = 1;

    function displayData(data) {
        const embedElement = document.getElementById('coin-data-container');
        embedElement.innerHTML = '';
        const headerRow = `
<div class="coin-row coin-heading">
<div class="coin-cell" onclick="sortData('name')" style="cursor: pointer;">
    <span class="heading-hover">Coin Name</span>
    ${getSortArrow('name')}
</div>
<div class="coin-cell" onclick="sortData('price')" style="cursor: pointer;">
    <span class="heading-hover">Price</span>
    ${getSortArrow('price')}
</div>
<div class="coin-cell" onclick="sortData('high')" style="cursor: pointer;">
    <span class="heading-hover">24h High</span>
    ${getSortArrow('high')}
</div>
<div class="coin-cell" onclick="sortData('low')" style="cursor: pointer;">
    <span class="heading-hover">24h Low</span>
    ${getSortArrow('low')}
</div>
<div class="coin-cell" onclick="sortData('change')" style="cursor: pointer;">
    <span class="heading-hover">Price change</span>
    ${getSortArrow('change')}
</div>
<div class="coin-cell">Actions</div>
</div>
`;

function getSortArrow(column) {
const isAsc = params.order === `${column}_asc`;
const isDesc = params.order === `${column}_desc`;

return `
<span class="sort-arrow" onclick="toggleSortDirection('${column}')">
    ${isAsc ? '&#9650;' : ''}
    ${isDesc ? '&#9660;' : ''}
</span>`;
}
function toggleSortDirection(column) {
if (params.order === `${column}_asc`) {
params.order = `${column}_desc`;
} else {
params.order = `${column}_asc`;
}

// Call the sorting function
sortData(column);
}

embedElement.innerHTML += headerRow;
        const startIndex = (currentPage - 1) * params.per_page;
        const endIndex = startIndex + params.per_page;
        const coinsToShow = data.content.slice(startIndex, endIndex);

        coinsToShow.forEach(coin => {
            const currentPrice = coin.market_data.current_price[params.vs_currency].toFixed(2);
            const high24h = coin.market_data.high_24h[params.vs_currency].toFixed(2);
            const low24h = coin.market_data.low_24h[params.vs_currency].toFixed(2);
            const priceChange24h = coin.market_data.price_change_24h_in_currency[params.vs_currency].toFixed(2);
            const priceChange24hPercentage = coin.market_data.price_change_percentage_24h.toFixed(2);
            const arrowClass = priceChange24hPercentage >= 0 ? 'arrow-up' : 'arrow-down';
            const coinImage = coin.image.large || '';
            const priceChangeColor = coin.market_data.price_change_24h_in_currency[params.vs_currency] > 0 ? '#3AD4B0' : '#DF5E84';
            const buyLinks = {
                'bitcoin': '/in/buy-crypto/buy-bitcoin',
                ethereum: '/in/buy-crypto/buy-ethereum',
                tether: '/in/buy-crypto/buy-tether',
                dogecoin: '/in/buy-crypto/buy-dogecoin',
                binancecoin: '/in/buy-crypto/buy-binance-coin',
                ripple: '/in/buy-crypto/buy-ripple',
                'usd-coin': '/in/buy-crypto/buy-usd-coin',
                tron: '/in/buy-crypto/buy-tron',
                cardano: '/in/buy-crypto/buy-cardano',
                dai: '/in/buy-crypto/buy-dai-coin',
                litecoin: '/in/buy-crypto/buy-litecoin',
                'matic-network': '/in/buy-crypto/buy-polygon',
                uniswap: '/in/buy-crypto/buy-uniswap',
                polkadot: '/in/buy-crypto/buy-polkadot',
            };
            const buyLink = buyLinks[coin.id] || '#';

            const coinRow = `
                <div class="coin-row">
                    <div class="coin-cell">
                        <div class="coin-main">
                            <div class="coin-image-logo style="display: flex; align-items: center">
                                <img src="${coinImage}" alt="${coin.symbol}" class="coin-logo" style=" margin-bottom:-20px">
                            </div>
                            <div class="coin-name-symbol">
                                <div class="coin-name">${coin.name}</div>
                                <div class="coin-symbol">${coin.symbol}</div>
                            </div>
                        </div>
                    </div>
                    <div class="coin-cell">${getCurrencySymbol(params.vs_currency)}${currentPrice}
                        <div class="coin-percent-change" style="color: ${priceChangeColor};font-size:12px;">${priceChange24hPercentage}%</div>
                    </div>
                    <div class="coin-cell">${getCurrencySymbol(params.vs_currency)}${high24h}</div>
                    <div class="coin-cell">${getCurrencySymbol(params.vs_currency)}${low24h}</div>
                    <div class="coin-cell" style= "color: ${priceChangeColor}">${getCurrencySymbol(params.vs_currency)}${priceChange24h}</div>
                    <div class="coin-cell"><a href="${buyLink}" target="_blank"><button class="buy-button">BUY</button></a></div>
                </div>
            `;
            embedElement.innerHTML += coinRow;
        });

        displayPagination();
    }

    function displayPagination() {
        const totalPages = Math.ceil(coinData.content.length / params.per_page);
        const paginationList = document.getElementById('pagination');
        paginationList.innerHTML = '';
        const visiblePages = 3;
        const startPage = Math.max(1, currentPage - visiblePages);
        const endPage = Math.min(totalPages, currentPage + visiblePages);
        addPageLink(1, '');
        if (startPage > 2) {
            addEllipsis();
        }
        for (let i = startPage; i <= endPage; i++) {
            addPageLink(i, i);
        }

        if (endPage < totalPages - 1) {
            addEllipsis();
        }
        addPageLink(totalPages, 'Last');
    }

    function addPageLink(pageNumber, label) {
        const paginationList = document.getElementById('pagination');
        const listItem = document.createElement('li');
        listItem.textContent = label;
        listItem.addEventListener('click', () => {
            currentPage = pageNumber;
            displayData(coinData);
        });
        if (pageNumber === currentPage) {
            listItem.style.color = '#875FD9';
        }
        paginationList.appendChild(listItem);
    }

    function addEllipsis() {
        const paginationList = document.getElementById('pagination');
        const ellipsis = document.createElement('li');
        ellipsis.textContent = '...';
        ellipsis.classList.add('ellipsis');
        ellipsis.addEventListener('click', () => {
            console.log('Ellipsis clicked');
        });
        paginationList.appendChild(ellipsis);
    }

    function fetchCDD() {
        fetchData(apiUrl, data => {
            coinData = data || {};
            displayData(coinData);
        });
    }

    function showAllCoins() {
        params.filter = 'all';
        fetchCDD();
    }

    function showTopGainers() {
        params.filter = 'gainers';
        fetchData(apiUrl, data => {
            const sortedData = data.content.sort((a, b) => b.market_data.price_change_percentage_24h - a.market_data.price_change_percentage_24h);
            coinData.content = sortedData;
            displayData(coinData);
        });
    }

    function showTopLosers() {
        params.filter = 'losers';
        fetchData(apiUrl, data => {
            const sortedData = data.content.sort((a, b) => a.market_data.price_change_percentage_24h - b.market_data.price_change_percentage_24h);
            coinData.content = sortedData;
            displayData(coinData);
        });
    }

    function searchCoin() {
        const searchTerm = document.getElementById('search-icon').value.toLowerCase();
        const filteredData = coinData.content.filter(coin => coin.name.toLowerCase().includes(searchTerm) || coin.symbol.toLowerCase().includes(searchTerm));
        const filteredDataObject = {
            content: filteredData,
        };
        currentPage = 1;
        displayData(filteredDataObject);
    }

    function setActiveButton(buttonId) {
        const buttons = ['allC', 'topG', 'topL', 'sCurr'];
        buttons.forEach(button => {
            const element = document.getElementById(button);
            if (element) {
                element.classList.remove('active');
            }
        });
        const clickedButton = document.getElementById(buttonId);
        if (clickedButton) {
            clickedButton.classList.add('active');
        }
    }

    function changeCurrency() {
        const currencyDropdown = document.getElementById('currency');
        params.vs_currency = currencyDropdown.value;
        fetchCDD();
    }

    document.getElementById('currency').addEventListener('input', changeCurrency);
    fetchCDD();
    document.getElementById('allC').addEventListener('click', function () {
        showAllCoins();
        setActiveButton('allC');
    });

    document.getElementById('topG').addEventListener('click', function () {
        showTopGainers();
        setActiveButton('topG');
    });

    document.getElementById('topL').addEventListener('click', function () {
        showTopLosers();
        setActiveButton('topL');
    });

    document.getElementById('search-icon').addEventListener('input', searchCoin);
});