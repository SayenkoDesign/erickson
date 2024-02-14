<?php

get_header(); ?>
    
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
