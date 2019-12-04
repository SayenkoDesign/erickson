<?php

/*
Home - Why
*/


if( ! class_exists( 'Home_Why' ) ) {
    class Home_Why extends Element_Section {
        
        private $heading = '';
        
        private $button = '';
        
        private $sections = [];
        
        private $nav_items = [];
        
        public function __construct() {
            parent::__construct();
              
            $fields = get_field( 'why' );           
            $this->set_fields( $fields );
                        
            $settings = [];
            $this->set_settings( $settings );
            
            // Render the section
            //$this->render();
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-why'
                ]
            ); 
        } 
        
                   
        
        // Add content
        public function render() {
            
            $heading = $this->get_fields( 'heading' );
            $this->heading = _s_format_string( $heading, 'h2', ['class'=> 'h6' ] );
            
            $button = $this->get_fields( 'button' );
                        
            if( ! empty( $button['link'] ) ) {
                                
                $args = [
                    'link' => $button['link'],
                    'echo' => false,
                    'classes' => 'Button' == $button['style'] ? 'button' : '',
                ];
                
                $this->button = sprintf( '<p class="button-wrapper show-for-xxlarge">%s</p>', _s_acf_button( $args ) );
            }
            
             
                        
            return sprintf( '<div class="hide-for-xxlarge"><div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                    <div class="cell large-auto">%s</div></div></div></div>%s', $this->heading, $this->get_grid() );
               
        }
        
        
        private function get_grid() {
            
            $rows = $this->get_fields( 'grid' );
            
            if( empty( $rows ) ) {
                return false;
            }
               
            foreach( $rows as $row ) {  
                $this->get_item( $row );
            }
            
            if( empty( $this->sections ) ) {
                return false;   
            }
            
            $nav_items = sprintf( '<nav id="full-screen-scroll-section-nav-1" class="full-screen-scroll-section-nav scroll-navigation-right" data-section="1">
                                   <ul>%s</ul>
                                   </nav>', 
                                   join( '', $this->nav_items ) 
                                 );
            
            return sprintf( '<div id="full-screen-scroll-section-1" class="full-screen-scroll-section" data-section="1">%s%s</div>
                            <a class="full-screen-page-load-link"></a>', 
                                    join( '', $this->sections ), $nav_items );
        }
        
        
        private function get_item( $row ) {
                        
            if( empty( $row ) ) {
                return false;   
            }
                                                                    
            $heading = _s_format_string( $row['grid_title'], 'h3'); 
            $description = _s_format_string( $row['grid_description'], 'p' );
            $image = $row['grid_image'];
            $image = sprintf( '<div class="photo">%s</div>', _s_get_acf_image( $image, 'large' ) );
            $list = $row['grid_list'];
            if( ! empty( $list ) ) {
                
                $list_items = '';
                
                foreach( $list as $item ) {
                    $list_items .= sprintf( '<li>%s</li>', $item['item'] );
                }
                
                if( ! empty( $list_items ) ) {
                    $list = sprintf( '<ul>%s</ul>', $list_items  );
                } else {
                    $list = false;
                }             
            }
            
            if( $heading && ! $description && ! $image ) {
                return false;
            }
            
            $arrow = sprintf( '<a href="#section-technologies" data-smooth-scroll data-offset="0"><img src="%sicons/arrow-down.svg" class="arrow-down" /></a>', trailingslashit( THEME_IMG ) );
                      
            $grid = sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                    <div class="cell large-auto">%s</div>
                                    <div class="cell large-7 xlarge-6">
                                        <div class="grid-item">
                                            <header><div class="show-for-xxlarge">%s</div>%s</header>
                                            %s
                                            %s
                                            %s
                                            %s
                                        </div>
                                    </div>
                                </div>
                            </div>', 
                            $image,
                            $this->heading,
                            $heading,
                            $description,
                            $list,
                            $this->button,
                            $arrow
                         );
                         
            
            static $element = 1;
            
            $active = 1 === $element ? ' active' : '';
            
            $this->sections[] = sprintf( '<div class="full-screen-scroll-section-element%s" data-section="1" data-element="%d">
                                <div id="full-screen-scroll-section-element-1-%d" class="hundred-percent-height hundred-percent-height-center-content hundred-percent-height-scrolling">
                                  <div class="fullwidth-center-content">%s</div>
                                </div>
                            </div>', $active, $element, $element, $grid );
                            
                            
            $this->nav_items[] = sprintf( '<li>
                <a href="#full-screen-scroll-section-element-1-%s" class="full-screen-scroll-section-link" data-element="%s" data-name="%s">
            <span class="full-screen-scroll-section-link-number">%s</span></a>
        </li>', $element, $element, $row['grid_title'], str_pad( $element, 2, "0", STR_PAD_LEFT ) );                            
           
            $element++;
            
        }
        
    }
}
   
new Home_Why; 