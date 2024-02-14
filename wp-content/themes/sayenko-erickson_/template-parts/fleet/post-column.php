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

$options = [
    'src' => get_permalink(),
    'type' => 'ajax',
    'baseClass' => "single-fleet",
    'closeExisting' => true,
    'touch' => false,
    'autoFocus' => false,
    'backFocus' => false,
    'hash' => false,
    'filter' => '.fleet-ajax'
];
$options = sprintf( "data-options='{%s}'", _parse_data_attribute( $options, ':', ', ' ) );

printf( '<article id="post-%s" class="%s"%s><div class="panel">
            %s<a class="post-link" data-fancybox %s href="javascript:;"><h3>%s</h3></a>
        </div></article>', 
        get_the_ID(), 
        join( ' ', $classes ),
        $style, 
        $term, 
        $options, 
        get_the_title() 
);

?>