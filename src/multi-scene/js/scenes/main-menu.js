
const mainMenu = {
    setup: function () {
        this.button = createButton('click me');
        this.button.position(19, 19);
        this.button.mousePressed(this.test);
    },

    tearDown: function() {
        this.button.remove();
    },

    draw: function() {

    },
    
    test: function() {
        switchScene(jumpAndRun);
    }
};