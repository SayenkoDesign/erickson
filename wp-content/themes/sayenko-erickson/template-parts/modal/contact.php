<?php

/*
Modal - Contact
		
*/

function modal_contact() {
    
    $form_id = 1;
    $form = GFAPI::get_form( $form_id );
    
    if( is_wp_error( $form ) ) {
        return;
    }
    
     ?>
    <div class="modal-contact small reveal" id="contact" data-reveal data-deep-link="false" data-animation-in="hinge-in-from-middle-y fast" data-animation-out="hinge-out-from-middle-y fast">
 	<div class="wrap">
		<button class="close-button" data-close aria-label="Close modal" type="button">
		<span aria-hidden="true">&times;</span>
	    </button>
        <?php
        printf( '<div class="modal-title"><h2>%s</h2></div>', $form['title'] );
        ?>
      
        <div class="modal-body">
        <?php
        printf( '<div class="hubspot-form"><!--[if lte IE 8]>
        <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script>
        <![endif]-->
        <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
        <script>
        (function($) {
            hbspt.forms.create({
                region: "na1",
                portalId: "21030106",
                formId: "961fd2ef-9809-4ece-8b5d-30a0294633dc",
                onFormReady($form){
                    $("input[name=\"form_source\"]", $form).val("%s").change();
                }
            });
            
        })(jQuery);
        </script>
         </div>', 
         esc_url( rtrim( get_permalink(), '/' ) )
        );  
    
        ?>
      </div>
   </div>
</div>
<?php
       
}
modal_contact();