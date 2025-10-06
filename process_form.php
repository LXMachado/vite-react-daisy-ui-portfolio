<?php
// Start session for CSRF protection
session_start();

// Function to sanitize input data
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

// Function to remove newlines and carriage returns to prevent header injection
function sanitizeEmail($email) {
    return preg_replace('/[\r\n]/', '', $email);
}

// Function to validate email format
function validateEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Function to generate CSRF token
function generateCSRFToken() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Function to validate CSRF token
function validateCSRFToken($token) {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}

// Set security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Initialize error array
    $errors = [];
    
    // Validate CSRF token
    if (!isset($_POST['csrf_token']) || !validateCSRFToken($_POST['csrf_token'])) {
        $errors[] = "Invalid request. Please try again.";
    }
    
    // Validate and sanitize input data
    $name = isset($_POST['name']) ? sanitizeInput($_POST['name']) : '';
    $email = isset($_POST['email']) ? sanitizeInput($_POST['email']) : '';
    $message = isset($_POST['message']) ? sanitizeInput($_POST['message']) : '';
    
    // Validate required fields
    if (empty($name)) {
        $errors[] = "Name is required.";
    } elseif (strlen($name) > 100) {
        $errors[] = "Name must be less than 100 characters.";
    }
    
    if (empty($email)) {
        $errors[] = "Email is required.";
    } elseif (!validateEmail($email)) {
        $errors[] = "Please enter a valid email address.";
    } elseif (strlen($email) > 254) {
        $errors[] = "Email address is too long.";
    }
    
    if (empty($message)) {
        $errors[] = "Message is required.";
    } elseif (strlen($message) > 5000) {
        $errors[] = "Message must be less than 5000 characters.";
    }
    
    // If no errors, process the form
    if (empty($errors)) {
        // Sanitize email for headers to prevent injection
        $sanitizedEmail = sanitizeEmail($email);
        
        // Recipient email
        $to = "bookings.machado@gmail.com";
        
        // Subject
        $subject = "New Contact Form Submission from " . $name;
        
        // Email body with proper formatting
        $body = "You have received a new message from your contact form:\n\n";
        $body .= "Name: " . $name . "\n";
        $body .= "Email: " . $sanitizedEmail . "\n";
        $body .= "Message:\n" . $message . "\n\n";
        $body .= "---\n";
        $body .= "This message was sent from your portfolio contact form on " . date('Y-m-d H:i:s');
        
        // Headers with security measures
        $headers = array(
            'From' => 'noreply@yourdomain.com',
            'Reply-To' => $sanitizedEmail,
            'Return-Path' => 'noreply@yourdomain.com',
            'X-Mailer' => 'PHP/' . phpversion(),
            'Content-Type' => 'text/plain; charset=UTF-8',
            'MIME-Version' => '1.0'
        );
        
        // Convert headers array to string
        $headerString = '';
        foreach ($headers as $key => $value) {
            $headerString .= $key . ': ' . $value . "\r\n";
        }
        
        // Attempt to send email
        if (mail($to, $subject, $body, $headerString)) {
            // Log successful submission (optional)
            error_log("Contact form submission from: " . $sanitizedEmail . " - " . date('Y-m-d H:i:s'));
            
            // Return success response
            http_response_code(200);
            echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
        } else {
            // Log error
            error_log("Failed to send contact form email from: " . $sanitizedEmail . " - " . date('Y-m-d H:i:s'));
            
            // Return error response
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again later.']);
        }
    } else {
        // Return validation errors
        http_response_code(400);
        echo json_encode(['success' => false, 'errors' => $errors]);
    }
} else {
    // Return CSRF token for GET requests (for form initialization)
    if ($_SERVER["REQUEST_METHOD"] == "GET") {
        $csrfToken = generateCSRFToken();
        echo json_encode(['csrf_token' => $csrfToken]);
    } else {
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed.']);
    }
}
?>
