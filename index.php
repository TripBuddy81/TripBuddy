<?php
// In general, the webpage does not need server side code. This is for some experimentation only for the time beeing.

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

readfile('index.html');
?>