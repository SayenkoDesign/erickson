<?php
/**
 * The header for our theme.
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link    https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package _s
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js sr">
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<link rel="dns-prefetch" href="//fonts.googleapis.com">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo THEME_FAVICONS; ?>/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="<?php echo THEME_FAVICONS; ?>/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="<?php echo THEME_FAVICONS; ?>/favicon-16x16.png">
	<link rel="manifest" href="<?php echo THEME_FAVICONS; ?>/site.webmanifest">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#f58025">
	<meta name="msapplication-TileColor" content="#ffffff">
	<meta name="theme-color" content="#ffffff">   
	<?php wp_head(); ?>
</head>

<?php
$notification_bar = _s_get_template_part( 'template-parts/global', 'notification-bar', [], true );

// Load this early so we can add a body class
global $footer_cta;
$footer_cta = _s_get_template_part( 'template-parts/global', 'footer-cta', [], true );

?>

<body <?php body_class( wp_is_mobile() ? 'is-mobile' : 'is-desktop' ); ?> id="top">

<ul class="skip-link screen-reader-text">
	<li><a href="#content" class="screen-reader-shortcut"><?php esc_html_e( 'Skip to content', '_s' ); ?></a></li>
	<li><a href="#footer" class="screen-reader-shortcut"><?php esc_html_e( 'Skip to footer', '_s' ); ?></a></li>
</ul>

<?php
if( ! is_user_logged_in() ) {
    echo $notification_bar;
}
?>

<div class="sticky-header">
        <header id="masthead" class="site-header <?php empty( $notification_bar ) ? 'fixed' : ''; ?>" role="banner" itemscope itemtype="https://schema.org/WPHeader">
                        
            <div class="wrap">
            
                <div class="grid-container"><div class="grid-x grid-padding-x">
            
                <div class="cell large-shrink site-branding">
                    <div class="site-title">
                    <?php
                    $site_url = home_url();
                    $logo = sprintf('<img src="%slogo.svg" alt="site logo" class="logo" />', trailingslashit( THEME_IMG ) );  
                    

                    printf('<a href="%s" title="%s">%s</a>',
                            $site_url, 
                            get_bloginfo( 'name' ), 
                            $logo
                            );
                    ?>
                    </div>
                    
                    <div class="title-bar" data-responsive-toggle="site-navigation" data-hide-for="xlarge">
  <button class="menu-toggle" type="button" data-toggle="site-navigation"></button>
  
</div>                               
                </div><!-- .site-branding -->
                
                <nav id="site-navigation" class="cell large-auto nav-primary" role="navigation" aria-label="Main" itemscope itemtype="https://schema.org/SiteNavigationElement">  
                  
                    <?php
                    $args = array(
                        'theme_location' => 'secondary',
                        'container' => '',
                        'container_class' => '',
                        'container_id' => '',
                        'menu_id'        => 'secondary-menu',
                        'menu_class'     => 'menu menu-secondary',
                        'before' => '',
                        'after' => '',
                        'link_before' => '',
                        'link_after' => '',
                        'items_wrap' => '<ul id="%1$s" class="%2$s">%3$s</ul>'
                     );
                     wp_nav_menu($args);
                                                                
                    // Desktop Menu
                    $args = array(
                        'theme_location'  => 'primary',
                        'container'       => '',
                        'container_class' => '',
                        'container_id'    => '',
                        'menu_id'         => 'primary-menu',
                        'menu_class'      => 'menu menu-primary vertical xlarge-horizontal',
                        'before'          => '',
                        'after'           => '',
                        'link_before'     => '',
                        'link_after'      => '',
                        'items_wrap'      => '<ul id="%1$s" class="%2$s" data-responsive-menu="accordion xlarge-dropdown" data-hover-delay="250" data-multi-open="false">%3$s</ul>'
                    );
                    wp_nav_menu( $args );
                    ?>
                    
                </nav>
                
                </div></div>

            </div><!-- wrap -->
                         
        </header><!-- #masthead -->
    </div>
    
    <script>
        /*(function (document, window, $) {
    
        'use strict';
        
        var $stickyHeaderWrapper = $(".sticky-header");
		var $stickyHeader = $(".site-header.fixed");
        var $window = $(window);
        $window.on("load resize", function(){
            console.log($stickyHeader.height());
            $stickyHeaderWrapper.height($stickyHeader.height());
        });
        
    }(document, window, jQuery));*/
    </script>

<div id="page" class="site-container">

	<div id="content" class="site-content">
