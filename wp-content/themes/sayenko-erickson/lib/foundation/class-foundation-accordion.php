<?php

// Foundation Accordion

class Foundation_Accordion extends Foundation {
    
    var $items;
    var $tab_links;
    var $settings = array();
    static $accordion_count;
    
    public function __construct( $settings = array() ) {
        parent::__construct();
        
        self::$accordion_count++;
        
        $defaults = array(
            'class' => 'accordion',
            'data' => array( 'data-accordion' => true, 'data-multi-expand' => 'true', 'data-allow-all-closed' => 'true' ),
            'id' => sprintf( 'accordion-%s',  self::$accordion_count )
        );

        $args = wp_parse_args( $settings, $defaults );
        
        $args['data'] = $this->parse_attr( $args['data'] );
        
        $this->settings = $args;
	}
    

    public function add_item( $args = array() ) {
                
        if( !is_array( $args ) ) {
            wp_die( __( 'It is required to pass an array of arguments: title, content', 'foundation' ) );
        }
        
        if( ! isset( $args['title'] ) && ! isset( $args['content'] ) ) {
            wp_die( __( 'Tab title and content are required', 'foundation' ) );
        }
        
        $this->items[] = $args;
	}
    
    
    public function get_accordion() {
        
        $items = $this->items;
        
        if( empty( $items ) ) {
            return false;
        }
        
        $accordion = '';
        
        $count = 0;
        
        foreach( $items as $item ) {
            $accordion .= sprintf( '<li class="accordion-item%s" data-accordion-item>
                                        <a href="#" class="accordion-title">%s</a>
                                        <div class="accordion-content" data-tab-content>%s</div>
                                   </li>',
                                    $item['active'] ? ' is-active' : '',
                                    $item['title'],
                                    $item['content']   
                                 );
        }
        
        
        return sprintf( '<ul class="%s" %s id="%s">%s</ul>', 
                        $this->settings['class'],
                        $this->settings['data'],
                        $this->settings['id'],
                        $accordion
                      );
           
    }
    
    
    public function clear() {
        // Clear any previous tabs
        $this->items = array();
    }
}