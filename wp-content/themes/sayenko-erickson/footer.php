<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link    https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */
?>

</div><!-- #content -->


<footer class="site-footer" id="site-footer" role="contentinfo" itemscope itemtype="https://schema.org/WPFooter">
	<div class="wrap">
    
        <div class="grid-container">
          <div class="grid-x grid-padding-x">
            <div class="cell large-auto xxlarge-4">
                <?php
                
                // Company
                $address    = get_field( 'address', 'option' );
                $phone      = get_field( 'phone', 'option' );
                
                $out = '';
                
                if( ! empty( $address ) ) {
                    $out .= sprintf( '<li class="address"><span>%s</span></li>', $address );
                }
                
                if( ! empty( $phone ) ) {
                    $out .= sprintf( '<li class="phone"><a href="%s">%s</a></li>', _s_format_telephone_url( $phone ), $phone );
                }
                            
                if( ! empty( $out ) ) {
                    printf( '<ul class="no-bullet address-phone">%s</ul>', $out );
                }

                ?>
            </div>
            
            <?php
            if ( is_active_sidebar( 'footer' ) ) : ?>
                    <?php dynamic_sidebar( 'footer' ); ?>
            <?php endif; ?>
            
            
            </div>
            
                    
               
        </div>
        
        
        <div class="grid-container">
          <div class="grid-x grid-padding-x">
          
            <div class="cell large-4 xlarge-auto">
                <?php
                $menu = '';
                if( has_nav_menu( 'copyright' ) ) {
                    $args = array( 
                    'theme_location'  => 'copyright', 
                        'container'       => false,
                        'echo'            => false,
                        'items_wrap'      => '%3$s',
                        'link_before'     => '<span>',
                        'link_after'      => '</span>',
                        'depth'           => 0,
                    ); 
                    
                    $menu = sprintf( '%s', str_replace('</a>', '</a><i>&nbsp;&nbsp;/&nbsp;&nbsp;</i> ', strip_tags( wp_nav_menu( $args ), '<a>' ) ) );
                    
                }
                
                // © 2019 Erickson Incorporated. All rights reserved. Web Design by Sayenko Design

                printf( '<div class="copyright"><p>&copy; %s Erickson Incorporated. %s %s <span><a href="%s">Web Design</a> by <a href="%s">Sayenko Design</a></span></p></div>', 
                          date( 'Y' ), 
                          __( 'All rights reserved.', '_s' ),
                          $menu, 
                          'https://www.sayenkodesign.com',
                          'https://www.sayenkodesign.com'
                               
                    );
                ?>
            </div>
        
            <div class="cell shrink large-auto">
                <?php
                    if( _s_get_social_icons() ) {
                        echo _s_get_social_icons();
                    }
                ?>
            </div>
            
          </div>
        </div>
        
	</div>

</footer><!-- #colophon -->

<?php

wp_footer();
?>
</body>
</html>
