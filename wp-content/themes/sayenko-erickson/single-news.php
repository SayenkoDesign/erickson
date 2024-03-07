<?php
get_header(); ?>

<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
        
            <main id="main" class="site-main" role="main">
                <?php
                while ( have_posts() ) :
                    
                    the_post();
    
                    get_template_part( 'template-parts/content', 'news' );
                        
                endwhile;       
               ?>
        
            </main>
        
        </div>
    
    </div>
            
</div>

<?php
printf( '<div class="share"><div class="grid-container"><div class="grid-x grid-margin-x"><div class="cell text-center"><h4>%s</h4>%s</div></div></div></div>', 
    __( 'Share This', '_s' ),
    _s_get_addtoany_share_icons()
);


_s_get_template_part( 'template-parts/blog', 'related-posts' );

get_footer();
