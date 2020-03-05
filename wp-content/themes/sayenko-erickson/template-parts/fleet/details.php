<?php
// Fleet - Details

if( ! class_exists( 'Details_Section' ) ) {
    class Details_Section extends Element_Section {
                
        public function __construct() {
            parent::__construct();
            
            $fields = get_field( 'details' );
            $this->set_fields( $fields );
                        
            $settings = $this->get_fields( 'details' );
            $this->set_settings( $settings );
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-details'
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-details'
                ], true
            );            
            
        }  
        
        
        public function before_render() {            
            return '';
        }
        
        
        public function after_render() {
            return '';
        }
             
        
        // Add content
        public function render() {
                                    
            $rows = $this->get_fields( 'description' );
            $cells = '';
            $grid = '';
            if( ! empty( $rows ) ) {
                foreach( $rows as $row ) {
                    $cells .= sprintf( '<div class="cell"><h4>%s</h4><p>%s</p></div>', $row['title'], $row['text'] );
                }
                
                if( ! empty( $cells ) ) {
                    $grid = sprintf( '<div class="grid-x grid-margin-x small-up-1 medium-up-2 medium-large-up-3">%s</div>', $cells );
                }
            }
            
            $buttons = '';
            
            $file = $this->get_fields( 'file' );             
            if( ! empty( $file['url'] ) ) {
                $args = [
                    'link' => [ 'title' => sprintf( '%s %s', __( 'download' ), $file['subtype'] ), 'url' => $file['url'], 'target' => '_blank' ],
                    'echo' => false,
                    'classes' => 'button',
                ];
                $buttons  .= sprintf( '<div class="cell">%s</div>', _s_acf_button( $args ) );
            }
            
            $button = $this->get_fields( 'button' );
            if( ! empty( $button['link'] ) ) {
                                
                $args = [
                    'link' => $button['link'],
                    'echo' => false,
                    'classes' => 'button--secondary button',
                ];
                $buttons  .= sprintf( '<div class="cell">%s</div>', _s_acf_button( $args ) );
            }
            
            if( ! empty( $buttons ) ) {
                $buttons = sprintf( '<div class="grid-x grid-margin-x small-up-1 medium-up-2">%s</div>', $buttons );
            }
            
            $image = get_the_post_thumbnail( get_the_ID(), 'large'  );
            if( ! empty( $image ) ) {
                $style = sprintf( ' style="background-image: url(%s);"', $image );
                $image = sprintf( '<div class="cell large-auto small-order-1 large-order-2 object-fit-parent">%s</div>', $image );
            }
                                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                    <div class="cell large-auto small-order-2 large-order-1"><div class="panel">%s%s</div></div>
                                    %s
                                </div>
                            </div>',
                            $grid,
                            $buttons,
                            $image
                         );  
        }
        
        
    }
}
   
new Details_Section;
