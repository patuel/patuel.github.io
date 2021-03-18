let app = new Vue({
    el: '#app',
    data: {
        selected: "❤️"
    },
    watch: {
        selected: function (newE, oldE) {
            console.log(newE, oldE);
            // clearCanvas();
            setImage(newE);
        }
    },
});