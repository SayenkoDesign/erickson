<?php

// Turn on label visibility
add_filter( 'gform_enable_field_label_visibility_settings', '__return_true' );

// On submit scroll back down to form
add_filter( 'gform_confirmation_anchor', '__return_true' );

// Remove scroll to a specific form #5
//add_filter( 'gform_confirmation_anchor_5', '__return_false' );


// By submitting this form, I agree to Erickson’s <a href="/privacy-policy">Privacy Policy</a>

function add_privacy_policy( $button, $form ) {
    $text = sprintf( '<div class="privacy-policy-disclaimer">By submitting this form, I agree to Erickson’s <a href="%s" target="_blank">Privacy Policy</a></div>', get_permalink( 3 ) );
    return $text . $button;
}
add_filter( 'gform_submit_button', 'add_privacy_policy', 99, 2 );


/**
 * Filters the next, previous and submit buttons.
 * Replaces the forms <input> buttons with <button> while maintaining attributes from original <input>.
 *
 * @param string $button Contains the <input> tag to be filtered.
 * @param object $form Contains all the properties of the current form.
 *
 * @return string The filtered button.
 */
add_filter( 'gform_next_button', 'input_to_button', 10, 2 );
add_filter( 'gform_previous_button', 'input_to_button', 10, 2 );
add_filter( 'gform_submit_button', 'input_to_button', 10, 2 );
function input_to_button( $button, $form ) {
    $dom = new DOMDocument();
    $dom->loadHTML( $button );
    $input = $dom->getElementsByTagName( 'input' )->item(0);
    $new_button = $dom->createElement( 'button' );
    $new_button->appendChild( $dom->createTextNode( $input->getAttribute( 'value' ) ) );
    $input->removeAttribute( 'value' );
    foreach( $input->attributes as $attribute ) {
        $new_button->setAttribute( $attribute->name, $attribute->value );
    }
    $input->parentNode->replaceChild( $new_button, $input );
    
    $new_button_text = sprintf( '<span>%s</span>', $form['button']['text'] );
 
    $button =  $dom->saveHtml( $new_button );
    $button = str_replace( $form['button']['text'], $new_button_text, $button );
    
    return $button;
}

/*
function post_to_third_party( $confirmation, $form, $entry ) {
 
    $post_url = 'https://go.ericksoninc.com/l/692223/2020-05-04/vqh4';

    $body     = array(
        'firstname' => rgar( $entry, '1.3' ),
        'lastname'  => rgar( $entry, '1.6' ),
        'company'    => rgar( $entry, '5' ),
        'email'    => rgar( $entry, '3' ),
    );
    GFCommon::log_debug( 'gform_confirmation: body => ' . print_r( $body, true ) );
 
    $request  = new WP_Http();
    $response = $request->post( $post_url, array( 'body' => $body ) );
    GFCommon::log_debug( 'gform_confirmation: response => ' . print_r( $response, true ) );
 
    return $confirmation;
}
*/


add_filter( 'gform_field_value_form_handler', function() {
    if( is_singular( 'case_study' )) {
        $challenge = get_field( 'challenge' );
        if( ! empty( $challenge['form_handler'] ) ) {
            return $challenge['form_handler'];
        }
    }
});

add_filter( 'gform_field_value_file', function() {
    if( is_singular( 'case_study' )) {
        $challenge = get_field( 'challenge' );
        if( ! empty( $challenge['file'] ) ) {
            return $challenge['file']['ID'];
        }
    }
});


// firstname={Name (First):1.3}&lastname={Name (Last):1.6}&company={Company:5}&email={Email:3}&file={File:7}
add_filter( 'gform_confirmation_8', function ( $confirmation, $form, $entry ) {
    GFCommon::log_debug( 'case study redirect: ' . rgar( $entry, '6' ) );

    $confirmation['redirect'] = rgar( $entry, '6' );
    return $confirmation;
}, 10, 3 );
