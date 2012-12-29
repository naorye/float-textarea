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

    $.fn.textBlock = function() {
        $tx = this;
        $dupe = $("<p class='text-block-dupe'></p>").appendTo("body");

        update();

        $tx.on('keydown', function() {
        setTimeout(update, 0);
        });
        $tx.on('propertychange input keyup change', update);

        function update() {
            var text = $tx.val();
            $dupe.text(text);
            $dupe.css("font-size", $tx.css("font-size"));

            var lineHeight = parseFloat($tx.css('line-height'));
            
            $tx.css({
                width: $dupe.width(),
                height: Math.max($dupe.height(), lineHeight)
            });
        }

        // not sure if this is needed, leaving it because
        // I don't have many browsers to test on
        $tx.on('scroll', function() {
            tx.scrollLeft = 0;
            tx.scrollTop = 0;
        });
    };
});