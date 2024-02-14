<?php

/*
Modal - Form
		
*/

// arguments, adjust as needed
$args = array(
    'post_type'      => 'modal',
    'p'              => $post_id,
    'posts_per_page' => 1,
    'post_status'    => 'publish'
);

// Use $loop, a custom variable we made up, so it doesn't overwrite anything
$loop = new WP_Query( $args );

if ( $loop->have_posts() ) : 
?>

<div style="display: none;" class="modal-form" id="<?php echo sanitize_title_with_dashes( get_the_title( $post_id ) ); ?>">
    <div class="wrap">
        <div class="modal-body">
        <?php
        
            while ( $loop->have_posts() ) : $loop->the_post(); 
            
                printf('<img src="%slogo.svg" alt="site logo" class="logo" />', trailingslashit( THEME_IMG ) ); 
    
                the_title( '<h1 class="entry-title">', '</h2>' );
                
                the_content();
    
            endwhile;
        
        ?>
      </div>
    </div>
    <button type="button" data-fancybox-close="" class="fancybox-button fancybox-close-small" title="Close">
    <svg xmlns="http://www.w3.org/2000/svg" version="1" viewBox="0 0 24 24"><path d="M13 12l5-5-1-1-5 5-5-5-1 1 5 5-5 5 1 1 5-5 5 5 1-1z"></path></svg>
    </button>
</div>
<?php
endif;
    
wp_reset_postdata();
?>