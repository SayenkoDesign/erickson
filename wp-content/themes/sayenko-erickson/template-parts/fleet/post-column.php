<?php     
//Case Study Post Column

$size = wp_is_mobile() ? 'medium' : 'large';
$image = get_the_post_thumbnail_url( get_the_ID(), $size ); 
$style = sprintf( ' style="background-image: url(%s);"', $image  );   

$classes = get_post_class( 'cell fleet-column' );
unset( $classes[ array_search( 'fleet', $classes ) ] );

$term = _s_get_primary_term( 'service_cat' );
if( ! empty( $term ) ) {
    $term = ! empty( $term->description ) ? $term->description : $term->name;
    $term = sprintf( '<h4>%s</h4>', $term );
}   


printf( '<article id="post-%s" class="%s"%s><div class="panel">
            %s<a class="post-link" data-fancybox data-type="ajax" data-touch="false" data-src="%s" data-filter=".fleet-ajax"><h3>%s</h3></a>
        </div></article>', 
        get_the_ID(), 
        join( ' ', $classes ),
        $style, 
        $term, 
        get_permalink(), 
        get_the_title() 
);

?>

