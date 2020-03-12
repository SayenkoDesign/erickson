<?php
/**
 * The main template file.
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * @link http://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */

add_filter( 'body_class', function ( $classes ) {
    $classes[] = 'blog';
    $classes[] = 'archive';
    
    if( ! empty( $_GET[ 'fwp_paged' ] ) ) {
        $classes[] = 'is-paged';
    }
    
	return $classes;
}, 99 );

get_header(); ?>

<?php
// Hero
$args = array(
	'post_type'      => 'page',
	'p'				 => get_option('page_for_posts'),
	'posts_per_page' => 1,
	'post_status'    => 'publish'
);

// Use $loop, a custom variable we made up, so it doesn't overwrite anything
$loop = new WP_Query( $args );

// have_posts() is a wrapper function for $wp_query->have_posts(). Since we
// don't want to use $wp_query, use our custom variable instead.
if ( $loop->have_posts() ) : 
	while ( $loop->have_posts() ) : $loop->the_post(); 
	
		_s_get_template_part( 'template-parts/blog', 'hero' );
         
	endwhile;
endif;

// We only need to reset the $post variable. If we overwrote $wp_query,
// we'd need to use wp_reset_query() which does both.
wp_reset_postdata();

?>

<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
            
                <main id="main" class="site-main" role="main">
                           
                    <?php    
                                                             
                    if ( have_posts() ) : 
                    
                        printf( '<ul class="menu facetwp-filters"><li>%s</li><li>%s</li><li><button class="button" onclick="FWP.reset()">%s</button></li></ul>', 
                            facetwp_display( 'facet', 'categories' ),
                            sprintf( '<div class="facet-wrap"><h5 class="facet-label">%s</h5>%s</div>', __( 'Order' ), facetwp_display( 'sort' ) ),
                            __( 'reset' )
                         );
                         
                        $classes[] = 'small-up-1 medium-up-2 large-up-4';
                
                        printf( '<div class="grid-x grid-margin-x grid-margin-bottom %s facetwp-template">', join( ' ', $classes ) );
                                                      
                        while ( have_posts() ) :
            
                            the_post();
                                                                   
                            _s_get_template_part( 'template-parts', 'content-post-column' );
                            
                        endwhile;
                        
                        echo '</div>';
                        
                        if( function_exists( 'facetwp_display' ) ) {
                            echo facetwp_display( 'pager' );
                            //echo facetwp_display( 'facet', 'load_more' );
                        } else if( function_exists( '_s_paginate_links' ) ) {
                            echo _s_paginate_links();
                        } else {
                            echo paginate_links();   
                        }
                   
                    endif; 
                    ?>
            
                </main>
            
        </div>
        
    </div>
</div>
<?php
get_footer();
