<?php
add_filter('show_admin_bar', '__return_false');

add_action('get_header', function() {
    remove_action('wp_head', '_admin_bar_bump_cb');
});

get_header(); ?>
  
<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
    
            <main id="main" class="site-main" role="main">
            <?php		
                    
            while ( have_posts() ) :
        
                the_post();
                            
                get_template_part( 'template-parts/content', 'modal' );
                    
            endwhile;
            
            ?>
            </main>
        
        </div>
    
    </div>

</div>

<?php

get_footer();
