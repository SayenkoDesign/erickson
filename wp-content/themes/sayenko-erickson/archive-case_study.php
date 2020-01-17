<?php
// Archive

get_header(); 

_s_get_template_part( 'template-parts/case-study', 'hero' );
?>

<div class="grid-container">

    <div class="grid-x grid-margin-x align-center">    
  
        <div id="primary" class="cell large-10 content-area">
            
                <main id="main" class="site-main" role="main">
                           
                    <?php                    
                    
                    printf( '<ul class="menu filters"><li>%s</li><li><button class="button" onclick="FWP.reset()">%s</button></li></ul>', 
                        facetwp_display( 'facet', 'case_study_service' ),
                        __( 'reset' )
                     );
                    
                    $classes[] = 'small-up-1 large-up-2';
                    
                    printf( '<div class="facetwp-template grid-x grid-margin-x %s grid">', join( ' ', $classes ) );
                     
                    if ( have_posts() ) : ?>
                        
                       <?php
                                                      
                        while ( have_posts() ) :
            
                            the_post();
                                                                   
                            _s_get_template_part( 'template-parts/case-study', 'post-column' );
                            
                        endwhile;
                   
                    endif; 
                    
                    echo '</div>';
                    
                    if( function_exists( 'facetwp_display' ) ) {
                        echo facetwp_display( 'facet', 'load_more' );
                    } else if( function_exists( '_s_paginate_links' ) ) {
                        echo _s_paginate_links();
                    } else {
                        echo paginate_links();   
                    }
                    ?>
            
                </main>
            
        </div>
        
    </div>
</div>
<?php
get_footer();
