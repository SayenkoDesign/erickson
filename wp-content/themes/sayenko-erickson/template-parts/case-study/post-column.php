<?php     
//Case Study Post Column

$size = wp_is_mobile() ? 'medium' : 'large';
$image = get_the_post_thumbnail_url( get_the_ID(), $size ); 
$style = sprintf( ' style="background-image: url(%s);"', $image  );   

$classes = [ 'cell' ];

$term = _s_get_primary_term( 'service_cat' );
$color = 'orange';
if( ! empty( $term ) ) {
    $color = strtolower( get_field( 'color', $term ) );
    $classes[] = $color;
    $term = ! empty( $term->description ) ? $term->description : $term->name;
    $term = sprintf( '<h4>%s</h4>', $term );
}   

printf( '<article id="post-%s" class="%s"%s><div class="panel">
            %s<a class="post-link" href="%s"><h3>%s</h3></a>
        </div></article>', 
        get_the_ID(), 
        join( ' ', get_post_class( $classes ) ),
        $style, 
        $term, 
        get_permalink(), 
        get_the_title() 
);

?>

