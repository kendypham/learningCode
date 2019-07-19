var i = 0;
    function incrementClick() {
        document.getElementById('inc').value = ++i;
    }
    function decrementClick() {
        document.getElementById('inc').value = --i;
    }

    document.getElementById('btn-decrement').onclick = function(){
	    decrementClick();
    };

     document.getElementById('btn-increment').onclick = function(){
	    incrementClick();
    };