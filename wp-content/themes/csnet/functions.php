<?php
if (!defined('ABSPATH')) exit;

// Theme constants
define('WP_CSNET_VERSION', '1.0.0');
define('WP_CSNET_PATH', get_template_directory());
define('WP_CSNET_URL', get_template_directory_uri());

// Include core theme files
require_once WP_CSNET_PATH . '/includes/setup.php';
require_once WP_CSNET_PATH . '/includes/enqueue.php';
require_once WP_CSNET_PATH . '/includes/api.php';
require_once WP_CSNET_PATH . '/includes/database.php';

// Theme setup
function wp_csnet_setup() {
    // Add theme support
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    add_theme_support('html5', array(
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script'
    ));

    // Register menus
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'wp_csnet'),
        'footer' => __('Footer Menu', 'wp_csnet')
    ));
}
add_action('after_setup_theme', 'wp_csnet_setup');

// Disable admin bar for React app
function wp_csnet_disable_admin_bar() {
    show_admin_bar(false);
}
add_action('after_setup_theme', 'wp_csnet_disable_admin_bar');

// Add custom image sizes
function wp_csnet_image_sizes() {
    add_image_size('hero', 1920, 1080, true);
    add_image_size('product', 600, 400, true);
}
add_action('after_setup_theme', 'wp_csnet_image_sizes');

// Add custom post types
function wp_csnet_post_types() {
    register_post_type('plan', array(
        'labels' => array(
            'name' => __('Plans', 'wp_csnet'),
            'singular_name' => __('Plan', 'wp_csnet')
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-networking'
    ));

    register_post_type('product', array(
        'labels' => array(
            'name' => __('Products', 'wp_csnet'),
            'singular_name' => __('Product', 'wp_csnet')
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'custom-fields'),
        'menu_icon' => 'dashicons-cart'
    ));
}
add_action('init', 'wp_csnet_post_types');