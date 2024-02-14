<article id="post-<?php the_ID(); ?>" <?php post_class( 'cell' ); ?>>
    
    <?php  
    $thumbnail = wp_get_attachment_image_src( get_the_ID(), 'medium' );   
    $large = wp_get_attachment_image_src( get_the_ID(), 'large' );
    $post_image = '';
    
    if( ! empty( $thumbnail ) ) {
        $post_image = sprintf( 'background-image: url(%s);', $thumbnail[0] );
    }     
                                   
    $header = sprintf( '<header class="entry-header screen-reader-text">%s</header>', get_the_title() );
    
    printf( '<a href="%s" class="post-hero" data-fancybox="images" style="%s">%s</a>', $large[0], $post_image, $header );

    ?>
    
</article><!-- #post-## -->
