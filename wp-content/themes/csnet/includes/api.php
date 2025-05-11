<?php
if (!defined('ABSPATH')) exit;

function wp_csnet_register_rest_routes() {
    register_rest_route('wp_csnet/v1', '/plans', array(
        'methods' => 'GET',
        'callback' => 'wp_csnet_get_plans_endpoint',
        'permission_callback' => '__return_true'
    ));

    register_rest_route('wp_csnet/v1', '/customers', array(
        'methods' => 'GET',
        'callback' => 'wp_csnet_get_customers_endpoint',
        'permission_callback' => function() {
            return current_user_can('edit_posts');
        }
    ));

    register_rest_route('wp_csnet/v1', '/orders', array(
        array(
            'methods' => 'GET',
            'callback' => 'wp_csnet_get_orders_endpoint',
            'permission_callback' => function() {
                return current_user_can('edit_posts');
            }
        ),
        array(
            'methods' => 'POST',
            'callback' => 'wp_csnet_create_order_endpoint',
            'permission_callback' => function() {
                return current_user_can('edit_posts');
            }
        )
    ));

    register_rest_route('wp_csnet/v1', '/orders/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'wp_csnet_get_order_endpoint',
        'permission_callback' => function() {
            return current_user_can('edit_posts');
        }
    ));
}
add_action('rest_api_init', 'wp_csnet_register_rest_routes');

function wp_csnet_get_plans_endpoint() {
    $plans = wp_csnet_get_plans();
    if ($plans === null) {
        return new WP_Error('database_error', 'Failed to fetch plans', array('status' => 500));
    }
    return new WP_REST_Response($plans, 200);
}

function wp_csnet_get_customers_endpoint() {
    $customers = wp_csnet_get_customers();
    if ($customers === null) {
        return new WP_Error('database_error', 'Failed to fetch customers', array('status' => 500));
    }
    return new WP_REST_Response($customers, 200);
}

function wp_csnet_get_orders_endpoint() {
    $orders = wp_csnet_get_orders();
    if ($orders === null) {
        return new WP_Error('database_error', 'Failed to fetch orders', array('status' => 500));
    }
    return new WP_REST_Response($orders, 200);
}

function wp_csnet_create_order_endpoint(WP_REST_Request $request) {
    $params = $request->get_json_params();
    
    if (empty($params['customer_id']) || empty($params['plan_id'])) {
        return new WP_Error('missing_params', 'Missing required parameters', array('status' => 400));
    }

    $result = wp_csnet_create_order($params);
    if ($result === null) {
        return new WP_Error('database_error', 'Failed to create order', array('status' => 500));
    }

    $order = wp_csnet_get_order_by_id($result);
    return new WP_REST_Response($order, 201);
}

function wp_csnet_get_order_endpoint(WP_REST_Request $request) {
    $id = $request['id'];
    $order = wp_csnet_get_order_by_id($id);
    
    if ($order === null) {
        return new WP_Error('not_found', 'Order not found', array('status' => 404));
    }
    
    return new WP_REST_Response($order, 200);
}