<?php
//My Custom FILTER to Disable checking for duplicates
add_filter('wp_all_import_is_check_duplicates', 'disable_check_dupe_func', 10, 2);

//My Custom FUNCTION to Disable checking for duplicates
function disable_check_dupe_func($truefalse, $thisid){
    $truefalse = false;
    return $truefalse;
}//disable_check_dupe_func($truefalse, $thisid){