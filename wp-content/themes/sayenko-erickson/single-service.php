<?php

get_header(); ?>

<?php
_s_get_template_part( 'template-parts/service', 'post-hero' );
?>
    
<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
        
            <main id="main" class="site-main" role="main">
                <?php
                while ( have_posts() ) :
    
                    the_post();
    
                    _s_get_template_part( 'template-parts/service', 'approach' );
                    
                    _s_get_template_part( 'template-parts/global', 'results' );
                    
                    _s_get_template_part( 'template-parts/service', 'clients' );
                                        
                    _s_get_template_part( 'template-parts/global', 'case-studies' ); 
                    
                    //_s_get_template_part( 'template-parts/service', 'gallery' );
                        
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
