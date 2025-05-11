<?php
if (!defined('ABSPATH')) exit;

function wp_csnet_scripts() {
    // Enqueue styles
    wp_enqueue_style(
        'wp-csnet-styles',
        WP_CSNET_URL . '/dist/assets/index.css',
        array(),
        WP_CSNET_VERSION
    );

    // Enqueue vendor scripts
    wp_enqueue_script(
        'wp-csnet-vendor',
        WP_CSNET_URL . '/dist/assets/vendor.js',
        array(),
        WP_CSNET_VERSION,
        true
    );

    // Enqueue main scripts
    wp_enqueue_script(
        'wp-csnet-main',
        WP_CSNET_URL . '/dist/assets/index.js',
        array('wp-csnet-vendor'),
        WP_CSNET_VERSION,
        true
    );

    // Localize script with necessary data
    wp_localize_script('wp-csnet-main', 'wpCsnetData', array(
        'siteUrl' => get_site_url(),
        'apiUrl' => rest_url('wp-csnet/v1'),
        'nonce' => wp_create_nonce('wp_rest'),
        'isAdmin' => current_user_can('manage_options'),
        'themeUrl' => get_template_directory_uri(),
        'homeUrl' => home_url('/')
    ));
}
add_action('wp_enqueue_scripts', 'wp_csnet_scripts');