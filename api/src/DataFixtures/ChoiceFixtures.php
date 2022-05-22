<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Choice;
use App\Entity\Question;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker;

class ChoiceFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create();

        for ($i = 1; $i <= 4; $i++) {
            /**
             * @var Question $question
             */
            $question = $this->getReference(sprintf('question_%d', random_int(1, 60)));

            $choice = new Choice();
            $choice->setValue($faker->words(3, true));
            $choice->setQuestion($question);
            $choice->setIsCorrect($faker->boolean());
            $manager->persist($choice);

            $this->addReference(sprintf('choice_%d', $i), $choice);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            QuestionFixtures::class
        ];
    }
}
