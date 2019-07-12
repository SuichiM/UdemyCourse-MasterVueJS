new Vue({
    el: '#app',
    mounted() {

      this.getCurrencies()
    
    },
    data: {
      currencies: {},
      amount: 0,
      from: 'USD',
      to: 'EUR',
      rate: null,
      loading: false
    }, 
    computed:{
        formatedCurrencies(){
            return Object.values(this.currencies);
        },
        calculatedResult(){
            return (Number(this.amount) * this.rate).toFixed(3)
        },
        disabled(){
          return !this.amount || this.loading;
        }
    },
    methods: {
      getCurrencies() {
        
        const currencies = localStorage.getItem('currencies')

        if (currencies) {
          this.currencies = JSON.parse(currencies);
          return;
        }
        
        axios.get(`https://free.currencyconverterapi.com/api/v5/currencies?apiKey=${apiKey}`)
          .then(response => {
            const { results } = response.data
            localStorage.setItem('currencies', JSON.stringify(results))
            this.currencies = results
        });

      },
      convertCurrency() {
        let conversionKey = `${this.from}_${this.to}`;
        
        this.loading = true;
        axios.get(`https://free.currencyconverterapi.com/api/v5/convert?apiKey=${apiKey}&q=${conversionKey}`)
          .then(response => {
            this.loading = false;

            console.log(response);
            this.rate = response.data.results[conversionKey].val
          })
  }

    },
    watch:{
      from(){
          this.rate = 0;
      },
      to(){
        this.rate = 0;
      }
    }
  });
