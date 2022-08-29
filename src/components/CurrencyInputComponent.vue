<template>
    {{inputLocal}}
    <div class="input-wrap">
        <div class="input-line"> 
            <input v-if="disabled == false" 
                class="text-input" 
                type="number" 
                v-model.number="inputLocal"
            />
            <input v-else 
                class="text-input" 
                type="text" 
                disabled="disabled" 
                :value="input"
            />
            <div class="select">
                <div 
                    class="selected" 
                    :class="{ open: open }" 
                    @click="open = !open"
                >
                    <div class="selected-name">{{ select }}</div>
                    <div class="selected-arrow"></div>
                </div>          
            </div>
        </div>
        <div class="items" :class="{ hidden: !open }">
            <div class="filter">
                <input 
                    type="text" 
                    class="items-filter" 
                    placeholder="Код или название валюты" 
                    v-model="filter"
                />
            </div>
            <div class="options">
                <div 
                    v-for="(option, key) in filtered" 
                    class="option" 
                    :key="key" 
                    @click="open = false; filter = ''; $emit('update:select', key);"
                >
                    <div class="option-label">
                        <div class="option-label-main">{{ key }}</div>
                        <div class="option-label-secondary">{{ option }}</div>
                    </div>
                    <div 
                        v-if="disabled == false" 
                        class="option-bookmark" 
                        @click.stop="setBaseCurrency(key)"
                    >
                        <my-icon :icon="(key == baseCurrency) ? 'bookmark' : 'bookmark-outline'" w="24" h="24"></my-icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['baseCurrency', 'disabled', 'input', 'options', 'select'],
    computed: {
        filtered: function(){
            const keys = Object.keys(this.options);
            const filtered = {};
            const filter = this.filter.toLowerCase();
            keys.map((key) => {
                if(key.toLowerCase().includes(filter) || this.options[key].toLowerCase().includes(filter)){
                    filtered[key] = this.options[key];
                }
            });
            return filtered;
        }
    },
    data(){
        return {
            filter: '',
            open: false,
            inputLocal: null,
            lastCharCode: -1
        }
    },
    methods: {
        setBaseCurrency(code){
            event.preventDefault();
            window.localStorage.setItem('baseCurrencyLocal', code);
            this.$emit('update:baseCurrency', code);
        }
    },
    mounted() {
        this.inputLocal = this.input;
    },
    watch: {
        inputLocal(){
            this.$emit('update:input', this.inputLocal);
        }
    }
}
</script>

<style scoped>
    .hidden{
        display: none;
    }
    .input-wrap{
        position: relative; 
        margin: 10px 5px;
    }
    .input-line{
        display: flex;
        border: 1px solid var(--color-dark);
        border-radius: 6px;
        align-items: center;
    }
    .text-input{
        display: flex;
        flex-grow: 1;
        color: var(--color-dark);  
        outline: none;
        margin: 0px 5px 0px 5px;
        height: 42px;
        background-color: var(--color-lightgray);
        font-size: 30px;
        text-align: center;
        border: 1px;
        width: 100%;
    }
    .select{
        display: flex;
        position: relative;
        text-align: left;
        line-height: 40px;
        border-left: 1px solid var(--color-dark);
        width: 80px;
    }
    .selected{
        cursor: pointer;
        user-select: none;
        font-weight: 700;
        padding: 5px;
        display: flex;
        align-items: center;
    }
    .selected-name{
        display: flex;
    }
    .selected-arrow::after{
        display: flex;
        width: 40px;
        height: 40px;
        align-items: center; 
        justify-content: center;
        content: "\25BC";
    }
    .selected.open > .selected-arrow::after{
        content: "\25B2";
    }
    .items{
        background-color: var(--color-lightgray);
        border: 1px solid var(--color-dark);
        border-radius: 6px;
        position: absolute;
        z-index: 5;
        width: 100%;
    }
    .option:hover{
        color: var(--color-white);
        background-color: var(--color-blue);
    }
    .items-filter{
        width: 100%;
        border: 1px solid var(--color-dark);
        border-radius: 6px;
        outline: none;
        display: flex;
        font-size: 20px;
    }
    .options{
        max-height: 150px;
        overflow-y: scroll;
    }
    .option{
        padding: 3px;
        border-bottom: 1px solid var(--color-dark);
        display: flex;
        align-items: center;
    }
    .option-label{
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }
    .option-label-main{
        font-weight: 700;
        font-size: 18px;
    }
    .option-label-secondary{
        font-size: 14px;
        color: #999;
    }
    .option-label-main, .option-label-secondary{
        padding: 0px 5px;
    }
    .option:hover .option-label-secondary{
        color: #eee;
    }
    .option-bookmark{
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
    .filter{
        padding: 5px;
    }
</style>