<?php
// Category page

add_filter( 'body_class', function ( $classes ) {
    $classes[] = 'blog archive';
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
                    // Categories?
                    
                    /*
                    $cat_current = false;
                    $categories = get_categories( [ 'exclude' => 1 ] );
                    if( ! empty( $categories ) ) {
                        $out = '';
                        
                        if ( is_category() ) { 
                            $taxonomy = get_queried_object();
                            if ( is_a( $taxonomy, 'WP_Term') ) {
                                $cat_current = $taxonomy->term_id;
                            }
                        } 
                        
                        foreach( $categories as $cat ) {
                            $class = $cat->term_id == $cat_current ? ' class="cat-current' : '';
                            $out .= sprintf( '<li><a%s href="%s">%s</a></li>', $class, get_term_link( $cat->term_id ), $cat->name );
                        }
                        
                        if( ! empty( $out ) ) {
                            printf( '<ul class="no-bullet categories">%s</ul>', $out );      
                        }
                    }
                    */
                    
                    $args = array(
                        'theme_location' => 'resources',
                        'container' => '',
                        'container_class' => '',
                        'container_id' => '',
                        'menu_id'        => '',
                        'before' => '',
                        'after' => '',
                        'link_before' => '',
                        'link_after' => '',
                        'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>',
                        'echo' => false
                     );
                     
                     $menu = wp_nav_menu($args);
                     
                     $select = wp_nav_menu( array(
                        'theme_location' => 'resources',
                        'container' => '',
                        'container_class' => '',
                        'container_id' => '',
                        'menu_id'        => '',
                        'before' => '',
                        'after' => '',
                        'walker'         => new Walker_Nav_Menu_Dropdown(),
                        'items_wrap'     => '<select onchange="if (this.value) window.location.href=this.value">%3$s</select>',
                        'echo' => false
                    ) );	
    
                                      
                    printf( '<div class="category-filters"><div class="categories">%s%s</div></div>', $menu, $select );
                    
                    $classes[] = 'small-up-1 medium-up-2 large-up-3 xxlarge-up-4';
                    
                    printf( '<div class="grid-x grid-margin-x %s grid" data-equalizer data-equalize-on="medium" data-equalize-by-row="true">', join( ' ', $classes ) );
                     
                    if ( have_posts() ) : ?>
                        
                       <?php
                                                      
                        while ( have_posts() ) :
            
                            the_post();
                                                                   
                            _s_get_template_part( 'template-parts', 'content-post-column' );
                            
                        endwhile;
                   
                    endif; 
                    
                    echo '</div>';
                    
                    if( function_exists( '_s_paginate_links' ) ) {
                        echo _s_paginate_links();
                    } else {
                        echo paginate_links();   
                    }
                    ?>
            
                </main>
            
        </div>
        
    </div>
</div>
<?php
get_footer();
