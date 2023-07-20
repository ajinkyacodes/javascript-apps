const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');

const rateEl = document.getElementById('rate');
const updatedEl = document.getElementById('updated');
const swap = document.getElementById('swap');

const currencyCodeOneText = document.querySelector('.currency-full.currency-one');
const currencyCodeTwoText = document.querySelector('.currency-full.currency-two');

// Currency Codes & Names
const currencyCodes = {
  "AED": "Arab Emirates Dirham",
  "ARS": "Argentine Peso",
  "AUD": "Australian Dollar",
  "BGN": "Bulgarian Lev",
  "BRL": "Brazilian Real",
  "BSD": "Bahamian Dollar",
  "CAD": "Canadian Dollar",
  "CHF": "Swiss Franc",
  "CLP": "Chilean Peso",
  "CNY": "Yuan Renminbi",
  "COP": "Colombian Peso",
  "CZK": "Czech Koruna",
  "DKK": "Danish Krone",
  "DOP": "Dominican Peso",
  "EGP": "Egyptian Pound",
  "EUR": "Euro",
  "FJD": "Fiji Dollar",
  "GBP": "Pound Sterling",
  "GTQ": "Guatemalan Quetzal",
  "HKD": "Hong Kong Dollar",
  "HRK": "Croatian Kuna",
  "HUF": "Hungarian Forint",
  "IDR": "Indonesian Rupiah",
  "ILS": "Israeli New Shekel",
  "INR": "Indian Rupee	",
  "ISK": "Iceland Krona",
  "JPY": "Japanese Yen",
  "KRW": "Korean Won",
  "KZT": "Kazakhstan Tenge",
  "MXN": "Mexican Nuevo Peso",
  "MYR": "Malaysian Ringgit",
  "NOK": "Norwegian Krone",
  "NZD": "New Zealand Dollar",
  "PAB": "Panamanian Balboa",
  "PEN": "Peruvian Nuevo Sol",
  "PHP": "Philippine Peso",
  "PKR": "Pakistan Rupee",
  "PLN": "Polish Zloty",
  "PYG": "Paraguay Guarani",
  "RON": "Romanian New Leu",
  "RUB": "Russian Ruble",
  "SAR": "Saudi Riyal",
  "SEK": "Swedish Krona",
  "SGD": "Singapore Dollar",
  "THB": "Thai Baht",
  "TRY": "Turkish Lira",
  "TWD": "Taiwan Dollar",
  "UAH": "Ukraine Hryvnia",
  "USD": "US Dollar",
  "UYU": "Uruguayan Peso",
  "VND": "Vietnamese Dong",
  "ZAR": "South African Rand",
}

// Check Local Storage For Selected Currency History
const currentCurrencyOne = localStorage.getItem('ERC1');
const currentCurrencyTwo = localStorage.getItem('ERC2');

// Creating Options for Select One
for (var currency in currencyCodes) {
  const option = document.createElement('option');
  option.value = currency;
  option.innerText = currency;
  currencyEl_one.appendChild(option);
  if(currency === "USD") option.setAttribute('selected', "");
}

// Creating Options for Select Two
for (var currency in currencyCodes) {
  const option = document.createElement('option');
  option.value = currency;
  option.innerText = currency;
  if(currency === "EUR") option.setAttribute('selected', "");
  currencyEl_two.appendChild(option);
}

// Set Selected Value to Local Storage
if(currentCurrencyOne) currencyEl_one.value = currentCurrencyOne;
if(currentCurrencyTwo) currencyEl_two.value = currentCurrencyTwo;

// Fetch exchange rates and update the DOM
function caclulate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  localStorage.setItem('ERC1', currency_one);
  localStorage.setItem('ERC2', currency_two);

  fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      // console.log(data);
      const rate = data.rates[currency_two];

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;
      updatedEl.innerText = `(Updated: ${convertTime(data.time_last_updated)})`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });

    // Displaying Full Name of the selected currency
    for (var code in currencyCodes) {
      if (currencyEl_one.value === code) {
          currencyCodeOneText.innerText = currencyCodes[code];
      }
      if (currencyEl_two.value === code) {
        currencyCodeTwoText.innerText = currencyCodes[code];
      }
    }
}

// For swapping the currency rates
swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  caclulate();
});

// Date Format
function convertTime(timestamp){
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  let formattedDate  = new Date(timestamp * 1000);
  return formattedDate.toLocaleDateString("en-US", options);
} 

// Event listeners
currencyEl_one.addEventListener('change', caclulate);
amountEl_one.addEventListener('input', caclulate);
currencyEl_two.addEventListener('change', caclulate);
amountEl_two.addEventListener('input', caclulate);

caclulate();
