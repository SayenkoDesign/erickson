<?php

/*
Product - FAQ
*/


if( ! class_exists( 'Product_FAQ' ) ) {
    class Product_FAQ extends Element_Section {
        
        public function __construct() {
            parent::__construct();
              
            $fields = get_field( 'faq' );  
            $this->set_fields( $fields );
            
            $settings = [];
            $this->set_settings( $settings );
            
            // Render the section
            $this->render();
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
    
            $this->add_render_attribute(
                'wrapper', 'class', [
                     $this->get_name() . '-faq'
                ]
            );            
        } 
        
        
       
           
        
        // Add content
        public function render() {
            
            $field = $this->get_fields();
            if( empty( $field[ 'heading' ] ) || empty( $field[ 'faq' ] )  ) {
                return false;
            }
            
            $heading = _s_format_string( $field[ 'heading' ], 'h2' );
            
            /*
                 - get categories ? do we have more than 1?
                 - if not more thna 1 just get FAQ
                 - if more thna 1 get tabs and accordion
            */
            
            $categories = $this->get_categories();
            
            $faq = false;
                        
            // We only wrap in accoridon and tabs if the FAQ have categories
            if( ! empty( $categories ) && ( count( $categories )  > 1 ) ) {
                $faq = sprintf( '<div class="hide-for-large">%s</div>', $this->get_accordion() );
                $faq .= sprintf( '<div class="show-for-large">%s</div>', $this->get_tabs() );
            } else {
                $faq = $this->get_faqs();
            }
            
            
            return sprintf( '<div class="grid-container"><div class="grid-x grid-x-margin"><div class="cell">%s%s</div></div></div>',
                            $heading,
                            $faq
            );
               
        }
        
        
        private function get_tabs() {
            
            $post_id = $this->get_fields( 'faq' );
            
            $faqs = get_field( 'faqs', $post_id );
            if( empty( $faqs ) ) {
                return false;
            }
            
            $out = '';
            
            $ft = new Foundation_Tabs();

            $count = 0;       
            foreach( $faqs as $faq ) {
                
                if( empty( $faq ) ) {
                    continue;
                }
                
                
                
                $category = $faq['category'];
                $category_id = sanitize_title_with_dashes( $faq['category'] );
                
                $rows = $faq['faq'];
                $faq = $this->get_faq( $rows );
                                
                $ft->add_item( [
                    'title' => $category, 
                    'content' => $faq,
                    'active' => $count ? false : true
                ] );
                
                $count ++;                
            }
                                    
            $out = $ft->get_tabs();
            $ft->clear();
            
            return $out;
        }
        
        
        
        private function get_accordion() {
            
            $post_id = $this->get_fields( 'faq' );
            
            $faqs = get_field( 'faqs', $post_id );
            if( empty( $faqs ) ) {
                return false;
            }
            
            $out = '';
            
            $fa = new Foundation_Accordion( [ 'class' => 'accordion accordion-filter' ] );

            $count = 0;       
            foreach( $faqs as $faq ) {
                
                if( empty( $faq ) ) {
                    continue;
                }
                
                
                
                $category = $faq['category'];
                $category_id = sanitize_title_with_dashes( $faq['category'] );
                
                $rows = $faq['faq'];
                $faq = $this->get_faq( $rows );
                                
                $fa->add_item( [
                    'title' => $category, 
                    'content' => $faq,
                    'active' => $count ? false : true
                ] );
                
                $count ++;                
            }
                                    
            $out = $fa->get_accordion();
            $fa->clear();
            
            return $out;
        }
        
        
        public function get_faqs() {
            
            $post_id = $this->get_fields( 'faq' );
            
            $faqs = get_field( 'faqs', $post_id );
            
            $rows = $faqs[0]['faq'];
            
            return $this->get_faq( $rows );
        }
        
        
        private function get_faq( $rows = [] ) {
            
            if( empty( $rows ) ) {
                return false;
            }
                        
            $lists = c2c_array_partition( $rows, 2 );
            
            $fa = new Foundation_Accordion( [ 'class' => 'accordion accordion-faq' ] );
                            
            $out = '';
            $count = 0;
            foreach( $lists as $list ) {
                
                foreach( $list as $row ) {
                     $fa->add_item( [ 'title' => $row['question'], 'content' => $row['answer'], 'active' => $count ? false : true ] );
                     $count ++;   
                }
                
                $accordion = $fa->get_accordion();
                $fa->clear();
                
                 if( ! empty( $accordion ) ) {
                    $out .= sprintf( '<div class="cell">%s</div>', $accordion );  
                             
                }
                
                
            }
            
            return sprintf( '<div class="grid-x grid-margin-x small-up-1 large-up-2 faq-group">%s</div>', $out );
        }
        
        
        private function get_categories() {
            $post_id = $this->get_fields( 'faq' );
            
            $faqs = get_field( 'faqs', $post_id );
            if( empty( $faqs ) ) {
                return false;
            }
                        
            $categories = wp_list_pluck( $faqs, 'category' );
                        
            if( ! empty( $categories )  ) { // && count( $categories ) > 1
                
                return $categories;
            }
            
            return false;
        }
               
    }
}
   
new Product_FAQ; 