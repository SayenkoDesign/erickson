<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package _s
 */

get_header(); ?>

<?php
_s_get_template_part( 'template-parts/global', 'hero' );
?>

<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
    
            <main id="main" class="site-main" role="main">
            <?php		
                    
            while ( have_posts() ) :
        
                the_post();
                            
                get_template_part( 'template-parts/content', 'page' );
                    
            endwhile;
            
            ?>
            </main>
        
        </div>
    
    </div>

</div>

<?php
get_footer();
