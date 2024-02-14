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
    
    <?php
       // the_post_thumbnail( 'large' );    
    ?>
    
    
    <header class="entry-header">
		<?php 
            the_title( '<h2 class="entry-title">', '</h2>' ); 
            $terms = get_the_term_list( get_the_ID(), 'news_cat', '<li>', '</li><li>', '</li>' );
                if( ! empty( $terms ) ) {
                                printf( '<ul class="post-categories">%s</ul>', $terms );
                }
        ?>

		
	</header><!-- .entry-header -->
    
    
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
        
        printf( '<div class="wrap text-center">%s</div>', 
                $navigation  
              );                          
        ?>           
	</footer><!-- .entry-footer -->
    
</article><!-- #post-## -->
