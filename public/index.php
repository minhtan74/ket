<?php
// Front Controller: mọi request đều đi qua file này.
// Luồng: index.php -> chọn Controller theo $_GET['controller'] -> gọi action -> render View.

require_once __DIR__ . '/../config/database.php'; // tạo sẵn biến $pdo

require_once __DIR__ . '/../app/models/Test.php';
require_once __DIR__ . '/../app/models/Question.php';
require_once __DIR__ . '/../app/models/Option.php';
require_once __DIR__ . '/../app/models/ClozeQuestion.php';
require_once __DIR__ . '/../app/models/OpenClozeQuestion.php';
require_once __DIR__ . '/../app/models/FormQuestion.php';
require_once __DIR__ . '/../app/models/Part7Question.php';

require_once __DIR__ . '/../app/controllers/Controller.php';
require_once __DIR__ . '/../app/controllers/HomeController.php';
require_once __DIR__ . '/../app/controllers/ExamController.php';
require_once __DIR__ . '/../app/controllers/ResultController.php';
require_once __DIR__ . '/../app/controllers/AdminController.php';
require_once __DIR__ . '/../app/controllers/Part4Controller.php';
require_once __DIR__ . '/../app/controllers/AdminPart4Controller.php';
require_once __DIR__ . '/../app/controllers/OpenClozeController.php';
require_once __DIR__ . '/../app/controllers/FormCompletionController.php';
require_once __DIR__ . '/../app/controllers/AdminFormCompletionController.php';
require_once __DIR__ . '/../app/controllers/Part7Controller.php';
require_once __DIR__ . '/../app/controllers/AdminPart7Controller.php';

$controllerName = $_GET['controller'] ?? 'home';
$actionName = $_GET['action'] ?? 'index';

switch ($controllerName) {
    case 'exam':
        $controller = new ExamController($pdo);
        break;
    case 'result':
        $controller = new ResultController($pdo);
        break;
    case 'admin':
        $controller = new AdminController($pdo);
        break;
    case 'part4':
        $controller = new Part4Controller($pdo);
        break;
    case 'admin_part4':
        $controller = new AdminPart4Controller($pdo);
        break;
    case 'opencloze':
        $controller = new OpenClozeController($pdo);
        break;
    case 'formcompletion':
        $controller = new FormCompletionController($pdo);
        break;
    case 'admin_formcompletion':
        $controller = new AdminFormCompletionController($pdo);
        break;
    case 'part7':
        $controller = new Part7Controller($pdo);
        break;
    case 'admin_part7':
        $controller = new AdminPart7Controller($pdo);
        break;
    case 'home':
        $controller = new HomeController($pdo);
        break;
    default:
        http_response_code(404);
        echo 'Page not found.';
        exit;
}

if (!method_exists($controller, $actionName)) {
    http_response_code(404);
    echo 'Page not found.';
    exit;
}

$controller->$actionName();
