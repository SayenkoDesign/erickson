<?php
/*
Template Name: No Blocks
*/

get_header(); ?>

<?php    
    printf( '<section class="section-hero"><div class="wrap"><div class="container"><div class="grid-container"><div class="grid-x"><div class="cell"><div class="hero-content">%s</div></div></div></div></div></div></section>', 
            the_title( '<h1>', '</h1>', false ) );
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
