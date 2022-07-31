<?php

namespace App\DataFixtures;

use App\Entity\Question;
use App\Entity\Quiz;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker;

final class QuestionFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create();

        for ($i = 1; $i <= 60; $i++) {
            /**
             * @var Quiz $quiz
             */
            $quiz = $this->getReference(sprintf('quiz_%d', random_int(1, 30)));

            $question = new Question();
            $question->setTitle($faker->sentence(random_int(5, 10)));
            $question->setIllustration($faker->imageUrl());
            $question->setDifficulty($faker->word());
            $question->setQuiz($quiz);
            $manager->persist($question);

            $this->addReference(sprintf('question_%d', $i), $question);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            QuizFixtures::class,
        ];
    }
}
