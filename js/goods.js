const app = Vue.createApp({
    data() {
        return {
            items: []
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            fetch('goods.php')
            .then(response => response.json())
            .then(data => {
                this.items = data;
            })
            .catch(error => {
                console.error('Ошибка:', error);
            });
        }
    }
});

app.mount('#app');
