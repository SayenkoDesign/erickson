<?php
// Archive

get_header(); 

_s_get_template_part( 'template-parts/case-study', 'hero' );

/*
get image from meta field
$image = get_post_meta( $post_d, '_video_thumbnail', true );
attachment_url_to_postid( $image );
if false, just use the url
*/
?>

<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
            
                <main id="main" class="site-main" role="main">
                           
                    <?php                    
                    
                    printf( '<div class="filters">%s</div>', 
                        facetwp_display( 'facet', 'service' )
                     );
                    
                    $classes[] = 'small-up-1 medium-up-2 large-up-3 xxlarge-up-4';
                    
                    printf( '<div class="facetwp-template grid-x grid-margin-x %s grid" data-equalizer data-equalize-on="medium" data-equalize-by-row="true">', join( ' ', $classes ) );
                     
                    if ( have_posts() ) : ?>
                        
                       <?php
                                                      
                        while ( have_posts() ) :
            
                            the_post();
                                                                   
                            _s_get_template_part( 'template-parts', 'content-post-column' );
                            
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
