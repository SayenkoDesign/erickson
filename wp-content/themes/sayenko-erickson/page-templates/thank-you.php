<?php
/*
Template Name: Thank You
*/

add_filter( 'body_class', function ( $classes ) {
  unset( $classes[ array_search('page-template-default', $classes ) ] );
  return $classes;
}, 99 );

get_header(); ?>

<?php
_s_get_template_part( 'template-parts/thank-you', 'hero' );
?>

<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
    
            <main id="main" class="site-main" role="main">
            <?php	
            
            var_dump( $_REQUEST );	
                    
            while ( have_posts() ) :
        
                the_post();
                            
                $message = get_field( 'message' );
        
                // Replace any template tags
                $variables = $_GET;
                
                if( ! empty( $message ) && ! empty( $variables ) ) {
                    foreach($variables as $key => $value ){
                        $value = sanitize_text_field( $value );
                        if( ! empty( $value ) ) {
                            $message = str_replace('{'.$key.'}', $value, $message );
                        }
                        
                    }
                }
                
                if( ! empty( $message ) ) {
                    printf( '<div class="entry-content">%s</div>',  wpautop( $message ) );
                }
                    
            endwhile;
            
            $show_social_profiles = get_field( 'show_social_profiles' );
            
            if( $show_social_profiles ) {
                printf( '<h4 class="text-center">Connect with us:</h4>%s', _s_get_social_icons() );
            }
            
            $show_resources = get_field( 'show_resources' );
            
            if( $show_resources ) {
                _s_get_template_part( 'template-parts/thank-you', 'posts' );
            }            
            ?>
            </main>
        
        </div>
    
    </div>

</div>

<?php
get_footer();