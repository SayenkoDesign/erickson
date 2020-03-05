<?php
/*
Template Name: About
*/

get_header(); ?>

<?php
_s_get_template_part( 'template-parts/about', 'hero' );
?>


<div id="primary" class="content-area">

    <main id="main" class="site-main" role="main">
    <?php
        $mission = _s_get_template_part( 'template-parts/about', 'mission', false, true );
        $vision = _s_get_template_part( 'template-parts/about', 'vision', false, true );
        
        printf( '<section class="mission-vision"><div class="wrap">%s%s</div></section>', $mission, $vision );
        
        _s_get_template_part( 'template-parts/about', 'core-values' );
        _s_get_template_part( 'template-parts/about', 'commitment' );
        _s_get_template_part( 'template-parts/about', 'awards' );
        
    ?>
    </main>


</div>


<?php
get_footer();
