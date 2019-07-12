new Vue({
    el: '#app',
    mounted() {

      this.getCurrencies()
    
    },
    data: {
      currencies: {}
    }, 
    computed:{
        formatedCurrencies(){
            return Object.values(this.currencies);
        }
    },
    methods: {
      getCurrencies() {
        
        const currencies = localStorage.getItem('currencies')

        if (currencies) {
          this.currencies = JSON.parse(currencies);
          return;
        }
        
        axios.get('https://free.currencyconverterapi.com/api/v5/currencies?apiKey=d2734050de598cfcbd8e')
          .then(response => {
            const { results } = response.data
            localStorage.setItem('currencies', JSON.stringify(results))
            this.currencies = results
        });

      }

    }
  });
