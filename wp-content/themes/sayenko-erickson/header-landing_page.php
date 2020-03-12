<?php
/**
 * Landing Page Header
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="no-js">
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
    <script src="//unpkg.com/scrollreveal/dist/scrollreveal.min.js"></script>
	<?php wp_head(); ?>
</head>

<body <?php body_class( wp_is_mobile() ? 'is-mobile' : 'is-desktop' ); ?> id="top">

<ul class="skip-link screen-reader-text">
	<li><a href="#content" class="screen-reader-shortcut"><?php esc_html_e( 'Skip to content', '_s' ); ?></a></li>
	<li><a href="#footer" class="screen-reader-shortcut"><?php esc_html_e( 'Skip to footer', '_s' ); ?></a></li>
</ul>

<header id="masthead" class="site-header" role="banner" itemscope itemtype="https://schema.org/WPHeader">
        
    <div class="wrap">
    
        <div class="grid-container"><div class="grid-x grid-padding-x">
    
        <div class="site-branding cell">
            <div class="site-title">
            <?php
            $site_url = home_url();
            printf('<img src="%slogo.svg" alt="site logo" class="logo" />', trailingslashit( THEME_IMG ) );  
            
            /*
            printf('<a href="%s" title="%s">%s</a>',
                    $site_url, 
                    get_bloginfo( 'name' ), 
                    $logo
                    );
                    */
            ?>
            </div>
            
           
        </div><!-- .site-branding -->
        
        </div></div>
        
    </div><!-- wrap -->
    
     
</header><!-- #masthead -->

<div id="page" class="site-container">

	<div id="content" class="site-content">
