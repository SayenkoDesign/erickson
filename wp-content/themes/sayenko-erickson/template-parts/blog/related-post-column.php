<?php     
//Case Study Post Column

$size = wp_is_mobile() ? 'medium' : 'large';
$image = get_the_post_thumbnail_url( get_the_ID(), $size ); 
$style = sprintf( ' style="background-image: url(%s);"', $image  );   

$term = _s_get_primary_term();
if( ! empty( $term ) ) {
    $term = sprintf( '<a class="term-link" href="%s">%s</a>', get_term_link( $term, '' ), $term->name );
}   

printf( '<div class="cell">
                    <article id="post-%s" class="%s"%s>
                        %s<a class="post-link" href="%s"></a>
                        <h3>%s</h3>
                    </article>
                </div>', 
                get_the_ID(), 
                join( ' ', get_post_class() ),
                $style, 
                $term, 
                get_permalink(), 
                get_the_title() 
        );

?>

