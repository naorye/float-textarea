$(function() {
    var maxFontSize = 100,
        minFontSize = 10;

    $.fn.textBlock = function() {
        this.each(function() {
            var elem = $(this),
                parent = elem.parent();
                textarea = elem.find(".textarea"),
                widthOffset = elem.outerWidth(true) - elem.width(),
                heightOffset = elem.outerHeight(true) - elem.height(),
                clone = null;

            elem.css({
                "max-width": parent.width() - widthOffset,
                "max-height": parent.height() - heightOffset
            });

            function calculateDimensions(fontFamily, fontSize) {
                var text = textarea.html(),
                    clone = $("<div class='clone' contenteditable='true'></div>")
                        .css({
                            "font-size": fontSize,
                            "font-family": fontFamily
                        })
                        .html(text)
                        .appendTo("body");
                var dimensions = {width: clone.width(), height: clone.height()};
                clone.remove();
                return dimensions;
            }

            function isDimensionsContained(dimensions, container) {
                return  dimensions.height <= container.height &&
                        dimensions.width <= container.width;
            }

            function isDimensionsContains(dimensions, container) {
                return  dimensions.height >= container.height &&
                        dimensions.width >= container.width;
            }

            var criteriaDimensions = null;

            function calculateCriteriaDimensions(fontFamily, fontSize) {
                return {
                    increase: calculateDimensions(fontFamily, fontSize + 1),
                    decrease: calculateDimensions(fontFamily, fontSize - 1)
                };
            }

            elem.draggable().
                click(function() {
                    elem.draggable("option", "disabled", true);
                    textarea.focus();
                })
                .resizable({
                    aspectRatio: true,
                    handles: "nw, ne, sw, se",
                    start: function(event, ui) {
                        var fontFamily = textarea.css("font-family"),
                            fontSize = parseFloat(textarea.css("font-size"));
                        criteriaDimensions = calculateCriteriaDimensions(fontFamily, fontSize);
                    },
                    resize: function(event, ui) {
                        var fontFamily = textarea.css("font-family"),
                            fontSize = parseFloat(textarea.css("font-size")),
                            isIncrease = isDimensionsContains(ui.size, criteriaDimensions.increase),
                            isDecrease = isDimensionsContained(ui.size, criteriaDimensions.decrease);

                        while (isIncrease || isDecrease) {

                            if (isIncrease) {
                                fontSize++;
                                isIncrease = isDimensionsContains(ui.size, criteriaDimensions.increase);
                                isDecrease = false;
                            } else if (isDecrease) {
                                fontSize--;
                                isDecrease = isDimensionsContained(ui.size, criteriaDimensions.decrease);
                                isIncrease = false;
                            }
                            
                            criteriaDimensions = calculateCriteriaDimensions(fontFamily, fontSize);
                        }

                        textarea.css("font-size", fontSize);
                    }
                });

            textarea
                .blur(function() {
                    elem.draggable("option", "disabled", false);
                })
                .keyup(function() {
                    var fontFamily = textarea.css("font-family"),
                        fontSize = parseFloat(textarea.css("font-size")),
                        dimensions = calculateDimensions(fontFamily, fontSize);
                    console.log("new dimensions", dimensions);
                    elem.css(dimensions);
                });
        });
    };
});