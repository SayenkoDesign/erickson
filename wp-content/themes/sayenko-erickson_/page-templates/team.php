<?php
/*
Template Name: Team
*/

get_header(); ?>

<?php
_s_get_template_part( 'template-parts/global', 'hero' );
?>


<div id="primary" class="content-area">

    <main id="main" class="site-main" role="main">
    <?php
        _s_get_template_part( 'template-parts/about', 'people' );
    ?>
    </main>


</div>


<?php
get_footer();
