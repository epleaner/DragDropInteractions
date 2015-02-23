(function() {
    var body = $(document.body),
        dropArea = $('#drop-area'),
        droppableArr = [],
        dropAreaTimeout;

    // initialize droppables
    [].slice.call(document.querySelectorAll('#drop-area .drop-area__item')).forEach(function(el) {
        droppableArr.push(new Droppable(el, {
            onDrop: function(instance, draggableEl) {
                // show checkmark inside the droppabe element
                classie.add(instance.el, 'drop-feedback');
                clearTimeout(instance.checkmarkTimeout);
                instance.checkmarkTimeout = setTimeout(function() {
                    classie.remove(instance.el, 'drop-feedback');
                }, 800);
                console.log('on drop callbacks here');
            }
        }));
    });

    // initialize draggable(s)
    [].slice.call(document.querySelectorAll('#grid .grid__item')).forEach(function(el) {
        new Draggable(el, droppableArr, {
            scroll: true,
            scrollable: '#drop-area',
            scrollSpeed: 40,
            scrollSensitivity: 50,
            draggabilly: {
                containment: document.body
            },
            onStart: function() {
                // add class 'drag-active' to body
                body.addClass('drag-active');
                // clear timeout: dropAreaTimeout (toggle drop area)
                clearTimeout(dropAreaTimeout);
                // show dropArea
                dropArea.addClass('show');
                console.log('on start drag callbacks here');
            },
            onEnd: function(wasDropped) {
                var afterDropFn = function() {
                    // hide dropArea
                    dropArea.removeClass('show');
                    // remove class 'drag-active' from body
                    body.removeClass('drag-active');
                };

                if (!wasDropped) {
                    afterDropFn();
                } else {
                    // after some time hide drop area and remove class 'drag-active' from body
                    clearTimeout(dropAreaTimeout);
                    dropAreaTimeout = setTimeout(afterDropFn, 400);
                }
            }
        });
    });
})();
