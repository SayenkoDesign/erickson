<?php

/*
Modal - Form Webinar
		
*/

?>

<div style="display: none;" class="modal-form" id="<?php echo $slug; ?>">
    <div class="wrap">
        <div class="modal-body">
        <?php
            
        printf('<div class="modal-message"><img src="%slogo.svg" alt="site logo" class="logo" />%s</div>', trailingslashit( THEME_IMG ), $content ); 
        
        // Settings heading/content
        echo do_shortcode( sprintf( '[gravityform id="%s" title="false" description="false" ajax="true"]', $form_id ) );
        
        ?>
      </div>
    </div>
    <button type="button" data-fancybox-close="" class="fancybox-button fancybox-close-small" title="Close">
    <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path></svg>
    </button>
</div>