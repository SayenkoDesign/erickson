<?php

/**
 * Displays reset password link
 *
 * @since  0.1.0
 * @access public
 * @return string
 */
function _s_reset_password_link() {
    return sprintf( '<a href="%s/password-reset/">%s</a>', site_url(), __( 'Forgot your password?' ) );
}

add_shortcode( 'reset_password_link', '_s_reset_password_link' );


/**
 * Displays reset password form
 *
 * @since  0.1.0
 * @access public
 * @return string
 */
function _s_reset_password_shortcode( $attr, $content = null ) {
    
    if( is_user_logged_in() ) {
        
    }
    
    ob_start( );
    ?>
    <div class="form-container">
    <form method="post" action="<?php echo wp_lostpassword_url() ?>" id="passwordform">
        <p class="username">
            <label for="user_login" class=""><?php _e('Username or Email'); ?></label>
            <input type="text" name="user_login" value="" placeholder="Username or Email" size="20" id="user_login" tabindex="1001" />
        </p>
        <p class="login-submit">
            <?php do_action('login_form', 'resetpass'); ?>
            <button class="button"><span><?php _e('Reset my password'); ?></span></button>
         </p>
    </form>
    </div>
    <?php
    $output = ob_get_clean( );
    
    return $output;
     
}

add_shortcode( 'lost_password_form', '_s_reset_password_shortcode' );

function ea_login_form( $args = array() ) {
    $defaults = array(
        'echo'           => true,
        // Default 'redirect' value takes the user back to the request URI.
        'redirect'       => ( is_ssl() ? 'https://' : 'http://' ) . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'],
        'form_id'        => 'loginform',
        'label_username' => __( 'Username or Email Address' ),
        'label_password' => __( 'Password' ),
        'label_remember' => __( 'Remember Me' ),
        'label_log_in'   => __( 'Log In' ),
        'id_username'    => 'user_login',
        'id_password'    => 'user_pass',
        'id_remember'    => 'rememberme',
        'id_submit'      => 'wp-submit',
        'remember'       => true,
        'value_username' => '',
        // Set 'value_remember' to true to default the "Remember me" checkbox to checked.
        'value_remember' => false,
    );
 
    /**
     * Filters the default login form output arguments.
     *
     * @since 3.0.0
     *
     * @see wp_login_form()
     *
     * @param array $defaults An array of default login form arguments.
     */
    $args = wp_parse_args( $args, apply_filters( 'login_form_defaults', $defaults ) );
 
    /**
     * Filters content to display at the top of the login form.
     *
     * The filter evaluates just following the opening form tag element.
     *
     * @since 3.0.0
     *
     * @param string $content Content to display. Default empty.
     * @param array  $args    Array of login form arguments.
     */
    $login_form_top = apply_filters( 'login_form_top', '', $args );
 
    /**
     * Filters content to display in the middle of the login form.
     *
     * The filter evaluates just following the location where the 'login-password'
     * field is displayed.
     *
     * @since 3.0.0
     *
     * @param string $content Content to display. Default empty.
     * @param array  $args    Array of login form arguments.
     */
    $login_form_middle = apply_filters( 'login_form_middle', '', $args );
 
    /**
     * Filters content to display at the bottom of the login form.
     *
     * The filter evaluates just preceding the closing form tag element.
     *
     * @since 3.0.0
     *
     * @param string $content Content to display. Default empty.
     * @param array  $args    Array of login form arguments.
     */
    $login_form_bottom = apply_filters( 'login_form_bottom', '', $args );
 
    $form = '
        <form name="' . $args['form_id'] . '" id="' . $args['form_id'] . '" action="' . esc_url( site_url( 'wp-login.php', 'login_post' ) ) . '" method="post">
            ' . $login_form_top . '
            <p class="login-username">
                <label for="' . esc_attr( $args['id_username'] ) . '">' . esc_html( $args['label_username'] ) . '</label>
                <input type="text" name="log" id="' . esc_attr( $args['id_username'] ) . '" class="input" value="' . esc_attr( $args['value_username'] ) . '" placeholder="' . esc_attr( $args['label_username'] ) . '" size="20" />
            </p>
            <p class="login-password">
                <label for="' . esc_attr( $args['id_password'] ) . '">' . esc_html( $args['label_password'] ) . '</label>
                <input type="password" name="pwd" id="' . esc_attr( $args['id_password'] ) . '" placeholder="' . esc_attr( $args['label_password'] ) . '" class="input" value="" size="20" />
            </p>
            ' . $login_form_middle . '
            ' . ( $args['remember'] ? '<p class="login-remember"><label><input name="rememberme" type="checkbox" id="' . esc_attr( $args['id_remember'] ) . '" value="forever"' . ( $args['value_remember'] ? ' checked="checked"' : '' ) . ' /> ' . esc_html( $args['label_remember'] ) . '</label></p>' : '' ) . '
            <p class="login-submit">
                 <button type="submit" name="wp-submit" id="' . esc_attr( $args['id_submit'] ) . '" class="button button-primary" value="' . esc_attr( $args['label_log_in'] ) . '" >' . esc_attr( $args['label_log_in'] ) . '</button>
                <input type="hidden" name="redirect_to" value="' . esc_url( $args['redirect'] ) . '" />
            </p>
            ' . $login_form_bottom . '
        </form>';
 
    if ( $args['echo'] ) {
        echo $form;
    } else {
        return $form;
    }
}

function nonDisclosureForm() {
	$thisURL = $_SERVER['REQUEST_URI'];
	$form = sprintf( '<form id="nondisclosure-agreement" name="nondisclosure-agreement" method="post" action="%s" >', $thisURL );
	$form .= '<p><input type="checkbox" id="nondisclosure" name="nondisclosure" value="signed" /><label for="nondisclosure">I agree and certify that I am not a Competitor, as defined above</label></p>';
	$form .= '<button type="submit" name="nondisclosure_submit" value="Complete Log In" class="button" >Complete Log In</button>';
	$form .= '</form>';
	return $form;
}

function investorRelationsPageContent() {
	// investor role and capabilities are added via the EricksonInvestorRole plugin

	if ( ! function_exists( 'nonDisclosureSignedCurrentSession' ) ) {
		echo '<div class="error">The plugin necessary to render this page is not installed.</div>';
		return;
	}

	global $post, $errors;
        
	$nonDisclosureText = sprintf( '<div class="ndi-text">%s</div>', get_field( 'investment_non_disclosure_agreement_text' ) );

	if ( ! is_user_logged_in() ) {
		the_content();
		echo '<div class="form-container border-top">';
		echo '<h4>Log in to view quarterly reports</h4>';
		echo '<p>Enter your username and password to log in.</p>';

		$args = array(
			'form_id'        => 'investorloginform',
			'remember'       => false,
			'label_username' => 'Username'
		);
		ea_login_form( $args );
        printf( '<p>%s</p>', _s_reset_password_link() );
		echo '</div>'; // end .form-container
	}
	elseif ( is_user_logged_in() && ! nonDisclosureSignedCurrentSession() ) {
        if( ! empty( $investors ) ) {
            printf( '<div class="error">%s</div>', join( '', $errors ) );   
        }
        echo $nonDisclosureText;
		echo nonDisclosureForm();
	}
	elseif ( is_user_logged_in() && nonDisclosureSignedCurrentSession() ) {
		if ( current_user_can( 'view_investor_docs' ) ) {
			echo get_field( 'documents_text' );
			ea_printDocTable();
			printf( '<a class="button" href="%s">Log Out</a>', wp_logout_url( '/investor-relations/') );
		}
		else
			echo '<div class="error">Apologies, you are not authorized to view this page.</div>';
	}

}


function ea_printDocTable() {
	
	
	if( have_rows('documents') ):
    
        echo '<ul class="documents">';
        echo '<li class="header"><span class="date">Date</span><span class="title">Title</span></li>';

		// loop through the rows of data
		while ( have_rows('documents') ) : the_row();

			// display a sub field value
			$document = get_sub_field('document');
                        
            $url = $document['url'];
            $icon = $document['icon'];
            if( $icon ) {
                $icon = sprintf( '<img src="%s" />', $icon );
                $icon = '';
            }
            
			$title = get_sub_field('title');
			$date = get_sub_field('date');
	
			$link = sprintf( '<a href="%s" title="Download %s" target="_blank">%3$s<span>%2$s</span></a>', $url , $title, $icon );
			printf( '<li><span class="date">%s</span><span class="file">%s</span></li>', $date, $link );

		endwhile;

	    echo '</ul>';

	endif;
	
}