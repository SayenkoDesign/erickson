<?php
/**
 * Custom Body Class
 *
 * @param array $classes
 *
 * @return array
 */

add_filter( 'body_class', function ( $classes ) {
	unset( $classes[ array_search( 'page-template-default', $classes ) ] );
    $classes[] = 'pinned-header';
	// $classes[] = '';
	return $classes;
}, 99 );

get_header(); ?>

<div id="primary" class="content-area">

    <main id="main" class="site-main" role="main">

        <?php
        while ( have_posts() ) :

            the_post();
            
            get_template_part( 'template-parts/content', 'page' );

            /*_s_get_template_part( 'template-parts/home', 'services' );
            
            _s_get_template_part( 'template-parts/home', 'customers' );
            
            _s_get_template_part( 'template-parts/global', 'advantage' );
            
            _s_get_template_part( 'template-parts/global', 'case-studies' );
            
            _s_get_template_part( 'template-parts/global', 'featured-post' );
            */
                
        endwhile;       
       ?>

    </main>

</div>

<?php
get_footer();
