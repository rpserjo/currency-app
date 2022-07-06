<template>
    <div class="header">
        <div class="logo">
            <img src="/logo.png">
        </div>
        <div class="info">
            <div class="updated">
                <span id="updated-long">Курс обновлен:</span>
                <span id="updated-short">Обновлено:</span>
                &nbsp;{{ updated }}
            </div>
            <div class="base-currency">
                <div class="base-currency2">
                    Основная валюта: {{ baseCurrency }} 
                    <span id="base-currency-title">&nbsp;/ {{ baseCurrencyTitle }}</span>
                </div>
                <my-icon 
                    icon="reset" 
                    w="24" 
                    h="24" 
                    :style="{ 'fill' : '#eee', 'cursor' : 'pointer' }" 
                    @click="$emit('resetBaseCurrency')"
                />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    emits: ['resetBaseCurrency'],
    props: ['baseCurrency', 'baseCurrencyTitle', 'updated']
}
</script>

<style scoped>
    .header{
        color: white;
        background-color: indigo;
        display: flex;
    }
    .logo{
        flex-grow: 1;
        align-items: center;
        display: flex;
        padding: 5px;
        font-weight: 700;
        height: 60px;
        font-size: 36px;
    }
    .logo > img{
        width: 56px;
        height: 56px;
    }
    .info{
        padding: 5px;
        height: 60px;
        display: flex;
        align-items: end;
        justify-content: center;
        flex-direction: column;
    }
    #updated-long{
        display: inline-block;
    }
    #updated-short{
        display: none;
    }
    .updated, .base-currency{
        display: flex;
        align-items: center;
        height: 30px;
    }
    .base-currency{
        display: flex;
        align-items: center;
    }
    .base-currency2{
        margin-right: 5px; 
        display: flex; 
        align-items: center;
    }
    #base-currency-title{
        display: inline-block;
        max-width: 200px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
    @media (max-width: 500px){
        #base-currency-title{
            display: none;
        }
    }
    @media (max-width: 400px){
        #updated-long{
            display: none;
        }
        #updated-short{
            display: inline-block;
        }
    }
    @media (max-width: 350px){
        .updated{
            font-size: 14px;
        }
    }
</style>