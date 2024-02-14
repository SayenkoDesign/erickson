<?php

function _s_acf_styles() {
  echo '<style>
    .admin-bar .menu-item:not(.menu-item-depth-0) .acf-field-5de832ce500d5 {
        display: none;
    }
    
    .admin-bar .menu-item-depth-0 .acf-field-5de832626c291 {
        display: none;
    }
  </style>';
}

add_action('admin_head', '_s_acf_styles');
