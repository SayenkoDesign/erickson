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
            <div class="right white cell large-auto large-order-2">
            <?php
            $footer_cta = get_field( 'footer_cta', 'option' );
            $heading = $button = '';
            if( ! empty( $footer_cta[ 'heading' ] ) ) {
                $heading = sprintf( '<h2 class="h1">%s</h2>', $footer_cta[ 'heading' ] );
            }
            
            if( ! empty( $footer_cta[ 'button' ]['link'] ) ) {
                                
                $args = [
                    'link' => $footer_cta[ 'button' ]['link'],
                    'target' => '_blank',
                    'echo' => false,
                    'classes' => 'button large',
                    'modal' => 'contact',
                    'type' => $footer_cta[ 'button' ]['type']
                ];

                
                $button  = sprintf( '<p>%s</p>', _s_acf_button( $args ) );
            }
            
            printf( '<div class="content">%s%s</div>', $heading, $button );
            
            // Company
            $hours      = get_field( 'hours', 'option' );
            $phone      = get_field( 'phone', 'option' );
            $directions = get_field( 'directions', 'option' );
            
            $out = '';
            
            if( ! empty( $hours ) ) {
                $out .= sprintf( '<li class="hours"><span>%s</span></li>', $hours );
            }
            
            if( ! empty( $phone ) ) {
                $out .= sprintf( '<li class="phone"><a href="%s">%s</a></li>', _s_format_telephone_url( $phone ), $phone );
            }
            
            if( ! empty( $directions ) ) {
                $label = $directions[ 'label' ];
                $url   = $directions[ 'url' ];
                if( $label && $url ) {
                    $out  .= sprintf( '<li class="directions"><a href="%s">%s</a></li>', $url, $label );
                }
            }
            
            if( ! empty( $out ) ) {
                printf( '<div class="content"><ul class="hours-phone-directions">%s</ul></div>', $out );
            }
            
            if( _s_get_social_icons() ) {
                printf( '<div class="content hide-for-large">%s</div>',  _s_get_social_icons() );
            }
            ?>
            
            </div>
            <div class="left cell large-4 xxlarge-5 xxxlarge-5 large-order-1">
                <div class="grid-x grid-margin-x">
                <?php if ( is_active_sidebar( 'footer-1' ) ) : ?>
					<div class="cell xsmall-12 small-6 large-12 xxlarge-auto sidebar-footer sidebar-footer-1" role="complementary">
						<?php dynamic_sidebar( 'footer-1' ); ?>
					</div><!-- #primary-sidebar -->
				<?php endif; ?>
                <?php if ( is_active_sidebar( 'footer-2' ) ) : ?>
					<div class="cell xsmall-12 small-6 large-12 xxlarge-auto sidebar-footer sidebar-footer-2" role="complementary">
						<?php dynamic_sidebar( 'footer-2' ); ?>
					</div><!-- #primary-sidebar -->
				<?php endif; ?>
                </div>
                <div class="grid-x grid-margin-x">
                    <div class="cell">
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
                        
                              
                    printf( '<div class="copyright hide-for-large"><p>%s %s Access Laser. %s %s <span><a href="%s">Seattle Web Design</a> by <a href="%s">Sayenko Design</a></span></p></div>', 
                                              date( 'Y' ), 
                                              __( 'Copyright' ), 
                                              $menu, 
                                              __( 'All rights reserved.', '_s' ),
                                              'https://www.sayenkodesign.com',
                                              'https://www.sayenkodesign.com'
                                                   
                                        );
                                              
                    
                    ?>
                    </div>
                </div>
            </div>
            
          </div>
        </div>
        
        
        <div class="grid-container">
          <div class="grid-x grid-padding-x">
          
            <div class="cell large-4 xxlarge-5 xxxlarge-5">
                <?php
                    printf( '<div class="copyright show-for-large"><p>%s %s Access Laser. %s %s <span><a href="%s">Seattle Web Design</a> by <a href="%s">Sayenko Design</a></span></p></div>', 
                              date( 'Y' ), 
                              __( 'Copyright' ), 
                              $menu, 
                              __( 'All rights reserved.', '_s' ),
                              'https://www.sayenkodesign.com',
                              'https://www.sayenkodesign.com'
                                   
                        );
                ?>
            </div>
        
            <div class="cell white large-auto">
                <?php
                    if( _s_get_social_icons() ) {
                        printf( '<div class="content show-for-large">%s</div>',  _s_get_social_icons() );
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
