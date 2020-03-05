<?php
/*
Template Name: Photo Gallery
*/


get_header(); ?>

<?php
_s_get_template_part( 'template-parts/global', 'hero' );
?>

<div class="grid-container">

    <div class="grid-x grid-margin-x align-center">    
  
        <div id="primary" class="cell large-10 content-area">

            <main id="main" class="site-main" role="main">
            <?php
            $photos = _s_get_gallery_photos();
            
            if( ! empty( $photos ) ) {
                
                $args = array(
                    'post_type' => 'attachment', // Only bring back attachments
                    'post_mime_type' => 'image', // Only bring back attachments that are images
                    'posts_per_page' => '8',
                    'post_status' => 'inherit', // Attachments default to "inherit", rather than published. Use "inherit" or "any".
                    'post__in' => $photos,
                    'orderby' => 'post__in', // Order by the gallery repeaters 
                    'facetwp' => true, // we added this
                    'meta_query'     => array(
                    'relation' => 'AND',
                        array(
                            'key'     => 'gallery_service', // custom meta value
                            'compare' => 'EXISTS',
                        ),
                    )
                );
                
                //global $wp_query;
                $loop = new WP_Query( $args );
                                 
                if ( $loop->have_posts() ) : 
                
                    printf( '<ul class="menu facetwp-filters"><li>%s</li><li><button class="button" onclick="FWP.reset()">%s</button></li></ul>', 
                            facetwp_display( 'facet', 'photo_gallery_service' ),
                            __( 'reset' )
                         );
                
                    $classes[] = 'small-up-1 large-up-2';
                
                    printf( '<div class="grid-x grid-margin-x grid-margin-bottom %s facetwp-template">', join( ' ', $classes ) );
                                                  
                    while ( $loop->have_posts() ) :
        
                        $loop->the_post();
                                                               
                        _s_get_template_part( 'template-parts', 'content-attachment-column' );
                        
                    endwhile;
               
                    echo '</div>';
                
                    if( function_exists( 'facetwp_display' ) ) {
                        echo facetwp_display( 'facet', 'load_more' );
                    } else if( function_exists( '_s_paginate_links' ) ) {
                        echo _s_paginate_links();
                    } else {
                        echo paginate_links();   
                    }
               
                endif; 
                
                
            }
            
            
            ?>
            </main>


        </div>
    
    </div>

</div>


<?php
get_footer();
