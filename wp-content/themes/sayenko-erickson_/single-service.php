<?php

get_header(); ?>

<?php

function jump_links() {
    $jump_links = get_field( 'jump_links' );

    $links = '';
    if( ! empty( $jump_links ) ) {
        foreach( $jump_links as $link ) {
            $links .= sprintf( '<li><a href="#%s">%s</a></li>', $link['anchor'], $link['name'] );
        }
        
        if( ! empty( $links ) ) {
            printf( '<div class="sticky-nav">
                <div class="grid-container">
                    <div class="grid-x" >
                        <div class="cell">
                            <nav><ul class="menu">%s</ul></nav>
                        </div>
                    </div>
                </div>
            </div>', $links );
        }
    }   
}

if( ! is_user_logged_in() ) {
   jump_links();    
}
?>
    
<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
    
            <main id="main" class="site-main" role="main">
            
            <?php		
                    
            while ( have_posts() ) :
        
                the_post();
                            
                the_content();
                    
            endwhile;
            
            ?>
            </main>
        
        </div>
    
    </div>

</div>

<?php
get_footer();
