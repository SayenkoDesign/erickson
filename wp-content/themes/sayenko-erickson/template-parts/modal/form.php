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
    
                the_content();
    
            endwhile;
        
        ?>
      </div>
    </div>
</div>
<?php
endif;
    
wp_reset_postdata();
?>