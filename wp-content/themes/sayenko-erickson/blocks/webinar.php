<?php
// Block: Webinar

if( ! class_exists( 'Webinar_Block' ) ) {
    class Webinar_Block extends Element_Block {

        private $enable_hubspot = false;
        
        static public $section_count;
                
        public function __construct( $data ) {
            parent::__construct( $data );
                                    
            
            $this->set_fields( 'image', get_field( 'image' ) );
            $this->set_fields( 'text', get_field( 'text' ) );
            $this->set_fields( 'button_text', get_field( 'button_text' ) );
            
            $this->set_fields( 'form_handler', get_field( 'form_handler', get_the_ID() ) );
            $this->set_fields( 'video', get_field( 'video', get_the_ID() ) );
            
            $settings = get_field( 'webinar_settings', 'option' );
            $this->set_settings( $settings );
            
            // print the section
            $this->print_element();        
        }
              
        // Add default attributes to section        
        protected function _add_render_attributes() {
            
            // use parent attributes
            parent::_add_render_attributes();
            
            
            $access_granted = _s_get_webinar_transient();
            
            if( ! $access_granted ) {                                                              
                $this->add_render_attribute( 'wrapper', 'class', 'webinar-gated' ); 
            }
            else {
                $this->add_render_attribute( 'wrapper', 'class', 'webinar-access-granted' ); 
            }
            
        } 

        
        // Add content
        public function render() {
                        
            $cells = '';
            $button = '';
            $modal = '';
            
            $image = $this->get_fields( 'image' );
            
            $columns = '';
            
            if( ! empty($image ) ) {
                                                
                $columns = ' large-auto';
                $cell_order = '';
                $cells .= sprintf( '<div class="cell%s%s"><div class="image-wrapper">%s</div></div>', $columns, $cell_order, _s_get_acf_image( $image, 'large' ) );
            }
            
            // Gated content?            
            $form_handler = $this->get_fields( 'form_handler' ); // get_field( 'form_handler' );
                
            $gated_form = $this->get_settings( 'gated_form' );
                                        
            $form_id = ! empty( $gated_form['gravity_form'] ) ? $gated_form['gravity_form'] : false;
            $form = GFAPI::get_form( absint( $form_id ) );
            
            
                                            
            if( false === $this->enable_hubspot && ! is_wp_error( $form ) && ! empty( $form_handler ) && ! empty( $this->get_fields( 'video' ) ) ) {
                
                global $post;
                                    
                $slug = 'modal-' . $post->post_name;
                
                $data = [
                    'form_id' => $form_id,
                    'slug'    => $slug,
                    'content' => ! empty( $gated_form['content'] ) ? $gated_form['content'] : ''
                ];
                
                $options = [
                    'src' => '#' . $slug,
                    'modal' => true,
                    'baseClass' => "full-screen",
                    'closeExisting' => true,
                    'touch' => false,
                    'hash' => false,
                    'backFocus' => false
                ];
                $options = sprintf( "data-options='{%s}'", _parse_data_attribute( $options, ':', ', ' ) );
                
                $button_text = __( 'watch full video', '_s' );
                
                if( ! empty( $this->get_fields( 'button_text' ) ) ) {
                    $button_text = $this->get_fields( 'button_text' );
                }
                
                $access_granted = ''; //_s_get_webinar_transient();
                
                $video_button = sprintf( '<a class="button video-button" data-fancybox href="%s">%s</a>', $this->get_fields( 'video' ), $button_text );
                
                if( $access_granted ) {
                    
                    $button = $video_button;
                    
                } else {
                    
                    $button =  sprintf( '<a class="button modal-form" data-fancybox %s href="javascript:;">%s</a>', $options, $button_text );
                    
                    $button .= $video_button;
                }
                
                $modal = _s_get_template_part( 'template-parts/modal', 'webinar', $data, true );

                $content = $button;
                
            } else {
                $hubspot = '<div class="hubspot-form"><!--[if lte IE 8]>
                <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2-legacy.js"></script>
                <![endif]-->
                <script charset="utf-8" type="text/javascript" src="//js.hsforms.net/forms/v2.js"></script>
                <script>
                    hbspt.forms.create({
                        region: "na1",
                        portalId: "21030106",
                        formId: "752976d6-191d-4722-9a4e-55bffb1468ef"
                    });
                    
                </script>
                 </div>';
    
                $hubspot .= '
                <script>
                window.addEventListener("message", function (event) {
                    if (event.data.type === "hsFormCallback" && event.data.eventName === "onFormReady") {
                        var url = window.location.href;
                        url = url.replace(/\/$/, "");
                        document.getElementById("hs-form-iframe-0").contentDocument.querySelector("input[name=\"form_source\"]").value = url;
                    }
                });
                </script>
                ';

                $content = $hubspot;
                
            }




            
            $cells .= sprintf( '<div class="cell%s"><div class="panel">%s%s</div></div>', $columns, $this->get_fields( 'text' ), $content  );
                                                
            return sprintf( '
                                <div class="grid-x grid-padding-x grid-margin-bottom">
                                %s
                                </div>
                              
                            ',
                            $cells
                         );  
            
        }
        
    }
}
   
new Webinar_Block( $data );
