<?php
// Block - Contracts

if( ! class_exists( 'Contracts_Block' ) ) {
    class Contracts_Block extends Element_Block {
                
        public function __construct( $data ) {
            parent::__construct( $data );
            
            $this->set_fields( 'heading', get_field( 'heading' ) );
            $this->set_fields( 'description', get_field( 'description' ) );
            $this->set_fields( 'customer_title', get_field( 'customer_title' ) );
            $this->set_fields( 'scope_title', get_field( 'scope_title' ) );
            $this->set_fields( 'contracts', get_field( 'contracts' ) );
            
            /*
            $this->set_settings( 'padding', get_field( 'padding' )  );
            $this->set_settings( 'margin', get_field( 'margin' )  );
            */
            $this->set_settings( 'background_color', get_field( 'background_color' ) );
                        
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            // use parent attributes
            parent::_add_render_attributes();
                        
            if( ! empty( $this->get_settings( 'background_color' )  ) ) {   
                $this->add_render_attribute( 'wrapper', 'class', strtolower( 'background-color-' . $this->get_settings( 'background_color' ) ) ); 
            }
        }          
        
        // Add content
        public function render() {
                        
            $heading = $this->get_fields( 'heading' ) ? $this->get_fields( 'heading' ) : '';
            $description = $this->get_fields( 'description' );
            
            $heading = sprintf( '<header>%s%s%s</header>', get_svg( 'award-icon' ), _s_format_string( $heading, 'h2' ), $description );
                
            $grid = $this->get_grid();
                        
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-margin-x">
                                <div class="cell">%s%s</div>
                                </div>
                            </div>',
                            $heading,
                            $grid
                         );  
        }
        
        
        private function get_grid() {
            
            $rows = $this->get_fields( 'contracts' );
            
            if( empty( $rows ) ) {
                return false;
            }
            
            $unique_id = wp_generate_uuid4();
                               
            $out = '';
                                                               
            foreach( $rows as $key => $row ) {  
            
                $id = sprintf( '%s-%d', $unique_id, $key );
                
                if( ! empty( $row ) ) {
                
                    $image = $row['image'];
                    if( ! empty( $image ) ) {
                        $image = sprintf( '<div class="thumbnail">%s</div>', _s_get_acf_image( $image, 'thumbnail' ) );
                    }
                    
                    $text = sprintf( '<div class="text">%s</div>', $row['customer'] );
                                        
                    $scope = $row['scope'];
                    
                    $out .= sprintf( '<div class="cell">
                                        <div class="grid-x">
                                            <div class="cell large-auto"><div class="panel panel-even" data-mh="panel-height-%s"><div class="header-inner hide-for-large">%s</div>%s%s</div></div>
                                            <div class="cell large-auto"><div class="panel panel-odd" data-mh="panel-height-%s"><div class="header-inner hide-for-large">%s</div>%s</div></div>
                                        </div>
                                    </div>', 
                                    $id,
                                    _s_format_string( $this->get_fields( 'customer_title' ), 'h3', [ 'class' => 'h4' ] ),
                                    $image,
                                    $text,
                                    $id,
                                    _s_format_string( $this->get_fields( 'scope_title' ), 'h3', [ 'class' => 'h4' ] ),
                                    $scope
                             );
                    
                    }
                
                }
                                                    
            
            $headings = sprintf( '<div class="cell large-auto show-for-large"><div class="header" data-mh="contracts-heading-height-%s">%s</div></div>', 
                                $unique_id, _s_format_string( $this->get_fields( 'customer_title' ), 'h3', [ 'class' => 'h4' ] ) );
            $headings .= sprintf( '<div class="cell large-auto show-for-large"><div class="header" data-mh="contracts-heading-height-%s">%s</div></div>', 
                                $unique_id, _s_format_string( $this->get_fields( 'scope_title' ), 'h3', [ 'class' => 'h4' ] ) );
            
            return sprintf( '<div class="grid-x">%s</div><div class="grid-x grid">%s</div>', 
                                    $headings,
                                    $out 
                                    );
        }
                
    }
}
   
new Contracts_Block( $data );
