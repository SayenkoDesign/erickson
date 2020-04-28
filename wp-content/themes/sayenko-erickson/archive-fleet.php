<?php
// Archive

get_header(); 

_s_get_template_part( 'template-parts/fleet', 'hero' );
?>

<div class="grid-container">

    <div class="grid-x grid-padding-x align-center">    
  
        <div id="primary" class="cell large-9 small-order-2 content-area">
            
                <main id="main" class="site-main" role="main">
                           
                    <?php 
                    
                    $classes[] = 'small-up-1 large-up-2';
                    
                    printf( '<div class="grid-x grid-margin-x grid-margin-bottom facetwp-template %s">', join( ' ', $classes ) );
                     
                    if ( have_posts() ) : ?>
                        
                       <?php
                                                      
                        while ( have_posts() ) :
            
                            the_post();
                                                                   
                            _s_get_template_part( 'template-parts/fleet', 'post-column' );
                            
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
        
        <div id="secondary" class="cell large-3 small-order-1 widget-area" role="complementary">
            <?php 
                $fleet_filters = [
                    'Manufacturer',
                    'Introduction',
                    'Powerplant',
                    'Capacity',
                    'Fuselage Length',
                    'Max Internal Cargo*',
                    'Max External Cargo*',
                    'Lift Capacity*',
                    'Max Takeoff Weight',
                    'Max Speed',
                    'Max Range',
                ];
                
                $filters = ''; 
                
                foreach( $fleet_filters as $filter ) {
                    
                    $slug = str_replace( '-', '_', sanitize_title_with_dashes( $filter ) );
                    
                    $facet = facetwp_display( 'facet', $slug );
                    
                    $filters .= sprintf( '<li>%s</li>', $facet );
                }
                                 
                printf( '<h2>%s</h2>
                        <ul class="no-bullet facetwp-filters">
                            %s
                            <li><button class="button" onclick="FWP.reset()">%s</button></li>
                        </ul>', 
                        __( 'Sort By' ),
                        $filters,
                        __( 'reset' )
                 );
            ?>
        </div><!-- #secondary -->
        
    </div>
</div>
<?php
get_footer();
