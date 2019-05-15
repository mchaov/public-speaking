    //set vars
    var parent;
    var items;
    var selectedPage = 0;
    var pages = 4;
    var scrollStep = 800;
    var log;

    var X = 0                 //starting point X
    var Y = 0                 //starting point Y
    var dX = 0                //distance traveled X
    var dY = 0                //distance traveled Y

    var pxDeviation = 4;      //multiplied returns deviations from which we decide what and if to scroll
        
    //set starting points
    function touchStart(e)
    {
        e.stopPropagation();
        X = parseInt(e.changedTouches[0].clientX);
        Y = parseInt(e.changedTouches[0].clientY);
    }

    //track movement
    function touchMove(e)
    {
        dX = parseInt(e.changedTouches[0].clientX) - X;
        dY = parseInt(e.changedTouches[0].clientY) - Y;
        //if scroll occurs in vertical direction
        if (Math.abs(dY) > (pxDeviation * 4))
        {
            //is this diagonal scroll? -> more X-ish or Y-ish the user tries to scroll?
            if(Math.abs(dX) > Math.abs(dY)) //if X-ish -> it's a swipe
            {
                e.preventDefault(); //no vertical scroll
                callScroll();
                logMe(false, '<strong>X-ish Diagonal Swipe!</strong>');
                
                return false;
            }
            logMe(false, '<em>Vertical Triggered!</em>');
        }
        //if user inits horizontal scroll
        else if(Math.abs(dX) > pxDeviation)
        {
            e.preventDefault();
            //if user scrolls a long range in horizontal direction -> bypass touchEnd
            if(Math.abs(dX) > (pxDeviation * 25))
            {
                callScroll();
            }
            logMe(false, 'Pure horizontal <strong>Swipe</strong>!');
        }
        //always return false!!!
        return false;
    }
    
    function generateTranslateString(x)
    {
        if (!x) var x = 0;
        return '-moz-transform: translate3d(' + x + 'px, 0, 0);-ms-transform: translate3d(' + x + 'px, 0, 0);-o-transform: translate3d(' + x + 'px, 0, 0);-webkit-transform: translate3d(' + x + 'px, 0, 0);transform: translate3d(' + x + 'px, 0, 0)';
    }

    //determine swipe direction
    function callScroll()
    {
        (dX > 0) ? slideRight() : slideLeft();
    }

    function slideLeft()
    {
        reset();
        
        var w;
        selectedPage += 1;
        if(selectedPage < pages)
        {
            console.log('scroll <-');
            logMe(false, '------------------------------');
            logMe(false, '>');
            w = scrollStep * selectedPage * (-1);
        }
        else
        {
            selectedPage = pages - 1;
            console.log('END OF LIST, NO SCROLL');
            logMe(false, '>');
            logMe(false, '<strong>No more pages to scroll that way!</strong>');
            return false;
        }
        
        
        $(items).attr('style', generateTranslateString(w));
        return false;
    }

    function slideRight()
    {
        reset();
        
        var w;
        selectedPage = selectedPage - 1;
        if(selectedPage > 0)
        {
            console.log('scroll ->');
            logMe(false, '------------------------------');
            logMe(false, '<');
            w = scrollStep * selectedPage * (-1);
        }
        else
        {
            w = 0;
            selectedPage = 0;
            console.log('START OF LIST, NO SCROLL');
            logMe(false, '------------------------------');
            logMe(false, '<');
            logMe(false, '<strong>No more pages to scroll that way!</strong>');
            
            $(items).attr('style', generateTranslateString(w));
            return false;
        }
        
        $(items).attr('style', generateTranslateString(w));
        return false;
    }
    
    function reset()
    {
        logMe(true, '<em>Restart Called</em>');
        kill();
        setTimeout(function(){
            init();
        }, 500);
    }
    
    function kill()
    {
        console.log('Detached');
        logMe(false, '<em>Detached</em>');
        parent.removeEventListener('touchstart', touchStart, false);
        parent.removeEventListener('touchmove', touchMove, false);
    }
    
    function init()
    {
        console.log('Attached');
        logMe(false, '------------------------------');
        logMe(false, '<strong>Attached</strong>');
        parent.addEventListener('touchstart', touchStart, false);
        parent.addEventListener('touchmove', touchMove, false);
    }
    
    function logMe(clearMe, updateMe)
    {
        if(clearMe === false)
        {
            log.innerHTML = updateMe + '<br/>' + log.innerHTML;
        }
        else
        {
            log.innerHTML = updateMe;
        }
    }

    $(document).ready(function(){
        //get our HTML elements
        parent = document.getElementById('content');
        items = document.getElementById('scroller');
        log = document.getElementById('log');

        init();
    });