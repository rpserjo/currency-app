<template>
    <div class="icon">
        <svg class="icon" :width="w" :height="h" viewBox="0 0 24 24">
            <path :d="icons[icon]"></path>
        </svg>
    </div>
</template>

<script>
export default {
    name : 'my-icon',
    props : ['w', 'h', 'icon'],
    data(){
        return {
            icons : {
                'bookmark': 'M17,3H7C5.9,3 5,3.9 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z',
                'bookmark-outline': 'M17,18L12,15.82L7,18V5H17M17,3H7C5.9,3 5,3.9 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z',
                'bookmark-off': 'M20,20.72L18.73,22L16.78,20.05L12,18L5,21V8.27L2,5.27L3.28,4L20,20.72M19,17.16V5C19,3.89 18.1,3 17,3H7C6.41,3 5.89,3.27 5.5,3.68L19,17.16Z',
                'reset': 'M12,3C7.03,3 3,7.03 3,12H0L4,16L8,12H5C5,8.13 8.13,5 12,5C15.87,5 19,8.13 19,12C19,15.87 15.87,19 12,19C10.5,19 9.09,18.5 7.94,17.7L6.5,19.14C8.04,20.3 9.94,21 12,21C16.97,21 21,16.97 21,12C21,7.03 16.97,3 12,3M14,12C14,10.9 13.1,10 12,10C10.9,10 10,10.9 10,12C10,13.1 10.9,14 12,14C13.1,14 14,13.1 14,12Z'
            }
        }
    }
}
</script>

<style scoped>
    .icon{
        display: flex;
        align-items: center;
    }    
</style>