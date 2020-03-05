<article id="post-<?php the_ID(); ?>" <?php post_class( 'cell' ); ?>>
    
    <?php 
    $video = get_field( 'video_url' );
    
    $video_link = '';
    if( ! empty( $video ) ) {
        $video_icon = '<span><i class="screen-reader-text">play video</i></span>';
        $video_link = sprintf( '<div class="play-video"><a data-fancybox="videos" href="%s">%s</a></div>', $video, $video_icon );
    }
    
    
    $thumbnail = '';
     
    $video_thumbnail = get_post_meta( get_the_ID(), '_video_thumbnail', true );   
    
    if( ! empty( $video_thumbnail ) ) {
        $thumbnail = $video_thumbnail;
    } else {
        $thumbnail = wp_get_attachment_image_src( get_the_ID(), 'medium' );   
        if( empty( $thumbnail ) ) {
            $thumnail = $thumbnail[0];
        }
    }
    
    if( ! empty( $thumbnail ) ) {
        $thumbnail = sprintf( 'background-image: url(%s);', $thumbnail );
    } 
                                   
    $header = sprintf( '<header class="entry-header screen-reader-text">%s</header>', get_the_title() );
    
    printf( '<div class="thumbnail" style="%s">%s</div>%s', $thumbnail, $header, $video_link );

    ?>
    
</article><!-- #post-## -->
