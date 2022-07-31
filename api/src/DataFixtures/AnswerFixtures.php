<?php

namespace App\DataFixtures;

use App\Entity\Answer;
use App\Entity\Choice;
use App\Entity\Involvement;
use App\Entity\Quiz;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

final class AnswerFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 0; $i < 5; $i++) {
            /**
             * @var Quiz $quiz
             */
            $quiz = $this->getReference(sprintf('quiz_%d', random_int(1, 15)));

            /**
             * @var Involvement $involvement
             */
            $involvement = $this->getReference(sprintf('involvement_%d', random_int(1, 10)));

            /**
             * @var Choice $choice
             */
            $choice = $this->getReference(sprintf('choice_%d', random_int(1, 4)));

            $answer = new Answer();
            $answer->setQuiz($quiz);
            $answer->setInvolvement($involvement);
            $answer->setCreatedAt((new \DateTimeImmutable())->sub(new \DateInterval('P1W')));
            $answer->setUpdatedAt(new \DateTimeImmutable('now'));
            $answer->setChoice($choice);
            $manager->persist($answer);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            QuizFixtures::class,
            InvolvementFixtures::class,
            ChoiceFixtures::class
        ];
    }
}
