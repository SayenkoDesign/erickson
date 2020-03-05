<?php
/*
Template Name: History
*/

get_header(); ?>

<?php
_s_get_template_part( 'template-parts/history', 'hero' );
?>


<div id="primary" class="content-area">

    <main id="main" class="site-main" role="main">
    <?php
        _s_get_template_part( 'template-parts/history', 'introduction' );
        _s_get_template_part( 'template-parts/history', 'timeline' );
        
    ?>
    </main>


</div>


<?php
get_footer();
