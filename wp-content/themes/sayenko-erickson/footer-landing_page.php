<?php
/**
 * Landing Page Footer
 */
?>

</div><!-- #content -->

<footer class="site-footer" id="site-footer" role="contentinfo" itemscope itemtype="https://schema.org/WPFooter">
    <div class="wrap">
        <div class="grid-container ">
          <div class="grid-x grid-padding-x align-middle">
          
            <div class="cell">
                <?php                
        
                printf( '<div class="copyright"><p>&copy; %s Erickson Incorporated. %s</p></div>', 
                          date( 'Y' ), 
                          __( 'All rights reserved.', '_s' )
                    );
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
