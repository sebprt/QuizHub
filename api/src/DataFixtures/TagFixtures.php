<?php

namespace App\DataFixtures;

use App\Entity\Category;
use App\Entity\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;
use Faker;

class TagFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create();

        for ($i = 1; $i <= 15; $i++) {
            /**
             * @var Category $category
             */
            $category = $this->getReference(sprintf('category_%d', random_int(1, 10)));

            $tag = new Tag();
            $tag->setName($faker->word());
            $tag->setCategory($category);
            $manager->persist($tag);

            $this->addReference(sprintf('tag_%d', $i), $tag);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CategoryFixtures::class
        ];
    }
}
