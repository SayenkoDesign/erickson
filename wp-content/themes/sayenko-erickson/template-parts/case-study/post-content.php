<?php
/**
 * Template part for displaying single posts.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    
    <div class="entry-content">
	
		<div class="grid-x grid-margin-x">    
            <div class="cell large-auto">
                <?php 
                the_content(); 		
                ?>
            </div>
        
        <?php
        
        $hero = get_field( 'hero' ); 
        if( ! empty( $hero['logo'] ) ) {
            
            $logo = sprintf( '<span class="icon show-for-xxlarge">%s</span>', _s_get_acf_image( $hero['logo'], 'thumbnail' ) );
        }
        
        $application = get_field( 'application' );
        $technology = get_field( 'technology' );
        $product = get_field( 'product' );
        
        if( function_exists( '_s_get_relationship_field_list' ) ) {
            $application = _s_get_relationship_field_list( $application, '<h6>Application</h6>', true );
            $technology = _s_get_relationship_field_list( $technology, '<h6>Technology</h6>', true, 'technology' );
            $product = _s_get_relationship_field_list( $product, '<h6>Product</h6>', true );
        }
        
        if( $logo || $application || $technology || $product ) {
            printf( '<div class="cell large-3 large-offset-1"><div class="panels">%s%s%s%s</div></div>', 
                $logo,
                $application,
                $technology,
                $product
            );
        }
        ?>
        </div>
		
	</div><!-- .entry-content -->
    
    
    <footer>
    
        <?php
        
        /*echo _s_get_the_post_navigation( [
            'prev_text'                  => __( '<span><</span> %title' ),
            'next_text'                  => __( '%title <span>></span>' ),
        ] );*/

        ?> 
     
    </footer><!-- .entry-footer -->

    
</article><!-- #post-## -->

