var arrVisualize = new Vue({
    el: "#array-visualization-container",
    data: {
        visual_arr: [],
        speed: 100,
        reset: false,
        inactiveColor: '#000',
        inactiveBGColor: '#fff',
        selectedBGColor: '#00A5E0',
        secondarySelectedBGColor: '#EF9CDA',
        transitionBGColor: '#32CBFF',
        sortedColor: '#fff',
        sortedBGColor: '#02c39a'
    },
    methods: {
        selectionSort: async function () {
            for (i = 0; i < this.visual_arr.length - 1; i++){
                this.changeElementStyle(i, this.selectedBGColor, '#fff');
                for (j = i + 1; j < this.visual_arr.length; j++){
                    if (this.reset) 
                        break;
                    if (j > i + 1) {
                        this.changeElementStyle(j-1, this.inactiveBGColor, this.inactiveColor);
                    }
                    this.changeElementStyle(j, this.secondarySelectedBGColor, '#fff');
                    if ((this.visual_arr[i] > this.visual_arr[j]) && !this.reset) {
                        if (this.speed > 0) 
                            await this.sleep();
                        this.changeElementStyle(i,this. transitionBGColor, '#32CBFF');
                        this.changeElementStyle(j, this.transitionBGColor, '#32CBFF');
                        temp = this.visual_arr[i];
                        Vue.set(this.visual_arr, i, this.visual_arr[j]);
                        Vue.set(this.visual_arr, j, temp);
                        if (this.speed > 0)
                            await this.sleep();
                        this.changeElementStyle(i, this.selectedBGColor, '#fff');
                    }
                    this.changeElementStyle(j, this.secondarySelectedBGColor, '#fff');
                    if (this.speed > 0)
                        await this.sleep();
                }
                this.changeElementStyle(i, this.inactiveBGColor, this.inactiveColor);
                this.changeElementStyle(j-1, this.inactiveBGColor, this.inactiveColor);
            }
            if (!this.reset)
                this.changeArrayStyle(this.sortedBGColor, this.sortedColor);
            else
                this.changeArrayStyle(this.inactiveBGColor, this.inactiveColor);
        },
        startSort: async function () {
            this.reset = false; 
            this.changeArrayStyle(this.inactiveBGColor, this.inactiveColor);
            this.selectionSort();
        },
        stopSort: function () {
            this.reset = true;
            this.changeArrayStyle(this.inactiveBGColor, this.inactiveColor);
        },
        sleep: async function (msec = this.speed) {
            return new Promise(resolve => setTimeout(resolve, msec));
        },
        changeElementStyle: function (idx, bg_color, color) {
            $('.arrVisualize #' + idx).css({ 'background-color': bg_color, 'color': color });
        },
        changeArrayStyle: function (bg_color, color) {
            $('.arrVisualize li').css({ 'background-color': bg_color, 'color': color });
        }
    }
});

var arrDisplay = new Vue({
    el: "#array-container",
    data: {
        arr: [],
        visual_arr: [],
        n: 10,
        minRange: 1,
        maxRange: 20
    },
    methods: {
        genArray: function () {
            arrVisualize.stopSort();
            this.arr = Array.from(
                { length: this.n },
                () => Math.floor(Math.random() * (this.maxRange - this.minRange + 1) ) + Number(this.minRange)
            );
            arrVisualize.visual_arr = Array.from(this.arr);
        }
    }
});



arrDisplay.genArray();