<?php

get_header(); ?>

<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
        
            <main id="main" class="site-main" role="main">
                <?php
                while ( have_posts() ) :
    
                    the_post();
                    
                    $term = _s_get_primary_term( 'service_cat' );
                    if( ! empty( $term ) ) {
                        $term = sprintf( '<h4>%s</h4>', $term->name );
                    }   
                    
                    printf( '<div class="grid-x grid-margin-x"><div class="cell large-auto">%s%s</div><div class="cell large-auto">%s</div></div>', 
                            the_title( '<h1>', '</h1>', false ),
                            $term,
                            _s_get_addtoany_share_icons() );
    
                   _s_get_template_part( 'template-parts/fleet', 'details' );
                    
                    
                        
                endwhile;       
               ?>
        
            </main>
        
        </div>
    
    </div>
            
</div>

<?php
   _s_get_template_part( 'template-parts/fleet', 'related-posts' );   
?>
<!-- We need to load this here because of fanxcybox -->
<script type='text/javascript' src='//static.addtoany.com/menu/page.js'></script>
    
<?php
get_footer();
