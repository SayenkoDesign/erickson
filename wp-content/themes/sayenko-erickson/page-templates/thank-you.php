<?php
/*
Template Name: Thank You
*/

// returns true if $needle is a substring of $haystack
function _string_contains( $needle, $haystack )
{
    return strpos( $haystack, $needle ) !== false;
}

function _s_replace_placeholder_variables( $message, $request ) {
    
    if( ! empty( $message ) && ! empty( $request ) ) {
        foreach($request as $key => $value ){
            if( ! empty( $value ) ) {
                $message = str_replace('{'.$key.'}', $value, $message );
            }
        }
        
        return $message;
    } 
    
    return false;  
}

function get_custom_message( $options = [], $request = [] ) {
    
    if( empty( $options ) ) {
        return false;
    }
    
    if( empty( $request ) ) {
        return false;
    }
    
    foreach( $options as $key => $option ) {
        $field = $option['field'];
        $condition = $option['condition'];
        $value = $option['value'];
        $message = $option['message'];
        
        $found  = false;
        
        $count = $key + 1;
        
        if( array_key_exists( $field, $request ) ) {

            // match found
            if( 'is' == $condition ) {
                $found = $request[$field] == $value;
                //echo "$count. Test: $field is $value<br />";
                if( $found ) {
                    //echo "$count. Found: $field is $value<br />";
                }
            } else if( 'isnot' == $condition ) {
                $found = $request[$field] != $value;
                //echo "$count. $field is not $value<br />";
                if( $found ) {
                    //echo "$count. Found: $field is not $value<br />";
                }
            } else if( 'contains' == $condition ) {
                $found = _string_contains( strtolower( $request[$field] ), strtolower( $value  ));
                //echo "$count. $field contains $value<br />";
                if( $found ) {
                    //echo "$count. Found: $field contains $value<br />";
                }
            } else {
                // failed
            }
            
            if( $found ) {
                return _s_replace_placeholder_variables( $message, $request );
            }
        }
    } 
    
    return false;  
}

add_filter( 'body_class', function ( $classes ) {
  unset( $classes[ array_search('page-template-default', $classes ) ] );
  return $classes;
}, 99 );

get_header(); ?>

<?php
_s_get_template_part( 'template-parts/thank-you', 'hero' );
?>

<div class="grid-container">

    <div class="grid-x grid-margin-x">    
  
        <div id="primary" class="cell content-area">
    
            <main id="main" class="site-main" role="main">
            <?php	
            
            // Sanitize things
            $request = [];
            
            foreach( $_REQUEST as $key => $value ) {
                $request[sanitize_text_field( $key )] = sanitize_text_field( $value ); 
            }
            
            $custom_message = get_field( 'custom_message' );
            $message = get_custom_message( $custom_message, $request );

            
            //var_dump( $request );	
                    
            while ( have_posts() ) :
        
                the_post();
        
                $output = get_field( 'default_message' ); 
                
                // Replace any template tags if we have a request
                if( ! empty( $request ) && ! empty( $message ) ) {
                    $output = $message;
                }
                                
                printf( '<div class="entry-content">%s</div>',  wpautop( $output ) );
                    
            endwhile;
            
            $show_social_profiles = get_field( 'show_social_profiles' );
            
            if( $show_social_profiles ) {
                printf( '<h4 class="text-center">Connect with us:</h4>%s', _s_get_social_icons() );
            }
            
            $show_resources = get_field( 'show_resources' );
            
            if( $show_resources ) {
                _s_get_template_part( 'template-parts/thank-you', 'posts' );
            }            
            ?>
            </main>
        
        </div>
    
    </div>

</div>

<?php
get_footer();