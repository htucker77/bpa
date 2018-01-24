var hostName = location.protocol + '//' + location.host; //'http://wheeldecide.com';
function getWheels(userid)
{
if (userid=="")
 {
	return;
 }
if (window.XMLHttpRequest)
 {// code for IE7+, Firefox, Chrome, Opera, Safari
 xmlhttp=new XMLHttpRequest();
 }
else
 {// code for IE6, IE5
 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
 }
xmlhttp.onreadystatechange=function()
 {
 if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("listdiv").innerHTML=xmlhttp.responseText;
    }
 }
xmlhttp.open("GET", hostName + "/fn-wheels.php?u=" + userid,true);
xmlhttp.send();
}

function addWheel(userid, url, title, wheelid)
{
    if (typeof wheelid === 'undefined') { wheelid = 0; }
if (userid=="")
 {
	return;
 }
if (window.XMLHttpRequest)
 {// code for IE7+, Firefox, Chrome, Opera, Safari
 xmlhttp=new XMLHttpRequest();
 }
else
 {// code for IE6, IE5
 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
 }
xmlhttp.onreadystatechange=function()
 {
 if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        var response = xmlhttp.responseText;
        if (response.match(/^Saved/gi)) {
            document.getElementById("addwheeldiv").innerHTML="Saved as New Wheel";
            var parts = response.split(":");
            if (parts.length > 1) {
                document.getElementById("old_id").value = parts[1];
            }
        } else {
            document.getElementById("addwheeldiv").innerHTML=response;
        }
    }
 }
 var encurl = encodeURIComponent(url);
 var enctitle = encodeURIComponent(title);
xmlhttp.open("GET",hostName + "/fn-add.php?u=" + userid + "&t=" + enctitle + "&url=" + encurl + "&wheelid=" + wheelid,true);
xmlhttp.send();
}

function updateWheel(userid, url, title, wheelid)
{
if (userid=="")
 {
	return;
 }
if (window.XMLHttpRequest)
 {// code for IE7+, Firefox, Chrome, Opera, Safari
 xmlhttp=new XMLHttpRequest();
 }
else
 {// code for IE6, IE5
 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
 }
xmlhttp.onreadystatechange=function()
 {
 if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
        var response = xmlhttp.responseText;
        if (response.match(/^Saved/gi)) {
            document.getElementById("updatewheeldiv").innerHTML="Updated Wheel";
        } else {
            document.getElementById("updatewheeldiv").innerHTML=xmlhttp.responseText;
        }
    }
 }
 var encurl = encodeURIComponent(url);
 var enctitle = encodeURIComponent(title);
xmlhttp.open("GET",hostName + "/fn-add.php?u=" + userid + "&t=" + enctitle + "&url=" + encurl + "&mod=1&wheelid=" + wheelid,true);
xmlhttp.send();
}

function deleteWheel(userid, id)
{
if (confirm('Are you sure you want to delete this wheel?')) {
    // Continue
} else {
   return;
}


if (userid=="")
 {
	return;
 }
if (window.XMLHttpRequest)
 {// code for IE7+, Firefox, Chrome, Opera, Safari
 xmlhttp=new XMLHttpRequest();
 }
else
 {// code for IE6, IE5
 xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
 }
xmlhttp.onreadystatechange=function()
 {
 if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById("savedwheeldiv"+id).innerHTML=xmlhttp.responseText;
    }
 }
xmlhttp.open("GET",hostName + "/fn-delete.php?u=" + userid + "&id=" + id,true);
xmlhttp.send();
}