var arrVisualize = new Vue({
    el: "#array-visualization-container",
    data: {
        visual_arr: [],
        speed: 100,
        maxSpeed: 2000,
        reset: false,
        ascending: true,
        inactiveColor: '#000',
        inactiveBGColor: '#fff',
        discardedColor: '#0f0f0f',
        discardedBGColor: '#afafaf',
        selectedBGColor: '#00A5E0',
        secondarySelectedBGColor: '#EF9CDA',
        transitionBGColor: '#32CBFF',
        sortedColor: '#fff',
        sortedBGColor: '#02c39a'
    },
    methods: {
        selectionSort: async function () {
            this.discardedBGColor = this.sortedBGColor;
            for (i = 0; i < this.visual_arr.length - 1; i++){
                if (this.speed > 0) {
                    this.changeElementStyle(i, this.selectedBGColor, '#fff');
                }
                for (j = i + 1; j < this.visual_arr.length; j++){
                    if (this.reset) 
                        break;
                    if (j > i + 1 && this.speed > 0) {
                        this.changeElementStyle(j-1, '#FBEEF8', this.inactiveColor);
                    }
                    this.changeElementStyle(j, this.secondarySelectedBGColor, '#fff');

                    if ((this.ascending && this.visual_arr[i] > this.visual_arr[j])
                    || (!this.ascending && this.visual_arr[i] < this.visual_arr[j])
                    && !this.reset) {
                        if (this.speed > 0) {
                            if (this.speed > 500)
                                await this.sleep(500);
                        }
                        this.changeElementStyle(i,this. transitionBGColor, '#32CBFF');
                        this.changeElementStyle(j, this.transitionBGColor, '#32CBFF');
                        temp = this.visual_arr[i];
                        Vue.set(this.visual_arr, i, this.visual_arr[j]);
                        Vue.set(this.visual_arr, j, temp);
                        if (this.speed > 0) {
                            if (this.speed > 500)
                                await this.sleep(500);
                        }
                        this.changeElementStyle(i, this.selectedBGColor, '#fff');
                    }
                    if (this.speed > 0) {
                        this.changeElementStyle(j, this.secondarySelectedBGColor, '#fff');
                        await this.sleep();
                    }
                }
                if (this.speed > 0) {
                    this.changeArrayStyle(this.inactiveBGColor, this.inactiveColor, true);
                    this.changeElementStyle(i, this.discardedBGColor, this.discardedColor);
                }
            }
            if (!this.reset)
                this.changeArrayStyle(this.sortedBGColor, this.sortedColor);
            else
                this.changeArrayStyle(this.inactiveBGColor, this.inactiveColor);
            $("#stopButton").attr("disabled", true);
        },
        startSort: async function () {
            $("#stopButton").attr("disabled", false);
            this.reset = false; 
            this.changeArrayStyle(this.inactiveBGColor, this.inactiveColor);
            this.selectionSort();
        },
        stopSort: function () {
            $("#stopButton").attr("disabled", true);
            this.reset = true;
            this.changeArrayStyle(this.inactiveBGColor, this.inactiveColor);
        },
        sleep: async function (msec = this.speed) {
            if (this.speed > this.maxSpeed) {
                this.speed = this.maxSpeed
                msec = this.speed
            }
            return new Promise(resolve => setTimeout(resolve, msec));
        },
        changeElementStyle: function (idx, bg_color, color) {
            $('.arrVisualize #' + idx).css({ 'background-color': bg_color, 'color': color });
        },
        changeArrayStyle: function (bg_color, color, ignoreDiscarded = false) {
            if (!ignoreDiscarded)
                $('.arrVisualize li').css({ 'background-color': bg_color, 'color': color });
            else
                $('.arrVisualize li').each((index, el) => {
                    let listitem = $(el)
                    if (listitem.css('background-color') != this.discardedBGColor)
                        listitem.css({ 'background-color': bg_color, 'color': color });
                });
        },
        setAscending: function () {
            if ($('#orderDropdown').html() !== 'Ascending') {
                this.stopSort();
                this.ascending = true;
                $('#orderDropdown').html('Ascending');
            }
        },
        setDescending: function () {
            if ($('#orderDropdown').html() != 'Descending') {
                this.stopSort();
                this.ascending = false;
                $('#orderDropdown').html('Descending');
            }
        }
    }
});

var arrDisplay = new Vue({
    el: "#array-container",
    data: {
        arr: [],
        visual_arr: [],
        n: 10,
        maxLen: 200,
        minRange: 1,
        maxRange: 20
    },
    methods: {
        genArray: function () {
            arrVisualize.stopSort();
            if (this.n > this.maxLen)
                this.n = this.maxLen;
            if (this.n < 2 || isNaN(this.n))
                this.n = 2
            if (isNaN(this.minRange))
                this.minRange = 1
            if (isNaN(this.maxRange))
                this.maxRange = 20
            this.arr = Array.from(
                { length: this.n },
                () => Math.floor(Math.random() * (this.maxRange - this.minRange + 1) ) + Number(this.minRange)
            );
            arrVisualize.visual_arr = Array.from(this.arr);
        }
    }
});

$.cssHooks.backgroundColor = {
    get: function(elem) {
        if (elem.currentStyle)
            var bg = elem.currentStyle["backgroundColor"];
        else if (window.getComputedStyle)
            var bg = document.defaultView.getComputedStyle(elem,
                null).getPropertyValue("background-color");
        if (bg.search("rgb") == -1)
            return bg;
        else {
            bg = bg.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            function hex(x) {
                return ("0" + parseInt(x).toString(16)).slice(-2);
            }
            return "#" + hex(bg[1]) + hex(bg[2]) + hex(bg[3]);
        }
    }
}

arrDisplay.genArray();