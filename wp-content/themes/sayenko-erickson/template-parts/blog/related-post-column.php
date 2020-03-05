<?php     
//Case Study Post Column

$size = wp_is_mobile() ? 'medium' : 'large';
$image = get_the_post_thumbnail_url( get_the_ID(), $size ); 
$style = sprintf( ' style="background-image: url(%s);"', $image  );   

$term = _s_get_primary_term();
if( ! empty( $term ) ) {
    $term = sprintf( '<h4><a class="term-link" href="%s">%s</a></h4>', get_term_link( $term, '' ), $term->name );
}   

printf( '<article id="post-%s" class="%s"%s><div class="panel">
            %s<h3><a class="post-link" href="%s">%s</a></h3>
        </div></article>', 
        get_the_ID(), 
        join( ' ', get_post_class( 'cell' ) ),
        $style, 
        $term, 
        get_permalink(), 
        get_the_title() 
);

?>

