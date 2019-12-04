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
	
		<?php 
		the_content(); 		
		?>
		
	</div><!-- .entry-content -->

	<footer class="entry-footer">
        <?php
        $previous = sprintf( '<span>%s</span>',  __( 'Previous Post', '_s') );
                    
        $next = sprintf( '<span>%s</span>',  __( 'Next Post', '_s') );
        
        $navigation = _s_get_the_post_navigation( array( 'prev_text' => $previous, 'next_text' => $next ) );
        
        printf( '<h3><span>%s</span></h3><div class="wrap text-center">%s%s</div>', 
                __( 'Share This', '_s' ),
                _s_get_addtoany_share_icons(),
                $navigation  
              );
              
        
        $form_id = absint( 3 ); 
        $form = GFAPI::get_form( $form_id );
        if( false !== $form ) {
           printf( '<h3>Get the latest stories delivered straight to your inbox</h5>%s',  do_shortcode( sprintf( '[gravityform id="%s" title="false" description="false" ajax="false"]', $form_id ) ) );
        }
            
                          
        ?>           
	</footer><!-- .entry-footer -->
    
</article><!-- #post-## -->
