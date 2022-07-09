<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Quiz;
use App\Entity\Tag;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker;

class QuizFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create();

        for ($i = 1; $i <= 30; $i++) {
            /**
             * @var Category $category
             * @var Tag $tag
             * @var User $user
             */
            $category = $this->getReference(sprintf('category_%d', random_int(1, 10)));
            $tag = $this->getReference(sprintf('tag_%s', random_int(1, 15)));
            $user = $this->getReference(sprintf('user_%s', random_int(1, 5)));

            $quiz = new Quiz();
            $quiz->setTitle($faker->words(3, true));
            $quiz->setDescription($faker->paragraph(2));
            $quiz->setNumberOfQuestions($faker->randomDigitNotNull());
            $quiz->setSlug($faker->words(3, true));
            $quiz->setCreatedAt(new \DateTimeImmutable('now'));
            $quiz->setCreatedBy($user);
            $quiz->setCategory($category);
            $quiz->addTag($tag);
            $manager->persist($quiz);

            $this->addReference(sprintf('quiz_%d', $i), $quiz);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class,
            TagFixtures::class,
            UserFixtures::class,
        ];
    }
}
