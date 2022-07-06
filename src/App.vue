<template>
  <SpinnerComponent v-if="showSpinner"/>
  <div class="wrap">
    <HeaderComponent
      :base-currency="baseCurrency" 
      :base-currency-title="currenciesNames[baseCurrency]" 
      :updated="updated" 
      @reset-base-currency="resetBaseCurrency"
    />
    <div class="main">
      <CurrencyInputComponent 
        :options="currenciesNames" 
        :disabled="false" 
        v-model:select="currentCurrency" 
        v-model:base-currency="baseCurrency" 
        v-model:input="currencyInput"
      />
      <div class="line">
        <div class="current-rate">1 {{ currentCurrency }} = {{ currentRate }} {{ targetCurrency }}</div>     
        <div class="replace" @click="replace">&#8645;</div>
      </div>
      <CurrencyInputComponent 
        :options="currenciesNames" 
        :disabled="true" 
        v-model:select="targetCurrency" 
        v-model:input="conversionResult"
      />
    </div>
  </div>
</template>

<script>
import CurrencyInputComponent from '@/components/CurrencyInputComponent'
import HeaderComponent from '@/components/HeaderComponent'
import SpinnerComponent from '@/components/SpinnerComponent'
import currencyMixin from '@/mixins/currencyMixin'

export default {
  name: 'App',
  components: {
    CurrencyInputComponent, 
    HeaderComponent,
    SpinnerComponent,
  },
  computed: {
    currentRate(){
      if(this.currentCurrencyRates != undefined && this.currentCurrencyRates[this.targetCurrency] != undefined){
        return this.currentCurrencyRates[this.targetCurrency].value;
      }
      return null;  
    }
  },
  data() {
    return {      
      apiEndpoint: 'https://api.currencyapi.com/v3/latest?apikey=0ESDgJypvpX2xEs4K3Sv3IbtMh47JFFpPMB4Kuns',    
      baseCurrency: 'USD',
      conversionResult: -1,
      currencyInput: 1,
      currentCurrency: '',
      currentCurrencyRates: {},                    
      locale: window.navigator.language,
      showSpinner: true,
      targetCurrency: 'EUR',
      updated: new Date().toLocaleString()
    }
  },
  methods: {
    convert(reverse = false){
      const amount = this.currencyInput;
      this.conversionResult = 'Обменный курс не установлен';
      let rate = -1;
      if(this.currentCurrency != this.targetCurrency){
        if(this.currentCurrencyRates[this.targetCurrency] != undefined){
          rate = this.currentCurrencyRates[this.targetCurrency].value;
        }
      }else{
        rate = 1;
      }
      if(rate > 0){
        if(reverse){
          const result = (amount / rate).toFixed(2);
          this.currencyInput = result;
        }else{
          const result = (amount * rate).toFixed(2);
          this.conversionResult = result;
        }            
      }          
    },
    getBaseCurrency(){
      const baseCurrencyLocal = window.localStorage.getItem('baseCurrencyLocal');
      const country = this.getCountryCode(this.locale);
      if(baseCurrencyLocal !== null && Object.keys(this.currenciesNames).indexOf(baseCurrencyLocal) > -1){
        this.baseCurrency = baseCurrencyLocal;
      }else{
        if(this.locale != undefined && this.locale.length > 0){            
          if(this.currencyMap[country] != undefined){
            this.baseCurrency = this.currencyMap[country];
          }          
        }
      }
    },
    getCountryCode(language){
      let lang = language.split('_');
      if(lang.length === 2){
        return lang.pop().toUpperCase();
      }
      lang = language.split('-');
      if(lang.length === 2){
        return lang.pop().toUpperCase();
      }
      return language.toUpperCase();
    },
    async loadConversionRates(){
      this.showSpinner = true;
      try{
        const response = await fetch(this.apiEndpoint + '&base_currency=' + this.currentCurrency);
        if(response.ok){
          const json = await response.json();
          this.currentCurrencyRates = json.data;
          this.updated = new Date().toLocaleString();
          this.convert();
        }else{
          console.error('Ошибка загрузки...');
        }
      }catch(e){
        console.error('Не удалось загрузить информацию');
      }finally{
        this.showSpinner = false;
      }
    },
    replace(){
      const currentCurrency = this.currentCurrency;
      const targetCurrency = this.targetCurrency;
      this.currentCurrency = targetCurrency;
      this.targetCurrency = currentCurrency;
    },
    resetBaseCurrency(){
      window.localStorage.removeItem('baseCurrencyLocal');
      this.getBaseCurrency();
    }
  },
  mixins: [currencyMixin],
  mounted(){
    document.title = 'Конвертер валют';
    this.getBaseCurrency();
    this.showSpinner = false;
    this.currentCurrency = this.baseCurrency;
    this.targetCurrency = (window.localStorage.getItem('lastTargetCurrency') != null && Object.keys(this.currenciesNames).indexOf(window.localStorage.getItem('lastTargetCurrency')) > -1) ? window.localStorage.getItem('lastTargetCurrency') : this.targetCurrency;
  },
  watch:{
    currentCurrency: function(){
      this.loadConversionRates();
    },
    targetCurrency: function(){
      window.localStorage.setItem('lastTargetCurrency', this.targetCurrency);
      this.convert();
    },
    currencyInput: function(){
      this.convert();
    }
  }
}
</script>

<style>
:root {
  --color-white: #ffffff;
  --color-blue: #2196f3;
  --color-dark: #212529;
  --color-gray: #ced4da;
  --color-lightgray: #fbfbfb;
  --color-warning: #dc3545;
  --color-lightyellow: #ffe69c;
  --color-yellow: #ffc107;
}
*{
  box-sizing: border-box;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  
  margin: 0;
}
#app {
  color: #2c3e50;
}

</style>

<style scoped>
  .wrap{
    margin: 0 auto;
    width: 100%;
    max-width: 900px;
  }
  .line{
    display: flex;
    justify-content: end;
    margin: 0px 5px;
  }
  .replace{
    width: 80px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    font-weight: 700;
    cursor: pointer;
  }
  .current-rate{
    font-size: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
  }
</style>
