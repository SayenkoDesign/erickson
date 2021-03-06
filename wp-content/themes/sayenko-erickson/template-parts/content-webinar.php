<?php
/**
 * Template part for displaying page content in page.php.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
	
    <div class="entry-content">
    
		<?php the_content(); ?>
		<?php
			wp_link_pages( array(
				'before' => '<div class="page-links">' . esc_html__( 'Pages:', '_s' ),
				'after'  => '</div>',
			) );
		?>
	</div><!-- .entry-content -->

	<script>
    
    (function (document, window, $) {
    
        'use strict';
                
        $(document).on('gform_confirmation_loaded', function(){
             
            // $.fancybox.open('<div class="message"><h2>Hello!</h2><p>You are awesome!</p></div>');
            
            $('.block-webinar').removeClass('webinar-gated');
            $('.block-webinar').addClass('webinar-access-granted');
        });
    
        
    }(document, window, jQuery));

    
        
    
    </script>
</article><!-- #post-## -->
