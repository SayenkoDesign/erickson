<?php

get_header(); ?>

<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
        
            <main id="main" class="site-main" role="main">
                <div class="fleet-ajax">
                    <!-- We need to load this here because of fanxcybox -->
                   <script type='text/javascript' src='//static.addtoany.com/menu/page.js'></script>
                    <?php
                    while ( have_posts() ) :
            
                        the_post();
                        
                        _s_get_template_part( 'template-parts/fleet', 'post-content' );
                        
                        _s_get_template_part( 'template-parts/fleet', 'related-posts' );   
            
                    endwhile;       
                   ?>
       
                </div>
            </main>
        
        </div>
    
    </div>
            
</div>


<?php
get_footer();
