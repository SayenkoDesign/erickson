<?php     
//Case Study Post Column

$size = wp_is_mobile() ? 'medium' : 'large';
$image = get_the_post_thumbnail_url( get_the_ID(), $size ); 
$style = sprintf( ' style="background-image: url(%s);"', $image  );   

$classes = get_post_class( 'cell webinar-column' );
unset( $classes[ array_search( 'webinar', $classes ) ] );


printf( '<article id="post-%s" class="%s"%s><div class="panel">
            %s<a href="%s" class="post-link"><h3>%s</h3></a>
        </div></article>', 
        get_the_ID(), 
        join( ' ', $classes ),
        $style, 
        get_permalink(), 
        get_the_title() 
);

?>