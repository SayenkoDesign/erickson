<?php

get_header(); ?>

<?php
_s_get_template_part( 'template-parts/case-study', 'post-hero' );
?>
    
<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
        
            <main id="main" class="site-main" role="main">
                <?php
                while ( have_posts() ) :
    
                    the_post();
    
                    _s_get_template_part( 'template-parts/case-study', 'challenge' );
                    
                    _s_get_template_part( 'template-parts/case-study', 'solution' );
                    
                    _s_get_template_part( 'template-parts/global', 'results' );
                    
                    _s_get_template_part( 'template-parts/case-study', 'testimonial' ); 
                        
                endwhile;       
               ?>
        
            </main>
        
        </div>
    
    </div>
            
</div>

<?php
      
?>
    
<?php
get_footer();
