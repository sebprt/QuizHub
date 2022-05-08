<?php

namespace App\DataFixtures;

use App\Entity\Category;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class CategoryFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create();

        for ($i = 1; $i <= 10; $i++) {
            $category = new Category();
            $category->setName($faker->words(random_int(1, 3), true));
            $manager->persist($category);

            $this->addReference(sprintf('category_%d', $i), $category);
        }

        $manager->flush();
    }
}
