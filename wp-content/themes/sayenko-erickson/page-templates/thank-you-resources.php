<?php
/*
Template Name: Thank You - Resources
*/

add_filter( 'body_class', function ( $classes ) {
  unset( $classes[ array_search('page-template-default', $classes ) ] );
  return $classes;
}, 99 );

get_header(); ?>

<?php
_s_get_template_part( 'template-parts/contact', 'hero' );
?>


<div id="primary" class="content-area">

    <main id="main" class="site-main" role="main">
    <?php

    ?>
    </main>


</div>


<?php
get_footer();
