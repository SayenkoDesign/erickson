<?php
global $version;

$version = get_field( 'version' );
$version = sanitize_title_with_dashes( strtolower( $version ) );

add_filter( 'body_class', function( $classes = [] ) {
    global $version;
    
    if( ! empty( $version ) ) {
        $classes[] = strtolower( $version );
    }
    return $classes;
});


get_header( 'landing_page' ); 




if( 'version-3' == $version ) {
    _s_get_template_part( 'template-parts/landing-page', 'hero' );   
}

?>

<div id="primary" class="content-area">
        
    <main id="main" class="site-main" role="main">
       <?php
        while ( have_posts() ) :
            
            the_post();
            
                        
            if( 'version-3' == $version ) {
                _s_get_template_part( 'template-parts/landing-page', 'form-v3' );   
            } else {
                _s_get_template_part( 'template-parts/landing-page', 'form' );  
            }
                        
            if( 'version-2' == $version ) {
                _s_get_template_part( 'template-parts/landing-page', 'details' );   
            }

            _s_get_template_part( 'template-parts/landing-page', 'columns' );
            
            // Let them show posts anytime
            _s_get_template_part( 'template-parts/landing-page', 'posts' );
                
        endwhile;       
       ?>

    </main>
            
</div>

<?php

get_footer( 'landing_page' );
