<?php     
$size = wp_is_mobile() ? 'medium' : 'large';
$image = get_the_post_thumbnail_url( get_the_ID(), $size ); 
$style = sprintf( ' style="background-image: url(%s);"', $image  );
$classes[] = 'event';
$classes[] = $alignment;   

printf( '<article id="post-%s" class="%s">
            <div class="thumbnail"%s><span></span></div>
            <div class="panel">
            <h5 class="h3"><span>%s</span></h5>
            <h2 class="h4">%s</h2>
            %s</div></article>', 
        get_the_ID(), 
        join( ' ', get_post_class( $classes ) ),
        $style, 
        get_field( 'year' ),
        get_the_title(),
        get_field( 'text' )
);

?>

