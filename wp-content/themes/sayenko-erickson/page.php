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

global $post;
$blocks = parse_blocks( $post->post_content );
$has_h1 = _s_has_h1_block( $blocks );

add_filter( 'body_class', function( $classes ) {
    global $has_h1;
    if( ! $has_h1 ) {
        $classes[] = 'no-h1';
    }
    return $classes;
});

get_header(); ?>

<?php
    
    
    if( ! $has_h1 ) {
        printf( '<section class="section-hero"><div class="wrap"><div class="container"><div class="grid-container"><div class="grid-x"><div class="cell"><div class="hero-content">%s</div></div></div></div></div></div></section>', 
                the_title( '<h1>', '</h1>', false ) );
    }
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
