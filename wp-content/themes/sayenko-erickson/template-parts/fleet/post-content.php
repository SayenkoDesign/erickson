<?php     

$term = _s_get_primary_term( 'service_cat' );
if( ! empty( $term ) ) {
    $term = $term->name;
    $term = sprintf( '<h4>%s</h4>', $term );
}   
?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    
    <header class="entry-header">
    <?php
    printf( '<div class="grid-container">
                <div class="grid-x grid-margin-x grid-margin-bottom">
                    <div class="cell large-auto">%s%s</div>
                    <div class="cell large-auto large-offset-1"><h5>%s</h5>%s</div>
                </div>
            </div>', 
        the_title( '<h2>', '</h2>', false ),
        $term,
        __( 'Share This:' ),
        _s_get_addtoany_share_icons() );
    ?>
    </header>

	<footer class="entry-footer">
        <?php
        _s_get_template_part( 'template-parts/fleet', 'details' );
        ?>           
	</footer><!-- .entry-footer -->
    
</article><!-- #post-## -->

