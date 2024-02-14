<?php
// Landing Page - Columns

if( ! class_exists( 'Landing_Page_Columns' ) ) {
    class Landing_Page_Columns extends Element_Section {
        
        public function __construct() {
            parent::__construct();
                                    
            $fields['columns'] = get_field( 'columns' );
            $this->set_fields( $fields );
            
            // print the section
            $this->print_element();        
        }
        
        
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-columns',
                ]
            );   

            $this->add_render_attribute(
                'wrapper', 'id', [
                     $this->get_name() . '-columns'
                ], true
            );            
            
        }  
        
        
        // Add content
        public function render() {
            
            if( empty( $this->get_fields( 'columns' ) ) ) {
                return false;
            };
            
            $rows = $this->get_fields( 'columns' );
            
            $columns = '';
            
            foreach( $rows as $key => $row ) {
                // $animate = ! $key ? 'animate-left' : 'animate-right';
                if( ! empty( $row[ 'column' ] ) ) {
                    $columns .= sprintf( '<div class="cell large-auto"><div class="panel">%s</div></div>', $row[ 'column' ] );
                }
            }
            
            if( empty( $columns ) ) {
                return false;
            }
         
            return sprintf( '<div class="grid-container">
                                <div class="grid-x grid-padding-x grid-margin-bottom">
                                    %s
                                </div>
                            </div>',
                            $columns
                         );
            
        }
                
    }
}
   
new Landing_Page_Columns;
