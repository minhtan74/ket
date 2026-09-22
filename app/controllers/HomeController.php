<?php
// HomeController: hiển thị trang chủ với danh sách các phần thi.
// Hiện tại chỉ Reading Part 1 có thể bấm vào, các phần khác "Coming soon".

class HomeController extends Controller
{
    public function __construct(private PDO $pdo)
    {
    }

    public function index(): void
    {
        $this->render('home/index');
    }
}
