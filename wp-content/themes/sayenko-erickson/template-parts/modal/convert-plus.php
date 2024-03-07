<?php

/*
Modal - ConvertPlus
		
*/

?>
<div class="modal-body">
<?php

	
		printf('<img src="%slogo.svg" alt="site logo" class="logo" />', trailingslashit( THEME_IMG ) ); 
			
		the_content();

	endwhile;

?>
    <button type="button" data-fancybox-close="" class="fancybox-button fancybox-close-small" title="Close">
    <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path></svg>
    </button>
</div>
<?php
endif;
    
wp_reset_postdata();
?>