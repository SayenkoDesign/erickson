<?php
/*
Template Name: Form
*/

add_filter('show_admin_bar', '__return_false');

add_action('get_header', function() {
    remove_action('wp_head', '_admin_bar_bump_cb');
});

get_header(); ?>
  
<div class="grid-container">

    <div class="grid-x grid-margin-x align-middle align-center">    
  
        <div id="primary" class="cell content-area">
    
            <main id="main" class="site-main" role="main">
            <?php		
                    
            while ( have_posts() ) :
        
                the_post();
                            
                ?>
                <div class="modal-form">
                    <div class="wrap">
                        <div class="modal-body">
                        <?php                            
                            printf('<img src="%slogo.svg" alt="site logo" class="logo" />', trailingslashit( THEME_IMG ) ); 
                
                            the_title( '<h1 class="entry-title">', '</h2>' );
                            
                            the_content();                        
                        ?>
                      </div>
                    </div>
                </div>
                                <?php
                    
            endwhile;
            
            ?>
            </main>
        
        </div>
    
    </div>

</div>

<?php

get_footer();
