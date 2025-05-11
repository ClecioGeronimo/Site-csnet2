<?php
if (!defined('ABSPATH')) exit;

function wp_csnet_content_width() {
    $GLOBALS['content_width'] = apply_filters('wp_csnet_content_width', 1200);
}
add_action('after_setup_theme', 'wp_csnet_content_width', 0);

function wp_csnet_custom_header_setup() {
    add_theme_support('custom-header', array(
        'default-image' => '',
        'width' => 1920,
        'height' => 1080,
        'flex-height' => true,
        'flex-width' => true,
        'uploads' => true,
        'header-text' => false
    ));
}
add_action('after_setup_theme', 'wp_csnet_custom_header_setup');

function wp_csnet_custom_logo_setup() {
    add_theme_support('custom-logo', array(
        'height' => 100,
        'width' => 400,
        'flex-height' => true,
        'flex-width' => true
    ));
}
add_action('after_setup_theme', 'wp_csnet_custom_logo_setup');

function wp_csnet_widgets_init() {
    register_sidebar(array(
        'name' => __('Footer Widget Area', 'wp_csnet'),
        'id' => 'footer-widget-area',
        'description' => __('Add widgets here to appear in your footer.', 'wp_csnet'),
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget' => '</div>',
        'before_title' => '<h3 class="widget-title">',
        'after_title' => '</h3>'
    ));
}
add_action('widgets_init', 'wp_csnet_widgets_init');