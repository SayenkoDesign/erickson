<?php
// Webinar Post Column

$size = wp_is_mobile() ? 'medium' : 'large';
$image = get_the_post_thumbnail_url( get_the_ID(), $size );
$style = sprintf( ' style="background-image: url(%s);"', $image  );

$classes = get_post_class( 'cell webinar-column' );
unset( $classes[ array_search( 'webinar', $classes ) ] );

$show_date = $hide_date ? ' hide' : '';

$date = sprintf( '<span class="date%s">%s</span>', $show_date, get_field( 'webinar_date', get_the_ID() ) );

printf( '<article id="post-%s" class="%s"%s><div class="panel">
            <a href="%s" class="post-link"><h3>%s</h3>%s</a>
        </div></article>',
        get_the_ID(),
        join( ' ', $classes ),
        $style,
        get_permalink(),
        get_the_title(),
		$date
);

?>
