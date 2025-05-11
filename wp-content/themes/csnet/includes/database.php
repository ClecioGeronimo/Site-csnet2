<?php
if (!defined('ABSPATH')) exit;

class WP_CSNET_DB {
    private static $conn = null;

    public static function get_connection() {
        if (self::$conn === null) {
            self::$conn = new mysqli(
                WP_CSNET_DB_HOST,
                WP_CSNET_DB_USER,
                WP_CSNET_DB_PASS,
                WP_CSNET_DB_NAME
            );

            if (self::$conn->connect_error) {
                error_log('Database connection failed: ' . self::$conn->connect_error);
                return null;
            }

            self::$conn->set_charset('utf8mb4');
        }
        return self::$conn;
    }

    public static function query($sql, $params = []) {
        $conn = self::get_connection();
        if (!$conn) return null;

        if (!empty($params)) {
            $stmt = $conn->prepare($sql);
            if (!$stmt) {
                error_log('Prepare failed: ' . $conn->error);
                return null;
            }

            $types = str_repeat('s', count($params));
            $stmt->bind_param($types, ...$params);
            $stmt->execute();
            $result = $stmt->get_result();
            $stmt->close();
        } else {
            $result = $conn->query($sql);
        }

        if (!$result) {
            error_log('Query failed: ' . $conn->error);
            return null;
        }

        $data = [];
        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
        $result->free();

        return $data;
    }
}

function wp_csnet_get_plans() {
    return WP_CSNET_DB::query("SELECT * FROM plans ORDER BY price ASC");
}

function wp_csnet_get_customers() {
    return WP_CSNET_DB::query("SELECT * FROM customers ORDER BY created_at DESC");
}

function wp_csnet_get_orders() {
    $query = "
        SELECT 
            o.*,
            c.name as customer_name,
            p.name as plan_name,
            p.speed as plan_speed,
            p.price as plan_price
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        JOIN plans p ON o.plan_id = p.id
        ORDER BY o.created_at DESC
    ";
    return WP_CSNET_DB::query($query);
}

function wp_csnet_create_order($data) {
    $query = "INSERT INTO orders (customer_id, plan_id, status, installation_date) VALUES (?, ?, ?, ?)";
    return WP_CSNET_DB::query($query, [
        $data['customer_id'],
        $data['plan_id'],
        $data['status'],
        $data['installation_date']
    ]);
}

function wp_csnet_get_order_by_id($id) {
    $query = "
        SELECT 
            o.*,
            c.name as customer_name,
            p.name as plan_name,
            p.speed as plan_speed,
            p.price as plan_price
        FROM orders o
        JOIN customers c ON o.customer_id = c.id
        JOIN plans p ON o.plan_id = p.id
        WHERE o.id = ?
    ";
    $results = WP_CSNET_DB::query($query, [$id]);
    return $results ? $results[0] : null;
}