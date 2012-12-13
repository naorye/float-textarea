$(function() {
    $.fn.floatText = function() {
        this.draggable()
            .click(function() {
                $(this)
                    .draggable("option", "disabled", true)
                    .focus();
            })
            .blur(function() {
                $(this).draggable("option", "disabled", false);
            })
            .resizable({
                aspectRatio: true,
                handles: "nw, ne, sw, se"
            })
            .bind("resize", function(event, ui) {
                var $this = $(this);
                var lines = $this.find("br").length + 1;
                var height = ui.size.height / lines;
                $this.css({
                    "font-size": height,
                    "width": "",
                    "height": ""
                });
                event.stopPropagation();
            });
    };
});