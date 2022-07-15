<?php

namespace App\DataFixtures;

use App\Entity\Tag;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;

class TagFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create();

        for ($i = 1; $i <= 15; $i++) {
            $tag = new Tag();
            $tag->setName($faker->word());
            $manager->persist($tag);

            $this->addReference(sprintf('tag_%d', $i), $tag);
        }

        $manager->flush();
    }
}
