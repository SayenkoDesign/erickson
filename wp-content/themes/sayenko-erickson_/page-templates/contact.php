<?php
/*
Template Name: Contact
*/

add_filter( 'body_class', function ( $classes ) {
  unset( $classes[ array_search('page-template-default', $classes ) ] );
  return $classes;
}, 99 );

get_header(); ?>

<?php
_s_get_template_part( 'template-parts/global', 'hero' );
?>


<div id="primary" class="content-area">

    <main id="main" class="site-main" role="main">
    <?php
        $form = _s_get_template_part( 'template-parts/contact', 'form', false, true );
        $directory = _s_get_template_part( 'template-parts/contact', 'directory', false, true );
        
        printf( '<section class="section-form-directory"><div class="wrap">
                    <div class="grid-container">
                        <div class="grid-x grid-padding-x grid-margin-bottom">%s%s</div>
                    </div>
                 </section>', $form, $directory );
        
        _s_get_template_part( 'template-parts/contact', 'offices' );
    ?>
    </main>


</div>


<?php
get_footer();
