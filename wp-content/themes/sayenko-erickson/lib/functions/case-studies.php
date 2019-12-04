<?php
    
    
    function _s_get_relationship_field_list( $rows, $heading, $links = false, $field = false ) {
                        
    if( empty( $rows ) ) {
        return false;
    }
    
    $list = '';
    
    foreach( $rows as $row ) {
        $title = get_the_title( $row->ID );  
        $permalink = get_permalink( $row->ID ); 
        
        if( $links ) {
            
            if( 'technology' == $field ) {
                $terms = get_the_terms( $row->ID, 'technology_cat' );
                if( ! is_wp_error( $terms ) && ! empty( $terms ) ) {
                    $permalink = sprintf( '%s#%s', trailingslashit( site_url()), 'section-technologies' /*$terms[0]->slug*/ );
                }
                
            }
            
            $list .= sprintf( '<li><a href="%s" target="_blank">%s</a></li>', $permalink, $title ); 
        } else {
            $list .= sprintf( '<li><span>%s</span></li>', $title ); 
        }
        
    }
    
    if( empty( $list ) ) {
        return false;
    }
                
    return sprintf( '<div class="panel">%s<ul class="no-bullet">%s</ul></div>', $heading, $list );
}