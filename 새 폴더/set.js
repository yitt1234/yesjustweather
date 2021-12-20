var hour = function() {
    var fname ="";
    var today =new Date();
    var hh = today.getHours();
    if(hh>=6 && hh<=16)
    {
        fname="sun.png";
    }
    else
    {
        fname="moon.jpg";
    }
    
    document.getElementById("time").src=fname;
}