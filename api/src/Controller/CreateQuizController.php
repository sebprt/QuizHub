<?php

namespace App\Controller;

use App\Entity\Quiz;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

class CreateQuizController extends AbstractController
{
    public function __invoke(Quiz $data): Quiz
    {
        $data->setCreatedBy($this->getUser());

        return $data;
    }
}
