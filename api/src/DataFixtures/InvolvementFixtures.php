<?php

namespace App\DataFixtures;

use App\Entity\Answer;
use App\Entity\Involvement;
use App\Entity\Quiz;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker;

class InvolvementFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create();

        for ($i = 1; $i <= 10; $i++) {
            /**
             * @var Quiz $quiz
             * @var User $user
             */
            $quiz = $this->getReference(sprintf('quiz_%d', random_int(1, 30)));
            $user = $this->getReference(sprintf('user_%d', random_int(1, 5)));

            $involvement = new Involvement();
            $involvement->setQuiz($quiz);
            $involvement->setUser($user);
            $involvement->setStatus($faker->word);
            $involvement->setScore($faker->numberBetween(0, 20));
            $involvement->setStartedAt(new \DateTimeImmutable('now'));
            $involvement->setFinishedAt((new \DateTimeImmutable('now'))->add(new \DateInterval('PT20M')));
            $manager->persist($involvement);

            $this->addReference(sprintf('involvement_%d', $i), $involvement);
        }

        $manager->flush();
    }

    public function getDependencies()
    {
        return [
            QuizFixtures::class,
            UserFixtures::class
        ];
    }
}
