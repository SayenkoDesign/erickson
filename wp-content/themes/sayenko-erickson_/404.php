<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package _s
 */

get_header(); ?>

<?php
_s_get_template_part( 'template-parts/404', 'hero' );

?>

<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
    
            <main id="main" class="site-main" role="main">
                <div class="entry-content text-center">
                    <?php
                    the_field( 'error_404_content', 'option' );
                    ?>
                    <p class="button-wrapper"><a href="/" class="button"><?php _e( 'Back to home', '_s' ); ?></a></p>
				</div><!-- .page-content -->
            </main>
        
        </div>
    
    </div>

</div>

<?php
get_footer();
